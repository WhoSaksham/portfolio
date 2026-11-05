"use client";

import { Block } from "@/build/Block";
import { Typable } from "@/build/Typable";
import { Frame } from "@/components/site/frame";
import { experience } from "@/content/resume";

export function Experience() {
  return (
    <Frame id="experience" label="Experience" title="Where I've built.">
      <div className="grid gap-5">
        {experience.map((job, i) => (
          <Block key={`${job.company}-${job.start}`} id={`exp-${i}`} owner="history" as="article" className="card">
            <header data-select="" className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <div className="min-w-0">
                <Typable as="h3" className="m-0 text-lg font-semibold tracking-tight sm:text-xl" text={job.title} />
                <Typable as="div" className="muted mt-1 text-sm" text={`${job.company} · ${job.location}`} />
              </div>
              <Typable as="div" className="mono faint text-xs" text={`${job.start} — ${job.end}`} />
            </header>
            <ul data-part="cascade" className="bullets lg:grid-cols-2 lg:gap-x-8">
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div data-part="cascade" className="mt-5 flex flex-wrap gap-2">
              {job.tech.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </Block>
        ))}
      </div>
    </Frame>
  );
}
