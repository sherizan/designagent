# Sessions

Human-readable handoff log. Newest first. Read this first in a new session.

---

## 2026-07-06 → 07-08 — telemetry endpoint, bridge-page depth, blueprint+GSAP visual system, catalog trim

- **`POST /api/telemetry`** — anonymous tool-usage counts from the DesignAgent MCP bridge, tallied
  into Upstash Redis via plain REST (no client dep). Provisioned via
  `vercel integration add upstash/upstash-kv` (resource `upstash-kv-red-globe`, `KV_*` env).
  Keys: `tools:total` + `tools:YYYY-MM` hashes, `users:YYYY-MM` HLL. Returns 503 harmlessly if
  env is missing. **Trim review 2026-07-13** → read `tools:2026-07`, cut tools in the plugin
  repo, then update `lib/tools.ts` here.
- **Bridge detail page** — full tool reference (43 tools, 8 groups: `lib/tools.ts` +
  `ToolsSection`, per-slug like `flows.ts`) and a **Release notes** MDX section (v0.18–0.20).
  Source of truth for the tool list is the plugin repo's `server.ts` — hand-sync on releases.
- **Blueprint + GSAP visual system** (closes two backlog items). Shared `.card` recipe: accent
  border sweep, corner crosshairs drawing in, +grid ground; whisper-level **grain-mesh** texture
  on every card, full-strength `.cover-mesh` on fallback covers, hero mesh dissolving into the
  paper (gotcha: `color-mix(…, transparent)` muddies to black — use `rgb(from … / a)`).
  `.copy-box` terminal treatment (border comet + aura, the one allowed glow) + WebAudio copy
  blip. GSAP 3.15 via ONE client entry point `components/ScrollMotion.tsx`: `data-reveal` scroll
  stagger, `data-tilt` ≤2.5° card tilt, `data-magnetic` CTA pull. Header is transparent at top
  and surfaces on scroll; nav has a single GSAP pill gliding between links. Conventions codified
  in `.claude/skills/gsap` + DESIGN.md (elevation/motion/texture sections updated).
- **Catalog** — `setup` hidden (presentation flag; unhide by deleting it), `VOICE.md` moved to
  Brand & context, Copy group removed. designagent pin bumped v0.17.3 → **v0.20.0**
  (telemetry / Update card / `export_asset` releases — see the plugin repo's SESSIONS.md).

**Open:** author-facing analytics surfacing (collection now exists); retune mesh/glow/blip by
taste; the Figma Community publish of the plugin is pending in the other repo.

---

## 2026-06-20 — Flow diagrams + build guide + pin sources + papercut fixes

- **Per-plugin flow diagram** on every detail page ("How it works", input → skill/agents → tools → output). Custom branded `components/FlowDiagram.tsx` fed by typed `lib/flows.ts` (6 flows). Responsive: horizontal pipeline with `→` on desktop, stacks with `↓` on mobile; kind eyebrow tinted by the plugin accent; item chips for tools/agents/files; accessible (`role=img` + summary label). `DESIGN.md` gained a "Flow Diagram" component note.

- **"How to build a design plugin" guide** (the moat) — live at `/build`. `content/build.mdx` rendered by `app/build/page.tsx` (via `getContentDoc()` in `lib/plugins.ts`); "Build" added to nav; `/submit` links to it; in the sitemap. Covers the four plugin shapes (skill+assets / skill+binary / skill+MCP / command), the manifest, the design-intelligence layer, writing the skill's trigger description, and validate→ship→submit. Drawn from building the 6 marketplace plugins.

- **Pinned all 6 plugin sources** in `marketplace.json` to `ref` + `sha` (was tracking each repo's `main`). Cut v-tags at the live HEADs: `designagent-figma` v0.14.13 (actively developed — its pin lags `main` by design), the other 5 v0.1.0. `sha` is the effective pin. **A WIP push to any plugin repo can no longer reach users.** New release flow documented in `RELEASING.md` (tag → bump `ref`+`sha` in marketplace.json → push → users `/plugin marketplace update`). Verified: validate `--strict`, build, and pinned install end-to-end from both local + live remote catalog.
- **Install papercut:** a cached `/plugin marketplace add` doesn't re-pull — added a "run `/plugin marketplace update designagent`" tip to the detail-page InstallBlock + README.
- **CI:** bumped actions to Node 24 (checkout@v5, setup-node@v6, pnpm/action-setup@v6); green, no more Node-20 deprecation warning.

---

## 2026-06-19 — Frontend/UI polish pass

**Status: shipped & live.** A four-area UI pass, "evolve the spec a notch" (DESIGN.md updated to match).
- **Hero/landing:** faint, masked **dot-grid** behind the hero only (`.hero-grid` in `app/globals.css`); staggered `animate-rise` entrance.
- **Motion:** `animate-rise` keyframes + `.delay-1/2/3`; arrow-nudge on card hover (`PluginCard`/`BridgeCard`); `InstallBlock` shows `✓ copied`. **Global `prefers-reduced-motion` guard** zeroes all animation/transition durations.
- **Detail covers:** `PluginCover` is now a designed branded cover (accent ground + faint `.bg-dotgrid` + icon tile + mono name), still overridable by a real `public/plugins/<slug>.*`.
- **Mobile:** `.text-display-lg`/`-md` are now fluid (`clamp()`), fixing the oversized headline at ≤390px.
- **`docs/DESIGN.md` evolved:** added a "Texture (the one permitted exception)" note (hero/cover dot-grid only) + a new **Motion** section; everything else (pure white, borders-not-shadows, weights ≤600) intact. `CLAUDE.md` already imports it.
- Verified: build clean (21 routes), Playwright desktop + mobile (390), 0 console errors; reduced-motion guard is the canonical global pattern. Site-only change; deployed to prod.

---

## 2026-06-16 → 19 — Grew the catalog to 6 plugins + bridge/capabilities split

**Status: all shipped & live in production.** The marketplace went from 2 → **6 plugins**, plus SEO/OG
infra and an information-architecture change. Each new plugin is its own public repo, referenced from
`.claude-plugin/marketplace.json` via `git-subdir`, and follows the proven additive pattern
(repo → marketplace entry → `PRESENTATION` row → `content/plugins/<slug>.mdx` → gate → push → `vercel --prod`).
The site is data-driven, so grid/detail/OG/sitemap pick up new plugins automatically.

**Site infra (one pass):** custom favicon (`app/icon.svg`, brand 2×2 mark) + site & per-plugin OG
images (`next/og`, prerendered), `app/sitemap.ts` + `app/robots.ts`, and CI
(`.github/workflows/ci.yml`: `pnpm install --frozen-lockfile` → build → `claude plugin validate . --strict`).
Per-plugin "media": branded `PluginCover` on detail pages (drop a real screenshot into
`public/plugins/<slug>.{png,jpg,webp}` to override). Note: `next-mdx-remote` was bumped 5→6 (Vercel's
deploy security gate blocks v5).

**New plugins (3rd–6th):**
- **`tokens`** — extract design tokens + drift; bundles a self-contained `scan.js` (the designagent-old scanner, bun-built, postcss inlined). amber accent.
- **`design-qa`** — build↔design QA: vision diff + computed-style-vs-DESIGN.md token check; bundles a Playwright MCP via `.mcp.json`. grey accent.
- **`setup`** — onboarding scaffolder for the 3-file context (DESIGN.md/CLAUDE.md/DECISIONS.md); skill + bundled templates, no binary. green accent.
- **`backgrounds`** — generative shader/dotgrid/ASCII; skill + dependency-free recipe assets it recolors from DESIGN.md. teal accent.
- Pattern for "repackage" plugins (tokens/setup/backgrounds): pull working assets from `~/Public/designagent-old`.

**Accent system:** grew from 4 → **6** (figma/review/tokens/community/setup/backgrounds). A new `AccentKey`
must be added to ALL of: `globals.css` @theme, `lib/brand.ts` ACCENT_HEX, `lib/marketplace.ts`
(AccentKey + PRESENTATION + accentFor), `components/CategoryIcon.tsx` (class map + glyph), and
`components/PluginCover.tsx` COVER_BG — the build's TS check catches a missing one.

**Bridge vs capabilities (IA):** added a `kind` field (`bridge`|`capability`) to the data model.
`designagent` is the **bridge** (Claude Code ⇄ Figma); the other 5 are **capabilities**. Home + /plugins
now render a "The bridge" section (full-width `components/BridgeCard.tsx`) then a "Capabilities" grid.

**Verification rhythm used throughout:** `claude plugin validate --strict` on each plugin + the catalog;
end-to-end `marketplace add` + `install <name>@designagent` (then uninstall + remove to keep env clean);
`pnpm build`; Playwright screenshots (incl. a real shader render + computed-style extraction); `vercel --prod`.

**Deferred / backlog:** `mobbin` (competitor analysis via the stable Mobbin MCP) parked; then `a11y`,
`redlines`, `palette`. Fold UX-copywriting into `superdesigner`; heuristics dropped. (Mobbin MCP is
stable — it was figma-console that was unstable and got replaced by the designagent-figma plugin.)

**Next focus: frontend / UI.**

---

## 2026-06-16 (later) — Reskin to DESIGN.md, deploy, merge superdesigner

**Status: shipped & live.** designagent.dev is in production and both plugins are installable.

**Reskin (light theme).** Sherizan exported a DesignAgent `docs/DESIGN.md` — now the authoritative UI spec, imported via `CLAUDE.md` (`@docs/DESIGN.md`). The earlier dark/mint brand was **dropped**. New system: white `#FFFFFF` surfaces, near-black `#0F0F0F` text, **black is the only action color** (no mint), depth via borders not shadows, **Inter + DM Mono**, weights ≤ 600, color only as light category tints behind plugin icons. Tokens live in `app/globals.css` `@theme` + named type-scale utilities (`.text-display-lg` … `.text-eyebrow`).
- New components: `CategoryIcon`, `StatusBadge` (Live/New/Soon), `SubmitBanner` (inverted), `Eyebrow`. Re-themed `InstallBlock` / `PluginCard` (+ featured white/black-border variant) / `PluginGrid` / `mdx`. Per-plugin presentation (status/featured/accent/author) is a `PRESENTATION` lookup in `lib/marketplace.ts` (keeps the catalog schema-clean).
- **Home simplified** (per Sherizan): hero → all plugins → submit card. Removed the install card and the "How it works" steps section as noise — landing shows value immediately. `Steps.tsx` deleted.
- Mobile fix: long install commands now **wrap** (copy button stays visible) instead of scrolling off.

**Deploy.** Installed Vercel CLI (at `~/.npm-global/bin/vercel`, not on sandbox PATH — call by full path; authed as `sherizan`). Linked `sherizan-2a05db34/designagent`, connected the GitHub repo (pushes to `main` auto-build previews). Preview → promoted to prod. **Gotcha:** Vercel's security gate blocks `next-mdx-remote@5.0.0` → upgraded to **v6** (same RSC API, no code change). `designagent.dev` + `www` already aliased; site is fully static (8 prerendered routes). Per-deployment `*.vercel.app` URLs are 401 (Deployment Protection) but the apex domain is public (200).

**superdesigner.** PR #8 **merged** (squash) → `claude-plugin/` now on `superdesigner-ai` `main`. Verified end-to-end: `marketplace add` + `install superdesigner@designagent` succeeds; cleaned up after.

**Phase 1 complete** — both plugins submitted to `claude-community`. Remaining nice-to-haves: custom favicon/OG; responsive headline step-down on small mobile; pin plugin sources to a ref/sha once repos cut releases. See BACKLOG.md.

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
