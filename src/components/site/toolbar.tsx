"use client";

import * as React from "react";
import { FiDownload, FiMenu, FiRotateCcw, FiX } from "react-icons/fi";

import { AGENTS } from "@/build/agents";
import { useBuild } from "@/build/BuildProvider";
import { FlavourSwitcher } from "@/components/site/flavour-switcher";
import { person } from "@/content/resume";

const NAV = [
  { id: "impact", label: "Impact" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

export function Toolbar() {
  const { replay, reducedMotion } = useBuild();
  const [active, setActive] = React.useState<string | null>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  // Close the mobile menu on Escape or a tap anywhere outside it.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !toggleRef.current?.contains(t)) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  React.useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 120) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = NAV.map((n) => (
    <a key={n.id} href={`#${n.id}`} aria-current={active === n.id} onClick={() => setMenuOpen(false)}>
      {n.label}
    </a>
  ));

  return (
    <header className="toolbar">
      <a href="#top" className="toolbar-file" aria-label={`${person.name}, back to top`}>
        <span className="toolbar-logo" aria-hidden="true">
          SA
        </span>
      </a>

      <nav className="toolbar-nav" aria-label="Sections">
        {links}
      </nav>

      <div className="toolbar-right">
        {!reducedMotion && (
          <div className="avatars" aria-hidden="true" title="Agents on this canvas">
            {AGENTS.map((a) => (
              <span key={a.id} style={{ background: `var(--agent-${a.id})` }}>
                {a.initials}
              </span>
            ))}
          </div>
        )}
        <FlavourSwitcher />
        {!reducedMotion && (
          <button type="button" className="tool-btn" onClick={replay} title="Rebuild the page from scratch">
            <FiRotateCcw aria-hidden="true" />
            <span className="label">Replay</span>
            <span className="sr-only sm:hidden">Replay build</span>
          </button>
        )}
        <a className="tool-btn primary" href={person.links.resume} download title="Download resume (PDF)">
          <FiDownload aria-hidden="true" />
          <span className="label">Resume</span>
          <span className="sr-only sm:hidden">Download resume</span>
        </a>
        <button
          ref={toggleRef}
          type="button"
          className="tool-btn menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
          <span className="sr-only">{menuOpen ? "Close sections" : "Sections"}</span>
        </button>
      </div>

      {menuOpen && (
        <nav ref={menuRef} id="mobile-nav" aria-label="Sections" className="mobile-menu">
          {links}
        </nav>
      )}
    </header>
  );
}
