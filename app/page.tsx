import Link from "next/link";
import { BridgeCard } from "@/components/BridgeCard";
import { Eyebrow } from "@/components/Eyebrow";
import { FlowDiagram } from "@/components/FlowDiagram";
import { Frame } from "@/components/Frame";
import { InstallBlock } from "@/components/InstallBlock";
import { getFlow } from "@/lib/flows";
import { getBridge } from "@/lib/marketplace";

/** The Figma half of the bridge: the Community plugin that runs inside Figma. */
const FIGMA_PLUGIN_URL =
  "https://www.figma.com/community/plugin/1604428052675393154/designagent-claude-bridge";

export default function Home() {
  const bridge = getBridge();
  const flow = bridge ? getFlow(bridge.slug) : null;

  return (
    <>
      {/* Hero */}
      <Frame top={false} className="relative isolate pt-20 pb-14 sm:pt-28">
        <div
          aria-hidden
          className="hero-mesh pointer-events-none absolute inset-x-0 -top-[60px] bottom-0 -z-10 rounded-t-[15px]"
        />
        <div
          aria-hidden
          className="hero-crosshair pointer-events-none absolute inset-x-0 -top-[60px] bottom-0 -z-10 rounded-t-[15px]"
        />
        <h1 className="text-display-lg animate-rise max-w-[680px] text-balance text-on-surface">
          Claude Code&apos;s hands
          <br />
          and eyes in Figma.
        </h1>
        <p className="text-body-lg animate-rise delay-1 mt-5 max-w-[680px] text-on-surface-muted">
          A live, two-way bridge between Claude Code and your Figma file. Claude
          reads what&apos;s on the canvas, builds and edits it in place, and
          turns it into production UI from a design-system-faithful DESIGN.md.
        </p>
        {bridge && (
          <div className="animate-rise delay-2 mt-8">
            <InstallBlock
              add={bridge.install.add}
              install={bridge.install.install}
              label="Install in Claude Code"
              className="copy-box-mesh"
            />
            <p className="text-body-sm mt-3 max-w-[520px] text-on-surface-subtle">
              Then add the other half in Figma:{" "}
              <a
                href={FIGMA_PLUGIN_URL}
                target="_blank"
                rel="noreferrer"
                className="text-on-surface underline decoration-on-surface-faint underline-offset-4 transition-colors hover:decoration-on-surface"
              >
                DesignAgent on Figma Community ↗
              </a>
            </p>
          </div>
        )}
      </Frame>

      {/* The bridge */}
      {bridge && (
        <Frame className="animate-rise delay-2 pt-12 pb-12">
          <Eyebrow>The bridge</Eyebrow>
          <h2 className="text-heading-lg mt-3 mb-2 text-on-surface">
            Connect Claude Code to your canvas
          </h2>
          <p className="text-body-md mb-6 max-w-[640px] text-on-surface-muted">
            Claude Code can&apos;t critique what it can&apos;t see. This is the
            plugin that gives it eyes and hands inside Figma.
          </p>
          <BridgeCard plugin={bridge} />
        </Frame>
      )}

      {/* How it works */}
      {bridge && flow && (
        <Frame className="animate-rise delay-3 pt-12 pb-20">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-heading-lg mt-3 mb-6 text-on-surface">
            From canvas to code, and back
          </h2>
          <FlowDiagram flow={flow} accent={bridge.accent} />
          <Link
            href={`/plugins/${bridge.slug}`}
            className="text-label-md mt-8 inline-flex items-center gap-1.5 text-on-surface-subtle transition-colors hover:text-on-surface"
          >
            Read the docs, tools and release notes <span aria-hidden>→</span>
          </Link>
        </Frame>
      )}
    </>
  );
}
