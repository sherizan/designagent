import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** The marketplace name users type after `@` when installing. */
export const MARKETPLACE = "designagent";
/** The repo users add with `/plugin marketplace add`. */
export const MARKETPLACE_REPO = "sherizan/designagent";

type RawSource =
  | string
  | { source: "git-subdir"; url: string; path: string; ref?: string }
  | { source: "github"; repo: string; ref?: string }
  | { source: "url"; url: string; ref?: string };

interface RawPlugin {
  name: string;
  description: string;
  source: RawSource;
  category?: string;
  tags?: string[];
  homepage?: string;
}

interface RawMarketplace {
  name: string;
  owner: { name: string; email?: string; url?: string };
  metadata?: { description?: string; version?: string };
  plugins: RawPlugin[];
}

export type PluginStatus = "live" | "new" | "soon";
/** Kind: a `bridge` connects Claude Code to an external surface (e.g. Figma); a `capability` is something Claude Code does. */
export type PluginKind = "bridge" | "capability";
export type AccentKey =
  | "figma"
  | "review"
  | "tokens"
  | "community"
  | "setup"
  | "backgrounds"
  | "voice"
  | "brand"
  | "design";

export interface Plugin {
  /** Canonical plugin name (what you install, e.g. "designagent"). */
  name: string;
  /** Display title shown in the UI (falls back to name). */
  title: string;
  /** URL slug for /plugins/[slug], derived from homepage, falls back to name. */
  slug: string;
  description: string;
  category: string;
  tags: string[];
  /** The GitHub repo this plugin lives in, e.g. "sherizan/designagent-figma". */
  repo: string | null;
  homepage: string | null;
  /** The two-line install command, ready to render. */
  install: { add: string; install: string };
  /** Presentation (DESIGN.md): status badge, featured card, icon accent, author handle. */
  status: PluginStatus;
  featured: boolean;
  accent: AccentKey;
  author: string;
  kind: PluginKind;
  /** Workflow category for site grouping (how designers work, e.g. "Visual & build"). */
  group: string;
  /** Public path to a per-plugin square logo, if dropped in /public/plugins/<slug>/. */
  logo: string | null;
  /** Public path to a per-plugin 16:9 banner, if dropped in /public/plugins/<slug>/. */
  banner: string | null;
}

/**
 * Per-plugin presentation, keyed by plugin name. Kept here (not in marketplace.json)
 * so the catalog stays schema-clean for `claude plugin validate`.
 */
const PRESENTATION: Record<
  string,
  { status: PluginStatus; featured: boolean; accent: AccentKey; author: string; kind: PluginKind; group: string; title?: string; hidden?: boolean }
> = {
  designagent: { status: "live", featured: true, accent: "figma", author: "@sherizan", kind: "bridge", group: "Visual & build", title: "Design Agent - Claude Bridge" },
  designreview: { status: "new", featured: false, accent: "review", author: "@sherizan", kind: "capability", group: "Review & QA" },
  tokens: { status: "new", featured: false, accent: "tokens", author: "@sherizan", kind: "capability", group: "Visual & build" },
  "design-qa": { status: "new", featured: false, accent: "community", author: "@sherizan", kind: "capability", group: "Review & QA" },
  setup: { status: "new", featured: false, accent: "setup", author: "@sherizan", kind: "capability", group: "Brand & context", hidden: true },
  backgrounds: { status: "new", featured: false, accent: "backgrounds", author: "@sherizan", kind: "capability", group: "Visual & build" },
  brand: { status: "new", featured: false, accent: "brand", author: "@sherizan", kind: "capability", group: "Brand & context", title: "BRAND.md" },
  voice: { status: "new", featured: false, accent: "voice", author: "@sherizan", kind: "capability", group: "Brand & context", title: "VOICE.md" },
  design: { status: "new", featured: false, accent: "design", author: "@sherizan", kind: "capability", group: "Brand & context", title: "DESIGN.md" },
};

/** Best-effort accent from tags/category when a plugin isn't in PRESENTATION. */
function accentFor(p: { tags: string[]; category: string }): AccentKey {
  const hay = [...p.tags, p.category].join(" ").toLowerCase();
  if (hay.includes("figma") || hay.includes("canvas")) return "figma";
  if (hay.includes("review") || hay.includes("critique") || hay.includes("ux")) return "review";
  if (hay.includes("token") || hay.includes("design-system")) return "tokens";
  if (hay.includes("shader") || hay.includes("background") || hay.includes("generative") || hay.includes("ascii")) return "backgrounds";
  if (hay.includes("setup") || hay.includes("onboarding") || hay.includes("scaffold")) return "setup";
  return "community";
}

const ASSET_EXTS = ["png", "jpg", "jpeg", "webp"];

/** Public path of a per-plugin asset (banner|logo) if present in /public/plugins/<slug>/. */
function findAsset(slug: string, kind: "banner" | "logo"): string | null {
  for (const ext of ASSET_EXTS) {
    const rel = `plugins/${slug}/${slug}-${kind}.${ext}`;
    if (existsSync(join(process.cwd(), "public", rel))) return `/${rel}`;
  }
  return null;
}

function slugFromHomepage(homepage: string | undefined, name: string): string {
  if (!homepage) return name;
  const seg = homepage.split("/").filter(Boolean).pop();
  return seg && seg !== "plugins" ? seg : name;
}

function repoFromSource(source: RawSource): string | null {
  if (typeof source === "string") return null;
  if (source.source === "github") return source.repo;
  if (source.source === "git-subdir" || source.source === "url") {
    const m = source.url.match(/github\.com[/:]([^/]+\/[^/.]+)(?:\.git)?/);
    return m ? m[1] : null;
  }
  return null;
}

// marketplace catalog cache (per server process)
let cache: { name: string; description: string; plugins: Plugin[] } | null = null;

export function getMarketplace() {
  if (cache) return cache;

  const raw = JSON.parse(
    readFileSync(join(process.cwd(), ".claude-plugin", "marketplace.json"), "utf8"),
  ) as RawMarketplace;

  const plugins: Plugin[] = raw.plugins
    .filter((p) => !PRESENTATION[p.name]?.hidden)
    .map((p) => {
    const tags = p.tags ?? [];
    const category = p.category ?? "design";
    const pres = PRESENTATION[p.name];
    const slug = slugFromHomepage(p.homepage, p.name);
    return {
      name: p.name,
      title: pres?.title ?? p.name,
      slug,
      description: p.description,
      category,
      tags,
      repo: repoFromSource(p.source),
      homepage: p.homepage ?? null,
      install: {
        add: `/plugin marketplace add ${MARKETPLACE_REPO}`,
        install: `/plugin install ${p.name}@${MARKETPLACE}`,
      },
      status: pres?.status ?? "soon",
      featured: pres?.featured ?? false,
      accent: pres?.accent ?? accentFor({ tags, category }),
      author: pres?.author ?? "@sherizan",
      kind: pres?.kind ?? "capability",
      group: pres?.group ?? "Visual & build",
      logo: findAsset(slug, "logo"),
      banner: findAsset(slug, "banner"),
    };
  });

  cache = {
    name: raw.name,
    description: raw.metadata?.description ?? "",
    plugins,
  };
  return cache;
}

export function getPlugins(): Plugin[] {
  return getMarketplace().plugins;
}

export function getPlugin(slug: string): Plugin | undefined {
  return getPlugins().find((p) => p.slug === slug);
}

/** The bridge plugins (connect Claude Code to an external surface, e.g. Figma). */
export function getBridges(): Plugin[] {
  return getPlugins().filter((p) => p.kind === "bridge");
}

/** The capability plugins (things Claude Code does). */
export function getCapabilities(): Plugin[] {
  return getPlugins().filter((p) => p.kind === "capability");
}

/** Workflow categories (how designers work), in display order. */
export const CAPABILITY_GROUPS = [
  "Brand & context",
  "Visual & build",
  "Review & QA",
] as const;

/** Capability plugins bucketed by workflow category; only non-empty groups, in order. */
export function getCapabilityGroups(): { group: string; plugins: Plugin[] }[] {
  const caps = getCapabilities();
  return CAPABILITY_GROUPS.map((group) => ({
    group,
    plugins: caps.filter((p) => p.group === group),
  })).filter((g) => g.plugins.length > 0);
}

export function getCategories(): string[] {
  return Array.from(new Set(getPlugins().map((p) => p.category))).sort();
}
