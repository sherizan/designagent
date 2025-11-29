export type AccessTier = "free" | "pro";

export type ScreenCategory =
  | "auth"
  | "paywall"
  | "profile"
  | "home"
  | "settings"
  | "detail"
  | "empty";

export type ThemeOption = {
  key: string; // e.g. "midnight"
  label: string; // e.g. "Midnight"
  accent?: string; // optional CSS color for chip background or border
};

export type ScreenVariant = {
  slug: string;
  name: string;
  category: ScreenCategory;
  description: string;
  preview: string;
  components: string[];
  recommendedUse: string;
  access: AccessTier;
  // Legacy field for backward compatibility
  livePreviewUrl?: string;
  // New fields for theme support
  livePreviewBaseUrl?: string;
  themes?: ThemeOption[];
};

// Legacy type alias for backward compatibility during migration
export type Screen = ScreenVariant;

export const screens: ScreenVariant[] = [
  {
    slug: "login-simple",
    name: "Login – Simple",
    category: "auth",
    description:
      "A clean email/password login screen with strong typography, dark theme, and clear error handling.",
    preview: "/screens/login-simple.png", // TODO: add actual thumbnail later
    components: [
      "FormField",
      "Button",
      "SocialButton",
      "Divider",
      "Text",
    ],
    recommendedUse:
      "Use this as the default login entry point for apps with simple email-based authentication.",
    access: "free",
    livePreviewBaseUrl:
      "https://designagent-preview-rn.vercel.app/login-simple",
    themes: [
      { key: "midnight", label: "Midnight", accent: "#6366F1" },
      { key: "activeGreen", label: "Active Green", accent: "#22C55E" },
      { key: "wellnessPeach", label: "Wellness Peach", accent: "#F97373" },
    ],
  },
  {
    slug: "login-minimal",
    name: "Login – Minimal",
    category: "auth",
    description:
      "An ultra-minimal login screen focused on essential email/password authentication with clean typography and spacing.",
    preview: "/screens/login-minimal.png", // TODO: add actual thumbnail later
    components: [
      "FormField",
      "Button",
      "Text",
    ],
    recommendedUse:
      "Perfect for apps that prioritize simplicity and want a distraction-free authentication experience.",
    access: "free",
    livePreviewBaseUrl:
      "https://designagent-preview-rn.vercel.app/login-minimal",
    themes: [
      { key: "midnight", label: "Midnight", accent: "#6366F1" },
      { key: "activeGreen", label: "Active Green", accent: "#22C55E" },
      { key: "wellnessPeach", label: "Wellness Peach", accent: "#F97373" },
    ],
  },
];

export function getScreenBySlug(slug: string): ScreenVariant | undefined {
  return screens.find((screen) => screen.slug === slug);
}

// Helper function to get category label
export function getCategoryLabel(category: ScreenCategory): string {
  const labels: Record<ScreenCategory, string> = {
    auth: "Auth",
    paywall: "Paywall",
    profile: "Profile",
    home: "Home",
    settings: "Settings",
    detail: "Detail",
    empty: "Empty",
  };
  return labels[category];
}

