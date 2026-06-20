import type { Metadata } from "next";
import { Inter, DM_Mono } from "next/font/google";
import Link from "next/link";
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

const NAV = [
  { href: "/", label: "Home" },
  { href: "/plugins", label: "Plugins" },
  { href: "/build", label: "Build" },
  { href: "/submit", label: "Submit" },
];

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
      <body className="min-h-dvh flex flex-col antialiased">
        <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur-md">
          <nav className="relative mx-auto flex h-[60px] max-w-[1200px] items-center justify-between px-6 sm:px-10">
            <Link href="/" className="flex items-center gap-2.5">
              <LogoMark />
              <span className="text-[15px] font-semibold tracking-tight text-on-surface">
                designagent
              </span>
            </Link>

            <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 sm:flex">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-label-md text-on-surface-subtle transition-colors hover:text-on-surface"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="/submit"
              className="text-label-lg rounded-full bg-primary px-[18px] py-2.5 text-on-primary transition-colors hover:bg-primary-hover"
            >
              Submit a plugin
            </Link>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-3 px-6 py-8 text-body-sm text-on-surface-subtle sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p className="flex items-center gap-2">
              <LogoMark />
              <span>Claude Code plugins for designers.</span>
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/sherizan/designagent"
                className="transition-colors hover:text-on-surface"
              >
                GitHub
              </a>
              <Link
                href="/submit"
                className="transition-colors hover:text-on-surface"
              >
                Submit a plugin
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
