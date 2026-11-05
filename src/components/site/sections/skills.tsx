"use client";

import { Block } from "@/build/Block";
import { Typable } from "@/build/Typable";
import { Frame } from "@/components/site/frame";
import { skillGroups } from "@/content/resume";

export function Skills() {
  return (
    <Frame id="skills" label="Skills" title="The toolkit.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g) => (
          <Block
            key={g.key}
            id={`skills-${g.key}`}
            owner="skills"
            className={
              g.key === "ai"
                ? "card sm:col-span-2 lg:col-span-2 !border-[color-mix(in_srgb,var(--accent)_60%,var(--line))] !bg-[color-mix(in_srgb,var(--accent)_7%,var(--surface))]"
                : "card"
            }
          >
            <Typable as="h3" className="mono faint m-0 text-[11px] font-semibold uppercase tracking-[0.14em]" text={g.label} />
            <div data-part="cascade" className="mt-4 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span key={s.name} className={s.strong ? "chip strong" : "chip"} data-chip={s.name}>
                  {s.name}
                </span>
              ))}
            </div>
          </Block>
        ))}
      </div>
    </Frame>
  );
}
