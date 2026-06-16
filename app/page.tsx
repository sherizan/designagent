import { PluginGrid } from "@/components/PluginGrid";
import { SubmitBanner } from "@/components/SubmitBanner";
import { getPlugins } from "@/lib/marketplace";

export default function Home() {
  const plugins = getPlugins();

  return (
    <div className="mx-auto max-w-[1200px] px-6 sm:px-10">
      {/* Hero */}
      <section className="pt-16 pb-10 sm:pt-20">
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

      {/* Plugins — the value, immediately */}
      <section className="pb-20">
        <PluginGrid plugins={plugins} />
        <div className="mt-4">
          <SubmitBanner />
        </div>
      </section>
    </div>
  );
}
