"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Hide-before-paint on the client (no flash), plain effect during SSR.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * The site's single GSAP entry point (see .claude/skills/gsap). Server
 * components opt into scroll entrances by adding `data-reveal`; everything
 * else (hover states) is CSS. Re-scans on route change since this stays
 * mounted in the root layout.
 */
export function ScrollMotion() {
  const pathname = usePathname();

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (targets.length === 0) return;
      gsap.set(targets, { autoAlpha: 0, y: 14 });
      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.26,
            ease: "power3.out",
            stagger: 0.06,
            overwrite: true,
          }),
      });
      ScrollTrigger.refresh();
    });

    return () => mm.revert();
  }, [pathname]);

  return null;
}
