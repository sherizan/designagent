import type { Metadata } from "next";
import { PluginGrid } from "@/components/PluginGrid";
import { Eyebrow } from "@/components/Eyebrow";
import { getPlugins } from "@/lib/marketplace";

export const metadata: Metadata = {
  title: "Plugins",
  description:
    "All Claude Code plugins for designers in the designagent marketplace.",
};

export default function PluginsPage() {
  const plugins = getPlugins();

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10">
      <Eyebrow>Plugins</Eyebrow>
      <h1 className="text-heading-lg mt-3 text-on-surface">
        {plugins.length} {plugins.length === 1 ? "plugin" : "plugins"} for
        designers
      </h1>
      <p className="text-body-lg mt-3 max-w-[680px] text-on-surface-muted">
        Each does one thing well and installs through Claude Code&apos;s native
        plugin system. Click any to see install commands and docs.
      </p>
      <div className="mt-10">
        <PluginGrid plugins={plugins} filterable />
      </div>
    </div>
  );
}
