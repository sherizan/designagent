import Link from "next/link";
import { InstallBlock } from "@/components/InstallBlock";
import { PluginGrid } from "@/components/PluginGrid";
import { getPlugins, MARKETPLACE_REPO, MARKETPLACE } from "@/lib/marketplace";

export default function Home() {
  const plugins = getPlugins();

  return (
    <div className="bg-grid">
      <section className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pt-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Claude Code · marketplace
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
          Claude Code plugins for designers.
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Curated plugins that let you prompt Claude Code to do design work —
          in Figma, in design reviews, wherever the canvas lives. Find one,
          install it in one command, and it just works.
        </p>

        <div className="mt-10 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
            Add the marketplace, install a plugin
          </p>
          <InstallBlock
            add={`/plugin marketplace add ${MARKETPLACE_REPO}`}
            install={`/plugin install designagent@${MARKETPLACE}`}
          />
          <p className="mt-3 font-mono text-xs text-muted">
            Run these inside Claude Code. Swap{" "}
            <span className="text-foreground">designagent</span> for any plugin
            below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="mb-6 flex items-baseline justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Plugins</h2>
          <Link
            href="/plugins"
            className="font-mono text-sm text-muted transition-colors hover:text-foreground"
          >
            view all →
          </Link>
        </div>
        <PluginGrid plugins={plugins} />
      </section>

      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Why this exists
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              Claude Code ships a native plugin system, but almost nothing in it
              is built for designers. designagent is the front door for the
              plugins that are — each one does a single thing well, installs
              with two commands, and treats the canvas as a first-class place to
              work. The GitHub repo is the product; this site just makes it
              discoverable.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-4 rounded-xl border border-border bg-card/40 p-6">
            <p className="text-sm leading-relaxed text-muted">
              Built a Claude Code plugin for designers?
            </p>
            <Link
              href="/submit"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
            >
              Submit it →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
