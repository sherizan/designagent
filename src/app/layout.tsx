import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Outfit, DM_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { ThemePreviewProvider } from "@/context/ThemePreviewContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeStyles } from "@/components/ThemeStyles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Font definitions are internal to this file to avoid export type errors in Next.js App Router layouts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist" });

export const metadata: Metadata = {
  title: "DesignAgent.dev – Design your app. Ship it instantly.",
  description: "Design your app. Ship it instantly. Pick a style, choose app pages, preview them, and install with one click. No code required.",
  openGraph: {
    title: "DesignAgent.dev – Design your app. Ship it instantly.",
    description: "Design your app. Ship it instantly. Pick a style, choose app pages, preview them, and install with one click. No code required.",
    url: "https://designagent.dev",
    type: "website",
    // TODO: Add social image when available
    // images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "DesignAgent.dev – Design your app. Ship it instantly.",
    description: "Design your app. Ship it instantly. Pick a style, choose app pages, preview them, and install with one click. No code required.",
    // TODO: Add Twitter image when available
    // images: ["/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${outfit.variable} ${dmSans.variable} ${urbanist.variable} antialiased bg-zinc-950 text-zinc-50`}
      >
        <AuthProvider>
          <ThemePreviewProvider>
            <ThemeStyles />
            <Navigation />
            {children}
          </ThemePreviewProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
