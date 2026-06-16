import type { Metadata } from "next";
import { PluginGrid } from "@/components/PluginGrid";
import { getPlugins } from "@/lib/marketplace";

export const metadata: Metadata = {
  title: "Plugins",
  description: "All Claude Code plugins for designers in the designagent marketplace.",
};

export default function PluginsPage() {
  const plugins = getPlugins();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Plugins</h1>
      <p className="mt-3 max-w-xl text-muted">
        {plugins.length} curated {plugins.length === 1 ? "plugin" : "plugins"}{" "}
        for designers working in Claude Code. Click any to see install commands
        and docs.
      </p>
      <div className="mt-10">
        <PluginGrid plugins={plugins} filterable />
      </div>
    </div>
  );
}
