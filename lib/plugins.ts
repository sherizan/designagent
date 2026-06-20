import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

const CONTENT_DIR = join(process.cwd(), "content", "plugins");

export interface PluginDoc {
  slug: string;
  frontmatter: Record<string, unknown>;
  body: string;
}

/** Load the long-form MDX doc for a plugin slug, if one exists. */
export function getPluginDoc(slug: string): PluginDoc | null {
  const file = join(CONTENT_DIR, `${slug}.mdx`);
  if (!existsSync(file)) return null;
  const { data, content } = matter(readFileSync(file, "utf8"));
  return { slug, frontmatter: data, body: content };
}

/** Load a standalone MDX doc from content/<name>.mdx (e.g. the build guide). */
export function getContentDoc(name: string): PluginDoc | null {
  const file = join(process.cwd(), "content", `${name}.mdx`);
  if (!existsSync(file)) return null;
  const { data, content } = matter(readFileSync(file, "utf8"));
  return { slug: name, frontmatter: data, body: content };
}

export function getDocSlugs(): string[] {
  if (!existsSync(CONTENT_DIR)) return [];
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
