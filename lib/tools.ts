// Per-plugin MCP tool reference, rendered by ToolsSection on plugin detail pages.
// Source of truth: the registerTool calls in the plugin repo's MCP server
// (designagent-figma: claude-plugin/mcp/src/server.ts) — update on release when
// tools are added or removed.

export interface Tool {
  name: string;
  blurb: string;
}

export interface ToolGroup {
  label: string;
  tools: Tool[];
}

const TOOLS: Record<string, ToolGroup[]> = {
  "designagent-figma": [
    {
      label: "Read & inspect",
      tools: [
        { name: "status", blurb: "Bridge check — connected file, current page, and what's selected." },
        { name: "get_spec", blurb: "Structured UI spec (hierarchy, tokens, layout, text) of the selection as JSON." },
        { name: "get_design_md", blurb: "Export the selection as a DESIGN.md spec, ready to build from." },
        { name: "export_tokens", blurb: "Resolved Figma variables as CSS, W3C JSON, Tailwind, or SCSS." },
        { name: "list_page_nodes", blurb: "Top-level nodes on the current page — find frames by name or position." },
        { name: "take_screenshot", blurb: "Render the selection or page to a PNG so Claude can see the result." },
        { name: "console_logs", blurb: "The plugin's captured console output, for debugging." },
      ],
    },
    {
      label: "Select & navigate",
      tools: [
        { name: "focus", blurb: "Scroll and zoom a node into view." },
        { name: "select", blurb: "Set the Figma selection to one or more nodes." },
      ],
    },
    {
      label: "Create",
      tools: [
        { name: "create_frame", blurb: "Create a frame, optionally with Auto Layout, anywhere in the tree." },
        { name: "create_text", blurb: "Create a text node — font loading handled automatically." },
        { name: "create_rectangle", blurb: "Create a rectangle." },
        { name: "create_ellipse", blurb: "Create an ellipse." },
        { name: "html_to_design", blurb: "Render HTML into real Figma layers — frames, text, images." },
      ],
    },
    {
      label: "Style",
      tools: [
        { name: "set_fill", blurb: "Solid fill color on an existing node." },
        { name: "set_stroke", blurb: "Add or change a border." },
        { name: "set_corner_radius", blurb: "Round corners, together or per-corner." },
        { name: "set_shadow", blurb: "Add a drop shadow." },
        { name: "set_text", blurb: "Replace a text node's content." },
        { name: "set_text_style", blurb: "Font size, weight, color, and alignment." },
        { name: "set_opacity", blurb: "Node opacity, 0–1." },
        { name: "set_rotation", blurb: "Rotate by degrees." },
      ],
    },
    {
      label: "Images",
      tools: [
        { name: "set_image", blurb: "Fill a node with an image from a URL, file, or base64." },
        { name: "place_image", blurb: "Place a new image node on the canvas." },
      ],
    },
    {
      label: "Layout & structure",
      tools: [
        { name: "move", blurb: "Move a node to new coordinates." },
        { name: "resize", blurb: "Resize a node." },
        { name: "reparent", blurb: "Move a node into a different parent, at a chosen index." },
        { name: "delete", blurb: "Delete a node." },
        { name: "group", blurb: "Group nodes." },
        { name: "ungroup", blurb: "Dissolve a group back into its parent." },
        { name: "clone", blurb: "Duplicate a node, optionally into another parent." },
        { name: "instantiate_component", blurb: "Create an instance of a local or library component." },
      ],
    },
    {
      label: "Effects & motion",
      tools: [
        { name: "set_grid", blurb: "Turn a frame into a native Figma grid layout." },
        { name: "list_shaders", blurb: "Shaders available to the file." },
        { name: "set_shader", blurb: "Apply a shader as fill, stroke, or effect." },
        { name: "list_animation_styles", blurb: "Figma Motion styles in the document (beta)." },
        { name: "apply_animation", blurb: "Apply an animation style to a node (beta)." },
        { name: "get_animations", blurb: "Read a node's applied animations (beta)." },
        { name: "remove_animation", blurb: "Remove an applied animation (beta)." },
      ],
    },
    {
      label: "Workflow",
      tools: [
        { name: "annotate", blurb: "Pin a design-intent annotation to a node." },
        { name: "apply_fix", blurb: "Auto-fixes like converting a frame to Auto Layout." },
        { name: "batch", blurb: "Run many operations in one call; failures don't stop the rest." },
      ],
    },
  ],
};

export function getTools(slug: string): ToolGroup[] | null {
  return TOOLS[slug] ?? null;
}
