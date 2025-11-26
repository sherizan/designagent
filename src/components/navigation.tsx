"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Try Now", href: "/try-now" },
];

export const Navigation = () => {
  const pathname = usePathname();
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  // Find the index of the current page
  const selectedIndex = navigationItems.findIndex(item => item.href === pathname);
  const [selected, setSelected] = useState(selectedIndex);
  const tabsRef = useRef<(HTMLLIElement | null)[]>([]);
  
  // Check if we're on home page
  const isHomePage = pathname === "/";

  // Update selected tab when pathname changes
  useEffect(() => {
    const index = navigationItems.findIndex(item => item.href === pathname);
    setSelected(index);
  }, [pathname]);

  // This effect runs when the component mounts or when the selected tab changes.
  useEffect(() => {
    // Hide cursor if on home page or no tab selected
    if (isHomePage || selected < 0) {
      setPosition({
        left: 0,
        width: 0,
        opacity: 0,
      });
      return;
    }

    const selectedTab = tabsRef.current[selected];
    if (selectedTab) {
      const { width } = selectedTab.getBoundingClientRect();
      setPosition({
        left: selectedTab.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [selected, isHomePage]);

  return (
    <nav className="fixed top-0 left-0 right-0 w-full py-6 px-6 z-50">
      <div className="flex justify-center">
        <ul
          onMouseLeave={() => {
            // If on home page, hide the cursor
            if (isHomePage || selected < 0) {
              setPosition({
                left: 0,
                width: 0,
                opacity: 0,
              });
              return;
            }
            
            const selectedTab = tabsRef.current[selected];
            if (selectedTab) {
              const { width } = selectedTab.getBoundingClientRect();
              setPosition({
                left: selectedTab.offsetLeft,
                width,
                opacity: 1,
              });
            }
          }}
          className="relative flex w-fit items-center rounded-full border border-zinc-800 bg-zinc-900/50 p-1"
        >
          {/* Logo */}
          <li className="px-3 md:px-5">
            <Link href="/" className="text-base md:text-lg font-bold tracking-tight text-zinc-100">
              DesignAgent
            </Link>
          </li>

          {/* Divider */}
          <div className="h-8 w-px bg-zinc-800 md:h-10"></div>

          {navigationItems.map((item, i) => (
            <NavTab
              key={item.href}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              href={item.href}
              setPosition={setPosition}
              onHover={() => {}}
            >
              {item.label}
            </NavTab>
          ))}

          <Cursor position={position} />
        </ul>
      </div>
    </nav>
  );
};

const NavTab = React.forwardRef<
  HTMLLIElement,
  {
    children: React.ReactNode;
    href: string;
    setPosition: (position: { left: number; width: number; opacity: number }) => void;
    onHover: () => void;
  }
>(({ children, href, setPosition, onHover }, ref) => {
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        onHover();
        if (!ref || typeof ref === "function") return;

        const element = ref.current;
        if (!element) return;

        const { width } = element.getBoundingClientRect();

        setPosition({
          left: element.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block"
    >
      <Link
        href={href}
        className="block cursor-pointer px-3 py-1.5 text-xs uppercase text-zinc-400 hover:text-zinc-100 transition-colors md:px-5 md:py-3 md:text-base"
      >
        {children}
      </Link>
    </li>
  );
});

NavTab.displayName = "NavTab";

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-zinc-800 md:h-12"
    />
  );
};
