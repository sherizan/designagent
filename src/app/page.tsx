"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Palette, Layout, Zap, CheckCircle2 } from "lucide-react";

const JSON_LD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "UIStack.dev",
  applicationCategory: "DesignApplication",
  operatingSystem: "Cross-platform",
  description: "On-Demand UI for React Native. Delivered via MCP. Install screens, components, themes with a single prompt.",
  url: "https://uistack.dev",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free beta access for designers and app builders",
  },
};

// Hero Component
function Hero() {
  return (
    <section className="px-4 pt-32 pb-20 max-w-7xl mx-auto">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
          <span className="bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-300 bg-clip-text text-transparent">
            On-Demand UI
          </span>
          <br />
          <span className="text-zinc-50">for your app</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Delivered via MCP. Works with React Native, Expo, and Cursor. Install screens, components, themes with a single prompt.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            asChild
            size="lg"
            className="bg-zinc-50 text-zinc-950 hover:bg-zinc-100 font-semibold shadow-lg shadow-zinc-900/50"
          >
            <Link href="/theme">Start Designing</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-zinc-700 hover:bg-zinc-900/50"
          >
            <Link href="/screens">Browse App Pages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Benefits Component
function Benefits() {
  const benefits = [
    {
      icon: Sparkles,
      title: "No Code Required",
      description: "Design beautiful app pages without writing a single line. Everything is visual and intuitive.",
    },
    {
      icon: Palette,
      title: "Customize Everything",
      description: "Adjust colors, spacing, typography, and more. Your design settings, your way.",
    },
    {
      icon: Zap,
      title: "One-Click Install",
      description: "Preview your design, then install it into your project instantly. No downloads, no setup.",
    },
    {
      icon: Layout,
      title: "Ready-to-Use Pages",
      description: "Choose from professionally designed app pages. Login, profile, settings, and more.",
    },
  ];

  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-4 hover:border-zinc-700 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center">
                <Icon className="w-6 h-6 text-zinc-300" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">{benefit.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{benefit.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Flow Component
function Flow() {
  const steps = [
    {
      number: "1",
      title: "Pick a style",
      description: "Choose from beautiful preset styles or create your own. Adjust colors, fonts, and spacing to match your brand.",
    },
    {
      number: "2",
      title: "Choose a page",
      description: "Browse our collection of app pages. Login screens, profiles, settings, and more—all professionally designed.",
    },
    {
      number: "3",
      title: "Preview",
      description: "See exactly how your page looks with your chosen style. Make adjustments until it's perfect.",
    },
    {
      number: "4",
      title: "Install",
      description: "One-click install gets your design into your project. No manual copying, no configuration.",
    },
    {
      number: "5",
      title: "Build",
      description: "Your app code is ready. Connect it to your backend, add your logic, and ship.",
    },
  ];

  return (
    <section className="px-4 py-20 max-w-7xl mx-auto bg-zinc-900/30 rounded-3xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          How it works
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          From design to app code in five simple steps. No technical knowledge required.
        </p>
      </div>
      <div className="space-y-8 max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex gap-6 items-start p-6 rounded-2xl border border-zinc-800 bg-zinc-950/50 hover:border-zinc-700 transition-colors"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-xl font-bold text-zinc-300">
              {step.number}
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-xl font-semibold text-zinc-100">{step.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ThemeStudio Component
function ThemeStudio() {
  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-100">
            Design Settings, Made Simple
          </h2>
          <p className="text-lg text-zinc-300 leading-relaxed">
            Our Theme Studio lets you customize every aspect of your app's visual style. Change colors, adjust spacing, tweak typography—all in one place. Your design settings are saved and applied consistently across all your app pages.
          </p>
          <ul className="space-y-3">
            {[
              "Three beautiful preset styles to start with",
              "Full control over colors, spacing, and typography",
              "Light and dark mode support",
              "Real-time preview of your changes",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-zinc-400 mt-0.5 flex-shrink-0" />
                <span className="text-zinc-300">{item}</span>
              </li>
            ))}
          </ul>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-900/50"
          >
            <Link href="/theme">
              Open Theme Studio
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 shadow-xl shadow-zinc-900/50">
          <div className="space-y-4">
            <div className="h-64 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600">
              Theme Studio Preview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ScreensPreview Component
function ScreensPreview() {
  return (
    <section className="px-4 py-20 max-w-7xl mx-auto bg-zinc-900/30 rounded-3xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          App Pages, Ready to Use
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Browse our collection of professionally designed app pages. Each one is fully customizable and ready to install.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { name: "Login", description: "Beautiful login screens with multiple layouts" },
          { name: "Profile", description: "User profile pages with customizable sections" },
          { name: "Settings", description: "Clean settings pages with organized options" },
        ].map((page, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 space-y-4 hover:border-zinc-700 transition-colors"
          >
            <div className="h-48 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600 text-sm">
              {page.name} Preview
            </div>
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-2">{page.name}</h3>
              <p className="text-sm text-zinc-400">{page.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-zinc-700 hover:bg-zinc-900/50"
        >
          <Link href="/screens">
            Browse All App Pages
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

// ComponentsPreview Component
function ComponentsPreview() {
  return (
    <section className="px-4 py-20 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100 mb-4">
          Building Blocks for Your App
        </h2>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Mix and match our building blocks to create custom app pages. Buttons, inputs, cards, and more—all styled to match your design settings.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {["Buttons", "Inputs", "Cards", "Navigation"].map((component, index) => (
          <div
            key={index}
            className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6 text-center hover:border-zinc-700 transition-colors"
          >
            <div className="h-32 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 text-sm mb-4">
              {component}
            </div>
            <h3 className="text-sm font-semibold text-zinc-100">{component}</h3>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-zinc-700 hover:bg-zinc-900/50"
        >
          <Link href="/components">
            Explore Building Blocks
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </div>
    </section>
  );
}

// ForDesigners Component
function ForDesigners() {
  return (
    <section className="px-4 py-20 max-w-7xl mx-auto bg-zinc-900/30 rounded-3xl">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100">
          Made by Designers. Built for Everyone.
        </h2>
        <p className="text-xl text-zinc-300 leading-relaxed">
          Our screens are crafted with care by top product designers in the industry, ensuring every detail looks beautiful and works seamlessly for your app.
        </p>
        <div className="grid md:grid-cols-3 gap-6 pt-8">
          {[
            {
              title: "Visual Design",
              description: "Everything is visual. No code knowledge required to create beautiful app pages.",
            },
            {
              title: "Familiar Workflow",
              description: "Works like your favorite design tools. Pick, customize, preview, and install.",
            },
            {
              title: "Instant Results",
              description: "See your designs come to life immediately. No waiting, no complexity.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-6 space-y-3"
            >
              <h3 className="text-lg font-semibold text-zinc-100">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Component
function CTA() {
  return (
    <section className="px-4 py-20 max-w-4xl mx-auto">
      <div className="text-center space-y-8 rounded-3xl border border-zinc-800 bg-zinc-900/30 p-12">
        <h2 className="text-4xl md:text-5xl font-bold text-zinc-100">
          Ready to design your app?
        </h2>
        <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
          Start with a style, choose your pages, and install them with one click. No code, no complexity—just beautiful app designs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            asChild
            size="lg"
            className="bg-zinc-50 text-zinc-950 hover:bg-zinc-100 font-semibold shadow-lg shadow-zinc-900/50"
          >
            <Link href="/theme">Get Started Free</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-zinc-700 hover:bg-zinc-900/50"
          >
            <Link href="/screens">Browse App Pages</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="px-4 py-12 max-w-7xl mx-auto border-t border-zinc-800">
      <div className="grid md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/theme" className="hover:text-zinc-300 transition-colors">
                Theme Studio
              </Link>
            </li>
            <li>
              <Link href="/screens" className="hover:text-zinc-300 transition-colors">
                App Pages
              </Link>
            </li>
            <li>
              <Link href="/components" className="hover:text-zinc-300 transition-colors">
                Building Blocks
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 mb-4">Resources</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/docs" className="hover:text-zinc-300 transition-colors">
                Documentation
              </Link>
            </li>
            <li>
              <Link href="/docs/golden-path" className="hover:text-zinc-300 transition-colors">
                Getting Started
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>
              <Link href="/early-access" className="hover:text-zinc-300 transition-colors">
                Early Access
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-100 mb-4">UIStack.dev</h3>
          <p className="text-sm text-zinc-400">
            On-Demand UI for React Native
          </p>
        </div>
      </div>
      <div className="pt-8 border-t border-zinc-800 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} UIStack.dev. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_SCHEMA) }}
      />
      
      <main className="min-h-screen bg-zinc-950 text-zinc-50">
        <Hero />
        <Benefits />
        <Flow />
        <ThemeStudio />
        <ScreensPreview />
        <ComponentsPreview />
        <ForDesigners />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
