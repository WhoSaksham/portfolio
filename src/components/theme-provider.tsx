"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const FLAVOURS = [
  { id: "dark", label: "Dark", icon: "◐" },
  { id: "blueprint", label: "Blueprint", icon: "⌗" },
  { id: "light", label: "Light", icon: "○" },
] as const;

export function FlavourProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextThemesProvider
      attribute="data-flavour"
      themes={FLAVOURS.map((f) => f.id)}
      defaultTheme="dark"
      storageKey="flavour"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
