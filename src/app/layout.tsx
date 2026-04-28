import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Saksham Agarwal — Full Stack Engineer",
  description:
    "Full Stack Engineer portfolio — React, Next.js, Node.js, performance and UX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <div className="noise" />
          <div className="vignette" />
          <div className="pointer-events-none fixed inset-0 z-0">
            <div className="absolute left-1/2 top-[-10%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.10),transparent_60%)] blur-2xl" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.22),transparent_60%)] blur-2xl" />
            <div className="absolute bottom-[-20%] left-[-10%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_60%)] blur-2xl" />
          </div>
          <div className="relative z-10">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

