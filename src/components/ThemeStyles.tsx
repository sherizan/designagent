"use client";

import { useEffect } from "react";
import { useThemePreview } from "@/context/ThemePreviewContext";

export function ThemeStyles() {
  const { theme } = useThemePreview();

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Apply color CSS variables
    body.style.setProperty("--theme-background", theme.colors.background);
    body.style.setProperty("--theme-surface", theme.colors.surface);
    body.style.setProperty("--theme-primary", theme.colors.primary);
    body.style.setProperty("--theme-primary-foreground", theme.colors.primaryForeground);
    body.style.setProperty("--theme-text", theme.colors.text);
    body.style.setProperty("--theme-text-muted", theme.colors.textMuted);
    body.style.setProperty("--theme-border", theme.colors.border);
    body.style.setProperty("--theme-accent", theme.colors.accent);
    body.style.setProperty("--theme-success", theme.colors.success);
    body.style.setProperty("--theme-warning", theme.colors.warning);
    body.style.setProperty("--theme-danger", theme.colors.danger);

    // Apply spacing CSS variables
    body.style.setProperty("--theme-spacing-xs", `${theme.spacing.xs}px`);
    body.style.setProperty("--theme-spacing-sm", `${theme.spacing.sm}px`);
    body.style.setProperty("--theme-spacing-md", `${theme.spacing.md}px`);
    body.style.setProperty("--theme-spacing-lg", `${theme.spacing.lg}px`);
    body.style.setProperty("--theme-spacing-xl", `${theme.spacing.xl}px`);

    // Apply radius CSS variables
    body.style.setProperty("--theme-radius-sm", `${theme.radius.sm}px`);
    body.style.setProperty("--theme-radius-md", `${theme.radius.md}px`);
    body.style.setProperty("--theme-radius-lg", `${theme.radius.lg}px`);
    body.style.setProperty("--theme-radius-full", `${theme.radius.full}px`);

    return () => {
      // Cleanup on unmount
      body.style.removeProperty("--theme-background");
      body.style.removeProperty("--theme-surface");
      body.style.removeProperty("--theme-primary");
      body.style.removeProperty("--theme-primary-foreground");
      body.style.removeProperty("--theme-text");
      body.style.removeProperty("--theme-text-muted");
      body.style.removeProperty("--theme-border");
      body.style.removeProperty("--theme-accent");
      body.style.removeProperty("--theme-success");
      body.style.removeProperty("--theme-warning");
      body.style.removeProperty("--theme-danger");
      body.style.removeProperty("--theme-spacing-xs");
      body.style.removeProperty("--theme-spacing-sm");
      body.style.removeProperty("--theme-spacing-md");
      body.style.removeProperty("--theme-spacing-lg");
      body.style.removeProperty("--theme-spacing-xl");
      body.style.removeProperty("--theme-radius-sm");
      body.style.removeProperty("--theme-radius-md");
      body.style.removeProperty("--theme-radius-lg");
      body.style.removeProperty("--theme-radius-full");
    };
  }, [theme]);

  return null;
}

