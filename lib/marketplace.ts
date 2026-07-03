import { readFileSync } from "node:fs";
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
  | "backgrounds";

export interface Plugin {
  /** Canonical plugin name (what you install). */
  name: string;
  /** URL slug for /plugins/[slug] — derived from homepage, falls back to name. */
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
}

/**
 * Per-plugin presentation, keyed by plugin name. Kept here (not in marketplace.json)
 * so the catalog stays schema-clean for `claude plugin validate`.
 */
const PRESENTATION: Record<
  string,
  { status: PluginStatus; featured: boolean; accent: AccentKey; author: string; kind: PluginKind }
> = {
  designagent: { status: "live", featured: true, accent: "figma", author: "@sherizan", kind: "bridge" },
  designreview: { status: "new", featured: false, accent: "review", author: "@sherizan", kind: "capability" },
  tokens: { status: "new", featured: false, accent: "tokens", author: "@sherizan", kind: "capability" },
  "design-qa": { status: "new", featured: false, accent: "community", author: "@sherizan", kind: "capability" },
  setup: { status: "new", featured: false, accent: "setup", author: "@sherizan", kind: "capability" },
  backgrounds: { status: "new", featured: false, accent: "backgrounds", author: "@sherizan", kind: "capability" },
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

let cache: { name: string; description: string; plugins: Plugin[] } | null = null;

export function getMarketplace() {
  if (cache) return cache;

  const raw = JSON.parse(
    readFileSync(join(process.cwd(), ".claude-plugin", "marketplace.json"), "utf8"),
  ) as RawMarketplace;

  const plugins: Plugin[] = raw.plugins.map((p) => {
    const tags = p.tags ?? [];
    const category = p.category ?? "design";
    const pres = PRESENTATION[p.name];
    return {
      name: p.name,
      slug: slugFromHomepage(p.homepage, p.name),
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

export function getCategories(): string[] {
  return Array.from(new Set(getPlugins().map((p) => p.category))).sort();
}
