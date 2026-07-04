import { PluginGrid } from "@/components/PluginGrid";
import { BridgeCard } from "@/components/BridgeCard";
import { SubmitBanner } from "@/components/SubmitBanner";
import { Eyebrow } from "@/components/Eyebrow";
import { Frame } from "@/components/Frame";
import { InstallBlock } from "@/components/InstallBlock";
import { getBridges, getCapabilities, MARKETPLACE_REPO } from "@/lib/marketplace";

export default function Home() {
  const bridges = getBridges();
  const capabilities = getCapabilities();

  return (
    <>
      {/* Hero */}
      <Frame top={false} className="relative isolate pt-16 pb-14 sm:pt-20">
        <div
          aria-hidden
          className="hero-crosshair pointer-events-none absolute inset-x-0 -top-20 bottom-0 -z-10"
        />
        <h1 className="text-display-lg animate-rise max-w-[680px] text-balance text-on-surface">
          Claude Code plugins,
          <br />
          built for designers.
        </h1>
        <p className="text-body-lg animate-rise delay-1 mt-5 max-w-[680px] text-on-surface-muted">
          Curated plugins that let you prompt Claude Code to do design work, in
          Figma, in design reviews, wherever the canvas lives. Install in one
          command.
        </p>
        <div className="animate-rise delay-2 mt-8">
          <InstallBlock
            add={`/plugin marketplace add ${MARKETPLACE_REPO}`}
            label="Add the marketplace"
          />
          <p className="text-body-sm mt-3 max-w-[440px] text-on-surface-subtle">
            Add it once, then install any plugin below with{" "}
            <code className="text-mono-sm text-on-surface-muted">
              /plugin install …@designagent
            </code>
            .
          </p>
        </div>
      </Frame>

      {/* The bridge: the connection to Figma */}
      {bridges.length > 0 && (
        <Frame className="animate-rise delay-2 pt-12 pb-12">
          <Eyebrow>The bridge</Eyebrow>
          <h2 className="text-heading-lg mt-3 mb-2 text-on-surface">
            Connect Claude Code to your canvas
          </h2>
          <p className="text-body-md mb-6 max-w-[640px] text-on-surface-muted">
            Claude Code can't critique what it can't see. This is the plugin that
            gives it eyes and hands inside Figma. Everything else builds on it.
          </p>
          <div className="flex flex-col gap-4">
            {bridges.map((plugin) => (
              <BridgeCard key={plugin.slug} plugin={plugin} />
            ))}
          </div>
        </Frame>
      )}

      {/* Capabilities: what Claude Code does */}
      <Frame className="animate-rise delay-3 pt-12 pb-20">
        <Eyebrow>Capabilities</Eyebrow>
        <h2 className="text-heading-lg mt-3 mb-2 text-on-surface">
          What Claude Code can do
        </h2>
        <p className="text-body-md mb-6 max-w-[640px] text-on-surface-muted">
          Each does exactly one thing, and refuses to do a second. Set up,
          extract, review, QA, generate. No kitchen sinks.
        </p>
        <PluginGrid plugins={capabilities} />
        <div className="mt-4">
          <SubmitBanner />
        </div>
      </Frame>
    </>
  );
}
