"use client";

import { useState } from "react";
import { playCopyBlip } from "@/lib/click-sound";

/**
 * Compact click-to-copy install command for plugin cards. Lives inside the card's
 * `<a>`, so it swallows the click (preventDefault) to copy instead of navigating.
 */
export function CardInstall({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  function copy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard
      .writeText(command)
      .then(() => {
        playCopyBlip();
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  }

  return (
    <div
      onClick={copy}
      title="Click to copy"
      className="copy-box mt-4 flex cursor-copy items-center gap-2 rounded-md px-2.5 py-1.5"
    >
      <code className="text-mono-sm min-w-0 flex-1 truncate text-on-surface-subtle">
        {command}
      </code>
      <span
        aria-hidden
        className={`text-mono-sm shrink-0 transition-colors ${
          copied ? "text-success" : "text-on-surface-faint"
        }`}
      >
        {copied ? "✓ copied" : "copy"}
      </span>
    </div>
  );
}
