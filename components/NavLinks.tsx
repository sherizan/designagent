"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/plugins", label: "Plugins" },
  { href: "/build", label: "Build" },
];

/** Center nav capsule. The link for the current section keeps its white pill. */
export function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full bg-surface-secondary p-1 sm:flex">
      {NAV.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`text-label-md rounded-full px-3.5 py-1.5 transition-colors ${
              active
                ? "bg-surface text-on-surface"
                : "text-on-surface-subtle hover:bg-surface hover:text-on-surface"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
