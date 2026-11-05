"use client";

import * as React from "react";

import { AGENTS } from "@/build/agents";
import type { BuildEngine } from "@/build/engine";

/** Overlay hosting the agent cursors, selection boxes, the comment bubble and the snap guide. */
export function CursorLayer({ engine }: Readonly<{ engine: BuildEngine }>) {
  const ref = React.useCallback(
    (el: HTMLDivElement | null) => {
      engine.setOverlay(el);
      return () => engine.setOverlay(null);
    },
    [engine],
  );

  return (
    <div ref={ref} className="build-overlay" aria-hidden="true">
      {AGENTS.map((a) => (
        <div key={a.id} className="cursor" data-agent={a.id}>
          <svg width="18" height="22" viewBox="0 0 16 20">
            <path d="M1 1 L1 16 L5 12 L8 19 L11 17.6 L8 11 L14 11 Z" />
          </svg>
          <span className="cursor-tag">{a.label}</span>
        </div>
      ))}
      <div className="comment">
        <b>S</b>
        <p>typo here? 👀</p>
      </div>
      <div className="guide">
        <em>snap ✓</em>
      </div>
    </div>
  );
}
