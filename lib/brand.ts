import type { AccentKey } from "./marketplace";

/** Raw DESIGN.md hex values, for contexts that can't use CSS vars (next/og ImageResponse). */
export const BRAND = {
  surface: "#FFFFFF",
  surfaceSecondary: "#F8F8F8",
  onSurface: "#0F0F0F",
  onSurfaceMuted: "#666666",
  onSurfaceSubtle: "#999999",
  onSurfaceFaint: "#CCCCCC",
  border: "#EBEBEB",
  primary: "#0F0F0F",
  onPrimary: "#FFFFFF",
} as const;

/** Category accent pairs (background tint + on-accent foreground). */
export const ACCENT_HEX: Record<AccentKey, { bg: string; fg: string }> = {
  figma: { bg: "#E8F4FF", fg: "#1A6FAD" },
  review: { bg: "#F0EBFF", fg: "#6B3FA0" },
  tokens: { bg: "#FFF4E6", fg: "#A05A00" },
  community: { bg: "#F5F5F5", fg: "#999999" },
  setup: { bg: "#E8FAF0", fg: "#1A8A4A" },
  backgrounds: { bg: "#E6FBFA", fg: "#0E7C86" },
  brand: { bg: "#ECEBFF", fg: "#4B45C6" },
  voice: { bg: "#FDECF2", fg: "#B43E6E" },
  design: { bg: "#EEF2F7", fg: "#3F5673" },
};
