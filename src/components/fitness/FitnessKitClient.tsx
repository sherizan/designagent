"use client";

import React, { useState } from "react";
import Link from "next/link";
import { UIkit } from "@/data/ui-kits";
import { CopyButton, PromptBlock, ScreenPromptCard } from "@/components/kit-copy-button";
import { ArrowLeft } from "lucide-react";
import { FitnessCustomizer } from "./FitnessCustomizer";
import { getScreenBySlug } from "@/data/screens";
import { ScreenCard } from "@/components/screen/ScreenCard";

interface FitnessKitClientProps {
  kit: UIkit;
}

export function FitnessKitClient({ kit }: FitnessKitClientProps) {
  const [showLoading, setShowLoading] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </Link>
        
        {/* Customizer Section wrapping Header Content */}
        <div className="mb-24">
          <FitnessCustomizer 
            themes={kit.themes ?? []} 
            defaultThemeId={kit.defaultThemeId ?? "activeGreen"} 
            fullAppPrompt={kit.fullAppPrompt}
            showLoading={showLoading}
            onToggleLoading={() => setShowLoading(v => !v)}
          >
            {/* Header Content injected as children */}
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                UI Kit · {kit.category}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                {kit.name}
              </h1>
              
              <p className="text-xl text-zinc-400 leading-relaxed">
                {kit.description}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {kit.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 text-sm border border-zinc-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </FitnessCustomizer>
        </div>

        {/* What's Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm">📱</span>
              Screens Included
            </h3>
            <ul className="space-y-3">
              {kit.includedScreens.map((screen, i) => (
                <li key={i} className="flex items-start text-zinc-400">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  {screen}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm">🧩</span>
              Components
            </h3>
            <div className="flex flex-wrap gap-2">
              {kit.includedComponents.map((component, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-mono"
                >
                  {component}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Popular Screen Patterns */}
        <div className="mb-20 space-y-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-zinc-100">Popular Screen Patterns</h3>
            <p className="text-zinc-400">
              These screens pair perfectly with the Fitness Kit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              getScreenBySlug("login"),
              getScreenBySlug("profile"),
              getScreenBySlug("home-list"),
              getScreenBySlug("paywall"),
            ]
              .filter((screen): screen is NonNullable<typeof screen> => screen !== undefined)
              .map((variant) => (
                <ScreenCard key={variant.slug} variant={variant} />
              ))}
          </div>
        </div>

        {/* Prompts Section */}
        <div id="screens" className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-zinc-100">How to Use This Kit in Cursor</h3>
            <div className="text-zinc-400 max-w-2xl space-y-4">
              <p>Follow these steps to generate your app with the chosen theme:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Pick your theme using the customizer above.</li>
                <li>Download the <strong>Fitness UI Kit</strong> using the button in the sidebar.</li>
                <li>Unzip and drag the <code className="text-zinc-300">design-system/</code> and <code className="text-zinc-300">cursor-rules/</code> folders into your Cursor project root.</li>
                <li>Copy the content from <code className="text-zinc-300">cursor-rules/rules.md</code> and paste it into your Project Instructions (Settings &gt; General &gt; Rules for AI).</li>
                <li>Copy the <strong>Full App Foundation</strong> prompt below and paste it into Cursor Chat to build the core screens.</li>
                <li>Use individual screen prompts for any additional pages you need.</li>
              </ol>
            </div>
          </div>

          {/* Full App Prompt */}
          {kit.fullAppPrompt && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-zinc-200">Full App Foundation</h4>
              <PromptBlock prompt={kit.fullAppPrompt} />
            </div>
          )}

          {/* Screen Prompts Grid */}
          {kit.screenPrompts && kit.screenPrompts.length > 0 && (
            <div className="space-y-4 pt-8">
              <h4 className="text-lg font-medium text-zinc-200">Screen-Specific Prompts</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kit.screenPrompts.map((prompt) => (
                  <ScreenPromptCard 
                    key={prompt.id}
                    label={prompt.label}
                    description={prompt.description}
                    prompt={prompt.prompt}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
