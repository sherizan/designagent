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

    // Header surfaces once the page scrolls — a state, not a flourish, so it
    // lives outside the reduced-motion gate (the CSS transition is what the
    // global guard zeroes).
    const header = document.querySelector<HTMLElement>("[data-header]");
    const headerTrigger = header
      ? ScrollTrigger.create({
          start: 12,
          end: "max",
          onToggle: (self) => header.classList.toggle("is-scrolled", self.isActive),
        })
      : null;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      if (targets.length > 0) {
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
      }

      // Magnetic pull (a few px toward the cursor) for [data-magnetic] buttons.
      const cleanups: Array<() => void> = [];
      for (const el of gsap.utils.toArray<HTMLElement>("[data-magnetic]")) {
        const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.15);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      }

      // Perspective tilt (≤2.5°) toward the cursor for [data-tilt] cards.
      for (const el of gsap.utils.toArray<HTMLElement>("[data-tilt]")) {
        gsap.set(el, { transformPerspective: 700 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power2.out" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power2.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 5);
          rx(((e.clientY - r.top) / r.height - 0.5) * -5);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        });
      }
      return () => cleanups.forEach((fn) => fn());
    });

    return () => {
      headerTrigger?.kill();
      mm.revert();
    };
  }, [pathname]);

  return null;
}
