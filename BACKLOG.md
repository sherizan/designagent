# Backlog

Prioritized work for the designagent marketplace + designagent.dev.
Status: ▢ todo · ◐ in progress · ✓ done

## Phase 1 — Ship  ✓ COMPLETE

- ✓ Marketplace catalog (`.claude-plugin/marketplace.json`) referencing both plugin repos via `git-subdir`
- ✓ Next.js 16 + Tailwind v4 site: home, /plugins, /plugins/[slug], /submit
- ✓ Plugin grid generated from `marketplace.json` (single source of truth)
- ✓ GitHub Issue Form submission flow
- ✓ `superdesigner-ai`: added `claude-plugin/` package + `plugin.json` (PR #8 merged to `main`)
- ✓ Created + pushed `sherizan/designagent` GitHub repo (old CLI renamed → `designagent-old`)
- ✓ Reskinned the whole site to `docs/DESIGN.md` (light theme, Inter + DM Mono, black as the only action color); home simplified to hero → plugins → submit card
- ✓ Verified end-to-end: `marketplace add` + `install superdesigner@designagent` resolves the git-subdir source
- ✓ Deployed to Vercel — **live at https://designagent.dev** (prod); GitHub repo connected for auto preview builds
- ✓ Submitted both plugins to `claude-community` (manual web submission at claude.ai/admin-settings/directory)

## Phase 2 — Community

- ▢ Accept first external submissions; triage the submission issue label
- ▢ Pin plugin sources to a `ref`/`sha` once each repo cuts a tagged release (currently tracking default branch)
- ▢ "How to build a design plugin" guide (the moat)
- ▢ Newsletter / changelog for new plugin drops
- ▢ Per-plugin screenshots / demo media in `public/plugins/`

## Phase 3 — Platform

- ▢ Plugin install/usage analytics surfaced to authors
- ▢ "Verified" badge for plugins personally tested
- ▢ Explore a paid tier if superdesigner gets traction

## Tech debt / nice-to-have

- ▢ OG image generation per plugin page
- ▢ Sitemap + robots
- ▢ `claude plugin validate` in CI on PRs
- ▢ Mobile polish: `display-lg` (52px) headline is large on ≤390px — consider a responsive step-down
- ▢ Custom favicon / OG image (still the create-next-app default favicon)
