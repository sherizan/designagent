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

- ✓ Shipped 3rd plugin **`tokens`** (github.com/sherizan/designagent-tokens) — extract design tokens + drift; live on the marketplace + site.
- ✓ Shipped 4th plugin **`design-qa`** (github.com/sherizan/designagent-design-qa) — build↔design QA (vision diff + computed-style token check, bundled Playwright MCP); live.
- ✓ Shipped 5th plugin **`setup`** (github.com/sherizan/designagent-setup) — onboarding scaffolder for the 3-file design context; live. Added a 5th green accent.
- ✓ Shipped 6th plugin **`backgrounds`** (github.com/sherizan/designagent-backgrounds) — generative shader/dotgrid/ASCII backgrounds (recipe-based, brand-aware); live. Added a 6th teal accent.
- ✓ **Differentiated the `designagent` Figma bridge from the capability plugins** — site shows "The bridge" section (full-width BridgeCard, Claude Code ⇄ Figma) then "Capabilities" grid; `kind` field in the data model. Live.
- ▢ Plugin ideas backlog (ranked, build when ready): **`mobbin`** (competitor analysis via the stable Mobbin MCP — reuse designagent-old research-agent + competitor-benchmark), `a11y`, `redlines`, `palette`. Fold UX-copywriting into `superdesigner`; heuristics dropped.
- ▢ Accept first external submissions; triage the submission issue label
- ✓ Pinned all plugin sources to `ref` + `sha` (cut v-tags on all 6 repos; installs no longer track moving branches). Release flow in [RELEASING.md](RELEASING.md).
- ✓ "How to build a design plugin" guide — live at [/build](https://designagent.dev/build) (MDX, nav-linked, in sitemap)
- ▢ Newsletter / changelog for new plugin drops
- ✓ Per-plugin demo media — branded per-plugin OG social cards + detail-page covers; drop a real screenshot in `public/plugins/<slug>.{png,jpg,webp}` to override the branded cover

## Phase 3 — Platform

- ▢ Plugin install/usage analytics surfaced to authors
- ▢ "Verified" badge for plugins personally tested
- ▢ Explore a paid tier if superdesigner gets traction

## Tech debt / nice-to-have

- ✓ OG image generation per plugin page (next/og, prerendered)
- ✓ Sitemap + robots (`app/sitemap.ts` + `app/robots.ts`)
- ✓ `claude plugin validate` in CI (`.github/workflows/ci.yml`, runs on push/PR)
- ✓ Custom favicon + site OG image (brand 2×2 mark)
- ✓ Mobile headline fixed (fluid `clamp()` on `display-lg`/`display-md`)
- ✓ UI polish pass: faint hero dot-grid + tasteful motion (reduced-motion guarded), richer plugin covers, hover micro-interactions; DESIGN.md evolved a notch (texture + Motion section)
- ✓ Bumped CI actions to Node 24 (checkout@v5, setup-node@v6, pnpm/action-setup@v6) — Node-20 deprecation warning gone, CI green
- ✓ Install tip: "already added? run `/plugin marketplace update designagent`" on detail-page InstallBlock + README (prevents the stale-cache papercut)
