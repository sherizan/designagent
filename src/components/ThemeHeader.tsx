"use client";

import Link from "next/link";
import { useThemePreview } from "@/context/ThemePreviewContext";
import { isCustomTheme } from "@/lib/themeUtils";
import { cn } from "@/lib/utils";

// Theme name mapping
const themeLabels: Record<string, string> = {
  midnight: "Midnight",
  activeGreen: "Active Green",
  wellnessPeach: "Wellness Peach",
};

interface ThemeHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function ThemeHeader({ title, subtitle, className }: ThemeHeaderProps) {
  const { theme, themeId, mode } = useThemePreview();

  // Compute display name
  const displayName = (() => {
    if (isCustomTheme(theme, themeId)) {
      return "Custom";
    }
    return themeLabels[themeId] || themeId || "Default";
  })();

  // Compute display mode
  const displayMode = mode === "light" ? "Light" : "Dark";

  // Get theme primary color for the dot
  const themeColor = theme.colors.primary;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-zinc-800",
        className
      )}
    >
      {/* Title and Subtitle */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-50">
          {title}
        </h1>
        {subtitle && (
          <p className="text-base text-zinc-400 max-w-2xl">{subtitle}</p>
        )}
      </div>

      {/* Theme Info Pill and Edit Link */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: themeColor }}
          />
          <span>Previewing in:</span>
          <span className="font-medium text-zinc-300">{displayName}</span>
          <span className="text-zinc-600">·</span>
          <span className="font-medium text-zinc-300 uppercase">{displayMode}</span>
          <span className="text-zinc-600">mode</span>
        </div>
        <Link
          href="/theme"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-400 hover:text-zinc-300 hover:border-zinc-700 transition-colors"
        >
          Edit Theme
          <span className="text-zinc-500">→</span>
        </Link>
      </div>
    </div>
  );
}

