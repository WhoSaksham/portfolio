import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "@/app/globals.css";
import { BuildProvider } from "@/build/BuildProvider";
import { FlavourProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Saksham Agarwal — Full Stack Engineer",
  description:
    "Full Stack Engineer with 4.5+ years building scalable web and mobile apps with React, Next.js, Node.js, Java & Spring Boot, plus AI agents, LangChain and RAG.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        {/* Marks JS as available before first paint, so "unbuilt" ghost styling never applies without JS.
            Failsafe: if the app bundle never boots, drop the class so content isn't stuck ghosted. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__agentsReady)document.documentElement.classList.remove('js')},4000)",
          }}
        />
      </head>
      <body>
        <FlavourProvider>
          <BuildProvider>{children}</BuildProvider>
        </FlavourProvider>
      </body>
    </html>
  );
}
