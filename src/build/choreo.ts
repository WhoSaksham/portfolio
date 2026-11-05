import type { AgentId } from "@/build/agents";
import type { RunGate } from "@/build/gate";
import { MISPLACED_CHIP, TYPO, misspell } from "@/build/mistakes";
import { T } from "@/build/timing";

/** Everything a primitive needs: pause/abort control and the overlay that hosts cursors. */
export type Ctx = { gate: RunGate; run: number; overlay: HTMLElement };

type Rect = { x: number; y: number; w: number; h: number };

const EASE = "cubic-bezier(.65,0,.25,1)";
const cursorPos = new WeakMap<HTMLElement, { x: number; y: number }>();

/** Element rect in overlay coordinates (page space), measured now. */
export function pos(ctx: Ctx, el: Element): Rect {
  const o = ctx.overlay.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height };
}

export function cursorFor(ctx: Ctx, agent: AgentId) {
  return ctx.overlay.querySelector<HTMLElement>(`.cursor[data-agent="${agent}"]`)!;
}

/** Name tag sits left of the arrow near the right edge so it never gets clipped. */
function flipTag(cursor: HTMLElement, x: number) {
  const width = cursor.parentElement?.clientWidth ?? Infinity;
  cursor.toggleAttribute("data-flip", x > width - 150);
}

export function placeCursor(cursor: HTMLElement, x: number, y: number) {
  cursor.style.transition = "none";
  cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  cursorPos.set(cursor, { x, y });
  flipTag(cursor, x);
}

export async function moveCursor(ctx: Ctx, cursor: HTMLElement, x: number, y: number, ms: number = T.MOVE) {
  await ctx.gate.check(ctx.run);
  cursor.style.transition = `transform ${ms}ms ${EASE}`;
  cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  cursorPos.set(cursor, { x, y });
  flipTag(cursor, x);
  await ctx.gate.sleep(ms, ctx.run);
}

async function moveBy(ctx: Ctx, cursor: HTMLElement, dx: number, dy: number, ms: number) {
  const p = cursorPos.get(cursor) ?? { x: 0, y: 0 };
  await moveCursor(ctx, cursor, p.x + dx, p.y + dy, ms);
}

/** Cursor drags a selection box over `target`; returns the box so the caller can dismiss it. */
export async function dragSelection(ctx: Ctx, agent: AgentId, cursor: HTMLElement, target: Element) {
  const r = pos(ctx, target);
  const sel = document.createElement("div");
  sel.className = "selection";
  sel.dataset.agent = agent;
  sel.innerHTML = '<i></i><i></i><i></i><i></i><span class="dim"></span>';
  Object.assign(sel.style, { left: `${r.x}px`, top: `${r.y}px`, width: "0px", height: "0px" });
  ctx.overlay.appendChild(sel);
  void sel.offsetWidth;
  sel.style.transition = `width ${T.DRAG}ms ${EASE}, height ${T.DRAG}ms ${EASE}`;
  sel.style.width = `${r.w}px`;
  sel.style.height = `${r.h}px`;
  sel.querySelector(".dim")!.textContent = `${Math.round(r.w)} × ${Math.round(r.h)}`;
  await moveCursor(ctx, cursor, r.x + r.w - 4, r.y + r.h - 4, T.DRAG);
  return sel;
}

export function dismiss(el: HTMLElement) {
  el.style.transition = "opacity 350ms ease";
  el.style.opacity = "0";
  window.setTimeout(() => el.remove(), 400);
}

type Segment = { text: string; typo?: { correct: string } };

/** Types `segments` into a Typable part, eating the ghost copy as it goes. */
export async function typePart(ctx: Ctx, part: HTMLElement, segments: Segment[], charMs: number = T.CHAR) {
  const typed = part.querySelector<HTMLElement>("[data-typed]")!;
  const rest = part.querySelector<HTMLElement>("[data-rest]")!;
  const full = part.dataset.full ?? "";
  const total = segments.reduce((n, s) => n + s.text.length, 0);
  const step = Math.max(1, Math.ceil(total / 90)); // long text types in chunks so it never drags on
  typed.replaceChildren();
  part.classList.add("typing");
  let restIdx = 0;
  for (const seg of segments) {
    const host = seg.typo ? document.createElement("span") : typed;
    if (seg.typo) {
      host.dataset.typo = "";
      typed.appendChild(host);
    }
    const node = document.createTextNode("");
    host.appendChild(node);
    const segStart = restIdx;
    const correctLen = seg.typo ? seg.typo.correct.length : seg.text.length;
    for (let i = step; i < seg.text.length + step; i += step) {
      const n = Math.min(i, seg.text.length);
      node.data = seg.text.slice(0, n);
      restIdx = segStart + Math.min(n, correctLen);
      setRest(rest, full.slice(restIdx));
      await ctx.gate.sleep(charMs, ctx.run);
    }
    restIdx = segStart + correctLen;
    setRest(rest, full.slice(restIdx));
  }
  part.classList.remove("typing");
  part.dataset.revealed = "";
}

function setRest(rest: HTMLElement, text: string) {
  const node = rest.firstChild;
  if (node && node.nodeType === Node.TEXT_NODE) (node as Text).data = text;
  else rest.textContent = text;
}

/** Puts a Typable back to its ghost state. */
export function resetTypable(part: HTMLElement) {
  part.querySelector("[data-typed]")?.replaceChildren();
  const rest = part.querySelector<HTMLElement>("[data-rest]");
  if (rest) setRest(rest, part.dataset.full ?? "");
  part.classList.remove("typing");
}

export async function cascadePart(ctx: Ctx, part: HTMLElement) {
  const kids = [...part.children] as HTMLElement[];
  kids.forEach((k, i) => (k.style.transitionDelay = `${i * T.CASCADE_STAGGER}ms`));
  part.dataset.revealed = "";
  await ctx.gate.sleep(kids.length * T.CASCADE_STAGGER + T.FADE, ctx.run);
}

export async function fadePart(ctx: Ctx, part: HTMLElement) {
  part.dataset.revealed = "";
  await ctx.gate.sleep(T.FADE, ctx.run);
}

export function typoSegments(full: string): Segment[] {
  const { before, wrong, after } = misspell(full, TYPO.correct, TYPO.wrong);
  return [{ text: before }, { text: wrong, typo: { correct: TYPO.correct } }, { text: after }];
}

/* ---------------- staged mistakes ---------------- */

const CROOKED = { dx: -22, dy: 14, deg: -2.5 } as const;

export function makeCrooked(block: HTMLElement) {
  block.style.transition = "none";
  block.style.transform = `translate(${CROOKED.dx}px, ${CROOKED.dy}px) rotate(${CROOKED.deg}deg)`;
  block.dataset.mistake = "active";
}

/** Visually moves the misplaced chip to the end of the backend group's chip list. Returns false if it can't. */
export function makeMisplacedChip(block: HTMLElement): boolean {
  const chip = block.querySelector<HTMLElement>(`[data-chip="${MISPLACED_CHIP.chip}"]`);
  const list = document.querySelector<HTMLElement>(`[data-block-id="${MISPLACED_CHIP.into}"] [data-part="cascade"]`);
  const last = list?.lastElementChild as HTMLElement | null;
  if (!chip || !list || !last) return false;
  const c = chip.getBoundingClientRect();
  const l = last.getBoundingClientRect();
  const box = list.getBoundingClientRect();
  let x = l.right + 8;
  let y = l.top;
  if (x + c.width > box.right) {
    x = box.left;
    y = l.bottom + 8;
  }
  chip.style.transition = "none";
  chip.style.transform = `translate(${x - c.left}px, ${y - c.top}px)`;
  chip.dataset.mistake = "active";
  return true;
}

export async function fixCrooked(ctx: Ctx, cursor: HTMLElement, block: HTMLElement) {
  if (block.dataset.mistake !== "active") return;
  const r = pos(ctx, block);
  await moveCursor(ctx, cursor, r.x + r.w / 2, r.y + r.h / 2);
  await ctx.gate.sleep(150, ctx.run);

  const guide = ctx.overlay.querySelector<HTMLElement>(".guide")!;
  // Align against a sibling card sharing the row (horizontal guide) or, failing that, the column (vertical guide).
  const siblings = [...(block.parentElement?.children ?? [])].filter((c) => c !== block) as HTMLElement[];
  const sib =
    siblings.find((c) => c.offsetTop === block.offsetTop) ?? siblings.find((c) => c.offsetLeft === block.offsetLeft);
  if (sib) {
    const s = pos(ctx, sib);
    const sameRow = sib.offsetTop === block.offsetTop;
    guide.dataset.axis = sameRow ? "h" : "v";
    Object.assign(
      guide.style,
      sameRow
        ? { left: `${Math.min(s.x, r.x) - 12}px`, top: `${s.y}px`, width: `${Math.abs(r.x - s.x) + r.w + 24}px`, height: "0px" }
        : { left: `${s.x}px`, top: `${Math.min(s.y, r.y) - 12}px`, height: `${Math.abs(r.y - s.y) + r.h + 24}px`, width: "0px" },
    );
  }
  block.style.transition = `transform ${T.SNAP}ms ${EASE}`;
  block.style.transform = "";
  delete block.dataset.mistake;
  await moveBy(ctx, cursor, -CROOKED.dx, -CROOKED.dy, T.SNAP);
  if (sib) guide.dataset.on = "";
  await ctx.gate.sleep(T.COMMENT_HOLD, ctx.run);
  delete guide.dataset.on;
}

export async function fixMisplacedChip(ctx: Ctx, cursor: HTMLElement) {
  const chip = document.querySelector<HTMLElement>(`[data-chip="${MISPLACED_CHIP.chip}"][data-mistake="active"]`);
  if (!chip) return;
  const r = pos(ctx, chip);
  await moveCursor(ctx, cursor, r.x + r.w / 2, r.y + r.h / 2);
  await ctx.gate.sleep(150, ctx.run);
  // Measure the misplaced spot and the chip's real (untransformed) home, then animate between them.
  const misplaced = chip.getBoundingClientRect();
  const offset = chip.style.transform;
  chip.style.transition = "none";
  chip.style.transform = "";
  const home = chip.getBoundingClientRect();
  chip.style.transform = offset;
  void chip.offsetWidth;
  chip.style.transition = `transform ${T.SNAP}ms ${EASE}`;
  chip.style.transform = "";
  delete chip.dataset.mistake;
  await moveBy(ctx, cursor, home.left - misplaced.left, home.top - misplaced.top, T.SNAP);
}

/** Right of the flagged word if it fits, else left of it; always inside the overlay. Sized for the longer label. */
function placeComment(ctx: Ctx, comment: HTMLElement, r: Rect) {
  const width = comment.offsetWidth; // measured with the longer "typo here? 👀" label
  const limit = ctx.overlay.clientWidth - 8;
  let left = r.x + r.w + 8;
  if (left + width > limit) left = r.x - width - 8;
  left = Math.max(8, Math.min(left, limit - width));
  Object.assign(comment.style, { left: `${left}px`, top: `${r.y - 38}px` });
}

export async function fixTypo(ctx: Ctx, cursor: HTMLElement) {
  const typo = document.querySelector<HTMLElement>('[data-block-id="hero-summary"] [data-typo]');
  if (!typo || typo.dataset.fixed !== undefined) return;
  const r = pos(ctx, typo);
  await moveCursor(ctx, cursor, r.x + r.w / 2, r.y + r.h - 2);
  typo.dataset.flagged = "";

  const comment = ctx.overlay.querySelector<HTMLElement>(".comment")!;
  const text = comment.querySelector("p")!;
  text.textContent = "typo here? 👀";
  placeComment(ctx, comment, r);
  comment.dataset.on = "";
  await ctx.gate.sleep(T.COMMENT_HOLD, ctx.run);

  const node = typo.firstChild as Text;
  const wrong = node.data;
  // backspace to the common prefix, then type the rest of the correct word
  let common = 0;
  while (common < wrong.length && wrong[common] === TYPO.correct[common]) common++;
  for (let n = wrong.length - 1; n >= common; n--) {
    node.data = wrong.slice(0, n);
    await ctx.gate.sleep(T.FIX_TYPE_CHAR, ctx.run);
  }
  for (let n = common + 1; n <= TYPO.correct.length; n++) {
    node.data = TYPO.correct.slice(0, n);
    await ctx.gate.sleep(T.FIX_TYPE_CHAR, ctx.run);
  }
  typo.dataset.fixed = "";
  delete typo.dataset.flagged;
  text.textContent = "fixed ✓";
  await ctx.gate.sleep(T.COMMENT_HOLD, ctx.run);
  delete comment.dataset.on;
}
