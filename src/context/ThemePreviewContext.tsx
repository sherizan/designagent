"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { DesignAgentTheme } from "@/lib/types";

// Theme storage structure - stores separate themes for light and dark modes
type StoredTheme = {
  id: string;
  mode: "light" | "dark";
  themeLight: DesignAgentTheme;
  themeDark: DesignAgentTheme;
};

type ThemePreviewContextValue = {
  theme: DesignAgentTheme;
  themeId: string;
  mode: "light" | "dark";
  setTheme: (theme: DesignAgentTheme) => void;
  setThemeLight: (theme: DesignAgentTheme) => void;
  setThemeDark: (theme: DesignAgentTheme) => void;
  setThemeId: (id: string, mode: "light" | "dark") => void;
  setMode: (mode: "light" | "dark") => void;
};

const ThemePreviewContext = createContext<ThemePreviewContextValue | undefined>(undefined);

// Default theme (midnight dark) - updated with new midnight tokens
const defaultTheme: DesignAgentTheme = {
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
};

const STORAGE_KEY = "designagent-theme-v2";

// Default light theme (midnight light) - updated with new midnight tokens
const defaultLightTheme: DesignAgentTheme = {
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
};

export function ThemePreviewProvider({ children }: { children: React.ReactNode }) {
  const [themeLight, setThemeLightState] = useState<DesignAgentTheme>(defaultLightTheme);
  const [themeDark, setThemeDarkState] = useState<DesignAgentTheme>(defaultTheme);
  const [themeId, setThemeIdState] = useState<string>("midnight");
  const [mode, setModeState] = useState<"light" | "dark">("dark");
  const [isInitialized, setIsInitialized] = useState(false);

  // Computed: current theme based on mode
  const theme = mode === "light" ? themeLight : themeDark;

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: StoredTheme = JSON.parse(stored);
        
        // Merge with defaults to ensure all properties are present
        const mergeTheme = (storedTheme: DesignAgentTheme, defaultTheme: DesignAgentTheme): DesignAgentTheme => ({
          ...defaultTheme,
          ...storedTheme,
          colors: {
            ...defaultTheme.colors,
            ...storedTheme.colors,
          },
          spacing: {
            ...defaultTheme.spacing,
            ...storedTheme.spacing,
          },
          radius: {
            ...defaultTheme.radius,
            ...storedTheme.radius,
          },
          typography: {
            ...defaultTheme.typography,
            ...storedTheme.typography,
            heading: {
              ...defaultTheme.typography.heading,
              ...storedTheme.typography?.heading,
            },
            body: {
              ...defaultTheme.typography.body,
              ...storedTheme.typography?.body,
            },
            label: {
              ...defaultTheme.typography.label,
              ...storedTheme.typography?.label,
            },
          },
        });

        // Handle migration from v1 (old format with single theme)
        if ('theme' in parsed && !('themeLight' in parsed)) {
          // Old format - migrate to new format
          const oldParsed = parsed as any;
          const mergedTheme = mergeTheme(oldParsed.theme, defaultTheme);
          setThemeLightState(defaultLightTheme);
          setThemeDarkState(mergedTheme);
        } else {
          // New format - separate themes for light and dark
          setThemeLightState(mergeTheme(parsed.themeLight, defaultLightTheme));
          setThemeDarkState(mergeTheme(parsed.themeDark, defaultTheme));
        }
        
        setThemeIdState(parsed.id);
        setModeState(parsed.mode);
      }
    } catch (error) {
      console.error("Failed to load theme from localStorage:", error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Save to localStorage whenever themes or mode changes
  useEffect(() => {
    if (!isInitialized) return;
    
    try {
      const stored: StoredTheme = {
        id: themeId,
        mode,
        themeLight,
        themeDark,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }, [themeLight, themeDark, themeId, mode, isInitialized]);

  const setTheme = useCallback((newTheme: DesignAgentTheme) => {
    // Update the theme for the current mode
    if (mode === "light") {
      setThemeLightState(newTheme);
    } else {
      setThemeDarkState(newTheme);
    }
  }, [mode]);

  const setThemeLight = useCallback((newTheme: DesignAgentTheme) => {
    setThemeLightState(newTheme);
  }, []);

  const setThemeDark = useCallback((newTheme: DesignAgentTheme) => {
    setThemeDarkState(newTheme);
  }, []);

  const setThemeId = useCallback((id: string, newMode: "light" | "dark") => {
    setThemeIdState(id);
    setModeState(newMode);
  }, []);

  const setMode = useCallback((newMode: "light" | "dark") => {
    // Just switch mode - themes are already stored separately
    setModeState(newMode);
  }, []);

  return (
    <ThemePreviewContext.Provider
      value={{
        theme,
        themeId,
        mode,
        setTheme,
        setThemeLight,
        setThemeDark,
        setThemeId,
        setMode,
      }}
    >
      {children}
    </ThemePreviewContext.Provider>
  );
}

export function useThemePreview() {
  const context = useContext(ThemePreviewContext);
  if (context === undefined) {
    throw new Error("useThemePreview must be used within a ThemePreviewProvider");
  }
  return context;
}

