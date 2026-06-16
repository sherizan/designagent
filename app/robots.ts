import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://designagent.dev/sitemap.xml",
    host: "https://designagent.dev",
  };
}
