"use client";

import React from "react";
import type { FitnessTheme } from "@/data/ui-kits";
import { FitnessPreviewRN } from "./FitnessPreviewRN";

type FitnessPreviewFrameProps = {
  theme: FitnessTheme;
};

export function FitnessPreviewFrame({ theme }: FitnessPreviewFrameProps) {
  return (
    <div className="relative mx-auto w-full max-w-[320px] h-[640px] bg-black rounded-[32px] border-[8px] border-zinc-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
      {/* Notch / Dynamic Island placeholder */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-20" />
      
      {/* Screen Content */}
      <div className="w-full h-full bg-black overflow-hidden flex flex-col relative z-10">
         <div className="flex-1 flex flex-col h-full w-full">
            <FitnessPreviewRN theme={theme} />
         </div>
      </div>
      
      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-20" />
    </div>
  );
}

