import Image from "next/image";
import type { Plugin } from "@/lib/marketplace";
import { CategoryIcon } from "./CategoryIcon";

/** The plugin's own logo when present, else the generic accent CategoryIcon. */
export function PluginLogo({
  plugin,
  size = 40,
}: {
  plugin: Plugin;
  size?: number;
}) {
  if (!plugin.logo) return <CategoryIcon accent={plugin.accent} size={size} />;

  return (
    <Image
      src={plugin.logo}
      alt={`${plugin.title} logo`}
      width={size}
      height={size}
      className="border border-border object-cover"
      style={{ width: size, height: size, borderRadius: size * 0.25 }}
    />
  );
}
