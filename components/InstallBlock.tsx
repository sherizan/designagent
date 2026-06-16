"use client";

import { useState } from "react";

function CopyRow({ command }: { command: string }) {
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
    <div className="flex items-start gap-3 py-1.5">
      <span
        aria-hidden
        className="select-none pt-px text-mono-sm text-on-surface-faint"
      >
        /
      </span>
      <code className="text-mono-sm min-w-0 flex-1 break-words text-on-surface sm:whitespace-nowrap">
        {command}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy: ${command}`}
        className="text-mono-sm shrink-0 rounded-[6px] border border-border bg-surface px-2.5 py-1 text-on-surface-subtle transition-colors hover:border-border-strong hover:text-on-surface"
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
      className={`inline-block max-w-full rounded-xl border border-border bg-surface-secondary px-6 py-5 ${className}`}
    >
      <p className="text-eyebrow mb-2.5 text-on-surface-faint">Quick install</p>
      <CopyRow command={add} />
      <CopyRow command={install} />
    </div>
  );
}
