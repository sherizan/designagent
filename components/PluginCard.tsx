import Link from "next/link";
import type { Plugin } from "@/lib/marketplace";
import { PluginLogo } from "./PluginLogo";
import { StatusBadge } from "./StatusBadge";
import { CardInstall } from "./CardInstall";

export function PluginCard({ plugin }: { plugin: Plugin }) {
  const base =
    "group flex flex-col rounded-xl border p-6 transition-colors";
  const variant = plugin.featured
    ? "border-primary bg-surface hover:border-primary"
    : "border-border bg-surface-secondary hover:border-border-strong";

  return (
    <Link href={`/plugins/${plugin.slug}`} className={`${base} ${variant}`}>
      <div className="flex items-start justify-between">
        <PluginLogo plugin={plugin} />
        <StatusBadge status={plugin.status} />
      </div>

      <h3 className="text-heading-sm mt-4 text-on-surface">{plugin.title}</h3>
      <p className="text-body-sm mt-1.5 text-on-surface-muted">
        {plugin.description}
      </p>

      <CardInstall command={plugin.install.install} />

      <div className="mt-5 flex items-center justify-between border-t border-border pt-3.5">
        <span className="text-mono-sm text-on-surface-faint">
          {plugin.author}
        </span>
        <span
          aria-hidden
          className="text-on-surface-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-on-surface"
        >
          →
        </span>
      </div>
    </Link>
  );
}
