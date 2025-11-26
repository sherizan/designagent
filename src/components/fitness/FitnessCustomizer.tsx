"use client";

import React, { useState } from "react";
import type { FitnessTheme, FitnessThemeId } from "@/data/ui-kits";
import { FitnessPreviewFrame } from "./FitnessPreviewFrame";
import { cn } from "@/lib/utils";

type FitnessCustomizerProps = {
  themes: FitnessTheme[];
  defaultThemeId: FitnessThemeId;
  children?: React.ReactNode;
};

function getThemeSummary(theme: FitnessTheme) {
  const { radius, spacing, typography } = theme.tokens;
  
  let radiusLabel = "Medium radius";
  if (radius.medium <= 10) radiusLabel = "Sharp radius";
  if (radius.medium >= 16) radiusLabel = "Round radius";

  let spacingLabel = "Balanced spacing";
  if (spacing.md < 10) spacingLabel = "Tight spacing";
  if (spacing.md > 14) spacingLabel = "Loose spacing";

  const fontLabel = typography.fontFamily || "Inter";

  return `${fontLabel} · ${radiusLabel} · ${spacingLabel}`;
}

export function FitnessCustomizer({ themes, defaultThemeId, children }: FitnessCustomizerProps) {
  const [selectedThemeId, setSelectedThemeId] = useState<FitnessThemeId>(defaultThemeId);

  const activeTheme = themes.find(t => t.id === selectedThemeId) || themes[0];
  const summary = getThemeSummary(activeTheme);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 items-start">
      <div className="space-y-12">
        {/* Header Content passed from parent */}
        {children}

        {/* Customizer Controls */}
        <div className="space-y-8 pt-8 border-t border-zinc-800">
          <div>
             <h2 className="text-2xl font-bold text-white mb-2">Customize your Kit</h2>
             <p className="text-zinc-400">Pick a visual theme to see how components adapt. The React Native code updates automatically.</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Theme</h3>
            <div className="flex flex-wrap gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedThemeId(theme.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedThemeId === theme.id
                      ? "bg-white text-black shadow-lg scale-105"
                      : "bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                  )}
                >
                  {theme.label}
                </button>
              ))}
            </div>
            
            {/* Theme Summary Line */}
            <div className="flex items-center gap-2 mt-3 text-sm">
               <span className="font-semibold text-white">{activeTheme.label}</span>
               <span className="text-zinc-600">–</span>
               <span className="text-zinc-400">{summary}</span>
            </div>

            <p className="text-sm text-zinc-500 mt-1">
              {activeTheme.description}
            </p>
          </div>

          {/* Technical Details */}
          <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-4">
             <h3 className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Active Tokens</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: activeTheme.tokens.primary }} />
                   <span>primary: {activeTheme.tokens.primary}</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: activeTheme.tokens.background }} />
                   <span>background: {activeTheme.tokens.background}</span>
                </div>
                <div className="col-span-1 sm:col-span-2">
                   <div className="mb-1 text-zinc-500 text-xs uppercase">Radius</div>
                   <div className="bg-zinc-950 p-2 rounded border border-zinc-800 text-xs overflow-x-auto">
                     {JSON.stringify(activeTheme.tokens.radius).replace(/"/g, '')}
                   </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                   <div className="mb-1 text-zinc-500 text-xs uppercase">Spacing</div>
                   <div className="bg-zinc-950 p-2 rounded border border-zinc-800 text-xs overflow-x-auto">
                     {JSON.stringify(activeTheme.tokens.spacing).replace(/"/g, '')}
                   </div>
                </div>
                <div className="col-span-1 sm:col-span-2">
                   <div className="mb-1 text-zinc-500 text-xs uppercase">Typography</div>
                   <div className="bg-zinc-950 p-2 rounded border border-zinc-800 text-xs overflow-x-auto">
                     {JSON.stringify(activeTheme.tokens.typography).replace(/"/g, '')}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center lg:sticky lg:top-8 order-first lg:order-last mb-12 lg:mb-0">
        <FitnessPreviewFrame theme={activeTheme} />
      </div>
    </div>
  );
}
