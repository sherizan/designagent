"use client";

import React, { useState } from "react";
import type { FitnessTheme, FitnessThemeId } from "@/data/ui-kits";
import { FitnessPreviewFrame } from "./FitnessPreviewFrame";
import { CopyButton } from "@/components/kit-copy-button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type FitnessCustomizerProps = {
  themes: FitnessTheme[];
  defaultThemeId: FitnessThemeId;
  fullAppPrompt?: string;
  showLoading?: boolean;
  onToggleLoading?: () => void;
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

// Shared type for screen navigation
export type FitnessScreenId = "login" | "dashboard" | "onboarding" | "workoutDetail" | "profile" | "settings";

type PreviewMode = "app" | "components";

export function FitnessCustomizer({ themes, defaultThemeId, fullAppPrompt, showLoading = false, onToggleLoading, children }: FitnessCustomizerProps) {
  const [selectedThemeId, setSelectedThemeId] = useState<FitnessThemeId>(defaultThemeId);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("app");
  const [currentScreen, setCurrentScreen] = useState<FitnessScreenId>("login");

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
            <h3 className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Step 1 · Pick Theme</h3>
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

          {/* Download & Copy Actions */}
          <div className="space-y-6 pt-4 max-w-[360px] sm:max-w-none">
            
            {/* Step 2: Download UI Kit */}
            {activeTheme.downloadPath && (
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                  Step 2 · Download UI Kit
                </p>
                <a
                  href={`/api/download/kit?kit=fitness&theme=${activeTheme.id}`}
                  download={`fitness-${activeTheme.id}.zip`}
                  className="flex items-center justify-center w-full rounded-md border border-zinc-700 bg-zinc-50 px-4 py-3 text-sm font-semibold text-zinc-900 shadow-sm hover:bg-zinc-200 transition-colors"
                >
                  Download Fitness UI Kit
                </a>
                <p className="text-[11px] text-zinc-400">
                  Includes <code>design-system/</code> and <code>cursor-rules/</code> for the "{activeTheme.label}" theme. Drag these into your Cursor project before using the prompts.
                </p>
              </div>
            )}

            {/* Step 3: Copy Prompt */}
            {fullAppPrompt && (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-semibold">
                  Step 3 · Copy Prompts
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <CopyButton 
                    textToCopy={fullAppPrompt} 
                    label="Copy Full-App Prompt" 
                    className="flex-1 bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700 hover:text-white"
                  />
                  <Link 
                    href="#screens" 
                    className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-transparent border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white sm:w-auto w-full"
                  >
                    View Screens
                  </Link>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="flex flex-col items-center lg:sticky lg:top-8 order-first lg:order-last mb-12 lg:mb-0 gap-6">
        {/* View Toggle */}
        <div className="flex flex-col items-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1 text-xs">
            <button
              type="button"
              onClick={() => setPreviewMode("app")}
              className={previewMode === "app"
                ? "rounded-full bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-900"
                : "rounded-full px-3 py-1 text-[11px] text-zinc-300 hover:text-zinc-50"
              }
            >
              App Preview
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("components")}
              className={previewMode === "components"
                ? "rounded-full bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-900"
                : "rounded-full px-3 py-1 text-[11px] text-zinc-300 hover:text-zinc-50"
              }
            >
              Components
            </button>
          </div>

          {onToggleLoading && (
            <button
              type="button"
              onClick={onToggleLoading}
              className={`inline-flex items-center gap-2 rounded-full border border-zinc-800 px-3 py-1 text-[11px] transition-colors ${
                showLoading ? "bg-zinc-50 text-zinc-900" : "bg-zinc-950 text-zinc-400 hover:text-zinc-300"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  showLoading ? "bg-emerald-500" : "bg-zinc-600"
                }`}
              />
              Loading state
            </button>
          )}
        </div>

        <FitnessPreviewFrame 
          theme={activeTheme} 
          mode={previewMode}
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
          showLoading={showLoading}
        />
      </div>
    </div>
  );
}
