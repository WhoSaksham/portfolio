"use client";

import * as React from "react";

import type { AgentId } from "@/build/agents";
import { useBuildEngine } from "@/build/BuildProvider";

/**
 * Declares a build block. Spread the result on the block's root element.
 * `data-build` is rendered once as "unbuilt"; after that the engine owns the attribute.
 */
export function useBuildBlock<T extends HTMLElement>(id: string, owner: AgentId) {
  const engine = useBuildEngine();
  const ref = React.useCallback(
    (el: T | null) => {
      if (!el || !engine) return;
      engine.register(id, owner, el);
      return () => engine.unregister(id, el);
    },
    [engine, id, owner],
  );
  return { ref, "data-block-id": id, "data-owner": owner, "data-build": "unbuilt" } as const;
}
