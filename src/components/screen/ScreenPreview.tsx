"use client";

import { ScreenVariant } from "@/data/screens";
import Image from "next/image";

interface ScreenPreviewProps {
  screen: ScreenVariant;
  size?: "small" | "medium" | "large";
}

export function ScreenPreview({ screen, size = "medium" }: ScreenPreviewProps) {
  const sizeClasses = {
    small: "w-[200px] aspect-[9/19.5]",
    medium: "w-[300px] aspect-[9/19.5]",
    large: "w-full max-w-md aspect-[9/19.5]",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden relative shadow-2xl`}
    >
      <Image
        src={screen.preview}
        alt={screen.name}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 200px, (max-width: 1200px) 300px, 400px"
      />
    </div>
  );
}

