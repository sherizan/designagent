import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
  { href: "/submit", label: "Submit" },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-dvh flex flex-col antialiased">
        <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="font-mono text-sm font-semibold tracking-tight"
            >
              <span className="text-accent">design</span>agent
            </Link>
            <div className="flex items-center gap-6 text-sm">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              <span className="text-accent">design</span>agent — Claude Code
              plugins for designers.
            </p>
            <div className="flex gap-5">
              <a
                href="https://github.com/sherizan/designagent"
                className="transition-colors hover:text-foreground"
              >
                GitHub
              </a>
              <Link
                href="/submit"
                className="transition-colors hover:text-foreground"
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
