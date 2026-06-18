import { PluginGrid } from "@/components/PluginGrid";
import { BridgeCard } from "@/components/BridgeCard";
import { SubmitBanner } from "@/components/SubmitBanner";
import { Eyebrow } from "@/components/Eyebrow";
import { getBridges, getCapabilities } from "@/lib/marketplace";

export default function Home() {
  const bridges = getBridges();
  const capabilities = getCapabilities();

  return (
    <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
      {/* Hero */}
      <section className="pt-16 pb-12 sm:pt-20">
        <h1 className="text-display-lg max-w-[680px] text-balance text-on-surface">
          Claude Code plugins,
          <br />
          built for designers.
        </h1>
        <p className="text-body-lg mt-5 max-w-[680px] text-on-surface-muted">
          Curated plugins that let you prompt Claude Code to do design work — in
          Figma, in design reviews, wherever the canvas lives. Install in one
          command.
        </p>
      </section>

      {/* The bridge — the connection to Figma */}
      {bridges.length > 0 && (
        <section className="pb-12">
          <Eyebrow>The bridge</Eyebrow>
          <h2 className="text-heading-lg mt-3 mb-2 text-on-surface">
            Connect Claude Code to your canvas
          </h2>
          <p className="text-body-md mb-6 max-w-[640px] text-on-surface-muted">
            The integration that gives Claude Code hands and eyes in Figma —
            everything else builds on what it can see.
          </p>
          <div className="flex flex-col gap-4">
            {bridges.map((plugin) => (
              <BridgeCard key={plugin.slug} plugin={plugin} />
            ))}
          </div>
        </section>
      )}

      {/* Capabilities — what Claude Code does */}
      <section className="pb-20">
        <Eyebrow>Capabilities</Eyebrow>
        <h2 className="text-heading-lg mt-3 mb-2 text-on-surface">
          What Claude Code can do
        </h2>
        <p className="text-body-md mb-6 max-w-[640px] text-on-surface-muted">
          Each does one thing well — set up, extract, review, QA, generate.
        </p>
        <PluginGrid plugins={capabilities} />
        <div className="mt-4">
          <SubmitBanner />
        </div>
      </section>
    </div>
  );
}
