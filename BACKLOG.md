# Backlog

Prioritized work for the designagent marketplace + designagent.dev.
Status: ▢ todo · ◐ in progress · ✓ done

## Phase 1 — Ship

- ✓ Marketplace catalog (`.claude-plugin/marketplace.json`) referencing both plugin repos via `git-subdir`
- ✓ Next.js 16 + Tailwind v4 site: home, /plugins, /plugins/[slug], /submit
- ✓ Plugin grid generated from `marketplace.json` (single source of truth)
- ✓ GitHub Issue Form submission flow
- ◐ `superdesigner-ai`: add `claude-plugin/` package + `plugin.json` (PR in its own repo)
- ▢ Create + push `sherizan/designagent` GitHub repo
- ▢ Verify end-to-end: `/plugin marketplace add sherizan/designagent` + install both plugins
- ▢ Deploy to Vercel, point `designagent.dev`
- ▢ Submit both plugins to `claude-community` (after `claude plugin validate` passes)

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
- ▢ Reconcile accent: shipped with brand mint `#9ae6b4`; revisit if the brighter `#A5FF4D` from the original plan is preferred
