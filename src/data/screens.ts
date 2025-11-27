export type Screen = {
  slug: string;
  title: string;
  description: string;
  preview: string;
  components: string[];
};

export const screens: Screen[] = [
  {
    slug: "login",
    title: "Login Screen",
    description: "Classic email + password login with strong visual hierarchy.",
    preview: "/screens/login-thumb.png",
    components: ["TextInput", "Button", "Card"],
  },
  {
    slug: "signup",
    title: "Signup Screen",
    description: "User registration with validation and clear call-to-action.",
    preview: "/screens/signup-thumb.png",
    components: ["TextInput", "Button", "Card", "Checkbox"],
  },
  {
    slug: "paywall",
    title: "Paywall Screen",
    description: "Subscription pricing with feature highlights and clear benefits.",
    preview: "/screens/paywall-thumb.png",
    components: ["Card", "Button", "Text", "List"],
  },
  {
    slug: "profile",
    title: "Profile Screen",
    description: "User profile with avatar, stats, and settings access.",
    preview: "/screens/profile-thumb.png",
    components: ["Card", "Avatar", "Button", "List"],
  },
  {
    slug: "home-list",
    title: "Home List Screen",
    description: "Feed-style list with cards, pull-to-refresh, and infinite scroll.",
    preview: "/screens/home-list-thumb.png",
    components: ["Card", "List", "Image", "Button"],
  },
  {
    slug: "settings",
    title: "Settings Screen",
    description: "Organized settings with sections, toggles, and navigation.",
    preview: "/screens/settings-thumb.png",
    components: ["List", "Switch", "Button", "Card"],
  },
  {
    slug: "detail",
    title: "Detail Screen",
    description: "Content detail view with header, body, and action buttons.",
    preview: "/screens/detail-thumb.png",
    components: ["Image", "Card", "Button", "Text"],
  },
  {
    slug: "empty-states",
    title: "Empty States",
    description: "Engaging empty states with illustrations and helpful messaging.",
    preview: "/screens/empty-states-thumb.png",
    components: ["Image", "Text", "Button"],
  },
];

export function getScreenBySlug(slug: string): Screen | undefined {
  return screens.find((screen) => screen.slug === slug);
}

