import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ScrollMotion } from "@/components/ScrollMotion";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const FIGMA_PLUGIN_URL =
  "https://www.figma.com/community/plugin/1604428052675393154/designagent-claude-bridge";

export const metadata: Metadata = {
  metadataBase: new URL("https://designagent.dev"),
  title: {
    default: "DesignAgent: ask Claude, watch it happen in Figma",
    template: "%s | DesignAgent",
  },
  description:
    "DesignAgent connects Claude Code to your open Figma file. Say what you want in plain words and Claude reads, builds and tidies your design right on the canvas.",
  openGraph: {
    title: "DesignAgent: ask Claude, watch it happen in Figma",
    description:
      "Connect Claude Code to your open Figma file. Say what you want, and it happens on your canvas.",
    url: "https://designagent.dev",
    siteName: "DesignAgent",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        <ScrollMotion />
        <header className="flex items-center justify-between border-b border-border py-5">
          <Link href="/" className="text-[19px] font-semibold tracking-[-0.01em] text-on-surface">
            DesignAgent
          </Link>
          <a
            href={FIGMA_PLUGIN_URL}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="text-label-md rounded-full bg-primary px-[18px] py-2.5 text-on-primary transition-colors hover:bg-primary-hover"
          >
            Get the Figma plugin
          </a>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="text-body-sm flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-border py-7 text-on-surface-subtle">
          <p>
            © {new Date().getFullYear()} DesignAgent.{" "}
            <a
              href="https://x.com/sherizan"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-[3px] transition-colors hover:text-on-surface"
            >
              Made by Sherizan
            </a>
            . Part of{" "}
            <a
              href="https://superdesigner.ai"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-[3px] transition-colors hover:text-on-surface"
            >
              Superdesigner
            </a>
            .
          </p>
          <p className="flex gap-6">
            <a href={FIGMA_PLUGIN_URL} target="_blank" rel="noreferrer" className="transition-colors hover:text-on-surface">
              Figma plugin
            </a>
            <a href="https://github.com/sherizan/designagent-figma" className="transition-colors hover:text-on-surface">
              GitHub
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
