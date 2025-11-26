export type ScreenPrompt = {
  id: string;
  label: string;
  description: string;
  prompt: string;
};

export type FitnessThemeId = "activeGreen" | "powerBlue" | "wellnessPeach" | "darkMode";

export type FitnessTypography = {
  headingScale: number;
  bodyScale: number;
  fontFamily: string;
};

export type FitnessSpacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type FitnessIconStyle = "minimal" | "outline" | "filled";

export type FitnessTheme = {
  id: FitnessThemeId;
  label: string;
  description: string;
  iconStyle: FitnessIconStyle;
  tokens: {
    primary: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    radius: {
      small: number;
      medium: number;
      large: number;
    };
    spacing: FitnessSpacing;
    typography: FitnessTypography;
  };
};

export type UIkit = {
  id: string;
  name: string;
  description: string;
  category: "fitness" | "finance" | "habit" | "chat" | "social" | "other";
  tags: string[];
  heroThumbnail: string;
  previewImages: string[];
  includedScreens: string[];
  includedComponents: string[];
  fullAppPrompt: string;
  screenPrompts: ScreenPrompt[];
  // Legacy fields (optional until migrated)
  thumbnail?: string;
  previewScreens?: string[];
  cursorPrompt?: string;
  // New fields for customizer
  themes?: FitnessTheme[];
  defaultThemeId?: FitnessThemeId;
};

export const uiKits: UIkit[] = [
  {
    id: "fitness",
    name: "Fitness App Kit V1",
    description: "Complete workout tracking and wellness app system.",
    category: "fitness",
    tags: ["react-native", "mobile-first", "cursor-ready"],
    heroThumbnail: "/kits/fitness/hero.png",
    thumbnail: "/thumbnails/kits/fitness-main.png", // Keeping for compatibility with gallery
    previewImages: [
      "/kits/fitness/onboarding.png",
      "/kits/fitness/dashboard.png",
      "/kits/fitness/workout.png",
      "/kits/fitness/profile.png"
    ],
    includedScreens: [
      "Onboarding (3-step flow)",
      "Login",
      "Signup",
      "Home Dashboard",
      "Workout Detail",
      "Profile",
      "Settings"
    ],
    includedComponents: [
      "PrimaryButton",
      "InputField",
      "FitnessStatCard",
      "WorkoutListItem",
      "MetricBadge",
      "ProgressDots",
      "PageContainer"
    ],
    themes: [
      {
        id: "activeGreen",
        label: "Active Green",
        description: "Bright, energetic green accent for fitness apps.",
        iconStyle: "outline",
        tokens: {
          primary: "#22C55E",
          background: "#020617",
          surface: "#0B1120",
          text: "#F9FAFB",
          muted: "#6B7280",
          radius: { small: 8, medium: 12, large: 20 },
          spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
          typography: { headingScale: 1.15, bodyScale: 1.0, fontFamily: "Inter" },
        },
      },
      {
        id: "powerBlue",
        label: "Power Blue",
        description: "Sharp, focused blue for performance-driven apps.",
        iconStyle: "minimal",
        tokens: {
          primary: "#2563EB",
          background: "#020617",
          surface: "#020617",
          text: "#E5E7EB",
          muted: "#6B7280",
          radius: { small: 6, medium: 10, large: 16 },
          spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20 },
          typography: { headingScale: 1.1, bodyScale: 0.95, fontFamily: "Outfit" },
        },
      },
      {
        id: "wellnessPeach",
        label: "Wellness Peach",
        description: "Soft, friendly look for wellness and habit apps.",
        iconStyle: "filled",
        tokens: {
          primary: "#F97316",
          background: "#020617",
          surface: "#0B1120",
          text: "#F9FAFB",
          muted: "#9CA3AF",
          radius: { small: 10, medium: 16, large: 24 },
          spacing: { xs: 4, sm: 8, md: 12, lg: 20, xl: 28 },
          typography: { headingScale: 1.2, bodyScale: 1.05, fontFamily: "DM Sans" },
        },
      },
      {
        id: "darkMode",
        label: "Dark Mode",
        description: "High contrast dark theme.",
        iconStyle: "outline",
        tokens: {
          primary: "#22C55E",
          background: "#020617",
          surface: "#020617",
          text: "#F9FAFB",
          muted: "#6B7280",
          radius: { small: 8, medium: 12, large: 20 },
          spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
          typography: { headingScale: 1.1, bodyScale: 1.0, fontFamily: "Urbanist" },
        },
      },
    ],
    defaultThemeId: "activeGreen",
    fullAppPrompt: `You are building a mobile-first React Native fitness app using TypeScript.
Generate ONLY UI screens (no backend logic).
Structure each screen in its own file inside \`/app/screens/\`.
Use modern, minimal design with:
- clean spacing (8, 12, 16, 24)
- rounded 12px corners
- bold headings
- neutral backgrounds
- high contrast primary CTA buttons

Create these screens:
1. Onboarding (3-step)
   - title
   - subtitle
   - illustration placeholder
   - progress dots
   - primary CTA (“Continue”)
   - secondary link (“Skip for now”)
2. Login
   - email input
   - password input
   - primary CTA (“Login”)
   - link to Signup
   - forgot password
3. Signup
   - name
   - email
   - password
   - primary CTA (“Create account”)
   - link to Login
4. Home Dashboard
   Sections:
   - Daily steps
   - Active minutes
   - Calories burned
   - Streak card
   - Upcoming workout list
5. Workout Detail
   - workout title
   - duration
   - difficulty tag
   - exercise list
   - “Start Workout” CTA
6. Profile
   - avatar
   - name
   - goals
   - stats overview
   - edit profile button
7. Settings
   - goal reminder toggle
   - dark mode toggle
   - notifications
   - logout button

Requirements:
- Use consistent components (PrimaryButton, InputField, FitnessStatCard, WorkoutListItem).
- Keep styles minimal and modern.
- Do NOT create navigation stack; screens only.
- Keep file structure clean.
- Export all screens for easy integration.`,
    screenPrompts: [
      {
        id: "onboarding",
        label: "Onboarding Flow",
        description: "3-step welcome sequence with progress indicators",
        prompt: `Create a 3-step Onboarding screen for a Fitness App.
Style: Modern, clean, whitespace-heavy.
Elements:
- Top illustration placeholder (40% height)
- Title & Subtitle text
- Bottom control area:
  - Progress dots (3 steps)
  - "Next" / "Get Started" primary button
  - "Skip" text button`
      },
      {
        id: "dashboard",
        label: "Home Dashboard",
        description: "Main hub showing daily activity and stats",
        prompt: `Create a Home Dashboard screen for a Fitness App.
Sections:
- Header: Greeting + User Avatar
- Daily Stats Row: Steps, Calories, Active Mins (cards)
- "Today's Plan" card
- "Recent Workouts" list
Use neutral background, white cards, subtle shadows.`
      },
      {
        id: "workout-detail",
        label: "Workout Detail",
        description: "Specific workout view with exercise list",
        prompt: `Create a Workout Detail screen.
Header:
- Workout Title
- Duration / Difficulty tags
- "Start Workout" floating FAB or fixed bottom button
Content:
- Description text
- List of exercises (set x reps)
- "Equipment needed" section`
      }
    ],
    // Mapping legacy fields to new structure for compatibility
    cursorPrompt: `You are building a mobile-first React Native fitness app...` // Truncated copy of fullAppPrompt
  },
  // Placeholder/Legacy kits to prevent errors in gallery
  {
    id: "finance-kit",
    name: "Finance App Kit",
    description: "Modern banking and expense tracking interface.",
    category: "finance",
    tags: ["mobile", "fintech", "banking"],
    heroThumbnail: "/thumbnails/kits/finance-main.png",
    thumbnail: "/thumbnails/kits/finance-main.png",
    previewImages: [],
    includedScreens: [],
    includedComponents: [],
    fullAppPrompt: "",
    screenPrompts: [],
    cursorPrompt: "Legacy prompt...",
  },
  {
    id: "chat-kit",
    name: "Chat & Messaging Kit",
    description: "Real-time messaging and social connection interface.",
    category: "chat",
    tags: ["mobile", "social", "communication"],
    heroThumbnail: "/thumbnails/kits/chat-main.png",
    thumbnail: "/thumbnails/kits/chat-main.png",
    previewImages: [],
    includedScreens: [],
    includedComponents: [],
    fullAppPrompt: "",
    screenPrompts: [],
    cursorPrompt: "Legacy prompt...",
  },
  {
    id: "social-kit",
    name: "Social Feed Kit",
    description: "Content-first social media and community platform.",
    category: "social",
    tags: ["mobile", "social", "feed"],
    heroThumbnail: "/thumbnails/kits/social-main.png",
    thumbnail: "/thumbnails/kits/social-main.png",
    previewImages: [],
    includedScreens: [],
    includedComponents: [],
    fullAppPrompt: "",
    screenPrompts: [],
    cursorPrompt: "Legacy prompt...",
  },
  {
    id: "saas-dashboard-kit",
    name: "SaaS Dashboard Kit",
    description: "Professional analytics and management dashboard for web.",
    category: "other",
    tags: ["web", "dashboard", "b2b"],
    heroThumbnail: "/thumbnails/kits/saas-main.png",
    thumbnail: "/thumbnails/kits/saas-main.png",
    previewImages: [],
    includedScreens: [],
    includedComponents: [],
    fullAppPrompt: "",
    screenPrompts: [],
    cursorPrompt: "Legacy prompt...",
  },
  {
    id: "ecommerce-kit",
    name: "E-commerce Shop Kit",
    description: "Complete product browsing and checkout flow.",
    category: "other",
    tags: ["mobile", "shopping", "retail"],
    heroThumbnail: "/thumbnails/kits/shop-main.png",
    thumbnail: "/thumbnails/kits/shop-main.png",
    previewImages: [],
    includedScreens: [],
    includedComponents: [],
    fullAppPrompt: "",
    screenPrompts: [],
    cursorPrompt: "Legacy prompt...",
  },
  {
    id: "habit-kit",
    name: "Habit Tracker Kit",
    description: "Minimalist daily routine and habit formation tool.",
    category: "habit",
    tags: ["mobile", "productivity", "minimal"],
    heroThumbnail: "/thumbnails/kits/habit-main.png",
    thumbnail: "/thumbnails/kits/habit-main.png",
    previewImages: [],
    includedScreens: [],
    includedComponents: [],
    fullAppPrompt: "",
    screenPrompts: [],
    cursorPrompt: "Legacy prompt...",
  }
];
