import * as React from "react";

/** A canvas "frame": Figma-style label + section title above the section's blocks. */
export function Frame({
  id,
  label,
  title,
  children,
}: Readonly<{ id: string; label: string; title: string; children: React.ReactNode }>) {
  return (
    <section id={id} className="frame" aria-labelledby={`${id}-title`}>
      <div className="frame-label">{label}</div>
      <h2 id={`${id}-title`} className="frame-title">
        {title}
      </h2>
      {children}
    </section>
  );
}
