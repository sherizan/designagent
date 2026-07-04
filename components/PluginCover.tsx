import Image from "next/image";
import type { Plugin } from "@/lib/marketplace";
import { CategoryIcon } from "./CategoryIcon";

const COVER_BG: Record<Plugin["accent"], string> = {
  figma: "bg-accent-figma",
  review: "bg-accent-review",
  tokens: "bg-accent-tokens",
  community: "bg-accent-community",
  setup: "bg-accent-setup",
  backgrounds: "bg-accent-backgrounds",
};

export function PluginCover({ plugin }: { plugin: Plugin }) {
  if (plugin.banner) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
        <Image
          src={plugin.banner}
          alt={`${plugin.title} preview`}
          fill
          sizes="(max-width: 760px) 100vw, 760px"
          className="object-cover"
        />
      </div>
    );
  }

  // Branded fallback cover — no fake screenshot, just on-brand media.
  return (
    <div
      className={`relative flex aspect-[16/9] flex-col items-center justify-center gap-4 overflow-hidden rounded-xl border border-border ${COVER_BG[plugin.accent]}`}
    >
      <div
        aria-hidden
        className="bg-crosshair pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative flex items-center justify-center rounded-2xl border border-border bg-surface p-5">
        <CategoryIcon accent={plugin.accent} size={64} />
      </div>
      <span className="text-mono-sm relative text-on-surface-muted">
        {plugin.title}
      </span>
    </div>
  );
}
