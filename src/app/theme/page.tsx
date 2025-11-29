"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, X } from "lucide-react";
import { useThemePreview } from "@/context/ThemePreviewContext";
import { useAuth } from "@/context/AuthContext";
import { isCustomTheme } from "@/lib/themeUtils";
import type { DesignAgentTheme } from "../../../preview-rn/src/design-system/tokens/types";

// Base theme definitions with light and dark variants
const baseThemes = {
  midnight: {
    id: "midnight",
    label: "Midnight",
    dark: {
      colors: {
        background: "#020617",
        surface: "#020817",
        surfaceMuted: "#1E293B",
        surfaceAlt: "#02091A",
        primary: "#000000",
        primaryForeground: "#FFFFFF",
        primarySoft: "#1F2937",
        text: "#F9FAFB",
        textMuted: "#9CA3AF",
        danger: "#F97373",
        border: "#1F2937",
        inputBackground: "rgba(255, 255, 255, 0.05)",
        accent: "#38BDF8",
        success: "#22C55E",
        warning: "#FACC15",
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
      },
      radius: {
        sm: 6,
        md: 12,
        lg: 20,
        full: 999,
      },
      typography: {
        fontFamilyBase: "Inter",
        heading: {
          fontSize: 24,
          lineHeight: 32,
        },
        body: {
          fontSize: 14,
          lineHeight: 20,
        },
        label: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
    } as DesignAgentTheme,
    light: {
      colors: {
        background: "#FFFFFF",
        surface: "#F9FAFB",
        surfaceMuted: "#F3F4F6",
        surfaceAlt: "#F1F5F9",
        primary: "#000000",
        primaryForeground: "#FFFFFF",
        primarySoft: "#F3F4F6",
        text: "#111827",
        textMuted: "#6B7280",
        danger: "#F97373",
        border: "#E5E7EB",
        inputBackground: "rgba(0, 0, 0, 0.05)",
        accent: "#38BDF8",
        success: "#22C55E",
        warning: "#FACC15",
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
      },
      radius: {
        sm: 6,
        md: 12,
        lg: 20,
        full: 999,
      },
      typography: {
        fontFamilyBase: "Inter",
        heading: {
          fontSize: 24,
          lineHeight: 32,
        },
        body: {
          fontSize: 14,
          lineHeight: 20,
        },
        label: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
    } as DesignAgentTheme,
    // Legacy: keep theme for backwards compatibility (defaults to dark)
    get theme() {
      return this.dark;
    },
  },
  activeGreen: {
    id: "activeGreen",
    label: "Active Green",
    dark: {
      colors: {
        background: "#020617",
        surface: "#0F172A",
        surfaceMuted: "#1E293B",
        surfaceAlt: "#1E293B",
        primary: "#22C55E",
        primaryForeground: "#FFFFFF",
        primarySoft: "#14532D",
        text: "#F9FAFB",
        textMuted: "#9CA3AF",
        danger: "#F97373",
        border: "#1F2937",
        inputBackground: "rgba(255, 255, 255, 0.05)",
        accent: "#22C55E",
        success: "#22C55E",
        warning: "#FACC15",
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
      },
      radius: {
        sm: 6,
        md: 12,
        lg: 20,
        full: 999,
      },
      typography: {
        fontFamilyBase: "Inter",
        heading: {
          fontSize: 24,
          lineHeight: 32,
        },
        body: {
          fontSize: 14,
          lineHeight: 20,
        },
        label: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
    } as DesignAgentTheme,
    light: {
      colors: {
        background: "#FFFFFF",
        surface: "#F9FAFB",
        surfaceMuted: "#F3F4F6",
        surfaceAlt: "#F1F5F9",
        primary: "#22C55E",
        primaryForeground: "#FFFFFF",
        primarySoft: "#D1FAE5",
        text: "#111827",
        textMuted: "#6B7280",
        danger: "#F97373",
        border: "#E5E7EB",
        inputBackground: "rgba(0, 0, 0, 0.05)",
        accent: "#22C55E",
        success: "#22C55E",
        warning: "#FACC15",
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
      },
      radius: {
        sm: 6,
        md: 12,
        lg: 20,
        full: 999,
      },
      typography: {
        fontFamilyBase: "Inter",
        heading: {
          fontSize: 24,
          lineHeight: 32,
        },
        body: {
          fontSize: 14,
          lineHeight: 20,
        },
        label: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
    } as DesignAgentTheme,
    get theme() {
      return this.dark;
    },
  },
  wellnessPeach: {
    id: "wellnessPeach",
    label: "Wellness Peach",
    dark: {
      colors: {
        background: "#020617",
        surface: "#0F172A",
        surfaceMuted: "#1E293B",
        surfaceAlt: "#1E293B",
        primary: "#F97373",
        primaryForeground: "#FFFFFF",
        primarySoft: "#7F1D1D",
        text: "#F9FAFB",
        textMuted: "#9CA3AF",
        danger: "#F97373",
        border: "#1F2937",
        inputBackground: "rgba(255, 255, 255, 0.05)",
        accent: "#F97373",
        success: "#22C55E",
        warning: "#FACC15",
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
      },
      radius: {
        sm: 6,
        md: 12,
        lg: 24,
        full: 999,
      },
      typography: {
        fontFamilyBase: "Inter",
        heading: {
          fontSize: 24,
          lineHeight: 32,
        },
        body: {
          fontSize: 14,
          lineHeight: 20,
        },
        label: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
    } as DesignAgentTheme,
    light: {
      colors: {
        background: "#FFFFFF",
        surface: "#F9FAFB",
        surfaceMuted: "#F3F4F6",
        surfaceAlt: "#F1F5F9",
        primary: "#F97373",
        primaryForeground: "#FFFFFF",
        primarySoft: "#FEE2E2",
        text: "#111827",
        textMuted: "#6B7280",
        danger: "#F97373",
        border: "#E5E7EB",
        inputBackground: "rgba(0, 0, 0, 0.05)",
        accent: "#F97373",
        success: "#22C55E",
        warning: "#FACC15",
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 24,
      },
      radius: {
        sm: 6,
        md: 12,
        lg: 24,
        full: 999,
      },
      typography: {
        fontFamilyBase: "Inter",
        heading: {
          fontSize: 24,
          lineHeight: 32,
        },
        body: {
          fontSize: 14,
          lineHeight: 20,
        },
        label: {
          fontSize: 12,
          lineHeight: 16,
        },
      },
    } as DesignAgentTheme,
    get theme() {
      return this.dark;
    },
  },
};

// Theme name mapping for display
const themeNameMap: Record<string, string> = {
  midnight: "Midnight",
  activeGreen: "Active Green",
  wellnessPeach: "Wellness Peach",
};

export default function ThemePage() {
  const { theme, setTheme, setThemeLight, setThemeDark, setThemeId, mode, setMode, themeId } = useThemePreview();
  const { isAuthenticated, user } = useAuth();
  const [isInitialMount, setIsInitialMount] = useState(true);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Get display name for current theme
  const themeName = themeId ? themeNameMap[themeId] || themeId : "Midnight";

  // Track initial mount to avoid overriding loaded theme
  useEffect(() => {
    setIsInitialMount(false);
  }, []);

  // Note: We no longer auto-update theme when mode changes to preserve custom values
  // Users can manually reset if they want to go back to base theme

  const handleBaseThemeSelect = (themeKey: keyof typeof baseThemes) => {
    const baseTheme = baseThemes[themeKey];
    // Set both light and dark variants when selecting a base theme
    setThemeLight(baseTheme.light);
    setThemeDark(baseTheme.dark);
    setThemeId(baseTheme.id, mode);
  };

  const handleColorChange = (
    colorKey: "primary" | "primaryForeground" | "primarySoft" | "background" | "surface" | "surfaceMuted" | "surfaceAlt" | "text" | "textMuted" | "border" | "inputBackground" | "accent" | "success" | "warning" | "danger",
    value: string
  ) => {
    setTheme({
      ...theme,
      colors: {
        ...theme.colors,
        [colorKey]: value,
      },
    });
  };

  const handleRadiusChange = (value: number) => {
    setTheme({
      ...theme,
      radius: {
        ...theme.radius,
        lg: value,
      },
    });
  };

  const handleReset = () => {
    // Reset to base theme variant for current mode
    if (themeId in baseThemes) {
      const baseTheme = baseThemes[themeId as keyof typeof baseThemes];
      const variant = mode === "light" ? baseTheme.light : baseTheme.dark;
      setTheme(variant);
    } else {
      // If no base theme selected, reset to midnight dark
      const midnightDark = baseThemes.midnight.dark;
      setTheme(midnightDark);
      setThemeId("midnight", mode);
    }
  };

  const handleSaveTheme = async () => {
    if (!isAuthenticated || !user) {
      return;
    }

    setIsSaving(true);
    try {
      // Check if theme is custom by comparing with current themeId
      const isCustom = isCustomTheme(theme, themeId);
      if (!isCustom) {
        alert("No customizations detected. Please customize the theme before saving.");
        setIsSaving(false);
        return;
      }

      // Create theme data for MCP
      const themeData = {
        id: `custom-${user.id}-${Date.now()}`,
        name: `${user.email.split("@")[0]}-custom-${mode}`,
        description: `Custom theme by ${user.email}`,
        author: user.email,
        createdAt: new Date().toISOString(),
        mode,
        theme: {
          light: mode === "light" ? theme : undefined,
          dark: mode === "dark" ? theme : undefined,
        },
      };

      // Save to localStorage for now (can be extended to API)
      const savedThemes = JSON.parse(localStorage.getItem("designagent-custom-themes") || "[]");
      savedThemes.push(themeData);
      localStorage.setItem("designagent-custom-themes", JSON.stringify(savedThemes));

      // Also save to a file that MCP can read (in public directory for now)
      // In production, this would be saved to a database or file system accessible to MCP
      const response = await fetch("/api/themes/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(themeData),
      });

      if (response.ok) {
        alert("Theme saved successfully! It's now available via MCP.");
      } else {
        // Fallback: save to localStorage only
        console.warn("Failed to save to server, saved to localStorage only");
        alert("Theme saved to local storage. MCP access may be limited.");
      }
    } catch (error) {
      console.error("Failed to save theme:", error);
      alert("Failed to save theme. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Theme Creator
          </h1>
          <p className="text-xl text-zinc-400">
            Customize your DesignAgent theme. Changes are saved automatically and applied across all previews.
          </p>
        </div>

        {/* Two-pane layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left Pane: Editor Tools */}
          <div className="space-y-8">
            {/* Base Theme Cards */}
            <section className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Base Themes</h2>
                <p className="text-sm text-zinc-400">
                  Start with a base theme, then customize it to match your brand.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {Object.values(baseThemes).map((baseTheme) => {
                  const isActive = themeId === baseTheme.id;
                  return (
                    <button
                      key={baseTheme.id}
                      type="button"
                      onClick={() => handleBaseThemeSelect(baseTheme.id as keyof typeof baseThemes)}
                      className={`group flex flex-col gap-3 rounded-2xl border p-5 text-left transition ${
                        isActive
                          ? "border-zinc-600 bg-zinc-900/50 ring-2 ring-zinc-600/50"
                          : "border-zinc-800 bg-zinc-900/30 hover:border-zinc-600 hover:bg-zinc-900/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className={`text-base font-semibold ${isActive ? "text-zinc-50" : "text-zinc-100"}`}>
                          {baseTheme.label}
                        </h3>
                        <div
                          className={`h-7 w-7 rounded-full border-2 ${
                            isActive ? "border-zinc-500 ring-2 ring-zinc-500/30" : "border-zinc-700"
                          }`}
                          style={{ backgroundColor: baseTheme.dark.colors.primary }}
                        />
                      </div>
                      <p className={`text-xs ${isActive ? "text-zinc-300" : "text-zinc-400"}`}>
                        {baseTheme.id === "midnight" && "Classic dark theme with indigo accents"}
                        {baseTheme.id === "activeGreen" && "Energetic green for active lifestyles"}
                        {baseTheme.id === "wellnessPeach" && "Warm peach tones for wellness apps"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Mode Toggle */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Mode</h2>
                  <p className="text-sm text-zinc-400">
                    Choose between light and dark mode for your theme.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900/50 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                >
                  Reset to Default
                </button>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/30 p-1 w-fit">
                <button
                  type="button"
                  onClick={() => setMode("light")}
                  className={[
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    mode === "light"
                      ? "bg-zinc-200 text-zinc-900 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-300",
                  ].join(" ")}
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setMode("dark")}
                  className={[
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    mode === "dark"
                      ? "bg-zinc-200 text-zinc-900 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-300",
                  ].join(" ")}
                >
                  Dark
                </button>
              </div>
            </section>

            {/* Theme Controls */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Customize</h2>
                  <p className="text-sm text-zinc-400">
                    {isAuthenticated
                      ? "Adjust colors, semantic colors, and radius to match your brand identity."
                      : "Sign in to customize and save themes."}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-700 bg-zinc-900/50 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                  disabled={!isAuthenticated}
                >
                  <span>{isCustomizeOpen ? "Collapse" : "Expand"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isCustomizeOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              {isAuthenticated && isCustomizeOpen && (
                <div className="grid grid-cols-2 gap-4">
                {/* Primary Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Primary Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.primary || "#000000"}
                      onChange={(e) => handleColorChange("primary", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.primary || ""}
                      onChange={(e) => handleColorChange("primary", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#000000"
                    />
                  </div>
                </div>

                {/* Primary Foreground Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Primary Foreground Color
                  </label>
                  <p className="text-xs text-zinc-400">
                    Text color used on primary background (e.g., button text)
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.primaryForeground || "#FFFFFF"}
                      onChange={(e) => handleColorChange("primaryForeground", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.primaryForeground || ""}
                      onChange={(e) => handleColorChange("primaryForeground", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#FFFFFF"
                    />
                  </div>
                </div>

                {/* Background Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Background Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.background || "#020617"}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.background || ""}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#020617"
                    />
                  </div>
                </div>

                {/* Surface Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Surface Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.surface || "#020817"}
                      onChange={(e) => handleColorChange("surface", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.surface || ""}
                      onChange={(e) => handleColorChange("surface", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#020817"
                    />
                  </div>
                </div>

                {/* Surface Muted Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Surface Muted
                  </label>
                  <p className="text-xs text-zinc-400">
                    Muted surface variant for subtle backgrounds
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.surfaceMuted || "#1E293B"}
                      onChange={(e) => handleColorChange("surfaceMuted", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.surfaceMuted || ""}
                      onChange={(e) => handleColorChange("surfaceMuted", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#1E293B"
                    />
                  </div>
                </div>

                {/* Surface Alt Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Surface Alt
                  </label>
                  <p className="text-xs text-zinc-400">
                    Alternative surface variant
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.surfaceAlt || "#02091A"}
                      onChange={(e) => handleColorChange("surfaceAlt", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.surfaceAlt || ""}
                      onChange={(e) => handleColorChange("surfaceAlt", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#02091A"
                    />
                  </div>
                </div>

                {/* Primary Soft Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Primary Soft
                  </label>
                  <p className="text-xs text-zinc-400">
                    Soft variant of primary color for subtle backgrounds
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.primarySoft || "#1F2937"}
                      onChange={(e) => handleColorChange("primarySoft", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.primarySoft || ""}
                      onChange={(e) => handleColorChange("primarySoft", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#1F2937"
                    />
                  </div>
                </div>

                {/* Text Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Text Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.text || "#F9FAFB"}
                      onChange={(e) => handleColorChange("text", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.text || ""}
                      onChange={(e) => handleColorChange("text", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#F9FAFB"
                    />
                  </div>
                </div>

                {/* Text Muted Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Text Muted
                  </label>
                  <p className="text-xs text-zinc-400">
                    Muted text color for secondary content
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.textMuted || "#9CA3AF"}
                      onChange={(e) => handleColorChange("textMuted", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.textMuted || ""}
                      onChange={(e) => handleColorChange("textMuted", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#9CA3AF"
                    />
                  </div>
                </div>

                {/* Border Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Border Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.border || "#1F2937"}
                      onChange={(e) => handleColorChange("border", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.border || ""}
                      onChange={(e) => handleColorChange("border", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#1F2937"
                    />
                  </div>
                </div>

                {/* Input Background Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Input Background
                  </label>
                  <p className="text-xs text-zinc-400">
                    Background color for input fields
                  </p>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.inputBackground || "rgba(255, 255, 255, 0.05)"}
                      onChange={(e) => handleColorChange("inputBackground", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.inputBackground || ""}
                      onChange={(e) => handleColorChange("inputBackground", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="rgba(255, 255, 255, 0.05)"
                    />
                  </div>
                </div>

                {/* Radius */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 col-span-2">
                  <label className="block text-sm font-medium text-zinc-200">
                    Large Radius
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={theme.radius.lg || 20}
                      onChange={(e) => handleRadiusChange(Number(e.target.value))}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                    />
                    <div className="text-xs text-zinc-400">
                      <span className="font-mono">{theme.radius.lg || 20}px</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleRadiusChange(6)}
                      className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 transition-colors"
                    >
                      Small
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRadiusChange(12)}
                      className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 transition-colors"
                    >
                      Medium
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRadiusChange(20)}
                      className="px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-xs text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 transition-colors"
                    >
                      Large
                    </button>
                  </div>
                </div>

                {/* Semantic Colors Section */}
                <div className="col-span-2 mt-4 pt-4 border-t border-zinc-800">
                  <h3 className="text-lg font-semibold text-zinc-100 mb-4">Semantic Colors</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Accent Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Accent Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.accent || "#38BDF8"}
                      onChange={(e) => handleColorChange("accent", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.accent || ""}
                      onChange={(e) => handleColorChange("accent", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#38BDF8"
                    />
                  </div>
                </div>

                {/* Success Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Success Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.success || "#22C55E"}
                      onChange={(e) => handleColorChange("success", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.success || ""}
                      onChange={(e) => handleColorChange("success", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#22C55E"
                    />
                  </div>
                </div>

                {/* Warning Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Warning Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.warning || "#FACC15"}
                      onChange={(e) => handleColorChange("warning", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.warning || ""}
                      onChange={(e) => handleColorChange("warning", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#FACC15"
                    />
                  </div>
                </div>

                {/* Danger Color */}
                <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6">
                  <label className="block text-sm font-medium text-zinc-200">
                    Danger Color
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={theme.colors.danger || "#F97373"}
                      onChange={(e) => handleColorChange("danger", e.target.value)}
                      className="h-12 w-12 rounded-lg border border-zinc-700 bg-zinc-800 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.colors.danger || ""}
                      onChange={(e) => handleColorChange("danger", e.target.value)}
                      className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm font-mono text-zinc-100 focus:border-zinc-600 focus:outline-none"
                      placeholder="#F97373"
                    />
                  </div>
                </div>
                  </div>
                </div>
              </div>
              )}
              {isAuthenticated && isCustomizeOpen && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleSaveTheme}
                    disabled={isSaving}
                    className="px-6 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm font-medium text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? "Saving..." : "Save Custom Theme"}
                  </button>
                </div>
              )}
              {!isAuthenticated && (
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 text-center">
                  <p className="text-sm text-zinc-400 mb-4">
                    Sign in to customize and save your own themes.
                  </p>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm font-medium text-zinc-100 hover:bg-zinc-700 transition-colors"
                    onClick={() => {
                      // TODO: Navigate to login page or show login modal
                      alert("Please sign in to customize themes.");
                    }}
                  >
                    Sign In
                  </button>
                </div>
              )}
            </section>

            {/* Install Instructions */}
            <section className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Install Your Design Settings</h2>
                <p className="text-sm text-zinc-400">
                  Two simple steps to get your design settings into your app.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 space-y-6">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-300">
                        1
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-100">Install Design Agent MCP</h3>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Connect DesignAgent to Cursor so you can install your design settings.
                    </p>
                    <a
                      href="cursor://anysphere.cursor-deeplink/mcp/install?name=DesignAgent&config=eyJjb21tYW5kIjoibnB4IiwiYXJncyI6WyIteSIsIkBkZXNpZ25hZ2VudC9tY3BAbGF0ZXN0Il19"
                      className="inline-block"
                    >
                      <Image
                        src="/images/mcp-install-light.svg"
                        alt="Install DesignAgent MCP in Cursor"
                        width={126}
                        height={28}
                        className="cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </a>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-300">
                      2
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-100">
                      Copy &quot;{themeName}&quot; Theme Prompt
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400">
                    Copy this prompt and paste it into Cursor to install your design settings.
                  </p>
                  <button
                    type="button"
                    onClick={async () => {
                      const snippet = `Install the DesignAgent ${themeId || "Midnight"} theme into this project:

1. Call the get_theme_kit tool with:
   { "themeId": "${themeId || "midnight"}" }

2. Write each returned file into this project:
   - src/design-system/tokens/designagent.tokens.json
   - src/design-system/theme/designagent.theme.ts
   - .cursor/rules/designagent-theme.md

3. If src/design-system does not exist, create it.

4. Update the root layout to wrap the app with a provider that uses designAgentTheme from src/design-system/theme/designagent.theme.ts.

When you're done, tell me which files you created/modified.`;
                      try {
                        await navigator.clipboard.writeText(snippet);
                        setShowCopySuccess(true);
                      } catch (err) {
                        console.error("Failed to copy:", err);
                      }
                    }}
                    className="w-full px-4 py-3 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600 font-semibold transition-colors"
                  >
                    Copy Prompt
                  </button>
                </div>
              </div>
              <div className="pt-4 border-t border-zinc-800">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-zinc-50 text-zinc-950 hover:bg-zinc-100 font-semibold shadow-sm"
                >
                  <Link href="/screens">
                    Next: Build Login Screen
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Right Pane: Live Preview */}
          <div className="flex flex-col items-center lg:items-end gap-4">
                {/* Device Bezel Container */}
            <div className="relative aspect-[9/19.5] w-full max-w-md">
                  {/* Mock Login Screen Preview - positioned inside bezel */}
                  <div
                    className="absolute rounded-[3.2rem] overflow-hidden z-0"
                    style={{
                      top: "6%",
                      left: "7%",
                      right: "7%",
                      bottom: "6%",
                      backgroundColor: `var(--theme-background)`,
                    }}
                  >
                  {/* App Header */}
                  <div
                    className="px-6 pb-4 border-b"
                    style={{
                      borderColor: `var(--theme-border)`,
                      paddingTop: "70px", // Space for status bar (54px) + some padding
                    }}
                  >
                    <h3
                      className="font-semibold"
                      style={{
                        color: `var(--theme-text)`,
                        fontSize: `${theme.typography.heading.fontSize}px`,
                        lineHeight: `${theme.typography.heading.lineHeight}px`,
                      }}
                    >
                      Your App
                    </h3>
                  </div>

                  {/* Card Content */}
                  <div
                    className="p-6"
                    style={{
                      backgroundColor: `var(--theme-surface)`,
                    }}
                  >
                    {/* Title */}
                    <h4
                      className="font-semibold mb-1"
                      style={{
                        color: `var(--theme-text)`,
                        fontSize: `${theme.typography.heading.fontSize}px`,
                        lineHeight: `${theme.typography.heading.lineHeight}px`,
                      }}
                    >
                      Sign in to your account
                    </h4>
                    <p
                      className="mb-6"
                      style={{
                        color: `var(--theme-text-muted)`,
                        fontSize: `${theme.typography.body.fontSize}px`,
                        lineHeight: `${theme.typography.body.lineHeight}px`,
                        marginBottom: `${theme.spacing.lg}px`,
                      }}
                    >
                      Welcome back. Use your work email to continue.
                    </p>

                    {/* Email Field */}
                    <div className="mb-4">
                      <label
                        className="block mb-2 text-xs font-medium"
                        style={{
                          color: `var(--theme-text-muted)`,
                          fontSize: `${theme.typography.label.fontSize}px`,
                          lineHeight: `${theme.typography.label.lineHeight}px`,
                          marginBottom: `${theme.spacing.sm}px`,
                        }}
                      >
                        Email address
                      </label>
                      <div
                        className="h-11 rounded-lg border px-3 flex items-center"
                        style={{
                          backgroundColor: theme.colors.inputBackground,
                          borderColor: `var(--theme-border)`,
                          borderRadius: `${theme.radius.md}px`,
                          height: `${theme.spacing.xl + theme.spacing.md}px`,
                        }}
                      >
                        <span
                          className="text-sm"
                          style={{
                            color: `var(--theme-text-muted)`,
                            fontSize: `${theme.typography.body.fontSize}px`,
                          }}
                        >
                          you@example.com
                        </span>
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                      <label
                        className="block mb-2 text-xs font-medium"
                        style={{
                          color: `var(--theme-text-muted)`,
                          fontSize: `${theme.typography.label.fontSize}px`,
                          lineHeight: `${theme.typography.label.lineHeight}px`,
                          marginBottom: `${theme.spacing.sm}px`,
                        }}
                      >
                        Password
                      </label>
                      <div
                        className="h-11 rounded-lg border px-3 flex items-center"
                        style={{
                          backgroundColor: theme.colors.inputBackground,
                          borderColor: `var(--theme-border)`,
                          borderRadius: `${theme.radius.md}px`,
                          height: `${theme.spacing.xl + theme.spacing.md}px`,
                        }}
                      >
                        <span
                          className="text-sm"
                          style={{
                            color: `var(--theme-text-muted)`,
                            fontSize: `${theme.typography.body.fontSize}px`,
                          }}
                        >
                          ••••••••
                        </span>
                      </div>
                    </div>

                    {/* Primary Button */}
                    <button
                      type="button"
                      className="w-full py-3 rounded-lg font-medium transition-colors mb-4"
                      style={{
                        backgroundColor: `var(--theme-primary)`,
                        color: `var(--theme-primary-foreground)`,
                        borderRadius: `${theme.radius.md}px`,
                        marginBottom: `${theme.spacing.md}px`,
                        paddingTop: `${theme.spacing.md}px`,
                        paddingBottom: `${theme.spacing.md}px`,
                      }}
                    >
                      Sign in
                    </button>

                    {/* Secondary Link */}
                    <div className="text-center">
                      <button
                        type="button"
                        className="text-sm font-medium transition-colors"
                        style={{
                          color: `var(--theme-accent)`,
                          fontSize: `${theme.typography.body.fontSize}px`,
                        }}
                      >
                        Create an account
                      </button>
                    </div>
                  </div>
                  </div>
                  {/* Status Bar - positioned at top of screen area, overlaying preview */}
                  <div
                    className="absolute z-[5] pointer-events-none"
                    style={{
                      top: "6%",
                      left: "7%",
                      right: "7%",
                      height: "54px",
                    }}
                  >
                    <Image
                      src="/images/status-bar.svg"
                      alt="Status bar"
                      fill
                      className="object-contain object-top"
                      priority
                    />
                  </div>
                  {/* Bezel Image - on top to show device frame */}
                  <Image
                    src="/images/bezel.png"
                    alt="Device bezel"
                    fill
                    className="object-contain z-10 pointer-events-none"
                    priority
                  />
            </div>
          </div>
        </div>
      </div>

      {/* Copy Success Dialog */}
      {showCopySuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCopySuccess(false)}
        >
          <div
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-zinc-100">Prompt Copied!</h3>
                  <p className="text-sm text-zinc-400 mt-1">
                    Base theme prompt is copied successfully. Paste it in Cursor Agent to add your new theme to your project.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCopySuccess(false)}
                className="text-zinc-400 hover:text-zinc-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCopySuccess(false)}
                className="flex-1 bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

