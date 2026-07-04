import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import Link from "next/link";
import { Coco } from "@/components/Coco";
import { Crosshair } from "@/components/Crosshair";
import { NavLinks } from "@/components/NavLinks";
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
    default: "designagent — Claude Code plugins for designers",
    template: "%s — designagent",
  },
  description:
    "A curated marketplace of Claude Code plugins built for designers. Figma, design review, and more — install in one command.",
  openGraph: {
    title: "designagent — Claude Code plugins for designers",
    description:
      "A curated marketplace of Claude Code plugins built for designers.",
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
        {/* One framed column — vertical rules run the full height, header + footer
            rules close the corners against them. */}
        <div className="mx-auto flex min-h-dvh max-w-[760px] flex-col border-x border-border">
          <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur-md">
            <nav className="relative flex h-[60px] items-center justify-between px-6 sm:px-10">
              <Link href="/" className="flex items-center gap-2.5">
                <LogoMark />
                <span className="text-[15px] font-semibold tracking-tight text-on-surface">
                  designagent
                </span>
              </Link>

              <NavLinks />

              <Link
                href="/submit"
                className="text-label-lg rounded-full bg-primary px-[18px] py-2.5 text-on-primary transition-colors hover:bg-primary-hover"
              >
                Submit a plugin
              </Link>
            </nav>
            {/* corners where the nav rule meets the vertical rules */}
            <Crosshair className="absolute bottom-0 left-[-0.5px] -translate-x-1/2 translate-y-1/2" />
            <Crosshair className="absolute bottom-0 right-[-0.5px] translate-x-1/2 translate-y-1/2" />
          </header>

          <main className="flex-1">{children}</main>

          <footer className="relative border-t border-border">
            {/* corners where the footer rule meets the vertical rules */}
            <Crosshair className="absolute left-[-0.5px] top-0 -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="absolute right-[-0.5px] top-0 -translate-y-1/2 translate-x-1/2" />
            <div className="px-6 pt-10 pb-8 sm:px-10">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                  <Coco size={30} className="text-on-surface" />
                  <div>
                    <p className="text-label-md text-on-surface">designagent</p>
                    <p className="text-body-sm mt-1 max-w-[260px] text-on-surface-subtle">
                      Curated Claude Code plugins for designers — Figma, design
                      review, and more.
                    </p>
                  </div>
                </div>
                <div className="flex gap-14 text-body-sm text-on-surface-subtle">
                  <div className="flex flex-col gap-2.5">
                    <p className="text-eyebrow text-on-surface-faint">Explore</p>
                    <Link
                      href="/plugins"
                      className="transition-colors hover:text-on-surface"
                    >
                      Plugins
                    </Link>
                    <Link
                      href="/build"
                      className="transition-colors hover:text-on-surface"
                    >
                      Build
                    </Link>
                    <Link
                      href="/submit"
                      className="transition-colors hover:text-on-surface"
                    >
                      Submit a plugin
                    </Link>
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
            <div className="relative border-t border-border px-6 py-5 sm:px-10">
              <Crosshair className="absolute left-[-0.5px] top-0 -translate-x-1/2 -translate-y-1/2" />
              <Crosshair className="absolute right-[-0.5px] top-0 -translate-y-1/2 translate-x-1/2" />
              <div className="flex flex-col gap-1 text-body-sm text-on-surface-subtle sm:flex-row sm:items-center sm:justify-between">
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
