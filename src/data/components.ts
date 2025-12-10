
export type ComponentVariantMeta = {
  key: string; // "primary", "ghost", "outline", etc.
  label: string;
  description: string;
};

export type ComponentCategory = "primitive" | "pattern";

export type ComponentMeta = {
  slug: string;            // "button"
  name: string;            // "Button"
  description: string;
  category: ComponentCategory;
  framework: "react-native" | "web" | "both";
  tags: string[];
  variants: ComponentVariantMeta[];
  usedInScreens: string[]; // e.g. ["login-simple", "login-minimal"]
};

export const componentsRegistry: ComponentMeta[] = [
  // --- Primitives ---
  {
    slug: "text",
    name: "Text",
    category: "primitive",
    description: "Typography primitive for headings, body text, and labels with theme-aware scaling.",
    framework: "react-native",
    tags: ["typography", "primitive", "text"],
    variants: [
      { key: "heading", label: "Heading", description: "Large, bold text for page titles." },
      { key: "body", label: "Body", description: "Standard text for paragraphs and content." },
      { key: "label", label: "Label", description: "Small, medium-weight text for form labels." },
      { key: "caption", label: "Caption", description: "Smallest text for hints and metadata." },
    ],
    usedInScreens: ["login-simple", "login-minimal", "login-sheet"],
  },
  {
    slug: "surface",
    name: "Surface",
    category: "primitive",
    description: "Base container element with background color and border radius tokens.",
    framework: "react-native",
    tags: ["layout", "primitive", "container"],
    variants: [
      { key: "default", label: "Default", description: "Standard surface background." },
      { key: "card", label: "Card", description: "Surface with elevation or border for cards." },
    ],
    usedInScreens: ["login-simple"],
  },
  {
    slug: "stack",
    name: "Stack",
    category: "primitive",
    description: "Layout primitive for arranging children in vertical or horizontal stacks with spacing.",
    framework: "react-native",
    tags: ["layout", "primitive", "flexbox"],
    variants: [
      { key: "vertical", label: "Vertical", description: "Column layout with gap." },
      { key: "horizontal", label: "Horizontal", description: "Row layout with gap." },
    ],
    usedInScreens: ["login-simple", "login-minimal"],
  },
  {
    slug: "button",
    name: "Button",
    category: "primitive",
    description: "Interactive button component with support for loading states and icons.",
    framework: "react-native",
    tags: ["cta", "action", "primitive"],
    variants: [
      { key: "primary", label: "Primary", description: "High emphasis, filled button." },
      { key: "ghost", label: "Ghost", description: "Text-only button for secondary actions." },
      { key: "black", label: "Black", description: "Solid black button for high contrast." },
    ],
    usedInScreens: ["login-simple", "login-minimal"],
  },
  {
    slug: "text-input",
    name: "Text Input",
    category: "primitive",
    description: "Input field with support for labels, error states, and helper text. Supports multiple variants including outline, solid, underline, pill, and minimal.",
    framework: "react-native",
    tags: ["form", "input", "primitive"],
    variants: [
      { key: "default", label: "Default", description: "Standard outlined input." },
      { key: "pill", label: "Pill", description: "Fully rounded input for modern UIs." },
      { key: "minimal", label: "Minimal", description: "Combined email and password inputs in a single connected component." },
      { key: "outline", label: "Outline", description: "Input with border outline." },
      { key: "solid", label: "Solid", description: "Input with solid background." },
      { key: "underline", label: "Underline", description: "Input with bottom border only." },
    ],
    usedInScreens: ["login-simple", "login-minimal"],
  },
  {
    slug: "card",
    name: "Card",
    category: "primitive",
    description: "Container for grouping related content, often with a border or shadow.",
    framework: "react-native",
    tags: ["layout", "container", "primitive"],
    variants: [
      { key: "default", label: "Default", description: "Standard bordered card." },
    ],
    usedInScreens: ["login-simple"],
  },
  {
    slug: "social-button",
    name: "Social Button",
    category: "primitive",
    description: "Button tailored for social login providers (Google, Apple, etc.).",
    framework: "react-native",
    tags: ["auth", "social", "primitive"],
    variants: [
      { key: "google", label: "Google", description: "Google sign-in button." },
      { key: "apple", label: "Apple", description: "Apple sign-in button." },
    ],
    usedInScreens: ["login-simple", "login-sheet"],
  },
  {
    slug: "divider",
    name: "Divider",
    category: "primitive",
    description: "Visual separator for lists or layout sections.",
    framework: "react-native",
    tags: ["layout", "separator", "primitive"],
    variants: [
      { key: "horizontal", label: "Horizontal", description: "Horizontal line." },
    ],
    usedInScreens: ["login-simple"],
  },
  {
    slug: "icon",
    name: "Icon",
    category: "primitive",
    description: "Icon component wrapping Lucide icons for React Native.",
    framework: "react-native",
    tags: ["visual", "icon", "primitive"],
    variants: [
      { key: "default", label: "Default", description: "Standard icon." },
    ],
    usedInScreens: ["login-simple", "login-minimal"],
  },
  {
    slug: "full-background",
    name: "Full Background",
    category: "primitive",
    description: "Full-screen background component supporting gradients, shaders, images, and videos with optional overlays.",
    framework: "react-native",
    tags: ["background", "visual", "primitive", "gradient", "shader"],
    variants: [
      { key: "gradient", label: "Gradient", description: "Simple linear gradient background (e.g., #DFEBF5 to #F1D6C4)." },
      { key: "shader", label: "Shader", description: "ShaderGradient.co animated shader background." },
      { key: "image", label: "Image", description: "Image background with optional opacity overlay." },
      { key: "video", label: "Video", description: "Video background with optional opacity overlay." },
    ],
    usedInScreens: ["login-sheet"],
  },

  // --- Patterns ---
  {
    slug: "auth-card",
    name: "Auth Card",
    category: "pattern",
    description: "Centered card layout specifically designed for authentication screens.",
    framework: "react-native",
    tags: ["auth", "layout", "pattern"],
    variants: [
      { key: "default", label: "Default", description: "Centered card with padding." },
    ],
    usedInScreens: ["login-simple"],
  },
  {
    slug: "auth-header",
    name: "Auth Header",
    category: "pattern",
    description: "Header section for auth screens with title and optional subtitle/logo.",
    framework: "react-native",
    tags: ["auth", "header", "pattern"],
    variants: [
      { key: "default", label: "Default", description: "Title and subtitle stack." },
    ],
    usedInScreens: ["login-simple", "login-minimal"],
  },
  {
    slug: "form-field",
    name: "Form Field",
    category: "pattern",
    description: "Wrapper around TextInput that standardizes spacing and labels in forms.",
    framework: "react-native",
    tags: ["form", "input", "pattern"],
    variants: [
      { key: "default", label: "Default", description: "Standard form field." },
    ],
    usedInScreens: ["login-simple", "login-minimal"],
  },
  {
    slug: "floating-action-button",
    name: "Floating Action Button",
    category: "pattern",
    description: "A floating action button that expands into multiple action items arranged in an arc with smooth animations.",
    framework: "react-native",
    tags: ["action", "fab", "pattern", "animation"],
    variants: [
      { key: "bottom-center", label: "Bottom Center", description: "FAB positioned at the bottom center of the screen." },
      { key: "bottom-right", label: "Bottom Right", description: "FAB positioned at the bottom right corner." },
      { key: "bottom-left", label: "Bottom Left", description: "FAB positioned at the bottom left corner." },
    ],
    usedInScreens: [],
  },
];

export const findComponentBySlug = (slug: string) =>
  componentsRegistry.find((c) => c.slug === slug);

export const findComponentsByScreen = (screenSlug: string) =>
  componentsRegistry.filter((c) => c.usedInScreens.includes(screenSlug));
