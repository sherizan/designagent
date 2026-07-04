import type { ReactNode } from "react";
import { Crosshair } from "./Crosshair";

/**
 * A blueprint section. Spans the full framed content column (so its edges line up
 * with the column's vertical rules), carries a top rule with `+` crosshairs at the
 * two corners, and applies the standard horizontal gutters. `top={false}` for the
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
      className={`relative px-6 sm:px-10 ${top ? "border-t border-border" : ""} ${className}`}
    >
      {top && (
        <>
          <Crosshair className="absolute left-[-0.5px] top-0 -translate-x-1/2 -translate-y-1/2" />
          <Crosshair className="absolute right-[-0.5px] top-0 -translate-y-1/2 translate-x-1/2" />
        </>
      )}
      {children}
    </section>
  );
}
