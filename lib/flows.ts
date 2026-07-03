/**
 * Per-plugin "how it works" flow data. Each flow is an ordered list of stages
 * (input → skill/agents → tools → output) rendered by <FlowDiagram>.
 */

export type FlowKind =
  | "input"
  | "skill"
  | "command"
  | "agent"
  | "tool"
  | "process"
  | "output";

export interface FlowStage {
  kind: FlowKind;
  title: string;
  detail?: string;
  /** Chips — the tools/agents/files involved in this stage. */
  items?: string[];
}

export type Flow = FlowStage[];

export const KIND_LABEL: Record<FlowKind, string> = {
  input: "Input",
  skill: "Skill",
  command: "Command",
  agent: "Agents",
  tool: "Tools",
  process: "Process",
  output: "Output",
};

const FLOWS: Record<string, Flow> = {
  // Figma bridge — read/build the canvas, then build UI from the spec.
  "designagent-figma": [
    {
      kind: "input",
      title: "Figma frame or DESIGN.md",
      detail: "A canvas selection or a design-system spec.",
      items: ["Figma URL", "DESIGN.md"],
    },
    {
      kind: "tool",
      title: "Figma bridge (MCP)",
      detail: "Read and edit the canvas in real time.",
      items: ["get_design_md", "create_frame", "set_fill", "html_to_design"],
    },
    {
      kind: "skill",
      title: "design-to-code",
      detail: "Build UI that respects the project's tokens.",
    },
    {
      kind: "output",
      title: "Production UI · live canvas edits",
    },
  ],

  // Scaffold the three-file design context.
  setup: [
    {
      kind: "input",
      title: "Project + a few answers",
      detail: "Inferred from the repo where possible.",
      items: ["stack", "design system", "framework", "canvas"],
    },
    {
      kind: "skill",
      title: "setup",
      detail: "Fills bundled templates to the stack.",
      items: ["claude-md", "design-md", "decisions-md"],
    },
    {
      kind: "output",
      title: "DESIGN.md · CLAUDE.md · DECISIONS.md",
      detail: "Augments, never clobbers existing files.",
    },
  ],

  // Multi-agent design review.
  designreview: [
    {
      kind: "input",
      title: "Context files",
      items: ["PRD", "research", "Figma", "analytics", "content"],
    },
    {
      kind: "command",
      title: "/review",
      detail: "Orchestrates the panel — doesn't do their work.",
    },
    {
      kind: "agent",
      title: "Specialist agents",
      detail: "Dispatched in parallel.",
      items: ["prd", "ux", "content", "analytics", "figma", "screen-planner"],
    },
    {
      kind: "output",
      title: "HTML review + Figma comments",
      detail: "PRD coverage · the five states · copy · analytics.",
    },
  ],

  // Extract tokens + drift from code.
  tokens: [
    {
      kind: "input",
      title: "Codebase",
      items: ["Tailwind", "CSS vars", "SCSS", "tokens.json", "Swift / Kotlin"],
    },
    {
      kind: "skill",
      title: "Run the scanner",
      detail: "scan.js — a deterministic, bundled binary.",
      items: ["10 readers", "analyzers"],
    },
    {
      kind: "process",
      title: "Cluster + detect drift",
      detail: "CIELAB color clustering · nearest-token matching.",
    },
    {
      kind: "output",
      title: "Token system + drift + DESIGN.md",
    },
  ],

  // Does the build match the design?
  "design-qa": [
    {
      kind: "input",
      title: "Running UI + design ref",
      items: ["dev URL", "Figma frame", "DESIGN.md"],
    },
    {
      kind: "tool",
      title: "Capture",
      detail: "Bundled Playwright MCP.",
      items: ["screenshot", "browser_evaluate"],
    },
    {
      kind: "process",
      title: "Compare",
      detail: "Vision diff + computed styles vs DESIGN.md tokens.",
    },
    {
      kind: "output",
      title: "Drift report",
      detail: "Grouped by layout · spacing · color · type.",
      items: ["blocker", "warning", "nit"],
    },
  ],

  // Generate a brand-aware background.
  backgrounds: [
    {
      kind: "input",
      title: "Effect + brand colors",
      items: ["shader", "dotgrid", "ascii", "DESIGN.md"],
    },
    {
      kind: "skill",
      title: "backgrounds",
      detail: "Recolors a bundled, proven recipe to the brand.",
    },
    {
      kind: "output",
      title: "React component or HTML/canvas",
      detail: "Reduced-motion + fallback baked in.",
    },
  ],
};

export function getFlow(slug: string): Flow | null {
  return FLOWS[slug] ?? null;
}
