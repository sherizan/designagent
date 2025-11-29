import type { ThemeKit } from "./types.js";

type TypographySlot = {
  fontFamily?: string;
  fontSize: number;
  lineHeight?: number;
};

type BaseThemeTokens = {
  id: string;
  name: string;
  description: string;
  colors: {
    background: string;
    surface: string;
    surfaceMuted: string;
    surfaceAlt?: string;
    primary: string;
    primaryForeground: string;
    primarySoft: string;
    text: string;
    textMuted: string;
    danger: string;
    border: string;
    inputBackground: string;
    accent: string;
    success: string;
    warning: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  radius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
  typography: {
    fontFamilyBase: string;
    heading: TypographySlot;
    body: TypographySlot;
    label: TypographySlot;
  };
};

const midnightThemeTokens: BaseThemeTokens = {
  id: "midnight",
  name: "Midnight",
  description: "Dark, high-contrast theme for dashboards and tools.",
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
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  radius: { sm: 6, md: 12, lg: 20, full: 999 },
  typography: {
    fontFamilyBase: "Inter",
    heading: { fontSize: 24, lineHeight: 32 },
    body: { fontSize: 14, lineHeight: 20 },
    label: { fontSize: 12, lineHeight: 16 },
  },
};

const activeGreenThemeTokens: BaseThemeTokens = {
  id: "activeGreen",
  name: "Active Green",
  description: "Vibrant green theme for active, energetic applications.",
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
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  radius: { sm: 6, md: 12, lg: 20, full: 999 },
  typography: {
    fontFamilyBase: "Inter",
    heading: { fontSize: 24, lineHeight: 32 },
    body: { fontSize: 14, lineHeight: 20 },
    label: { fontSize: 12, lineHeight: 16 },
  },
};

const wellnessPeachThemeTokens: BaseThemeTokens = {
  id: "wellnessPeach",
  name: "Wellness Peach",
  description: "Warm, calming peach theme for wellness and health applications.",
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
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  radius: { sm: 6, md: 12, lg: 24, full: 999 },
  typography: {
    fontFamilyBase: "Inter",
    heading: { fontSize: 24, lineHeight: 32 },
    body: { fontSize: 14, lineHeight: 20 },
    label: { fontSize: 12, lineHeight: 16 },
  },
};

const baseThemeTokensById: Record<string, BaseThemeTokens> = {
  midnight: midnightThemeTokens,
  activeGreen: activeGreenThemeTokens,
  wellnessPeach: wellnessPeachThemeTokens,
};

export function getThemeKit(themeId: string): ThemeKit | undefined {
  const tokens = baseThemeTokensById[themeId];
  if (!tokens) return undefined;

  const files = [];

  // 1) tokens JSON
  files.push({
    path: "src/design-system/tokens/designagent.tokens.json",
    content: JSON.stringify(
      {
        colors: tokens.colors,
        spacing: tokens.spacing,
        radius: tokens.radius,
        typography: tokens.typography,
      },
      null,
      2
    ),
  });

  // 2) theme.ts wrapper
  files.push({
    path: "src/design-system/theme/designagent.theme.ts",
    content: `
import tokens from "../tokens/designagent.tokens.json";

export const designAgentTheme = tokens;

export type DesignAgentTheme = typeof designAgentTheme;
`.trimStart(),
  });

  // 3) .cursor rules
  files.push({
    path: ".cursor/rules/designagent-theme.md",
    content: `# DesignAgent Theme Rules

You are building a React Native or Expo app using the DesignAgent theme.

CRITICAL:
- Always use \`designAgentTheme\` and tokens from
  \`src/design-system/tokens/designagent.tokens.json\`
  for colors, spacing, radius, typography.
- Never hardcode hex colors or random spacing if a token exists.
- When generating new components or screens, prefer binding styles to:
  - designAgentTheme.colors.*
  - designAgentTheme.spacing.*
  - designAgentTheme.radius.*
  - designAgentTheme.typography.*

Examples:

- Colors: \`designAgentTheme.colors.primary\`, \`designAgentTheme.colors.background\`
- Spacing: \`designAgentTheme.spacing.md\`
- Radius: \`designAgentTheme.radius.lg\`

This ensures that any theme change in DesignAgent will automatically
propagate through your app.
`.trim(),
  });

  return {
    id: tokens.id,
    name: tokens.name,
    description: tokens.description,
    files,
  };
}

