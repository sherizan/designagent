import type { AccentKey } from "@/lib/marketplace";

const ACCENT: Record<AccentKey, string> = {
  figma: "bg-accent-figma text-on-accent-figma",
  review: "bg-accent-review text-on-accent-review",
  tokens: "bg-accent-tokens text-on-accent-tokens",
  community: "bg-accent-community text-on-accent-community",
  setup: "bg-accent-setup text-on-accent-setup",
  backgrounds: "bg-accent-backgrounds text-on-accent-backgrounds",
  brand: "bg-accent-brand text-on-accent-brand",
  voice: "bg-accent-voice text-on-accent-voice",
  design: "bg-accent-design text-on-accent-design",
};

function Glyph({ accent, px = 20 }: { accent: AccentKey; px?: number }) {
  const common = {
    width: px,
    height: px,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (accent) {
    case "figma":
      // stacked layers: canvas / design
      return (
        <svg {...common}>
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </svg>
      );
    case "review":
      // eye: design review
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "tokens":
      // palette / swatches
      return (
        <svg {...common}>
          <circle cx="13.5" cy="6.5" r="2.5" />
          <circle cx="6.5" cy="11.5" r="2.5" />
          <path d="M12 22a10 10 0 1 1 10-10 4 4 0 0 1-4 4h-2a2 2 0 0 0-1.4 3.4A2 2 0 0 1 12 22Z" />
        </svg>
      );
    case "backgrounds":
      // stacked waves: generative background
      return (
        <svg {...common}>
          <path d="M2 6c3 0 3 2 5 2s2-2 5-2 3 2 5 2 3-2 5-2" />
          <path d="M2 12c3 0 3 2 5 2s2-2 5-2 3 2 5 2 3-2 5-2" />
          <path d="M2 18c3 0 3 2 5 2s2-2 5-2 3 2 5 2 3-2 5-2" />
        </svg>
      );
    case "setup":
      // sparkles / wand: scaffold & start
      return (
        <svg {...common}>
          <path d="M5 3v4" />
          <path d="M3 5h4" />
          <path d="M6 17v4" />
          <path d="M4 19h4" />
          <path d="M13 3l2.5 6.5L22 12l-6.5 2.5L13 21l-2.5-6.5L4 12l6.5-2.5L13 3Z" />
        </svg>
      );
    case "brand":
      // star: brand identity
      return (
        <svg {...common}>
          <path d="M12 2.5 15 9l7 .6-5.3 4.6 1.6 6.9L12 17.8 5.7 21l1.6-6.9L2 9.6 9 9l3-6.5Z" />
        </svg>
      );
    case "voice":
      // speech bubble: voice & tone
      return (
        <svg {...common}>
          <path d="M21 11.5a8.4 8.4 0 0 1-8.5 8.5 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 17 0Z" />
        </svg>
      );
    case "design":
      // ruler: design system
      return (
        <svg {...common}>
          <rect x="2.5" y="8.5" width="19" height="7" rx="1.5" />
          <path d="M6.5 8.5v2.5M10.5 8.5v3.5M14.5 8.5v2.5M18.5 8.5v3.5" />
        </svg>
      );
    default:
      // box / generic plugin
      return (
        <svg {...common}>
          <path d="M21 8 12 3 3 8v8l9 5 9-5V8Z" />
          <path d="m3 8 9 5 9-5" />
          <path d="M12 13v8" />
        </svg>
      );
  }
}

export function CategoryIcon({
  accent,
  size = 40,
}: {
  accent: AccentKey;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center ${ACCENT[accent]}`}
      style={{ width: size, height: size, borderRadius: size * 0.25 }}
    >
      <Glyph accent={accent} px={Math.round(size / 2)} />
    </span>
  );
}
