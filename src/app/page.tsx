"use client";

import { ArrowUpRight, Briefcase, Code2, GraduationCap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { Header } from "@/components/site/header";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { education, experience, person, projects, skills } from "@/content/resume";
import Link from "next/link";

function SectionTitle({
  icon,
  kicker,
  title,
  description,
}: Readonly<{
  icon: React.ReactNode;
  kicker: string;
  title: string;
  description: string;
}>) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 rounded-xl border border-border/70 bg-card/55 p-2 backdrop-blur">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold tracking-wider text-muted-foreground">
          {kicker}
        </div>
        <h2 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main id="top" className="min-h-screen">
      <Header />

      <div className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:pt-32">
        {/* HERO */}
        <section className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.21, 1, 0.32, 1] }}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/35 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Shipping high-performance web & mobile experiences
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.21, 1, 0.32, 1] }}
                className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl"
              >
                {person.name}
                <span className="block text-muted-foreground">
                  {person.role}
                </span>
                <span className="block text-muted-foreground">
                  {person.tagline}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.16, ease: [0.21, 1, 0.32, 1] }}
                className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                {person.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.22, ease: [0.21, 1, 0.32, 1] }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                <Button asChild className="rounded-xl">
                  <a href={`mailto:${person.links.email}`}>
                    Contact me <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-xl">
                  <a
                    href={person.links.resume}
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    Resume <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="ghost" className="rounded-xl">
                  <a href={person.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
                
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.12, ease: [0.21, 1, 0.32, 1] }}
              className="rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur"
            >
              <div className="text-xs font-semibold tracking-wider text-muted-foreground">
                HIGHLIGHTS
              </div>
              <div className="mt-3 grid gap-3">
                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <div className="text-sm font-semibold">Scale</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    eCommerce experience for <span className="text-foreground">50K+ daily active users</span>.
                  </div>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <div className="text-sm font-semibold">Performance</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Delivered measurable wins (e.g., <span className="text-foreground">~30% faster loads</span>, reduced UI lag).
                  </div>
                </div>
                <div className="rounded-xl border border-border/60 bg-background/40 p-4">
                  <div className="text-sm font-semibold">Ownership</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    End-to-end delivery across web & mobile, mentoring, reviews, and cross-team collaboration.
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="mt-14">
          <Separator className="opacity-60" />
        </div>

        {/* WORK */}
        <section id="work" className="mt-14 scroll-mt-28">
          <Reveal>
            <SectionTitle
              icon={<Briefcase className="h-5 w-5" />}
              kicker="WORK EXPERIENCE"
              title="Impact, ownership, and shipping velocity"
              description="Selected roles and the outcomes I delivered—focused on performance, UX, and end-to-end feature ownership."
            />
          </Reveal>

          <div className="mt-8 grid gap-4">
            {experience.map((job, idx) => (
              <Reveal key={`${job.company}-${job.start}`} delay={idx * 0.04}>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {job.company} • {job.location}
                        </CardDescription>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {job.start} — {job.end}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                      {job.highlights.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {job.tech.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="mt-16 scroll-mt-28">
          <Reveal>
            <SectionTitle
              icon={<Code2 className="h-5 w-5" />}
              kicker="PROJECTS"
              title="Systems I’ve built (and improved)"
              description="A curated set of platforms and products I’ve worked on—mapped to real responsibilities and outcomes from my experience."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {projects.map((p, idx) => (
              <Reveal key={p.name} delay={idx * 0.03}>
                <Card className="group h-full transition-colors hover:border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between gap-3">
                      <span className="truncate">{p.name}</span>
                      <Link href={p.link} target="_blank" rel="noreferrer" className="text-muted-foreground transition-transform group-hover:translate-x-0.5">
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">
                      {p.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="mt-16 scroll-mt-28">
          <Reveal>
            <SectionTitle
              icon={<Sparkles className="h-5 w-5" />}
              kicker="SKILLS"
              title="A modern full-stack toolkit"
              description="Technologies I use to ship production-grade experiences with reliable performance, testing, and cloud readiness."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Reveal>
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>Frontend</CardTitle>
                  <CardDescription>UI systems, responsive design, performance.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-wrap content-start gap-2">
                  {skills.frontend.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.05}>
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>Backend</CardTitle>
                  <CardDescription>APIs, services, and integrations.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-wrap content-start gap-2">
                  {skills.backend.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.08}>
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>Cloud</CardTitle>
                  <CardDescription>Deployments and scalable delivery patterns.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-wrap content-start gap-2">
                  {skills.cloud.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </CardContent>
              </Card>
            </Reveal>

            <Reveal delay={0.11}>
              <Card className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>Testing</CardTitle>
                  <CardDescription>Confidence through unit & integration tests.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-wrap content-start gap-2">
                  {skills.testing.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Reveal>
              <Card>
                <CardHeader>
                  <CardTitle>Databases</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {skills.databases.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.06}>
              <Card>
                <CardHeader>
                  <CardTitle>Tooling</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {skills.tooling.map((s) => (
                    <Badge key={s}>{s}</Badge>
                  ))}
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* EDUCATION */}
        <section id="education" className="mt-16 scroll-mt-28">
          <Reveal>
            <SectionTitle
              icon={<GraduationCap className="h-5 w-5" />}
              kicker="EDUCATION"
              title="Foundation"
              description="My academic background."
            />
          </Reveal>

          <div className="mt-8">
            <Reveal>
              <Card>
                <CardHeader>
                  <CardTitle>{education.degree}</CardTitle>
                  <CardDescription>
                    {education.institute} • {education.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
                  <div>
                    {education.start} — {education.end}
                  </div>
                  <div className="rounded-full border border-border/70 bg-background/40 px-3 py-1 text-xs">
                    {education.score}
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-16 scroll-mt-28">
          <Reveal>
            <SectionTitle
              icon={<Sparkles className="h-5 w-5" />}
              kicker="CONTACT"
              title="Let’s build something great"
              description="If you’re hiring or want to collaborate, I’d love to chat."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Reveal>
              <Card>
                <CardHeader>
                  <CardTitle>Email</CardTitle>
                  <CardDescription>Fastest way to reach me.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full rounded-xl">
                    <a href={`mailto:${person.links.email}`}>{person.links.email}
                    <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.05}>
              <Card>
                <CardHeader>
                  <CardTitle>LinkedIn</CardTitle>
                  <CardDescription>Professional updates & messaging.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full rounded-xl">
                    <a href={person.links.linkedin} target="_blank" rel="noreferrer">
                      View profile <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle>GitHub</CardTitle>
                  <CardDescription>Projects and code samples.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full rounded-xl">
                    <a href={person.links.github} target="_blank" rel="noreferrer">
                      Browse repos <ArrowUpRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </section>

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          <p className="opacity-80">
             Built with ❤️ by Saksham Agarwal
          </p>
        </footer>
      </div>
    </main>
  );
}

