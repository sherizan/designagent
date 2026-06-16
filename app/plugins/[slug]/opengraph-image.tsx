import { ImageResponse } from "next/og";
import { getPlugin, getPlugins } from "@/lib/marketplace";
import { BRAND, ACCENT_HEX } from "@/lib/brand";

export const alt = "designagent plugin";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPlugins().map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = getPlugin(slug);

  const name = plugin?.name ?? slug;
  const description = plugin?.description ?? "A Claude Code plugin for designers.";
  const accent = ACCENT_HEX[plugin?.accent ?? "community"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: BRAND.surface,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* top: brand + category icon */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", flexWrap: "wrap", width: 39, gap: 5 }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ width: 17, height: 17, borderRadius: 5, background: BRAND.primary }} />
              ))}
            </div>
            <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: BRAND.onSurface }}>
              designagent
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 96,
              borderRadius: 24,
              background: accent.bg,
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
              fontWeight: 700,
              color: accent.fg,
            }}
          >
            {name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* middle: name + description */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: -2,
              color: BRAND.onSurface,
            }}
          >
            {name}
          </div>
          <div style={{ display: "flex", fontSize: 32, lineHeight: 1.4, color: BRAND.onSurfaceMuted, maxWidth: 1000 }}>
            {description}
          </div>
        </div>

        {/* bottom: install command */}
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: `1px solid ${BRAND.border}`,
            background: BRAND.surfaceSecondary,
            borderRadius: 12,
            padding: "16px 24px",
            fontSize: 26,
            color: BRAND.onSurface,
            fontFamily: "monospace",
          }}
        >
          /plugin install {name}@designagent
        </div>
      </div>
    ),
    { ...size },
  );
}
