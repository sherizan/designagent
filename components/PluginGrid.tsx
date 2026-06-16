"use client";

import { useMemo, useState } from "react";
import type { Plugin } from "@/lib/marketplace";
import { PluginCard } from "./PluginCard";

export function PluginGrid({
  plugins,
  filterable = false,
}: {
  plugins: Plugin[];
  filterable?: boolean;
}) {
  const categories = useMemo(
    () => ["all", ...Array.from(new Set(plugins.map((p) => p.category))).sort()],
    [plugins],
  );
  const [active, setActive] = useState("all");

  const visible =
    active === "all" ? plugins : plugins.filter((p) => p.category === active);

  return (
    <div className="flex flex-col gap-6">
      {filterable && categories.length > 2 && (
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`text-label-md rounded-full border px-3.5 py-1.5 transition-colors ${
                active === cat
                  ? "border-primary bg-primary text-on-primary"
                  : "border-border text-on-surface-subtle hover:border-border-strong hover:text-on-surface"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {visible.map((plugin) => (
          <PluginCard key={plugin.slug} plugin={plugin} />
        ))}
      </div>
    </div>
  );
}
