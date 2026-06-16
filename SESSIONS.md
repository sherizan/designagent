# Sessions

Human-readable handoff log. Newest first. Read this first in a new session.

---

## 2026-06-16 (later) — Reskin to DESIGN.md, deploy, merge superdesigner

**Status: shipped & live.** designagent.dev is in production and both plugins are installable.

**Reskin (light theme).** Sherizan exported a DesignAgent `docs/DESIGN.md` — now the authoritative UI spec, imported via `CLAUDE.md` (`@docs/DESIGN.md`). The earlier dark/mint brand was **dropped**. New system: white `#FFFFFF` surfaces, near-black `#0F0F0F` text, **black is the only action color** (no mint), depth via borders not shadows, **Inter + DM Mono**, weights ≤ 600, color only as light category tints behind plugin icons. Tokens live in `app/globals.css` `@theme` + named type-scale utilities (`.text-display-lg` … `.text-eyebrow`).
- New components: `CategoryIcon`, `StatusBadge` (Live/New/Soon), `SubmitBanner` (inverted), `Eyebrow`. Re-themed `InstallBlock` / `PluginCard` (+ featured white/black-border variant) / `PluginGrid` / `mdx`. Per-plugin presentation (status/featured/accent/author) is a `PRESENTATION` lookup in `lib/marketplace.ts` (keeps the catalog schema-clean).
- **Home simplified** (per Sherizan): hero → all plugins → submit card. Removed the install card and the "How it works" steps section as noise — landing shows value immediately. `Steps.tsx` deleted.
- Mobile fix: long install commands now **wrap** (copy button stays visible) instead of scrolling off.

**Deploy.** Installed Vercel CLI (at `~/.npm-global/bin/vercel`, not on sandbox PATH — call by full path; authed as `sherizan`). Linked `sherizan-2a05db34/designagent`, connected the GitHub repo (pushes to `main` auto-build previews). Preview → promoted to prod. **Gotcha:** Vercel's security gate blocks `next-mdx-remote@5.0.0` → upgraded to **v6** (same RSC API, no code change). `designagent.dev` + `www` already aliased; site is fully static (8 prerendered routes). Per-deployment `*.vercel.app` URLs are 401 (Deployment Protection) but the apex domain is public (200).

**superdesigner.** PR #8 **merged** (squash) → `claude-plugin/` now on `superdesigner-ai` `main`. Verified end-to-end: `marketplace add` + `install superdesigner@designagent` succeeds; cleaned up after.

**Open:** submit both to `claude-community` (interactive); custom favicon/OG; responsive headline step-down on small mobile. See BACKLOG.md.

---

## 2026-06-16 — Pivot + scaffold

**What this repo is now.** `designagent` pivoted from the npm CLI (renamed to
`sherizan/designagent-old`) into a **curated Claude Code plugin marketplace for
designers**, plus the `designagent.dev` website. The repo holds the catalog and
the site; each plugin lives in its own repo and is *referenced*, not vendored.

**Decisions locked this session:**
- Reference plugin repos via `git-subdir` in `marketplace.json` (no vendored copies → no drift).
- Flagship Figma plugin keeps its name `designagent` → install reads `designagent@designagent`.
- Website: Next.js 16 + Tailwind v4; plugin grid generated from `marketplace.json`; MDX only for long-form docs.
- Submissions via a GitHub Issue Form (zero backend).
- Brand accent shipped as mint `#9ae6b4` (established brand) over the plan's `#A5FF4D`.

**Built:**
- `.claude-plugin/marketplace.json` — `designagent` (git-subdir → designagent-figma/claude-plugin) + `superdesigner` (git-subdir → superdesigner-ai/claude-plugin).
- Next.js 16.2.9 / React 19 / Tailwind v4 app: `app/` (home, plugins, plugins/[slug], submit), `components/` (InstallBlock, PluginCard, PluginGrid, mdx), `lib/marketplace.ts` + `lib/plugins.ts`.
- `content/plugins/{designagent-figma,superdesigner}.mdx`.
- `.github/ISSUE_TEMPLATE/plugin-submission.yml`, README, BACKLOG.md.

**State of the two plugins:**
- `designagent-figma` — already a complete, valid plugin (name `designagent` v0.14.3, bundled MCP + `design-to-code` skill). Referenced as-is; **not modified**.
- `superdesigner-ai` — plugin-*ready* (8 agents + review command + rubric in `.claude/`) but **not yet a plugin**. Needs a `claude-plugin/` package added in its own repo. ← next.

**Next actions (see BACKLOG.md):**
1. Add `claude-plugin/` to `superdesigner-ai` + open PR; `claude plugin validate`.
2. `gh repo create sherizan/designagent --public` and push. Note: the name currently redirects to `designagent-old` (old CLI was renamed) — creating the repo removes that redirect; `designagent-old` stays directly reachable.
3. Verify install end-to-end inside Claude Code.
4. Deploy to Vercel; point `designagent.dev`.

**Working-style note:** gate (typecheck/build) then push as separate steps; open plugin changes as PRs.
