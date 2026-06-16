import Link from "next/link";
import type { Plugin } from "@/lib/marketplace";

export function PluginCard({ plugin }: { plugin: Plugin }) {
  return (
    <Link
      href={`/plugins/${plugin.slug}`}
      className="group relative flex flex-col gap-3 rounded-xl border border-border bg-card/40 p-5 transition-colors hover:border-accent/60"
    >
      <span className="absolute left-0 top-5 h-6 w-px bg-accent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-mono text-base font-semibold tracking-tight">
          {plugin.name}
        </h3>
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
          {plugin.category}
        </span>
      </div>
      <p className="text-sm leading-relaxed text-muted">{plugin.description}</p>
      <div className="mt-1 flex flex-wrap gap-1.5">
        {plugin.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
          >
            {tag}
          </span>
        ))}
      </div>
      <code className="mt-2 block truncate font-mono text-xs text-accent/90">
        {plugin.install.install}
      </code>
    </Link>
  );
}
