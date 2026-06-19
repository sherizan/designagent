import Link from "next/link";
import type { Plugin } from "@/lib/marketplace";
import { CategoryIcon } from "./CategoryIcon";
import { StatusBadge } from "./StatusBadge";

export function PluginCard({ plugin }: { plugin: Plugin }) {
  const base =
    "group flex flex-col rounded-xl border p-6 transition-colors";
  const variant = plugin.featured
    ? "border-primary bg-surface hover:border-primary"
    : "border-border bg-surface-secondary hover:border-border-strong";

  return (
    <Link href={`/plugins/${plugin.slug}`} className={`${base} ${variant}`}>
      <div className="flex items-start justify-between">
        <CategoryIcon accent={plugin.accent} />
        <StatusBadge status={plugin.status} />
      </div>

      <h3 className="text-heading-sm mt-4 text-on-surface">{plugin.name}</h3>
      <p className="text-body-sm mt-1.5 text-on-surface-muted">
        {plugin.description}
      </p>

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
