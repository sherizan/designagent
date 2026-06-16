import type { AccentKey } from "@/lib/marketplace";

const ACCENT: Record<AccentKey, string> = {
  figma: "bg-accent-figma text-on-accent-figma",
  review: "bg-accent-review text-on-accent-review",
  tokens: "bg-accent-tokens text-on-accent-tokens",
  community: "bg-accent-community text-on-accent-community",
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
      // stacked layers — canvas / design
      return (
        <svg {...common}>
          <path d="M12 2 2 7l10 5 10-5-10-5Z" />
          <path d="m2 17 10 5 10-5" />
          <path d="m2 12 10 5 10-5" />
        </svg>
      );
    case "review":
      // eye — design review
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
