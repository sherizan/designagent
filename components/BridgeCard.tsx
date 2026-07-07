import Link from "next/link";
import type { Plugin } from "@/lib/marketplace";
import { PluginLogo } from "./PluginLogo";
import { StatusBadge } from "./StatusBadge";
import { CardInstall } from "./CardInstall";

/**
 * Full-width card for a `bridge` plugin: the connection between Claude Code and an
 * external surface. Visually distinct from the capability grid: wider, with the
 * "Claude Code ⇄ Figma" framing that says "integration", not "tool".
 */
export function BridgeCard({ plugin }: { plugin: Plugin }) {
  return (
    <Link
      href={`/plugins/${plugin.slug}`}
      className="card card-interactive group block p-6 sm:p-8"
      style={
        {
          "--card-accent": `var(--color-on-accent-${plugin.accent})`,
          "--card-border": "var(--color-primary)",
          "--card-bg": "var(--color-surface)",
        } as React.CSSProperties
      }
      data-reveal
      data-tilt
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <PluginLogo plugin={plugin} size={48} />
          <div className="flex flex-col gap-1.5">
            <h3 className="text-heading-md text-on-surface">{plugin.title}</h3>
            <p className="text-mono-sm flex items-center gap-2 text-on-surface-subtle">
              <span>Claude&nbsp;Code</span>
              <span aria-hidden className="text-on-surface">⇄</span>
              <span>Figma</span>
            </p>
          </div>
        </div>
        <StatusBadge status={plugin.status} />
      </div>

      <p className="text-body-lg mt-5 max-w-[640px] text-on-surface-muted">
        {plugin.description}
      </p>

      <div className="max-w-[420px]">
        <CardInstall command={plugin.install.install} />
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <span className="text-mono-sm text-on-surface-faint">{plugin.author}</span>
        <span
          aria-hidden
          className="inline-flex items-center gap-1.5 text-on-surface-subtle transition-colors group-hover:text-on-surface"
        >
          View the bridge
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </Link>
  );
}
