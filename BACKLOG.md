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
- ▢ Plugin ideas backlog (ranked, build when ready): **`mobbin`** (competitor analysis via the stable Mobbin MCP — reuse designagent-old research-agent + competitor-benchmark), `a11y`, `redlines`, `palette`. Fold UX-copywriting into `designreview`; heuristics dropped.
- ▢ Accept first external submissions; triage the submission issue label
- ✓ Pinned all plugin sources to `ref` + `sha` (cut v-tags on all 6 repos; installs no longer track moving branches). Release flow in [RELEASING.md](RELEASING.md).
- ✓ "How to build a design plugin" guide — live at [/build](https://designagent.dev/build) (MDX, nav-linked, in sitemap)
- ✓ Per-plugin "How it works" **flow diagram** on every detail page (custom branded `FlowDiagram`, data-driven `lib/flows.ts`; horizontal pipeline → stacks on mobile)
- ▢ Newsletter / changelog for new plugin drops
- ✓ Per-plugin demo media — branded per-plugin OG social cards + detail-page covers; drop a real screenshot in `public/plugins/<slug>.{png,jpg,webp}` to override the branded cover

## Rebrand & growth (queued 2026-07-04)

- ✓ **Header menu** — removed "Home" and "Submit" from the nav capsule (Home = logo click; Submit stays as the CTA button). Leaves Plugins + Build.
- ▢ **GSAP** — add GSAP for stronger overall animation (scroll-driven, entrance, hover); still honor `prefers-reduced-motion`.
- ▢ **Categorise plugins by how designers work** — group by workflow stage (research, UX, copy, visual, motion, …) instead of / alongside the current bridge-vs-capability split. Target buckets = the ecosystem map in "Brand context stack" below.
- ▢ **Proper logo** — replace the 2×2 placeholder mark with a real brand logo/wordmark.
- ▢ **New quality visuals** — design higher-craft visuals for the plugin cards and the copy/install command box.
- ▢ **Google Analytics** — add GA.
- ▢ **GEO / SEO** — optimise for generative-engine optimisation + traditional SEO.
- ▢ **Demo videos** — add a demo video per plugin.
- ✓ **Clean up footer** — restructured into brand + Explore/Connect columns + a copyright/built-by bottom bar.
- ✓ **Contact** — direct link to reach Sherizan on [x.com/sherizan](https://x.com/sherizan) (footer Connect column + built-by line).

## Brand context stack (plugin family) — planned 2026-07-05

A family of thin, single-purpose plugins named after the artifact file each owns,
marketed as `NAME.md` (instantly legible = the file it produces) but each a full
Claude Code plugin underneath. These came directly out of building this site — the
em-dash voice pass, the DESIGN.md rule-enforcement we did by hand, and building the
Coco mascot + voice.

**The stack — the `.md` files ARE the shared interface (source of truth):**

```
BRAND.md   who it is: identity, personality, mascot/character, the promise
  ├─▶ VOICE.md   how it talks: tone, do/don't phrases, the character's voice
  └─▶ DESIGN.md  how it looks: tokens, type, components + the Do's/Don'ts rules
      (+ existing CLAUDE.md = design brain, DECISIONS.md = log)
```

**The three new plugins (all ▢, marketed as `.md`):**
- ▢ **`BRAND.md`** — brand identity + the mascot/character generator (interview →
  persona + monoline SVG portrait + placements); seeds VOICE.md + DESIGN.md.
- ▢ **`VOICE.md`** — voice & tone; the `proofread` copy scrubber (removes AI tells:
  em dashes, hype, filler; enforces a house voice) that never touches install
  commands, plugin ids, tool names, or code. Distinct from `designreview` (scrub/
  enforce vs. intent review).
- ▢ **`DESIGN.md`** — owns the design system: scaffold + keep in sync + lint code
  against its own Do's/Don'ts rules (the "conformance" idea, folded in — DESIGN.md
  enforcing itself, not a separate technical plugin).

**Packaging: separate thin plugins, not one mega-plugin.** Better UX (legible cards,
install-what-you-need, focused command namespaces) + scalability (independent
evolution/releases, one repo each, extensible to future `MOTION.md`/`A11Y.md`). Two
moves remove the downside: (1) **files are the interface** — plugins coordinate
through the shared markdown, each runs standalone and reads the others *if present*
(the loose-coupling pattern `setup`/`tokens`/`design-qa` already use via DESIGN.md);
(2) **`setup` = the one-command orchestrator** so full-stack onboarding isn't three
installs.

**Naming:** display name `NAME.md` via the plugin `title` field (the title↔name
decoupling already exists in `lib/marketplace.ts` `PRESENTATION`, added for "Design
Agent - Claude Bridge"); install `name` stays a clean slug. Verify at build whether
a literal dot is allowed in a plugin name (`/plugin install design.md@designagent`)
via `claude plugin validate`; if not, use slug `design` + `title: "DESIGN.md"`.

**Fits with existing plugins:** `setup` = orchestrator (still writes CLAUDE.md /
DECISIONS.md); `tokens` feeds DESIGN.md from code; `design-qa` = visual QA vs
DESIGN.md. `.md` naming applies only to the three context-owner plugins; the tools
(`designagent` bridge, `tokens`, `design-qa`) keep their names.

**Build order:** `VOICE.md`/proofread first (clearest, quickest) → `BRAND.md`
(mascot, most differentiated) → `DESIGN.md` (extract from `setup` + rule-lint).

**Ecosystem map (all plugins)** — ● live · ✦ new (this family) · ○ backlog:

| Category (how designers work) | Plugins |
|---|---|
| Research | `mobbin` ○ |
| Brand & context | `setup` ● · `BRAND.md` ✦ · `VOICE.md` ✦ · `DESIGN.md` ✦ |
| Visual & build | `designagent` ● · `tokens` ● · `backgrounds` ● · `palette` ○ |
| Copy | `VOICE.md` ✦ (`proofread`) |
| Review & QA | `designreview` ● · `design-qa` ● · `proofread` ✦ · `design-lint` ✦ · `a11y` ○ · `redlines` ○ |
| Motion | *(future)* `MOTION.md` |

The `/plugins` page should reorganize into these categories (see "Categorise plugins
by how designers work" above) once the family exists — the context plugins
intentionally span two buckets (they define a file AND enforce it).

## Phase 3 — Platform

- ▢ Plugin install/usage analytics surfaced to authors
- ▢ "Verified" badge for plugins personally tested
- ▢ Explore a paid tier if designreview gets traction

## Tech debt / nice-to-have

- ✓ OG image generation per plugin page (next/og, prerendered)
- ✓ Sitemap + robots (`app/sitemap.ts` + `app/robots.ts`)
- ✓ `claude plugin validate` in CI (`.github/workflows/ci.yml`, runs on push/PR)
- ✓ Custom favicon + site OG image (brand 2×2 mark)
- ✓ Mobile headline fixed (fluid `clamp()` on `display-lg`/`display-md`)
- ✓ UI polish pass: faint hero dot-grid + tasteful motion (reduced-motion guarded), richer plugin covers, hover micro-interactions; DESIGN.md evolved a notch (texture + Motion section)
- ✓ Bumped CI actions to Node 24 (checkout@v5, setup-node@v6, pnpm/action-setup@v6) — Node-20 deprecation warning gone, CI green
- ✓ Install tip: "already added? run `/plugin marketplace update designagent`" on detail-page InstallBlock + README (prevents the stale-cache papercut)
