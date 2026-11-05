import { describe, expect, it } from "vitest";

import { MISTAKES, mistakeForBlock, misspell, TYPO } from "@/build/mistakes";
import { person } from "@/content/resume";

describe("mistakes", () => {
  it("misspell splits around the word", () => {
    expect(misspell("using Java, Spring Boot and", "Spring Boot", "Spring Bot")).toEqual({
      before: "using Java, ",
      wrong: "Spring Bot",
      after: " and",
    });
  });

  it("misspell throws when word missing", () => {
    expect(() => misspell("no such phrase", "Spring Boot", "Spring Bot")).toThrow();
  });

  it("the summary typo applies to the real summary", () => {
    const parts = misspell(person.summary, TYPO.correct, TYPO.wrong);
    expect(parts.before + TYPO.correct + parts.after).toBe(person.summary);
  });

  it("every mistake is fixed by a different agent", () => {
    for (const m of Object.values(MISTAKES)) expect(m.fixer).not.toBe(m.maker);
    expect(Object.keys(MISTAKES)).toHaveLength(3);
  });

  it("mistakeForBlock maps block ids", () => {
    expect(mistakeForBlock("hero-summary")).toBe("summary-typo");
    expect(mistakeForBlock("impact-2")).toBe("crooked-card");
    expect(mistakeForBlock("skills-frontend")).toBe("misplaced-chip");
    expect(mistakeForBlock("exp-0")).toBeNull();
  });
});
