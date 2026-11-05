import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { Aborted, RunGate } from "@/build/gate";

describe("RunGate", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("check resolves immediately when running", async () => {
    const g = new RunGate();
    await expect(g.check(g.run)).resolves.toBeUndefined();
  });

  it("check waits while paused and resolves on resume", async () => {
    const g = new RunGate();
    g.pause();
    let done = false;
    const p = g.check(g.run).then(() => (done = true));
    await vi.advanceTimersByTimeAsync(1000);
    expect(done).toBe(false);
    g.resume();
    await p;
    expect(done).toBe(true);
  });

  it("check throws Aborted after bump", async () => {
    const g = new RunGate();
    const old = g.run;
    g.bump();
    await expect(g.check(old)).rejects.toBeInstanceOf(Aborted);
  });

  it("a paused check rejects when the run is bumped", async () => {
    const g = new RunGate();
    const old = g.run;
    g.pause();
    const p = g.check(old);
    g.bump();
    await expect(p).rejects.toBeInstanceOf(Aborted);
  });

  it("sleep does not elapse while paused", async () => {
    const g = new RunGate();
    let done = false;
    const p = g.sleep(500, g.run).then(() => (done = true));
    await vi.advanceTimersByTimeAsync(200);
    g.pause();
    await vi.advanceTimersByTimeAsync(2000);
    expect(done).toBe(false);
    g.resume();
    await vi.advanceTimersByTimeAsync(299);
    expect(done).toBe(false);
    await vi.advanceTimersByTimeAsync(2);
    await p;
    expect(done).toBe(true);
  });
});
