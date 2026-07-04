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
      /* clipboard unavailable, no-op */
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
        className={`text-mono-sm shrink-0 rounded-[6px] border px-2.5 py-1 transition-colors ${
          copied
            ? "border-success/40 bg-success-surface text-success"
            : "border-border bg-surface text-on-surface-subtle hover:border-border-strong hover:text-on-surface"
        }`}
      >
        {copied ? "✓ copied" : "copy"}
      </button>
    </div>
  );
}

export function InstallBlock({
  add,
  install,
  label = "Quick install",
  className = "",
}: {
  add: string;
  /** Optional plugin-install line. Omit on the marketplace-level block (e.g. the hero). */
  install?: string;
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`inline-block max-w-full rounded-xl border border-border bg-surface-secondary px-6 py-5 ${className}`}
    >
      <p className="text-eyebrow mb-2.5 text-on-surface-faint">{label}</p>
      <CopyRow command={add} />
      {install && <CopyRow command={install} />}
      {install && (
        <p className="text-mono-sm mt-2.5 text-on-surface-faint">
          Already added the marketplace?{" "}
          <span className="text-on-surface-subtle">
            /plugin marketplace update designagent
          </span>{" "}
          first.
        </p>
      )}
    </div>
  );
}
