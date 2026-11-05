"use client";

import { Block } from "@/build/Block";
import { Typable } from "@/build/Typable";
import { Frame } from "@/components/site/frame";
import { education } from "@/content/resume";

export function Education() {
  return (
    <Frame id="education" label="Education" title="Foundation.">
      <Block id="education" owner="impact" className="card flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <Typable as="h3" className="m-0 text-lg font-semibold tracking-tight" text={education.degree} />
          <Typable as="div" className="muted mt-1 text-sm" text={`${education.institute} · ${education.location}`} />
        </div>
        <div data-part="fade" className="mono flex items-center gap-3 text-xs">
          <span className="faint">
            {education.start} — {education.end}
          </span>
          <span className="chip strong">{education.score}</span>
        </div>
      </Block>
    </Frame>
  );
}
