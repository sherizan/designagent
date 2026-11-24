import { MDXRemote } from "next-mdx-remote/rsc";
import { DemoStage } from "@/components/DemoStage";
import { InstallBlock } from "@/components/InstallBlock";
import { ToolsSection } from "@/components/ToolsSection";
import { mdxComponents } from "@/components/mdx";
import { getBridge } from "@/lib/marketplace";
import { getPluginDoc } from "@/lib/plugins";
import { getTools } from "@/lib/tools";

/** The Figma half of the bridge: the Community plugin that runs inside Figma. */
const FIGMA_PLUGIN_URL =
  "https://www.figma.com/community/plugin/1604428052675393154/designagent-claude-bridge";

/** What a designer can ask for, in their words. */
const ASKS = [
  {
    title: "Look at my design",
    ask: "What's off about this screen?",
    body: "Claude sees what you've selected, layers and pixels, and tells you what it finds.",
  },
  {
    title: "Build it for me",
    ask: "Make a settings page that matches this one.",
    body: "You get real frames, text and auto layout on your canvas. Not a picture of a design.",
  },
  {
    title: "Bring a web page in",
    ask: "Turn this page into Figma layers.",
    body: "Rows wrap the way they do in the browser, and grids keep their columns.",
  },
  {
    title: "Keep it on-system",
    ask: "Use my spacing and colour variables.",
    body: "Claude links values to your variables, so one change updates everything.",
  },
  {
    title: "Add motion",
    ask: "Fade this in and export a GIF.",
    body: "Apply an animation by name, then save it as a video or GIF. Still in beta.",
  },
  {
    title: "Hand it to code",
    ask: "Build this screen in my app.",
    body: "Claude writes up your colours, type and components, then builds the real thing from it.",
  },
];

/** A page section: a small label, a big heading, then whatever it holds. */
function Section({
  label,
  title,
  id,
  children,
}: {
  label: string;
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-10 border-t border-border py-[clamp(56px,9vh,112px)]">
      <p className="text-eyebrow">{label}</p>
      <h2 className="text-heading-lg mt-4 mb-[clamp(32px,5vh,64px)] max-w-[18ch] text-balance text-on-surface">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Split the release notes into one chunk per version ("### v0.25.0 …"). */
function releaseChunks(body: string): string[] {
  const start = body.indexOf("### v");
  if (start < 0) return [];
  return body
    .slice(start)
    .split(/\n(?=### v)/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);
}

export default function Home() {
  const bridge = getBridge();
  const tools = getTools("designagent-figma");
  const toolCount = tools?.reduce((n, g) => n + g.tools.length, 0) ?? 0;
  const releases = releaseChunks(getPluginDoc("designagent-figma")?.body ?? "");
  const latest = releases.slice(0, 2);
  const older = releases.slice(2);

  return (
    <>
      {/* Hero */}
      <section className="py-[clamp(64px,12vh,160px)]">
        <h1 className="text-display-lg animate-rise max-w-[13ch] text-balance text-on-surface">
          Ask Claude. Watch it happen in Figma.
        </h1>
        <p className="text-body-lg animate-rise delay-1 mt-[clamp(28px,4vh,48px)] max-w-[38ch] text-on-surface-muted">
          DesignAgent connects Claude Code to your open Figma file. Say what you
          want in plain words, and Claude reads your design, builds it and
          tidies it up, right on your canvas.
        </p>
        <div className="animate-rise delay-2 mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <a
            href={FIGMA_PLUGIN_URL}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="text-label-lg rounded-full bg-primary px-6 py-3.5 text-on-primary transition-colors hover:bg-primary-hover"
          >
            Get the Figma plugin
          </a>
          <a
            href="#start"
            className="text-label-lg text-on-surface-muted transition-colors hover:text-on-surface"
          >
            How to set it up <span aria-hidden>↓</span>
          </a>
        </div>
      </section>

      {/* In action */}
      <Section label="In action" title="You type. Your canvas changes.">
        <DemoStage />
      </Section>

      {/* What you can ask */}
      <Section label="What you can ask" title="Six things designers use it for.">
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {ASKS.map((item) => (
            <li
              key={item.title}
              className="card card-interactive flex min-h-[300px] flex-col justify-between gap-12 p-7"
              data-reveal
            >
              <div>
                <h3 className="text-heading-md text-on-surface">{item.title}</h3>
                <p className="text-body-md mt-3 max-w-[30ch] text-on-surface-muted">{item.body}</p>
              </div>
              <p className="text-body-sm text-on-surface">“{item.ask}”</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* How it works */}
      <Section label="How it works" title="One connection, both directions.">
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="card flex min-h-[260px] flex-col justify-between gap-10 p-7" data-reveal>
            <div>
              <h3 className="text-heading-md text-on-surface">From Claude to your canvas</h3>
              <p className="text-body-md mt-3 max-w-[40ch] text-on-surface-muted">
                Claude reads the file you have open, then creates frames, text
                and components, restyles layers, and turns web pages into
                editable designs.
              </p>
            </div>
            <p className="text-body-sm text-on-surface-subtle">Claude Code → Figma</p>
          </div>
          <div className="card flex min-h-[260px] flex-col justify-between gap-10 p-7" data-reveal>
            <div>
              <h3 className="text-heading-md text-on-surface">From your canvas to code</h3>
              <p className="text-body-md mt-3 max-w-[40ch] text-on-surface-muted">
                Claude writes down your colours, type, spacing and components
                as a spec, then builds real screens that stick to it, so
                nothing gets hardcoded or guessed.
              </p>
            </div>
            <p className="text-body-sm text-on-surface-subtle">Figma → Claude Code</p>
          </div>
        </div>
        <p className="text-body-md mt-8 max-w-[62ch] text-on-surface-muted">
          Under the hood it&apos;s two small plugins, one in Figma and one in
          Claude Code, talking to each other over a connection on your own
          computer.
        </p>
      </Section>

      {/* Get started */}
      <Section label="Get started" title="Three steps, about two minutes." id="start">
        <ol className="grid gap-3 xl:grid-cols-[1fr_1.5fr_1fr]">
          <li className="card flex flex-col gap-3 p-7">
            <span className="text-mono-sm text-on-accent-figma">01</span>
            <h3 className="text-heading-md text-on-surface">Add the plugin in Figma</h3>
            <p className="text-body-md text-on-surface-muted">
              It&apos;s free on Figma Community. Open it in the file you want to
              work on.
            </p>
            <a
              href={FIGMA_PLUGIN_URL}
              target="_blank"
              rel="noreferrer"
              className="text-body-sm mt-auto w-fit pt-6 text-on-surface underline decoration-on-surface-faint underline-offset-4 transition-colors hover:decoration-on-surface"
            >
              DesignAgent on Figma Community ↗
            </a>
          </li>
          <li className="card flex flex-col gap-3 p-7">
            <span className="text-mono-sm text-on-accent-figma">02</span>
            <h3 className="text-heading-md text-on-surface">Add it to Claude Code</h3>
            <p className="text-body-md text-on-surface-muted">
              Paste these two lines into Claude Code, one after the other.
            </p>
            {bridge && (
              <div className="mt-auto pt-6">
                <InstallBlock
                  add={bridge.install.add}
                  install={bridge.install.install}
                  label="Paste into Claude Code"
                />
              </div>
            )}
          </li>
          <li className="card flex flex-col gap-3 p-7">
            <span className="text-mono-sm text-on-accent-figma">03</span>
            <h3 className="text-heading-md text-on-surface">Press Start, then ask</h3>
            <p className="text-body-md text-on-surface-muted">
              In the plugin, press Start. When the dot turns green, Claude can
              see your file. Select something and ask away.
            </p>
          </li>
        </ol>
      </Section>

      {/* What's new */}
      {latest.length > 0 && (
        <Section label="What's new" title="Recent updates.">
          <div className="grid gap-3 lg:grid-cols-2">
            {latest.map((chunk) => (
              <div key={chunk.slice(0, 14)} className="card p-7 [&_h3]:mt-0 [&_li]:text-[17px] [&_ul]:mb-0" data-reveal>
                <MDXRemote source={chunk} components={mdxComponents} />
              </div>
            ))}
          </div>
          {older.length > 0 && (
            <details className="mt-8">
              <summary className="text-label-md inline-flex items-center gap-2 text-on-surface-muted transition-colors hover:text-on-surface">
                <span className="chev" aria-hidden>+</span> Older releases
              </summary>
              <div className="mt-6 max-w-[760px] [&_li]:text-[16px]">
                <MDXRemote source={older.join("\n\n")} components={mdxComponents} />
              </div>
            </details>
          )}
        </Section>
      )}

      {/* Everything it can do */}
      {tools && (
        <Section label="For the curious" title={`All ${toolCount} things Claude can do in Figma.`}>
          <details>
            <summary className="text-label-md inline-flex items-center gap-2 text-on-surface-muted transition-colors hover:text-on-surface">
              <span className="chev" aria-hidden>+</span> Show the full list
            </summary>
            <div className="mt-10">
              <ToolsSection groups={tools} />
            </div>
          </details>
        </Section>
      )}
    </>
  );
}
