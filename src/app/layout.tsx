import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Outfit, DM_Sans, Urbanist } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";

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
  title: "DesignAgent - AI-Native Product Design",
  description: "Your very own AI-native product design superpower",
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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
