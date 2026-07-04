import type { Metadata } from "next";
import { PluginGrid } from "@/components/PluginGrid";
import { BridgeCard } from "@/components/BridgeCard";
import { Eyebrow } from "@/components/Eyebrow";
import { getPlugins, getBridges, getCapabilities } from "@/lib/marketplace";

export const metadata: Metadata = {
  title: "Plugins",
  description:
    "All Claude Code plugins for designers in the designagent marketplace: the Figma bridge plus capability plugins.",
};

export default function PluginsPage() {
  const total = getPlugins().length;
  const bridges = getBridges();
  const capabilities = getCapabilities();

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10">
      <Eyebrow>Plugins</Eyebrow>
      <h1 className="text-heading-lg mt-3 text-on-surface">
        {total} {total === 1 ? "plugin" : "plugins"} for designers
      </h1>
      <p className="text-body-lg mt-3 max-w-[680px] text-on-surface-muted">
        One bridge connects Claude Code to Figma; the rest are capabilities, one
        thing each, installed through Claude Code&apos;s native plugin system.
      </p>

      {bridges.length > 0 && (
        <section className="mt-12">
          <Eyebrow>The bridge</Eyebrow>
          <div className="mt-4 flex flex-col gap-4">
            {bridges.map((plugin) => (
              <BridgeCard key={plugin.slug} plugin={plugin} />
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <Eyebrow>Capabilities</Eyebrow>
        <div className="mt-4">
          <PluginGrid plugins={capabilities} />
        </div>
      </section>
    </div>
  );
}
