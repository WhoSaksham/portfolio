import * as React from "react";

import type { MistakeId } from "@/build/mistakes";

/**
 * Text the agents "type". Screen readers and crawlers get the real text once (sr-only);
 * the aria-hidden copy is what the engine animates (ghost → typed).
 */
export function Typable({
  text,
  as: Tag = "span",
  className,
  mistake,
}: Readonly<{ text: string; as?: React.ElementType; className?: string; mistake?: MistakeId }>) {
  return (
    <Tag className={className}>
      {/* select-none: copy/paste takes the visible copy only. data-nosnippet: search snippets use the sr-only copy. */}
      <span className="sr-only select-none">{text}</span>
      <span aria-hidden="true" data-nosnippet="" data-part="type" data-full={text} data-mistake={mistake}>
        <span data-typed="" />
        <span data-rest="">{text}</span>
      </span>
    </Tag>
  );
}
