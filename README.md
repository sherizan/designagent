# designagent

**Claude Code plugins for designers.** A curated third-party marketplace —
Figma, design review, and more. Find a plugin, install it in one command, and
it just works.

→ Website: [designagent.dev](https://designagent.dev)

## Install a plugin

Inside Claude Code:

```
/plugin marketplace add sherizan/designagent
/plugin install designagent@designagent
```

Swap `designagent` for any plugin in the [catalog](#whats-in-the-marketplace).

## What's in the marketplace

| Plugin | What it does | Source |
| --- | --- | --- |
| `designagent` | Claude Code's live two-way bridge to Figma — read, build, and edit the canvas, then build production UI from a `DESIGN.md` spec. | [designagent-figma](https://github.com/sherizan/designagent-figma) |
| `superdesigner` | AI design review — connects PRD, research, Figma, and analytics to surface gaps before handoff. | [superdesigner-ai](https://github.com/sherizan/superdesigner-ai) |

The catalog is [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json).
It **references** each plugin's own repo (via `git-subdir`) rather than vendoring
copies — one source of truth per plugin, no drift.

## Submit a plugin

Built a Claude Code plugin for designers? [Open a submission issue](https://github.com/sherizan/designagent/issues/new?template=plugin-submission.yml)
or see the criteria at [designagent.dev/submit](https://designagent.dev/submit).

## The website

This repo also hosts the [designagent.dev](https://designagent.dev) site — a
Next.js 16 (App Router) + Tailwind v4 app. The plugin grid is generated directly
from `marketplace.json`; long-form plugin docs live in `content/plugins/*.mdx`.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

## Repo layout

```
.claude-plugin/marketplace.json   the catalog (references plugin repos)
app/                              Next.js 16 site (designagent.dev)
components/                       InstallBlock, PluginGrid, PluginCard, mdx
lib/marketplace.ts                parses marketplace.json → typed plugins
lib/plugins.ts                    loads long-form MDX docs
content/plugins/*.mdx             per-plugin deep-dives
.github/ISSUE_TEMPLATE/           plugin submission form
BACKLOG.md · SESSIONS.md          roadmap + session log
```

## License

MIT for this repo's site + catalog. Each plugin carries its own license in its
source repository.
