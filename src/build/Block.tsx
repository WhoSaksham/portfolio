"use client";

import * as React from "react";

import type { AgentId } from "@/build/agents";
import { useBuildBlock } from "@/build/useBuildBlock";

/** Convenience wrapper: an element registered as a build block. */
export function Block({
  id,
  owner,
  as: Tag = "div",
  className,
  children,
}: Readonly<{ id: string; owner: AgentId; as?: React.ElementType; className?: string; children: React.ReactNode }>) {
  const block = useBuildBlock<HTMLElement>(id, owner);
  return (
    <Tag {...block} className={className}>
      {children}
    </Tag>
  );
}
