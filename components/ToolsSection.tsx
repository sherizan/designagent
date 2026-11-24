import type { ToolGroup } from "@/lib/tools";

/** Every tool Claude gets, grouped by what it's for. Sits inside a disclosure. */
export function ToolsSection({ groups }: { groups: ToolGroup[] }) {
  return (
    <div className="flex flex-col gap-12">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
            <p className="text-heading-sm text-on-surface">{group.label}</p>
            <span className="text-mono-sm text-on-surface-subtle">{group.tools.length}</span>
          </div>
          <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2 xl:grid-cols-3">
            {group.tools.map((tool) => (
              <li key={tool.name} className="flex flex-col gap-1">
                <span className="text-mono-sm text-on-surface">{tool.name}</span>
                <p className="text-body-sm text-on-surface-muted">{tool.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
