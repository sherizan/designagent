import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const alt = "designagent — Claude Code plugins for designers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Mark({ unit = 26, gap = 7 }: { unit?: number; gap?: number }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", width: unit * 2 + gap, gap }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: unit,
            height: unit,
            borderRadius: unit * 0.28,
            background: BRAND.primary,
          }}
        />
      ))}
    </div>
  );
}

export default function Image() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mark />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 600, color: BRAND.onSurface }}>
            designagent
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.05,
              color: BRAND.onSurface,
              maxWidth: 900,
            }}
          >
            Claude Code plugins, built for designers.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: BRAND.onSurfaceMuted }}>
            Curated plugins · install in one command · designagent.dev
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
