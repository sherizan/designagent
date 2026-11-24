import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import Link from "next/link";
import { Coco } from "@/components/Coco";
import { Crosshair } from "@/components/Crosshair";
import { NavLinks } from "@/components/NavLinks";
import { ScrollMotion } from "@/components/ScrollMotion";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://designagent.dev"),
  title: {
    default: "designagent: Claude Code's bridge to Figma",
    template: "%s | designagent",
  },
  description:
    "A live two-way bridge between Claude Code and Figma: read, build and edit the canvas in real time, then build production UI from a DESIGN.md.",
  openGraph: {
    title: "designagent: Claude Code's bridge to Figma",
    description:
      "A live two-way bridge between Claude Code and Figma.",
    url: "https://designagent.dev",
    siteName: "designagent",
    type: "website",
  },
};

function LogoMark() {
  return (
    <span aria-hidden className="grid grid-cols-2 gap-[2px]">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className="size-[7px] rounded-[2px] bg-primary"
        />
      ))}
    </span>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Pixel&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ScrollMotion />
        {/* One giant card: it fills the viewport inside a white margin, and every
            section rule runs edge to edge across it. Everything inside (nav,
            sections, docs, footer) shares one gutter and one centered 1120px
            column, so left and right edges line up down the page. */}
        <div className="m-3 flex min-h-[calc(100dvh-1.5rem)] flex-col rounded-2xl border border-border sm:m-8 sm:min-h-[calc(100dvh-4rem)]">
          <header className="site-header sticky top-0 z-40" data-header>
            <nav className="px-6 sm:px-16">
              <div className="relative mx-auto flex h-[76px] max-w-[1120px] items-center justify-between">
              <Link href="/" className="flex items-center gap-2.5">
                <LogoMark />
                <span className="text-[15px] font-semibold tracking-tight text-on-surface">
                  designagent
                </span>
              </Link>

              <NavLinks />

              <a
                href="https://www.figma.com/community/plugin/1604428052675393154/designagent-claude-bridge"
                target="_blank"
                rel="noreferrer"
                data-magnetic
                className="text-label-lg rounded-full bg-primary px-[18px] py-2.5 text-on-primary transition-colors hover:bg-primary-hover"
              >
                Get the Figma plugin
              </a>
            </div>
            </nav>
            {/* corners where the nav rule meets the vertical rules */}
            <Crosshair className="header-crosshair absolute bottom-0 left-[-0.5px] -translate-x-1/2 translate-y-1/2" />
            <Crosshair className="header-crosshair absolute bottom-0 right-[-0.5px] translate-x-1/2 translate-y-1/2" />
          </header>

          <main className="flex-1">{children}</main>

          <footer className="relative border-t border-border">
            {/* corners where the footer rule meets the vertical rules */}
            <Crosshair className="absolute left-[-0.5px] top-0 -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="absolute right-[-0.5px] top-0 -translate-y-1/2 translate-x-1/2" />
            <div className="px-6 pt-16 pb-14 sm:px-16">
              <div className="mx-auto flex max-w-[1120px] flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <Coco size={30} className="text-on-surface" />
                  <div>
                    <p className="text-label-md text-on-surface">designagent</p>
                    <p className="text-body-sm mt-1 max-w-[260px] text-on-surface-subtle">
                      Claude Code&apos;s live two-way bridge to Figma.
                    </p>
                  </div>
                </div>
                <div className="flex gap-14 text-body-sm text-on-surface-subtle">
                  <div className="flex flex-col gap-2.5">
                    <p className="text-eyebrow text-on-surface-faint">Explore</p>
                    <Link
                      href="/plugins/designagent-figma"
                      className="transition-colors hover:text-on-surface"
                    >
                      Docs
                    </Link>
                    <a
                      href="https://www.figma.com/community/plugin/1604428052675393154/designagent-claude-bridge"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-on-surface"
                    >
                      Figma plugin
                    </a>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <p className="text-eyebrow text-on-surface-faint">Connect</p>
                    <a
                      href="https://github.com/sherizan/designagent"
                      className="transition-colors hover:text-on-surface"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://x.com/sherizan"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-on-surface"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative border-t border-border px-6 py-6 sm:px-16">
              <Crosshair className="absolute left-[-0.5px] top-0 -translate-x-1/2 -translate-y-1/2" />
              <Crosshair className="absolute right-[-0.5px] top-0 -translate-y-1/2 translate-x-1/2" />
              <div className="mx-auto flex max-w-[1120px] flex-col gap-1 text-body-sm text-on-surface-subtle sm:flex-row sm:items-center sm:justify-between">
                <p>© {new Date().getFullYear()} designagent</p>
                <p>
                  Built by{" "}
                  <a
                    href="https://x.com/sherizan"
                    target="_blank"
                    rel="noreferrer"
                    className="text-on-surface transition-colors hover:text-on-surface-muted"
                  >
                    @sherizan
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
