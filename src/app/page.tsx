import { Contact } from "@/components/site/sections/contact";
import { Education } from "@/components/site/sections/education";
import { Experience } from "@/components/site/sections/experience";
import { Hero } from "@/components/site/sections/hero";
import { Impact } from "@/components/site/sections/impact";
import { Projects } from "@/components/site/sections/projects";
import { Skills } from "@/components/site/sections/skills";
import { Toolbar } from "@/components/site/toolbar";

export default function HomePage() {
  return (
    <>
      <Toolbar />
      <main className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <Hero />
        <Impact />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
        <footer className="mono faint mt-24 flex flex-wrap justify-between gap-2 border-t border-[var(--line)] pt-6 text-xs">
          <span>© {new Date().getFullYear()} Saksham Agarwal</span>
          <span>built live by 4 agents · 3 slips · 3 fixes</span>
        </footer>
      </main>
    </>
  );
}
