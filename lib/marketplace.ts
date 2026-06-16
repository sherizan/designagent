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

  const plugins: Plugin[] = raw.plugins.map((p) => ({
    name: p.name,
    slug: slugFromHomepage(p.homepage, p.name),
    description: p.description,
    category: p.category ?? "design",
    tags: p.tags ?? [],
    repo: repoFromSource(p.source),
    homepage: p.homepage ?? null,
    install: {
      add: `/plugin marketplace add ${MARKETPLACE_REPO}`,
      install: `/plugin install ${p.name}@${MARKETPLACE}`,
    },
  }));

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

export function getCategories(): string[] {
  return Array.from(new Set(getPlugins().map((p) => p.category))).sort();
}
