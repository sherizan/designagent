"use client";

import Link from "next/link";
import { ScreenVariant, getCategoryLabel } from "@/data/screens";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export type ScreenCardProps = {
  variant: ScreenVariant;
  previewMode?: "image" | "live";
};

export function ScreenCard({ variant, previewMode = "image" }: ScreenCardProps) {
  const isPro = variant.access === "pro";
  const categoryLabel = getCategoryLabel(variant.category);

  return (
    <Link href={`/screens/${variant.slug}`} className="block group">
      <Card
        className={`overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full ${
          isPro ? "ring-1 ring-amber-500/50" : ""
        }`}
      >
        {/* Preview Area */}
        <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
          {/* Live Preview or Image */}
          {previewMode === "live" && variant.livePreviewUrl ? (
            <iframe
              src={variant.livePreviewUrl}
              className="w-full h-full rounded-2xl border border-white/10"
              loading="lazy"
              title={`${variant.name} preview`}
            />
          ) : (
            <Image
              src={variant.preview}
              alt={variant.name}
              fill
              className="rounded-2xl transition-transform duration-300 group-hover:scale-[1.03] object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}

          {/* Category Badge - Top Left */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white/80 backdrop-blur text-xs">
            {categoryLabel}
          </div>

          {/* Pro Badge - Top Right */}
          {isPro && (
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-amber-500/90 text-black font-semibold shadow-sm text-[10px] uppercase tracking-wide">
              Pro
            </div>
          )}

          {/* Subtle gradient overlay for Pro screens */}
          {isPro && (
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/20 pointer-events-none" />
          )}
        </div>

        {/* Content Area */}
        <CardContent className="flex-1 p-5 space-y-3 flex flex-col">
          <div className="space-y-2 flex-1">
            <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/90 transition-colors">
              {variant.name}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {variant.description}
            </p>
          </div>

          {/* Meta Row */}
          <div className="flex items-center justify-between pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground">
                {variant.components.length} components
              </span>
              <span className="text-[10px] text-muted-foreground">·</span>
              <span className="text-[10px] text-muted-foreground">RN + Cursor ready</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

