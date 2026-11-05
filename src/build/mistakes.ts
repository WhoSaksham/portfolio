import type { AgentId } from "@/build/agents";

export type MistakeId = "summary-typo" | "crooked-card" | "misplaced-chip";

export const MISTAKES: Record<MistakeId, { maker: AgentId; fixer: AgentId; blockId: string }> = {
  "summary-typo": { maker: "hero", fixer: "skills", blockId: "hero-summary" },
  "crooked-card": { maker: "impact", fixer: "hero", blockId: "impact-2" },
  "misplaced-chip": { maker: "skills", fixer: "history", blockId: "skills-frontend" },
};

export const TYPO = { correct: "Spring Boot", wrong: "Spring Bot" } as const;
export const MISPLACED_CHIP = { chip: "Angular", into: "skills-backend" } as const;

export function misspell(text: string, correct: string, wrong: string) {
  const i = text.indexOf(correct);
  if (i < 0) throw new Error(`"${correct}" not found in text`);
  return { before: text.slice(0, i), wrong, after: text.slice(i + correct.length) };
}

export function mistakeForBlock(blockId: string): MistakeId | null {
  for (const [id, m] of Object.entries(MISTAKES) as [MistakeId, (typeof MISTAKES)[MistakeId]][]) {
    if (m.blockId === blockId) return id;
  }
  return null;
}
