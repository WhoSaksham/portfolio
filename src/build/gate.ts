export class Aborted extends Error {
  constructor() {
    super("build run aborted");
    this.name = "Aborted";
  }
}

/**
 * Pause + abort control shared by every animation primitive.
 * `run` identifies the current build run; `bump()` starts a new one and aborts every waiter of the old one.
 */
export class RunGate {
  run = 0;
  paused = false;
  private waiters: Array<() => void> = [];
  private interrupts = new Set<() => void>();

  pause() {
    if (this.paused) return;
    this.paused = true;
    this.interrupt();
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    this.flush();
  }

  bump() {
    this.run += 1;
    this.flush();
    this.interrupt();
    return this.run;
  }

  /** Resolves when not paused; rejects with Aborted when `run` is stale. */
  check(run: number): Promise<void> {
    if (run !== this.run) return Promise.reject(new Aborted());
    if (!this.paused) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const waiter = () => {
        if (run !== this.run) reject(new Aborted());
        else if (this.paused) this.waiters.push(waiter);
        else resolve();
      };
      this.waiters.push(waiter);
    });
  }

  /** Waits `ms` of un-paused time. */
  async sleep(ms: number, run: number): Promise<void> {
    let remaining = ms;
    while (remaining > 0) {
      await this.check(run);
      const t0 = Date.now();
      const interrupted = await new Promise<boolean>((resolve) => {
        const done = (v: boolean) => {
          clearTimeout(id);
          this.interrupts.delete(onInterrupt);
          resolve(v);
        };
        const onInterrupt = () => done(true);
        const id = setTimeout(() => done(false), remaining);
        this.interrupts.add(onInterrupt);
      });
      remaining = interrupted ? remaining - (Date.now() - t0) : 0;
    }
    await this.check(run);
  }

  /** Resolves on the next interrupt (pause/bump) or when `signal` fires; used by idle agents. */
  wake(subscribe: (fn: () => void) => () => void, run: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const finish = () => {
        off();
        this.interrupts.delete(onInterrupt);
        if (run === this.run) resolve();
        else reject(new Aborted());
      };
      const onInterrupt = () => finish();
      const off = subscribe(finish);
      this.interrupts.add(onInterrupt);
    });
  }

  private flush() {
    const w = this.waiters;
    this.waiters = [];
    w.forEach((fn) => fn());
  }

  private interrupt() {
    for (const fn of [...this.interrupts]) fn();
  }
}
