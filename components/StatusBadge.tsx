import type { PluginStatus } from "@/lib/marketplace";

const VARIANTS: Record<PluginStatus, { label: string; className: string }> = {
  live: { label: "Live", className: "bg-success-surface text-success" },
  new: { label: "New", className: "bg-accent-review text-on-accent-review" },
  soon: { label: "Soon", className: "bg-surface-tertiary text-on-surface-subtle" },
};

export function StatusBadge({ status }: { status: PluginStatus }) {
  const v = VARIANTS[status];
  return (
    <span
      className={`text-label-sm inline-flex items-center rounded-full px-2.5 py-1 ${v.className}`}
    >
      {v.label}
    </span>
  );
}
