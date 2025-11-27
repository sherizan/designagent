"use client";

import { Screen } from "@/data/screens";
import Image from "next/image";

interface ScreenPreviewProps {
  screen: Screen;
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
      {/* Placeholder for preview image */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-zinc-700/50 flex items-center justify-center">
            <span className="text-4xl">📱</span>
          </div>
          <span className="text-zinc-600 font-semibold text-sm">{screen.title}</span>
        </div>
      </div>
    </div>
  );
}

