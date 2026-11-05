import type { AgentId } from "@/build/agents";
import { MISTAKES, type MistakeId } from "@/build/mistakes";

export type BlockState = "unbuilt" | "building" | "built";
export type Task = { kind: "build"; blockId: string } | { kind: "fix"; mistakeId: MistakeId };

type Block = { id: string; owner: AgentId; order: number; state: BlockState; visible: boolean };

/**
 * Decides which agent builds which block. Pure (no DOM), so it can be unit tested.
 * Priority for an agent: its own queued fix > its own visible unbuilt block > any visible unbuilt block.
 */
export class BuildScheduler {
  private blocks = new Map<string, Block>();
  private fixes: MistakeId[] = [];
  private listeners = new Set<() => void>();
  /** Bumped on every notification; lets a caller tell whether anything changed across an await. */
  version = 0;

  register(b: { id: string; owner: AgentId; order: number }) {
    const existing = this.blocks.get(b.id);
    if (existing) {
      existing.owner = b.owner;
      existing.order = b.order;
      return;
    }
    this.blocks.set(b.id, { ...b, state: "unbuilt", visible: false });
  }

  unregister(id: string) {
    this.blocks.delete(id);
  }

  setVisible(id: string, visible: boolean) {
    const b = this.blocks.get(id);
    if (!b || b.visible === visible) return;
    b.visible = visible;
    this.emit();
  }

  isVisible(id: string) {
    return this.blocks.get(id)?.visible ?? false;
  }

  next(agent: AgentId): Task | null {
    const fixIdx = this.fixes.findIndex((m) => MISTAKES[m].fixer === agent);
    if (fixIdx >= 0) {
      const [mistakeId] = this.fixes.splice(fixIdx, 1);
      return { kind: "fix", mistakeId };
    }
    const candidates = [...this.blocks.values()]
      .filter((b) => b.visible && b.state === "unbuilt")
      .sort((a, b) => a.order - b.order);
    const pick = candidates.find((b) => b.owner === agent) ?? candidates[0];
    if (!pick) return null;
    pick.state = "building";
    return { kind: "build", blockId: pick.id };
  }

  complete(blockId: string) {
    const b = this.blocks.get(blockId);
    if (b) b.state = "built";
  }

  release(blockId: string) {
    const b = this.blocks.get(blockId);
    if (b && b.state === "building") {
      b.state = "unbuilt";
      this.emit();
    }
  }

  enqueueFix(mistakeId: MistakeId) {
    this.fixes.push(mistakeId);
    this.emit();
  }

  /** Fix tasks are dequeued by `next`; this exists so callers can mark intent explicitly. */
  completeFix(mistakeId: MistakeId) {
    this.fixes = this.fixes.filter((m) => m !== mistakeId);
  }

  state(id: string): BlockState {
    return this.blocks.get(id)?.state ?? "unbuilt";
  }

  reset() {
    for (const b of this.blocks.values()) b.state = "unbuilt";
    this.fixes = [];
    this.emit();
  }

  markAllBuilt() {
    for (const b of this.blocks.values()) b.state = "built";
    this.fixes = [];
    this.emit();
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private emit() {
    this.version += 1;
    for (const fn of [...this.listeners]) fn();
  }
}
