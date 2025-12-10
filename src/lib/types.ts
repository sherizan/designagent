export type TypographySlot = {
  fontFamily?: string;
  fontSize: number;
  lineHeight?: number;
};

export type DesignAgentTheme = {
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
    /**
     * Base font family to fall back to when a slot doesn't define its own.
     * Example: "System", "SF Pro Text", etc.
     */
    fontFamilyBase: string;
    heading: TypographySlot;
    body: TypographySlot;
    label: TypographySlot;
  };
};

