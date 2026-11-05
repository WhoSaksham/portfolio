export type AgentId = "hero" | "impact" | "history" | "skills";

export type Agent = {
  id: AgentId;
  label: string;
  /** Two-letter avatar initials for the toolbar presence row. */
  initials: string;
  /** Resting/start position as fractions of the viewport. */
  start: { x: number; y: number };
};

export const AGENTS: readonly Agent[] = [
  { id: "hero", label: "agent · hero", initials: "SE", start: { x: 0.04, y: 0.55 } },
  { id: "impact", label: "agent · impact", initials: "AI", start: { x: 0.9, y: 0.18 } },
  { id: "history", label: "agent · history", initials: "MS", start: { x: 0.85, y: 0.9 } },
  { id: "skills", label: "agent · skills", initials: "SA", start: { x: 0.45, y: 0.96 } },
];
