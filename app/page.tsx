import Link from "next/link";
import { DemoStage } from "@/components/DemoStage";
import { Eyebrow } from "@/components/Eyebrow";
import { Frame } from "@/components/Frame";
import { InstallBlock } from "@/components/InstallBlock";
import { getBridge } from "@/lib/marketplace";

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

export default function Home() {
  const bridge = getBridge();

  return (
    <>
      {/* Hero */}
      <Frame top={false} className="relative isolate pt-24 pb-24 sm:pt-36 sm:pb-28">
        <div
          aria-hidden
          className="hero-mesh pointer-events-none absolute inset-x-0 -top-[76px] bottom-0 -z-10 rounded-t-[15px]"
        />
        <div
          aria-hidden
          className="hero-crosshair pointer-events-none absolute inset-x-0 -top-[76px] bottom-0 -z-10 rounded-t-[15px]"
        />
        <h1 className="text-display-lg animate-rise max-w-[680px] text-balance text-on-surface">
          Ask Claude.
          <br />
          Watch it happen in Figma.
        </h1>
        <p className="text-body-lg animate-rise delay-1 mt-7 max-w-[600px] text-on-surface-muted">
          DesignAgent connects Claude Code to your open Figma file. Say what
          you want in plain words, and Claude reads your design, builds it and
          tidies it up, right on your canvas.
        </p>
        <div className="animate-rise delay-2 mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href={FIGMA_PLUGIN_URL}
            target="_blank"
            rel="noreferrer"
            data-magnetic
            className="text-label-lg rounded-full bg-primary px-[22px] py-3 text-on-primary transition-colors hover:bg-primary-hover"
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
      </Frame>

      {/* In action */}
      <Frame className="py-20 sm:py-28">
        <Eyebrow>In action</Eyebrow>
        <h2 className="text-heading-lg mt-4 mb-3 text-on-surface">
          You type. Your canvas changes.
        </h2>
        <p className="text-body-md mb-12 max-w-[600px] text-on-surface-muted">
          No new tool to learn. You talk to Claude the way you&apos;d brief a
          teammate, and the work shows up in the file you already have open.
        </p>
        <DemoStage />
      </Frame>

      {/* What you can ask */}
      <Frame className="py-20 sm:py-28">
        <Eyebrow>What you can ask</Eyebrow>
        <h2 className="text-heading-lg mt-4 mb-12 text-on-surface">
          Six things designers use it for
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ASKS.map((item) => (
            <div
              key={item.title}
              className="card flex flex-col gap-3 p-6"
              style={{ "--card-accent": "var(--color-on-accent-figma)" } as React.CSSProperties}
              data-reveal
            >
              <h3 className="text-heading-sm text-on-surface">{item.title}</h3>
              <p className="text-body-md text-on-surface">“{item.ask}”</p>
              <p className="text-body-sm text-on-surface-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </Frame>

      {/* Get started */}
      <Frame className="scroll-mt-24 py-20 sm:py-28" id="start">
        <Eyebrow>Get started</Eyebrow>
        <h2 className="text-heading-lg mt-4 mb-12 text-on-surface">
          Three steps, about two minutes
        </h2>
        <ol className="grid gap-12 xl:grid-cols-[1fr_1.6fr_1fr] xl:gap-10">
          <li className="flex flex-col gap-3">
            <span className="text-mono-sm text-on-accent-figma">01</span>
            <h3 className="text-heading-sm text-on-surface">Add the plugin in Figma</h3>
            <p className="text-body-sm text-on-surface-muted">
              It&apos;s free on Figma Community. Open it in the file you want
              to work on.
            </p>
            <a
              href={FIGMA_PLUGIN_URL}
              target="_blank"
              rel="noreferrer"
              className="text-label-md w-fit text-on-surface underline decoration-on-surface-faint underline-offset-4 transition-colors hover:decoration-on-surface"
            >
              DesignAgent on Figma Community ↗
            </a>
          </li>
          <li className="flex flex-col gap-3">
            <span className="text-mono-sm text-on-accent-figma">02</span>
            <h3 className="text-heading-sm text-on-surface">Add it to Claude Code</h3>
            <p className="text-body-sm text-on-surface-muted">
              Paste these two lines into Claude Code, one after the other.
            </p>
            {bridge && (
              <InstallBlock
                add={bridge.install.add}
                install={bridge.install.install}
                label="Paste into Claude Code"
                className="copy-box-mesh mt-1"
              />
            )}
          </li>
          <li className="flex flex-col gap-3">
            <span className="text-mono-sm text-on-accent-figma">03</span>
            <h3 className="text-heading-sm text-on-surface">Press Start, then ask</h3>
            <p className="text-body-sm text-on-surface-muted">
              In the plugin, press Start. When the dot turns green, Claude can
              see your file. Select something and ask away.
            </p>
            {bridge && (
              <Link
                href={`/plugins/${bridge.slug}`}
                className="text-label-md w-fit text-on-surface underline decoration-on-surface-faint underline-offset-4 transition-colors hover:decoration-on-surface"
              >
                Full guide and release notes →
              </Link>
            )}
          </li>
        </ol>
      </Frame>
    </>
  );
}
