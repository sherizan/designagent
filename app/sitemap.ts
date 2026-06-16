import type { MetadataRoute } from "next";
import { getPlugins } from "@/lib/marketplace";

const BASE = "https://designagent.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/plugins`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/submit`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const pluginRoutes: MetadataRoute.Sitemap = getPlugins().map((p) => ({
    url: `${BASE}/plugins/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...pluginRoutes];
}
