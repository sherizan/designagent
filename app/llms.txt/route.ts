import { getMarketplace, MARKETPLACE_REPO } from "@/lib/marketplace";

export const dynamic = "force-static";

/** llms.txt (llmstxt.org): a plain-markdown map of the site for generative engines. */
export function GET() {
  const { plugins } = getMarketplace();
  const body = [
    "# designagent",
    "",
    "> A curated marketplace of Claude Code plugins built for designers. Figma, design review, and more.",
    "",
    `Add the marketplace in Claude Code: \`/plugin marketplace add ${MARKETPLACE_REPO}\``,
    "",
    "## Plugins",
    "",
    ...plugins.map(
      (p) =>
        `- [${p.title}](https://designagent.dev/plugins/${p.slug}): ${p.description} Install: \`${p.install.install}\``,
    ),
    "",
    "## Docs",
    "",
    "- [How to build a design plugin](https://designagent.dev/build): plugin shapes, manifest, skills, validate and ship.",
    "- [Submit a plugin](https://designagent.dev/submit): how to get a plugin listed.",
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
