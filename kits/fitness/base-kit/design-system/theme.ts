import tokens from "./tokens.json";

export type FitnessTokens = typeof tokens;

export interface FitnessTheme {
  colors: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
  };
  radius: {
    small: number;
    medium: number;
    large: number;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontFamily: string;
    headingScale: number;
    bodyScale: number;
  };
}

export const fitnessTheme: FitnessTheme = tokens;

