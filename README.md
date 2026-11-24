# designagent

**Claude Code's live two-way bridge to Figma.** Claude reads what's on the canvas,
builds and edits it in place, and builds production UI from a design-system-faithful
`DESIGN.md`.

→ Website: [designagent.dev](https://designagent.dev)

## Install

Inside Claude Code:

```
/plugin marketplace add sherizan/designagent
/plugin install designagent@designagent
```

Then add the other half in Figma:
[DesignAgent on Figma Community](https://www.figma.com/community/plugin/1604428052675393154/designagent-claude-bridge).

> **Already added the marketplace before?** `add` won't re-pull a cached copy, so run
> `/plugin marketplace update designagent` to refresh the catalog, then install.

The plugin's source lives in [designagent-figma](https://github.com/sherizan/designagent-figma).
The catalog, [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json),
**references** that repo (via `git-subdir`) rather than vendoring a copy.

## The website

This repo also hosts the [designagent.dev](https://designagent.dev) site, a
Next.js 16 (App Router) + Tailwind v4 app. The bridge's install commands come from
`marketplace.json`; its release notes live in `content/plugins/designagent-figma.mdx`.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

## Repo layout

```
.claude-plugin/marketplace.json   the catalog (references plugin repos)
app/                              Next.js 16 site (designagent.dev)
components/                       DemoStage, InstallBlock, ToolsSection, mdx
lib/marketplace.ts                parses marketplace.json → typed plugins
lib/plugins.ts                    loads long-form MDX docs
content/plugins/*.mdx             the bridge's docs and release notes
BACKLOG.md · SESSIONS.md          roadmap + session log
```

## License

MIT for this repo's site + catalog. Each plugin carries its own license in its
source repository.
