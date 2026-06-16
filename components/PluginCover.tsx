import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import type { Plugin } from "@/lib/marketplace";
import { CategoryIcon } from "./CategoryIcon";

const COVER_BG: Record<Plugin["accent"], string> = {
  figma: "bg-accent-figma",
  review: "bg-accent-review",
  tokens: "bg-accent-tokens",
  community: "bg-accent-community",
};

const EXTS = ["png", "jpg", "jpeg", "webp"] as const;

/** Returns the public path of a real cover image if one was dropped in /public/plugins. */
function findCover(slug: string): string | null {
  for (const ext of EXTS) {
    if (existsSync(join(process.cwd(), "public", "plugins", `${slug}.${ext}`))) {
      return `/plugins/${slug}.${ext}`;
    }
  }
  return null;
}

export function PluginCover({ plugin }: { plugin: Plugin }) {
  const real = findCover(plugin.slug);

  if (real) {
    return (
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border">
        <Image
          src={real}
          alt={`${plugin.name} preview`}
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
      className={`flex aspect-[16/9] items-center justify-center rounded-xl border border-border ${COVER_BG[plugin.accent]}`}
    >
      <div className="flex items-center justify-center rounded-2xl bg-surface p-5 shadow-none">
        <CategoryIcon accent={plugin.accent} size={64} />
      </div>
    </div>
  );
}
