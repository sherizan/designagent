import type { AccentKey } from "@/lib/marketplace";
import { Eyebrow } from "./Eyebrow";
import type { ToolGroup } from "@/lib/tools";

/** Full MCP tool reference for a plugin, grouped by category. */
export function ToolsSection({
  groups,
  accent = "community",
}: {
  groups: ToolGroup[];
  accent?: AccentKey;
}) {
  const total = groups.reduce((n, g) => n + g.tools.length, 0);
  const cardVars = {
    "--card-accent": `var(--color-on-accent-${accent})`,
  } as React.CSSProperties;
  return (
    <section className="mt-12">
      <Eyebrow>Tools · {total}</Eyebrow>
      <div className="mt-4 flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.label} data-reveal>
            <div className="mb-3 flex items-baseline justify-between border-b border-border pb-2.5">
              <p className="text-label-md text-on-surface">{group.label}</p>
              <span className="text-mono-sm text-on-surface-faint">
                {group.tools.length}
              </span>
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {group.tools.map((tool) => (
                <li
                  key={tool.name}
                  className="card card-interactive flex flex-col gap-1 rounded-lg p-3"
                  style={cardVars}
                >
                  <span className="text-mono-sm text-on-surface">{tool.name}</span>
                  <p className="text-body-sm text-on-surface-muted">
                    {tool.blurb}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
