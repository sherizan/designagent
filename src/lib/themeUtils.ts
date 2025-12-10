import type { DesignAgentTheme } from "./types";

// Base theme definitions (must match the ones in theme/page.tsx)
const baseThemes = {
  midnight: {
    colors: {
      background: "#020617",
      surface: "#0F172A",
      surfaceMuted: "#1E293B",
      primary: "#6366F1",
      primarySoft: "#4F46E51A",
      text: "#F9FAFB",
      textMuted: "#9CA3AF",
      danger: "#EF4444",
      border: "#1F2937",
      inputBackground: "rgba(255, 255, 255, 0.05)",
      accent: "#8B5CF6",
      success: "#22C55E",
      warning: "#F59E0B",
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
      md: 10,
      lg: 18,
      full: 999,
    },
    typography: {
      fontFamilyBase: "Inter",
      heading: {
        fontSize: 24,
        lineHeight: 32,
      },
      body: {
        fontSize: 15,
        lineHeight: 22,
      },
      label: {
        fontSize: 12,
        lineHeight: 16,
      },
    },
  },
  activeGreen: {
    colors: {
      background: "#020617",
      surface: "#0F172A",
      surfaceMuted: "#1E293B",
      primary: "#22C55E",
      primarySoft: "#22C55E1A",
      text: "#F9FAFB",
      textMuted: "#9CA3AF",
      danger: "#EF4444",
      border: "#1F2937",
      inputBackground: "rgba(255, 255, 255, 0.05)",
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
      md: 10,
      lg: 18,
      full: 999,
    },
    typography: {
      fontFamilyBase: "Inter",
      heading: {
        fontSize: 24,
        lineHeight: 32,
      },
      body: {
        fontSize: 15,
        lineHeight: 22,
      },
      label: {
        fontSize: 12,
        lineHeight: 16,
      },
    },
  },
  wellnessPeach: {
    colors: {
      background: "#020617",
      surface: "#0F172A",
      surfaceMuted: "#1E293B",
      primary: "#F97373",
      primarySoft: "#F973731A",
      text: "#F9FAFB",
      textMuted: "#9CA3AF",
      danger: "#EF4444",
      border: "#1F2937",
      inputBackground: "rgba(255, 255, 255, 0.05)",
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
      md: 10,
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
        fontSize: 15,
        lineHeight: 22,
      },
      label: {
        fontSize: 12,
        lineHeight: 16,
      },
    },
  },
};

/**
 * Deep equality check for theme objects
 */
function themesEqual(a: DesignAgentTheme, b: DesignAgentTheme): boolean {
  return (
    JSON.stringify(a.colors) === JSON.stringify(b.colors) &&
    JSON.stringify(a.spacing) === JSON.stringify(b.spacing) &&
    JSON.stringify(a.radius) === JSON.stringify(b.radius) &&
    JSON.stringify(a.typography) === JSON.stringify(b.typography)
  );
}

/**
 * Checks if a theme is custom (doesn't match any base theme)
 */
export function isCustomTheme(theme: DesignAgentTheme, themeId: string): boolean {
  const baseTheme = baseThemes[themeId as keyof typeof baseThemes];
  if (!baseTheme) {
    // Unknown themeId means it's custom
    return true;
  }
  return !themesEqual(theme, baseTheme as DesignAgentTheme);
}

/**
 * Serializes a theme to a base64-encoded string for URL passing
 */
export function serializeTheme(theme: DesignAgentTheme): string {
  try {
    const json = JSON.stringify(theme);
    return btoa(encodeURIComponent(json));
  } catch (error) {
    console.error("Failed to serialize theme:", error);
    return "";
  }
}

