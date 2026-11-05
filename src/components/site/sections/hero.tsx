"use client";

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";

import { Block } from "@/build/Block";
import { Typable } from "@/build/Typable";
import { person } from "@/content/resume";

const INSPECTOR = [
  ["Location", person.location],
  ["Experience", "4.5+ years"],
  ["Builds", "Web · Mobile · Backend · AI"],
  ["Stack", "React · Next.js · Node.js · Spring Boot"],
] as const;

export function Hero() {
  return (
    <section id="top" className="pt-[112px] sm:pt-[132px]" aria-label="Introduction">
      <div className="frame-label">Hero</div>
      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:items-end">
        <div>
          <Block id="hero-identity" owner="hero">
            <h1 className="hero-name">
              <Typable text={person.name} />
            </h1>
            <Typable className="hero-role" text={person.role} />
          </Block>

          <Block id="hero-summary" owner="hero" className="mt-7">
            <p className="hero-summary m-0">
              <Typable text={person.summary} mistake="summary-typo" />
            </p>
          </Block>

          <Block id="hero-cta" owner="hero" className="mt-8">
            <div data-part="cascade" className="flex flex-wrap gap-3">
              <a className="btn primary" href={`mailto:${person.links.email}`}>
                Get in touch <FiArrowUpRight aria-hidden="true" />
              </a>
              <a className="btn" href={person.links.resume} download>
                Resume <FiDownload aria-hidden="true" />
              </a>
              <a className="btn" href={person.links.linkedin} target="_blank" rel="noreferrer">
                <FaLinkedinIn aria-hidden="true" /> LinkedIn
              </a>
              <a className="btn" href={person.links.github} target="_blank" rel="noreferrer">
                <FaGithub aria-hidden="true" /> GitHub
              </a>
            </div>
          </Block>
        </div>

        <Block id="hero-inspector" owner="impact" as="aside" className="card mono">
          <div className="faint mb-3 text-[11px] uppercase tracking-[0.14em]">Inspector</div>
          <dl data-part="cascade" className="m-0 grid gap-3 text-[13px]">
            {INSPECTOR.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[92px_1fr] gap-2">
                <dt className="faint">{k}</dt>
                <dd className="m-0">{v}</dd>
              </div>
            ))}
          </dl>
        </Block>
      </div>
    </section>
  );
}
