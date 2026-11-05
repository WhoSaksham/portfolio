"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { FLAVOURS } from "@/components/theme-provider";

export function FlavourSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <div className="seg" role="group" aria-label="Site flavour">
      {FLAVOURS.map((f) => (
        <button
          key={f.id}
          type="button"
          title={`${f.label} flavour`}
          aria-pressed={mounted ? theme === f.id : undefined}
          onClick={() => setTheme(f.id)}
        >
          <span aria-hidden="true">{f.icon}</span>
          <span className="seg-label">{f.label}</span>
          <span className="sr-only">{f.label} flavour</span>
        </button>
      ))}
    </div>
  );
}
