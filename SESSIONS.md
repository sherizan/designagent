# Sessions

Human-readable handoff log. Newest first. Read this first in a new session.

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
