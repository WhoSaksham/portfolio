"use client";

import * as React from "react";

import { CursorLayer } from "@/build/CursorLayer";
import { BuildEngine } from "@/build/engine";

type BuildContextValue = { engine: BuildEngine; replay: () => void; reducedMotion: boolean };

const BuildContext = React.createContext<BuildContextValue | null>(null);

export function BuildProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [engine] = React.useState(() => new BuildEngine());
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    // Tells the inline failsafe in layout.tsx that the engine booted.
    (window as Window & { __agentsReady?: boolean }).__agentsReady = true;
    document.documentElement.classList.add("js"); // in case a very slow boot tripped the failsafe
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReducedMotion(mq.matches);
      engine.setInstant(mq.matches);
    };
    const onVisibility = () => engine.setHidden(document.hidden);
    apply();
    mq.addEventListener("change", apply);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      mq.removeEventListener("change", apply);
      document.removeEventListener("visibilitychange", onVisibility);
      engine.stop();
    };
  }, [engine]);

  const value = React.useMemo(
    () => ({ engine, replay: () => engine.replay(), reducedMotion }),
    [engine, reducedMotion],
  );

  return (
    <BuildContext.Provider value={value}>
      {children}
      {!reducedMotion && <CursorLayer engine={engine} />}
    </BuildContext.Provider>
  );
}

export function useBuild() {
  const ctx = React.useContext(BuildContext);
  if (!ctx) throw new Error("useBuild must be used inside <BuildProvider>");
  return { replay: ctx.replay, reducedMotion: ctx.reducedMotion };
}

export function useBuildEngine() {
  return React.useContext(BuildContext)?.engine ?? null;
}
