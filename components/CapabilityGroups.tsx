import { getCapabilityGroups } from "@/lib/marketplace";
import { PluginGrid } from "./PluginGrid";

/** Capability plugins grouped by workflow category (how designers work). */
export function CapabilityGroups() {
  const groups = getCapabilityGroups();

  return (
    <div className="flex flex-col gap-12">
      {groups.map(({ group, plugins }) => (
        <div key={group}>
          <div className="mb-4 flex items-baseline justify-between border-b border-border pb-2.5">
            <p className="text-label-md text-on-surface">{group}</p>
            <span className="text-mono-sm text-on-surface-faint">
              {plugins.length}
            </span>
          </div>
          <PluginGrid plugins={plugins} />
        </div>
      ))}
    </div>
  );
}
