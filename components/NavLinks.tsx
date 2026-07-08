"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const NAV = [
  { href: "/plugins", label: "Plugins" },
  { href: "/build", label: "Build" },
];

/**
 * Center nav capsule. One shared pill glides between links on hover (GSAP)
 * and rests on the current section; it hides on pages outside the nav.
 */
export function NavLinks() {
  const pathname = usePathname();
  const wrap = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  const activeIndex = NAV.findIndex(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
  );

  function moveTo(el: HTMLElement | null, immediate = false) {
    if (!pill.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el) {
      gsap.to(pill.current, { opacity: 0, duration: reduced || immediate ? 0 : 0.2 });
      return;
    }
    gsap.to(pill.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      opacity: 1,
      duration: reduced || immediate ? 0 : 0.3,
      ease: "power3.out",
    });
  }

  function linkAt(index: number): HTMLElement | null {
    const links = wrap.current?.querySelectorAll("a");
    return links?.[index] ?? null;
  }

  useEffect(() => {
    moveTo(linkAt(activeIndex), true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      ref={wrap}
      onMouseLeave={() => moveTo(linkAt(activeIndex))}
      className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-border bg-surface/95 p-1 backdrop-blur-sm sm:flex"
    >
      <span
        ref={pill}
        aria-hidden
        className="pointer-events-none absolute top-1 bottom-1 left-0 rounded-full bg-surface-tertiary"
        style={{ width: 0, opacity: 0 }}
      />
      {NAV.map((item, index) => {
        const active = index === activeIndex;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onMouseEnter={(e) => moveTo(e.currentTarget)}
            className={`text-label-md relative rounded-full px-3.5 py-1.5 transition-colors ${
              active ? "text-on-surface" : "text-on-surface-subtle hover:text-on-surface"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
