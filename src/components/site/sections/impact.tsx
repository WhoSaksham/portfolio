"use client";

import { Block } from "@/build/Block";
import { Frame } from "@/components/site/frame";
import { stats } from "@/content/resume";

export function Impact() {
  return (
    <Frame id="impact" label="Impact" title="Numbers that shipped.">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s, i) => (
          <Block key={s.label} id={`impact-${i}`} owner="impact" className="card">
            <span data-part="fade" className="stat-value">
              {s.value}
            </span>
            <span data-part="fade" className="stat-label">
              {s.label}
            </span>
          </Block>
        ))}
      </div>
    </Frame>
  );
}
