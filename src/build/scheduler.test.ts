import { describe, expect, it, vi } from "vitest";

import { BuildScheduler } from "@/build/scheduler";

function setup() {
  const s = new BuildScheduler();
  s.register({ id: "hero-identity", owner: "hero", order: 0 });
  s.register({ id: "hero-summary", owner: "hero", order: 1 });
  s.register({ id: "impact-2", owner: "impact", order: 2 });
  s.register({ id: "skills-ai", owner: "skills", order: 3 });
  return s;
}

describe("BuildScheduler", () => {
  it("agent takes its own visible unbuilt block in order", () => {
    const s = setup();
    s.setVisible("hero-summary", true);
    s.setVisible("hero-identity", true);
    expect(s.next("hero")).toEqual({ kind: "build", blockId: "hero-identity" });
    expect(s.state("hero-identity")).toBe("building");
  });

  it("returns null when nothing visible is unbuilt and no fixes are queued", () => {
    const s = setup();
    expect(s.next("hero")).toBeNull();
    s.setVisible("hero-identity", true);
    s.next("hero");
    s.complete("hero-identity");
    expect(s.next("hero")).toBeNull();
  });

  it("a claimed block is never handed to a second agent", () => {
    const s = setup();
    s.setVisible("skills-ai", true);
    expect(s.next("hero")).toEqual({ kind: "build", blockId: "skills-ai" });
    expect(s.next("skills")).toBeNull();
  });

  it("agent helps with any visible unclaimed block when none of its own are visible", () => {
    const s = setup();
    s.setVisible("skills-ai", true);
    expect(s.next("hero")).toEqual({ kind: "build", blockId: "skills-ai" });
  });

  it("own blocks are preferred over helping", () => {
    const s = setup();
    s.setVisible("hero-identity", true);
    s.setVisible("impact-2", true);
    expect(s.next("impact")).toEqual({ kind: "build", blockId: "impact-2" });
  });

  it("fix tasks are returned even when their block is not visible", () => {
    const s = setup();
    s.setVisible("hero-identity", true);
    s.enqueueFix("summary-typo"); // fixer: skills
    expect(s.next("hero")).toEqual({ kind: "build", blockId: "hero-identity" });
    s.setVisible("skills-ai", true);
    expect(s.next("skills")).toEqual({ kind: "fix", mistakeId: "summary-typo" });
    s.completeFix("summary-typo");
    expect(s.next("skills")).toEqual({ kind: "build", blockId: "skills-ai" });
  });

  it("release puts a block back to unbuilt and claimable", () => {
    const s = setup();
    s.setVisible("impact-2", true);
    s.next("impact");
    s.release("impact-2");
    expect(s.state("impact-2")).toBe("unbuilt");
    expect(s.next("hero")).toEqual({ kind: "build", blockId: "impact-2" });
  });

  it("scheduler reset clears claims and fixes", () => {
    const s = setup();
    s.setVisible("hero-identity", true);
    s.next("hero");
    s.complete("hero-identity");
    s.setVisible("impact-2", true);
    s.next("impact");
    s.enqueueFix("crooked-card");
    s.reset();
    for (const id of ["hero-identity", "hero-summary", "impact-2", "skills-ai"]) {
      expect(s.state(id)).toBe("unbuilt");
    }
    // visibility is kept, fix queue is gone
    expect(s.next("hero")).toEqual({ kind: "build", blockId: "hero-identity" });
    expect(s.next("hero")).toEqual({ kind: "build", blockId: "impact-2" });
  });

  it("markAllBuilt makes next return null", () => {
    const s = setup();
    s.setVisible("hero-identity", true);
    s.markAllBuilt();
    expect(s.state("hero-identity")).toBe("built");
    expect(s.next("hero")).toBeNull();
  });

  it("subscribe is notified on setVisible and enqueueFix", () => {
    const s = setup();
    const fn = vi.fn();
    const off = s.subscribe(fn);
    s.setVisible("hero-identity", true);
    s.enqueueFix("misplaced-chip");
    expect(fn).toHaveBeenCalledTimes(2);
    off();
    s.setVisible("hero-summary", true);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("version changes on every notification so idle agents can detect work queued while they were busy", () => {
    const s = setup();
    const v0 = s.version;
    s.setVisible("hero-identity", true);
    const v1 = s.version;
    expect(v1).not.toBe(v0);
    s.enqueueFix("crooked-card");
    expect(s.version).not.toBe(v1);
  });

  it("blocks registered later in the document keep document order", () => {
    const s = new BuildScheduler();
    s.register({ id: "b", owner: "hero", order: 5 });
    s.register({ id: "a", owner: "hero", order: 1 });
    s.setVisible("a", true);
    s.setVisible("b", true);
    expect(s.next("hero")).toEqual({ kind: "build", blockId: "a" });
  });
});
