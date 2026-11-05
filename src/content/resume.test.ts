import { describe, expect, it } from "vitest";

import { experience, person, projects, skillGroups, stats } from "@/content/resume";

describe("resume content matches the 4.5-year resume", () => {
  it("person details are current", () => {
    expect(person.location).toBe("Bangalore, India");
    expect(person.summary).toContain("4.5+ years");
    // mistake #1 (summary typo) depends on this phrase being present
    expect(person.summary).toContain("Spring Boot");
    expect(person.links.resume).toBe("/Saksham_Agarwal_FullStack_4.5Yrs.pdf");
  });

  it("headline numbers", () => {
    expect(stats.map((s) => s.value)).toEqual(["4.5+", "100K+", "~30%", "~40%", "5"]);
  });

  it("five roles, newest first, with current Codilar bullets", () => {
    expect(experience.map((e) => e.company)).toEqual([
      "Codilar Technologies",
      "Ultimez Technology",
      "Appringer LLP",
      "Mag Cloud Solutions",
      "Madrid Software",
    ]);
    expect(experience[0].highlights).toHaveLength(8);
    expect(experience[0].highlights.join(" ")).toMatch(/100K\+ daily active users/);
    expect(experience[0].highlights.join(" ")).toMatch(/AI-powered conversational commerce chatbot/);
  });

  it("projects follow the resume", () => {
    expect(projects.map((p) => p.name)).toEqual([
      "EMR / HMS",
      "Coinpedia",
      "TrueTalent",
      "Propagator",
      "Core Product Dashboard",
    ]);
    expect(projects.find((p) => p.name === "Propagator")!.bullets.join(" ")).toMatch(/RabbitMQ/);
    expect(projects.find((p) => p.name === "Core Product Dashboard")!.link).toBeUndefined();
  });

  it("skill groups follow the resume, including AI", () => {
    expect(skillGroups.map((g) => g.key)).toEqual([
      "languages",
      "frontend",
      "backend",
      "mobile",
      "databases",
      "cloud",
      "ai",
    ]);
    expect(skillGroups.find((g) => g.key === "frontend")!.items.map((i) => i.name)).toContain("Angular");
    expect(skillGroups.find((g) => g.key === "ai")!.items.map((i) => i.name)).toEqual([
      "AI Agents",
      "LangChain",
      "LangGraph",
      "RAG",
    ]);
  });
});
