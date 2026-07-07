import { Eyebrow } from "./Eyebrow";
import type { ToolGroup } from "@/lib/tools";

/** Full MCP tool reference for a plugin, grouped by category. */
export function ToolsSection({ groups }: { groups: ToolGroup[] }) {
  const total = groups.reduce((n, g) => n + g.tools.length, 0);
  return (
    <section className="mt-12">
      <Eyebrow>Tools · {total}</Eyebrow>
      <div className="mt-4 flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.label}>
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
                  className="flex flex-col gap-1 rounded-lg border border-border bg-surface-secondary p-3"
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
