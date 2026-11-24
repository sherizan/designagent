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
  /** Chips: the tools/agents/files involved in this stage. */
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
  // Figma bridge: read/build the canvas, then build UI from the spec.
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
};

export function getFlow(slug: string): Flow | null {
  return FLOWS[slug] ?? null;
}
