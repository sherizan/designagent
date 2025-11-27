"use client";

import { ScreenCategory } from "@/data/screens";
import { Button } from "@/components/ui/button";

interface ScreenFiltersProps {
  activeCategory: ScreenCategory | "all";
  onChange: (category: ScreenCategory | "all") => void;
}

const categories: Array<{ value: ScreenCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "auth", label: "Auth" },
  { value: "paywall", label: "Paywall" },
  { value: "profile", label: "Profile" },
  { value: "home", label: "Home" },
  { value: "settings", label: "Settings" },
  { value: "detail", label: "Detail" },
  { value: "empty", label: "Empty" },
];

export function ScreenFilters({ activeCategory, onChange }: ScreenFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category.value}
          onClick={() => onChange(category.value)}
          variant={activeCategory === category.value ? "default" : "outline"}
          className={
            activeCategory === category.value
              ? "bg-white text-black hover:bg-zinc-200"
              : "bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          }
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
