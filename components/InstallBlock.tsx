"use client";

import { useState } from "react";

function CopyRow({ command, prompt }: { command: string; prompt: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <div className="group flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4">
      <span aria-hidden className="select-none font-mono text-accent">
        {prompt}
      </span>
      <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-sm text-foreground sm:text-base">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy: ${command}`}
        className="shrink-0 rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted transition-colors hover:border-border-strong hover:text-foreground"
      >
        {copied ? "copied" : "copy"}
      </button>
    </div>
  );
}

export function InstallBlock({
  add,
  install,
  className = "",
}: {
  add: string;
  install: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border-strong bg-card/60 divide-y divide-border ${className}`}
    >
      <CopyRow command={add} prompt="›" />
      <CopyRow command={install} prompt="›" />
    </div>
  );
}
