"use client";

import { FiArrowUpRight } from "react-icons/fi";

import { Block } from "@/build/Block";
import { Typable } from "@/build/Typable";
import { Frame } from "@/components/site/frame";
import { projects } from "@/content/resume";

export function Projects() {
  return (
    <Frame id="projects" label="Projects" title="Things I've shipped.">
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Block key={p.name} id={`proj-${i}`} owner="history" as="article" className="card flex flex-col">
            <header data-select="" className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Typable as="h3" className="m-0 text-lg font-semibold tracking-tight" text={p.name} />
                <Typable as="div" className="muted mt-1 text-sm" text={p.kind} />
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="tool-btn !h-8 !px-2"
                  aria-label={`Open ${p.name} (opens in a new tab)`}
                >
                  <FiArrowUpRight aria-hidden="true" />
                </a>
              )}
            </header>
            <ul data-part="cascade" className="bullets">
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <div data-part="cascade" className="mt-auto flex flex-wrap gap-2 pt-5">
              {p.tags.map((t) => (
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
