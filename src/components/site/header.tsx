"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

import { person } from "@/content/resume";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

const navItems = [
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;

type NavId = (typeof navItems)[number]["id"];

export function Header() {
  const [active, setActive] = React.useState<NavId>("work");

  React.useEffect(() => {
    const handler = () => {
      const offsets = navItems
        .map((n) => {
          const el = document.getElementById(n.id);
          if (!el) return null;
          const rect = el.getBoundingClientRect();
          return { id: n.id, top: rect.top, height: rect.height };
        })
        .filter(Boolean) as Array<{ id: NavId; top: number; height: number }>;

      const current = offsets.find((o) => o.top <= 120 && o.top + o.height > 120);
      if (current) setActive(current.id);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-4 rounded-2xl border border-border/60 bg-background/35 backdrop-blur">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <Link href="#top" className="group flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight">
                {person.name}
              </span>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {person.role}
              </span>
              <span className="ml-1 hidden text-xs text-muted-foreground sm:inline">
                •
              </span>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {person.tagline}
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
                    active === item.id && "text-foreground"
                  )}
                >
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-md bg-accent/55"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" asChild>
                <a href={person.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={person.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={`mailto:${person.links.email}`} aria-label="Email">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

