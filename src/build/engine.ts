import { AGENTS, type AgentId } from "@/build/agents";
import {
  cascadePart,
  cursorFor,
  dismiss,
  dragSelection,
  fadePart,
  fixCrooked,
  fixMisplacedChip,
  fixTypo,
  makeCrooked,
  makeMisplacedChip,
  moveCursor,
  placeCursor,
  pos,
  resetTypable,
  typePart,
  typoSegments,
  type Ctx,
} from "@/build/choreo";
import { Aborted, RunGate } from "@/build/gate";
import { MISTAKES, mistakeForBlock, type MistakeId } from "@/build/mistakes";
import { BuildScheduler } from "@/build/scheduler";
import { T } from "@/build/timing";

/** DOM side of the build: owns block elements, the overlay, and one async loop per agent. */
export class BuildEngine {
  readonly scheduler = new BuildScheduler();
  readonly gate = new RunGate();
  private els = new Map<string, HTMLElement>();
  private ids = new WeakMap<Element, string>();
  private overlay: HTMLElement | null = null;
  private io: IntersectionObserver | null = null;
  private running = false;
  private instant = false;

  /* ---------- registration ---------- */

  register(id: string, owner: AgentId, el: HTMLElement) {
    this.els.set(id, el);
    this.ids.set(el, id);
    el.dataset.build = this.instant ? "built" : this.scheduler.state(id);
    this.scheduler.register({ id, owner, order: 0 });
    if (this.instant) this.scheduler.markAllBuilt();
    this.reorder();
    this.observer()?.observe(el);
  }

  unregister(id: string, el: HTMLElement) {
    if (this.els.get(id) !== el) return;
    this.io?.unobserve(el);
    this.els.delete(id);
    this.scheduler.unregister(id);
  }

  setOverlay(el: HTMLElement | null) {
    this.overlay = el;
  }

  private reorder() {
    const sorted = [...this.els.entries()].sort(([, a], [, b]) =>
      a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1,
    );
    sorted.forEach(([id], order) => this.scheduler.register({ id, owner: this.ownerOf(id), order }));
  }

  private ownerOf(id: string): AgentId {
    return (this.els.get(id)?.dataset.owner as AgentId) ?? "hero";
  }

  private observer() {
    if (typeof IntersectionObserver === "undefined") return null;
    this.io ??= new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = this.ids.get(e.target);
          if (id) this.scheduler.setVisible(id, e.isIntersecting);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    return this.io;
  }

  /* ---------- lifecycle ---------- */

  start() {
    if (this.running || this.instant) return;
    this.running = true;
    const run = this.gate.run;
    if (document.hidden) this.gate.pause();
    this.parkCursors();
    AGENTS.forEach((a, i) => void this.loop(a.id, run, T.START_DELAY + i * T.AGENT_STAGGER));
  }

  stop() {
    this.gate.bump();
    this.running = false;
  }

  setHidden(hidden: boolean) {
    if (hidden) this.gate.pause();
    else this.gate.resume();
  }

  /** Reduced motion: everything built, no loops. */
  setInstant(instant: boolean) {
    this.instant = instant;
    if (!instant) {
      this.start();
      return;
    }
    this.stop();
    this.clearOverlay();
    this.resetDom();
    this.scheduler.markAllBuilt();
    for (const el of this.els.values()) el.dataset.build = "built";
  }

  replay() {
    if (this.instant) return;
    this.stop();
    this.clearOverlay();
    this.resetDom();
    this.scheduler.reset();
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    // let the scroll settle so visibility reflects the top of the page
    requestAnimationFrame(() => this.start());
  }

  private resetDom() {
    for (const el of this.els.values()) {
      el.dataset.build = "unbuilt";
      el.style.transform = "";
      el.style.transition = "";
      delete el.dataset.mistake;
      el.querySelectorAll<HTMLElement>("[data-part]").forEach((p) => {
        delete p.dataset.revealed;
        if (p.dataset.part === "type") resetTypable(p);
        if (p.dataset.part === "cascade")
          [...p.children].forEach((c) => {
            const k = c as HTMLElement;
            k.style.transitionDelay = "";
            k.style.transform = "";
            k.style.transition = "";
            delete k.dataset.mistake;
          });
      });
    }
  }

  private clearOverlay() {
    const o = this.overlay;
    if (!o) return;
    o.querySelectorAll(".selection").forEach((s) => s.remove());
    o.querySelectorAll<HTMLElement>(".comment, .guide").forEach((n) => delete n.dataset.on);
  }

  private parkCursors() {
    if (!this.overlay) return;
    const ctx = this.ctx(this.gate.run);
    for (const a of AGENTS) {
      const c = cursorFor(ctx, a.id);
      if (!c) continue;
      const o = this.overlay.getBoundingClientRect();
      delete c.dataset.idle;
      placeCursor(c, a.start.x * window.innerWidth - o.left, a.start.y * window.innerHeight - o.top);
    }
    this.overlay.dataset.ready = "";
  }

  private ctx(run: number): Ctx {
    return { gate: this.gate, run, overlay: this.overlay! };
  }

  /* ---------- agents ---------- */

  private async loop(agent: AgentId, run: number, delay: number) {
    try {
      await this.gate.sleep(delay, run);
      for (;;) {
        await this.gate.check(run);
        const seen = this.scheduler.version;
        const task = this.scheduler.next(agent);
        if (!task) {
          // Retiring awaits; anything queued meanwhile bumps `version`. The check and the
          // subscription inside wake() run in the same tick, so no notification can slip between them.
          await this.retire(agent, run);
          if (this.scheduler.version !== seen) continue;
          await this.gate.wake((fn) => this.scheduler.subscribe(fn), run);
          continue;
        }
        if (this.overlay) delete cursorFor(this.ctx(run), agent)?.dataset.idle;
        if (!this.overlay) {
          if (task.kind === "build") this.finishInstantly(task.blockId);
          continue;
        }
        if (task.kind === "build") await this.build(agent, task.blockId, this.ctx(run));
        else await this.fix(agent, task.mistakeId, this.ctx(run));
      }
    } catch (e) {
      if (!(e instanceof Aborted)) throw e;
    }
  }

  /** Idle agents get out of the way: glide to the nearest page gutter, then fade out. */
  /** Returns true if it animated (so the caller re-checks for work queued meanwhile). */
  private async retire(agent: AgentId, run: number): Promise<boolean> {
    if (!this.overlay) return false;
    const ctx = this.ctx(run);
    const cursor = cursorFor(ctx, agent);
    if (!cursor || cursor.dataset.idle !== undefined) return false;
    const main = document.querySelector("main");
    const c = pos(ctx, cursor);
    if (main) {
      const m = pos(ctx, main);
      const left = m.x - 28;
      const right = m.x + m.w + 8;
      const x = Math.abs(c.x - left) <= Math.abs(c.x - right) ? left : right;
      await moveCursor(ctx, cursor, x, c.y, 500);
    }
    cursor.dataset.idle = "";
    return true;
  }

  private finishInstantly(id: string) {
    const el = this.els.get(id);
    if (el) el.dataset.build = "built";
    this.scheduler.complete(id);
  }

  private async build(agent: AgentId, id: string, ctx: Ctx) {
    const block = this.els.get(id);
    if (!block) return;
    const cursor = cursorFor(ctx, agent);
    const target = block.querySelector<HTMLElement>("[data-select]") ?? block;
    block.dataset.build = "building";

    const r = pos(ctx, target);
    try {
      await moveCursor(ctx, cursor, r.x - 2, r.y - 2);
    } catch (e) {
      block.dataset.build = "unbuilt";
      throw e;
    }
    if (!this.scheduler.isVisible(id)) {
      block.dataset.build = "unbuilt";
      this.scheduler.release(id);
      return;
    }

    // A slip only happens when someone else is around to catch it.
    const m = mistakeForBlock(id);
    const mistake = m && MISTAKES[m].fixer !== agent ? m : null;
    const sel = await dragSelection(ctx, agent, cursor, target);
    if (mistake === "crooked-card") makeCrooked(block);

    const parts = [...block.querySelectorAll<HTMLElement>("[data-part]")];
    for (const part of parts) {
      if (!target.contains(part)) {
        const p = pos(ctx, part);
        await moveCursor(ctx, cursor, p.x + Math.min(p.w, 40), p.y + Math.min(p.h, 24), 300);
      }
      if (part.dataset.part === "type") {
        const full = part.dataset.full ?? "";
        const segs =
          mistake === "summary-typo" && part.dataset.mistake === "summary-typo" ? typoSegments(full) : [{ text: full }];
        await typePart(ctx, part, segs);
      } else if (part.dataset.part === "cascade") {
        if (mistake === "misplaced-chip") makeMisplacedChip(block);
        await cascadePart(ctx, part);
      } else {
        await fadePart(ctx, part);
      }
    }

    dismiss(sel);
    block.dataset.build = "built";
    this.scheduler.complete(id);
    if (mistake) this.scheduler.enqueueFix(mistake);
    await this.gate.sleep(120, ctx.run);
  }

  private async fix(agent: AgentId, m: MistakeId, ctx: Ctx) {
    const cursor = cursorFor(ctx, agent);
    if (m === "summary-typo") await fixTypo(ctx, cursor);
    else if (m === "crooked-card") {
      const block = this.els.get(MISTAKES[m].blockId);
      if (block) await fixCrooked(ctx, cursor, block);
    } else await fixMisplacedChip(ctx, cursor);
    this.scheduler.completeFix(m);
  }
}
