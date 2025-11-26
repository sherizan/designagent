"use client";

import { useState } from "react";
import Link from "next/link";
import { UIkit } from "@/data/ui-kits";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface UIKitCardProps {
  kit: UIkit;
}

export function UIKitCard({ kit }: UIKitCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // Fallback to cursorPrompt if fullAppPrompt is not available (legacy kits)
    const promptToCopy = kit.fullAppPrompt || kit.cursorPrompt || "";
    if (!promptToCopy) return;

    try {
      await navigator.clipboard.writeText(promptToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Card className="group overflow-hidden bg-zinc-900 border-zinc-800 flex flex-col h-full hover:border-zinc-700 transition-all duration-300">
      <Link href={`/kits/${kit.id}`} className="block flex-1">
        {/* Thumbnail Area - Aspect Ratio 4:5 */}
        <div className="relative aspect-[4/5] bg-zinc-800 overflow-hidden">
          {/* Placeholder for actual image */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
            <span className="text-zinc-700 font-bold text-lg px-4 text-center">
              {kit.name} Preview
            </span>
          </div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {kit.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-zinc-300 text-[10px] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <CardContent className="flex-1 p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
              {kit.name}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2">{kit.description}</p>
          </div>

          {/* Mini Preview Strip */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[0, 1, 2].map((i) => (
              <div 
                key={i} 
                className="aspect-[3/4] rounded-md bg-zinc-800 border border-zinc-700/50 overflow-hidden"
              >
                 {/* Placeholder for mini previews */}
                 <div className="w-full h-full bg-zinc-800/50" />
              </div>
            ))}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-5 pt-0 grid grid-cols-2 gap-3">
        <Link 
          href={`/kits/${kit.id}`}
          className="w-full"
        >
          <Button 
            variant="outline" 
            className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            View Kit
          </Button>
        </Link>
        <Button 
          onClick={handleCopy}
          className={cn(
            "w-full transition-all duration-200",
            copied 
              ? "bg-emerald-500 hover:bg-emerald-600 text-white" 
              : "bg-white hover:bg-zinc-200 text-black"
          )}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
