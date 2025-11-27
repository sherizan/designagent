"use client";

import Link from "next/link";
import { Screen } from "@/data/screens";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ScreenCardProps {
  screen: Screen;
}

export function ScreenCard({ screen }: ScreenCardProps) {
  return (
    <Card className="group overflow-hidden bg-zinc-900 border-zinc-800 flex flex-col h-full hover:border-zinc-700 transition-all duration-300">
      <Link href={`/screens/${screen.slug}`} className="block flex-1">
        {/* Thumbnail Area - Aspect Ratio 4:5 */}
        <div className="relative aspect-[4/5] bg-zinc-800 overflow-hidden">
          {/* Placeholder for preview image */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <div className="text-center px-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-lg bg-zinc-700/50 flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <span className="text-zinc-700 font-bold text-sm">
                {screen.title}
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
        </div>

        <CardContent className="flex-1 p-5 space-y-3">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
              {screen.title}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2">{screen.description}</p>
          </div>

          {/* Components used */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {screen.components.slice(0, 3).map((component, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-mono"
              >
                {component}
              </span>
            ))}
            {screen.components.length > 3 && (
              <span className="px-2 py-0.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px]">
                +{screen.components.length - 3}
              </span>
            )}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-5 pt-0">
        <Link href={`/screens/${screen.slug}`} className="w-full">
          <Button
            variant="outline"
            className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

