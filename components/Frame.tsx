import type { ReactNode } from "react";
import { Crosshair } from "./Crosshair";

/**
 * A blueprint section. Spans the full width of the page card (so its top rule and
 * `+` crosshairs meet the card's edges), applies the standard horizontal gutters,
 * and keeps its content in the centered 1120px column. `top={false}` for the
 * first section under the nav (no rule above it).
 */
export function Frame({
  children,
  className = "",
  top = true,
}: {
  children: ReactNode;
  className?: string;
  top?: boolean;
}) {
  return (
    <section
      className={`relative px-6 sm:px-16 ${top ? "border-t border-border" : ""} ${className}`}
    >
      {top && (
        <>
          <Crosshair className="absolute left-[-0.5px] top-0 -translate-x-1/2 -translate-y-1/2" />
          <Crosshair className="absolute right-[-0.5px] top-0 -translate-y-1/2 translate-x-1/2" />
        </>
      )}
      <div className="mx-auto w-full max-w-[1120px]">{children}</div>
    </section>
  );
}
