"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Copy, Check } from "lucide-react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
  variant?: "default" | "outline" | "ghost" | "secondary";
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function CopyButton({ 
  textToCopy, 
  label = "Copy", 
  variant = "default", 
  className,
  size = "default"
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size}
      onClick={handleCopy}
      className={cn("transition-all duration-200", className)}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          {label === "Copy" ? "Copied" : "Copied!"}
        </>
      ) : (
        <>
          <Copy className="w-4 h-4 mr-2" />
          {label}
        </>
      )}
    </Button>
  );
}

export function PromptBlock({ prompt }: { prompt: string }) {
  return (
    <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 relative group">
      <pre className="text-sm text-zinc-300 font-mono whitespace-pre-wrap max-h-[300px] overflow-y-auto custom-scrollbar">
        {prompt}
      </pre>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton 
          textToCopy={prompt} 
          size="sm" 
          variant="secondary"
          className="bg-zinc-800 text-zinc-200 hover:bg-zinc-700" 
        />
      </div>
    </div>
  );
}

interface ScreenPromptCardProps {
  label: string;
  description: string;
  prompt: string;
}

export function ScreenPromptCard({ label, description, prompt }: ScreenPromptCardProps) {
  return (
    <div className="bg-zinc-900/50 rounded-xl border border-zinc-800 p-5 flex flex-col h-full hover:border-zinc-700 transition-colors">
      <div className="mb-4">
        <h4 className="text-zinc-100 font-medium text-lg">{label}</h4>
        <p className="text-zinc-500 text-sm mt-1">{description}</p>
      </div>
      
      <div className="mt-auto pt-4 flex items-center justify-between border-t border-zinc-800/50">
        <span className="text-xs font-mono text-zinc-600">Cursor Prompt</span>
        <CopyButton 
          textToCopy={prompt} 
          label="Copy Prompt" 
          size="sm" 
          variant="outline"
          className="h-8 text-xs border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800" 
        />
      </div>
    </div>
  );
}

