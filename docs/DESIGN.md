---
version: alpha
name: DesignAgent
description: Design system for designagent.dev — a curated Claude Code plugin marketplace for designers.

colors:
  # Surface
  surface: "#FFFFFF"
  surface-secondary: "#F8F8F8"
  surface-tertiary: "#F0F0F0"

  # Content
  on-surface: "#0F0F0F"
  on-surface-muted: "#666666"
  on-surface-subtle: "#999999"
  on-surface-faint: "#CCCCCC"

  # Borders
  border: "#EBEBEB"
  border-strong: "#D0D0D0"

  # Primary (actions, logo mark)
  primary: "#0F0F0F"
  on-primary: "#FFFFFF"

  # Category accents — used on plugin icon backgrounds only
  accent-figma: "#E8F4FF"
  on-accent-figma: "#1A6FAD"

  accent-review: "#F0EBFF"
  on-accent-review: "#6B3FA0"

  accent-tokens: "#FFF4E6"
  on-accent-tokens: "#A05A00"

  accent-community: "#F5F5F5"
  on-accent-community: "#999999"

  # Semantic
  success: "#1A8A4A"
  success-surface: "#E8FAF0"
  info: "#185FA5"
  info-surface: "#E6F1FB"
  warning: "#A05A00"
  warning-surface: "#FFF4E6"
  error: "#A32D2D"
  error-surface: "#FCEBEB"

typography:
  # Display
  display-lg:
    fontFamily: Inter
    fontSize: 52px
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: -0.035em

  display-md:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.03em

  # Headings
  heading-lg:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: -0.025em

  heading-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.02em

  heading-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: -0.01em

  # Body
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65

  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6

  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.6

  # Labels
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1

  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1

  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1

  # Mono — install commands, code, metadata
  mono-md:
    fontFamily: DM Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5

  mono-sm:
    fontFamily: DM Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5

  # Eyebrow — section labels, categories
  eyebrow:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.04em

spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 80px
  gutter: 40px
  section: 64px
  max-width: 1200px
  content-width: 680px

rounded:
  none: 0px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  full: 9999px

components:
  # Navigation
  nav:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    height: 60px
    padding: 0 40px

  nav-link:
    textColor: "{colors.on-surface-subtle}"
    typography: "{typography.label-md}"

  nav-link-active:
    textColor: "{colors.on-surface}"

  # Buttons
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 11px 22px

  button-primary-hover:
    backgroundColor: "#2a2a2a"

  button-ghost:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    borderColor: "{colors.border-strong}"
    typography: "{typography.label-lg}"
    rounded: "{rounded.full}"
    padding: 11px 22px

  button-ghost-hover:
    borderColor: "{colors.on-surface-faint}"
    backgroundColor: "{colors.surface-secondary}"

  # Install block
  install-block:
    backgroundColor: "{colors.surface-secondary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.xl}"
    padding: 20px 24px

  install-command:
    typography: "{typography.mono-sm}"
    textColor: "{colors.on-surface}"

  install-prompt:
    textColor: "{colors.on-surface-faint}"

  install-copy-btn:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    textColor: "{colors.on-surface-subtle}"
    rounded: "{rounded.sm}"
    typography: "{typography.mono-sm}"

  # Plugin cards
  card:
    backgroundColor: "{colors.surface-secondary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.xl}"
    padding: 24px

  card-hover:
    borderColor: "{colors.border-strong}"

  card-featured:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.primary}"

  card-name:
    typography: "{typography.heading-sm}"
    textColor: "{colors.on-surface}"

  card-description:
    typography: "{typography.body-sm}"
    textColor: "{colors.on-surface-muted}"

  card-author:
    typography: "{typography.mono-sm}"
    textColor: "{colors.on-surface-faint}"

  # Badges
  badge-live:
    backgroundColor: "{colors.success-surface}"
    textColor: "{colors.success}"
    rounded: "{rounded.full}"
    padding: 4px 10px
    typography: "{typography.label-sm}"

  badge-new:
    backgroundColor: "{colors.accent-review}"
    textColor: "{colors.on-accent-review}"
    rounded: "{rounded.full}"
    padding: 4px 10px
    typography: "{typography.label-sm}"

  badge-soon:
    backgroundColor: "{colors.surface-tertiary}"
    textColor: "{colors.on-surface-subtle}"
    rounded: "{rounded.full}"
    padding: 4px 10px
    typography: "{typography.label-sm}"

  # Submit banner (inverted)
  submit-banner:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.xl}"
    padding: 32px 36px

  submit-banner-title:
    typography: "{typography.heading-sm}"
    textColor: "{colors.on-primary}"

  submit-banner-sub:
    typography: "{typography.body-sm}"
    textColor: "#777777"

  submit-banner-btn:
    backgroundColor: "{colors.on-primary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    typography: "{typography.label-md}"
    padding: 11px 22px

  # Steps
  step-number:
    typography: "{typography.mono-sm}"
    textColor: "{colors.on-surface-faint}"

  step-title:
    typography: "{typography.heading-sm}"
    textColor: "{colors.on-surface}"

  step-description:
    typography: "{typography.body-sm}"
    textColor: "{colors.on-surface-muted}"

  step-command:
    typography: "{typography.mono-sm}"
    textColor: "{colors.on-surface-muted}"
    backgroundColor: "{colors.surface-secondary}"
    rounded: "{rounded.sm}"
    padding: 6px 12px

  # Eyebrow labels
  eyebrow:
    typography: "{typography.eyebrow}"
    textColor: "{colors.on-surface-subtle}"
    textTransform: uppercase
---

# DesignAgent — Design System

## Overview

DesignAgent is a curated plugin marketplace for Claude Code, built specifically
for designers. The audience is practitioners — people who think visually, have
strong opinions about craft, and will immediately judge the site by how it
looks. The site earns trust through restraint and precision, not decoration.

**Personality:** Clean, confident, tool-like. The site should feel like a
well-designed developer tool, not a marketing page. Functional beauty — the
same aesthetic that makes Figma's own UI credible to designers.

**Reference:** Chatbase.co in structure and rhythm; shadcn/ui in code
presentation; Figma Community in the plugin card pattern.

**Emotional response:** A designer landing here should feel they've found the
right place — authoritative, curated, and made by someone who understands
their workflow. Not a side project that accidentally works. A deliberate tool.

---

## Colors

The palette is built on high-contrast neutrals with a pure white surface.
Color is used functionally, not decoratively. The only place multi-color
appears is plugin category icons — a deliberate nod to Figma's own four-color
identity.

- **Surface (`#FFFFFF`):** Pure white canvas. Every section sits on this.
  No background tints, no section breaks via color.
- **On-surface (`#0F0F0F`):** Near-black for all primary text and the logo
  mark. Matched exactly from Chatbase's palette.
- **On-surface-muted (`#666666`):** Descriptions, body copy, supporting text.
- **On-surface-subtle (`#999999`):** Nav links at rest, section eyebrows,
  secondary metadata.
- **On-surface-faint (`#CCCCCC`):** Dividers, placeholder arrows, step numbers,
  mono prompt glyphs.
- **Border (`#EBEBEB`):** Default 1px card borders, dividers.
- **Border-strong (`#D0D0D0`):** Hover state borders on cards.
- **Primary (`#0F0F0F`):** The single action color. Used for the logo mark,
  primary buttons, the submit banner background, and the featured card border.
  This keeps the palette disciplined — black is the brand color.
- **Category accents:** Light tinted backgrounds for plugin icon containers
  only. Figma plugins use `#E8F4FF` (blue), review plugins use `#F0EBFF`
  (purple). Never used on large surfaces.

---

## Typography

Two typefaces only. Inter handles everything structural. DM Mono handles
everything code-adjacent. The pairing is clean and widely used in developer
tooling — it reads as familiar to the audience without being generic.

**Inter** is the workhorse — headings, body, labels, nav, buttons, eyebrows.
Tight negative tracking on display sizes (`-0.035em` at 52px) gives headlines
authority. Weight range is 400 (body), 500 (labels, nav), 600 (headings,
buttons). Never use 700 or 800 — it tips into heavy.

**DM Mono** is used exclusively for: install commands, code snippets, step
command chips, plugin author handles, and the eyebrow label inside the install
block. Mono in these contexts signals precision and makes copy-paste moments
feel like product affordances.

**Scale:** 13 levels, from `display-lg` at 52px down to `mono-sm` at 12px.
Display sizes are used once each — headline and section title. The rest of the
type scale handles the repeating components.

**Sentence case everywhere.** No ALL CAPS except `eyebrow` labels (nav
section labels, install block label). No Title Case in body copy.

---

## Layout

The layout is a centered single-column structure with a fixed content width.
Sections breathe — 64px vertical padding minimum between sections. The hero
gets 80px top padding.

**Content width:** 680px for hero text and body copy. The plugin grid and
submit banner span the full section width (minus 40px gutters each side).

**Grid:** The plugin grid uses a 2-column layout with 16px gap. On narrower
viewports, it collapses to 1 column at 640px. The install block is
`display: inline-block` — it sizes to its content, not the full column.

**Spacing scale:** Built on an 8px base. All component padding, gap, and
margin values are multiples of 8px. The 4px half-step (`xs`) is used only
for inline micro-spacing (badge padding, step number gap).

**Nav:** 60px fixed height, 40px horizontal padding, 1px bottom border.
Logo left, links center, CTA right.

**Sections:** Each section follows the same rhythm:
1. Eyebrow label (uppercase, muted, 12px Inter 500)
2. Section heading (`heading-lg`, 30px)
3. Content

---

## Elevation & Depth

Depth is achieved entirely through **border and background contrast**, not
shadows. No `box-shadow` on any surface in the default state.

- **Default cards:** `#F8F8F8` background + 1px `#EBEBEB` border. Sits
  slightly above the white page by contrast.
- **Featured card:** White background + 1px `#0F0F0F` border. The stronger
  border is the only elevation signal needed to mark hierarchy.
- **Hover state:** Border color shifts from `#EBEBEB` → `#D0D0D0`. No
  shadow added — the border movement is enough.
- **Install block:** `#F8F8F8` background + 1px `#EBEBEB` border. Same
  treatment as cards — consistent tonal layer system.
- **Submit banner:** Inverted surface (`#0F0F0F` background). Elevation
  through contrast inversion, not depth.

### Texture (the one permitted exception)

A single, **very faint dot-grid** is allowed in two places only: **behind the
hero** (masked so it fades before it reaches the headline) and as the **ground
of a plugin cover**. Dots are 1px on a ~26px grid in the `border` tint
(`#EBEBEB`) — texture, not decoration. Everywhere else the surface stays pure
white. Still **no gradients, no section color-tints, no shadows.**

---

## Motion

Motion is subtle, fast, and purposeful — it confirms an action or eases an
entrance; it never performs.

- **Speed:** ≤ 260ms, `ease-out` (or a gentle `cubic-bezier(0.16, 1, 0.3, 1)`).
- **Entrance:** content may fade + rise ~8px on load (`animate-rise`), lightly
  staggered between sections. Once only — no looping, no scroll-jacking.
- **Hover:** small, legible nudges — a card's `→` shifts a few px, a border or
  text color transitions. No scale-pops, no bounce.
- **Feedback:** the install copy button flips to a `✓ copied` success state.
- **Always honor `prefers-reduced-motion: reduce`** — a global guard drops all
  animation and transition durations to ~0. The site must be fully usable, and
  look intentional, with motion off.
- **Don't:** parallax, auto-playing loops, spinners-as-decoration, or motion on
  anything the user is trying to read.

---

## Shapes

The shape language is modern-rounded but not bubbly. Every interactive
element has a consistent radius that signals its affordance level.

- **Pills (`full`, `9999px`):** Used exclusively for buttons and badges.
  Pills signal primary actions and status chips.
- **Cards (`xl`, `16px`):** Plugin cards, install block, submit banner. The
  primary container radius.
- **Chips/commands (`sm`, `6px`):** Install copy buttons, step command chips.
  Small radius for small, inline interactive elements.
- **Logo mark (`md`, `8px`):** The 2×2 grid icon in the logo uses 8px
  radius on each square.

Never mix `full` (pill) and `none` (sharp) in the same component. The only
sharp element in the system is the rule/divider — a 1px horizontal line.

---

## Components

### Navigation

Top nav bar. 60px tall. Left: logo mark + wordmark. Center: three text links
(Plugins, Docs, Submit) in `label-md` Inter at `on-surface-subtle`. Right:
"Submit a plugin" button in `button-primary` pill style.

On hover, nav links shift to `on-surface`. Active page link uses `on-surface`
at rest. No underline, no active indicator beyond color.

### Eyebrow Labels

Short uppercase section labels that precede every heading. `eyebrow`
typography token: 12px Inter 500, `on-surface-subtle`, `letter-spacing:
0.04em`. Used before section headings only — not inside cards or components.

Example usage: "Plugins", "How it works", "For builders"

### Install Block

The signature component of the site. A contained box showing the two-step
install sequence as monospace text. Treated as a design object.

Structure:
- Container: `install-block` token (F8F8F8 background, 1px border, 16px
  radius, 20px 24px padding)
- Label: "Quick install" in `eyebrow` token, `on-surface-faint`
- Each row: `/` prompt glyph in `on-surface-faint` + command text in
  `mono-sm` `on-surface` + "copy" button right-aligned
- Copy button: white background, 1px border, 6px radius, 11px DM Mono

Never truncate the install commands. They must be readable in full.
The block is `display: inline-block` — it does not stretch to full width.

### Plugin Cards

The core repeating unit. 2-column grid layout.

Structure:
- Top row: category icon container (left) + status badge (right)
- Plugin name: `heading-sm` (16px Inter 600, `on-surface`)
- Description: `body-sm` (13px Inter 400, `on-surface-muted`), 2–3 lines max
- Footer: author handle in `mono-sm` `on-surface-faint` (left) + arrow `→` (right)
- Footer separated from content by 1px `border` divider

**Featured variant:** White background, 1px `primary` (`#0F0F0F`) border.
Used for the most important or first-shipped plugin.

**Disabled/coming-soon variant:** 45% opacity. Same structure, ghost dashed
icon container, "Open for submissions" badge.

### Category Icons

40×40px container, 10px radius, tinted background per category. SVG icon
inside at 20×20px. Color pairs are defined in the color tokens as
`accent-*` (background) and `on-accent-*` (icon stroke/fill).

Never use category accent colors outside of icon containers.

### Status Badges

Pill-shaped (full radius). Three variants:
- **Live:** `badge-live` — green tint, green text
- **New:** `badge-new` — purple tint, purple text
- **Soon:** `badge-soon` — grey tint, grey text

Font: 11px Inter 500. Padding: 4px 10px. No uppercase.

### Submit Banner

Full-width inverted surface at the bottom of the plugins section.
Black (`#0F0F0F`) background, white text. 16px radius. Flexbox layout:
text stack on the left, white pill button on the right.

- Eyebrow: 11px Inter 500 `#666666` (muted on dark)
- Title: `heading-sm` white
- Sub: 13px `#777777`
- Button: white background, black text, pill shape, `label-md`

### Steps (How It Works)

Numbered list with `01 / 02 / 03` step numbers in `mono-sm` `on-surface-faint`.
Each step separated by 1px `border` divider. No card container — the dividers
are the structure.

- Step number: left column, 28px min-width
- Title: `heading-sm` `on-surface`
- Description: `body-sm` `on-surface-muted`
- Command chip: `step-command` token — inline mono text in a `#F8F8F8`
  pill with 6px radius

---

## Do's and Don'ts

**Do** use `#0F0F0F` primary buttons for the single most important action per
section. One primary button per visible area.

**Don't** use category accent colors (`accent-figma`, `accent-review`, etc.)
on any surface larger than the 40×40px icon container.

**Do** use DM Mono for any text the user might copy — install commands,
plugin skill invocations, author handles.

**Don't** use font weights above 600. The type scale caps at semi-bold.

**Do** maintain 1px borders on all card components. Never use box-shadow
as a card affordance.

**Don't** use ALL CAPS except for `eyebrow` labels and the install block label.

**Do** keep section heading text to two lines maximum. Use a line break
deliberately to control the break point.

**Don't** add color to section headings. All headings are `on-surface`
(`#0F0F0F`). The eyebrow label provides the color accent.

**Do** left-align everything. The only centered element is the bottom CTA
section (if added in a future phase). Hero, cards, steps, nav — all left.

**Don't** add more than two typefaces. Inter + DM Mono is the complete set.
No additional display fonts.

**Do** maintain WCAG AA contrast (4.5:1) for all text. The `on-surface-faint`
(`#CCCCCC`) token is for decorative elements only (arrows, step numbers,
prompt glyphs) — never for readable text content.

**Don't** use the plugin grid at more than 2 columns on desktop. 3-column
grids reduce the card breathing room and compress descriptions.
