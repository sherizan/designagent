import { Fragment } from "react";
import type { AccentKey } from "@/lib/marketplace";
import { type Flow, type FlowStage, KIND_LABEL } from "@/lib/flows";

/** Tint for the stage's kind label; coordinates the flow with the plugin's icon accent. */
const ACCENT_TEXT: Record<AccentKey, string> = {
  figma: "text-on-accent-figma",
  review: "text-on-accent-review",
  tokens: "text-on-accent-tokens",
  community: "text-on-surface-subtle",
  setup: "text-on-accent-setup",
  backgrounds: "text-on-accent-backgrounds",
  brand: "text-on-accent-brand",
  voice: "text-on-accent-voice",
  design: "text-on-accent-design",
};

function Node({ stage, accent }: { stage: FlowStage; accent: AccentKey }) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-lg border border-border bg-surface-secondary p-4">
      <span className={`text-eyebrow ${ACCENT_TEXT[accent]}`}>
        {KIND_LABEL[stage.kind]}
      </span>
      <p className="text-heading-sm text-on-surface">{stage.title}</p>
      {stage.detail && (
        <p className="text-body-sm text-on-surface-muted">{stage.detail}</p>
      )}
      {stage.items && stage.items.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1.5">
          {stage.items.map((item) => (
            <span
              key={item}
              className="text-mono-sm rounded-full border border-border bg-surface px-2 py-0.5 text-on-surface-muted"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Connector() {
  return (
    <div
      aria-hidden
      className="flex items-center justify-center py-1 text-on-surface-faint sm:px-2 sm:py-0"
    >
      <span className="sm:hidden">↓</span>
      <span className="hidden sm:inline">→</span>
    </div>
  );
}

export function FlowDiagram({
  flow,
  accent,
}: {
  flow: Flow;
  accent: AccentKey;
}) {
  const summary = flow.map((s) => s.title).join(" → ");
  return (
    <div
      role="img"
      aria-label={`How it works: ${summary}`}
      className="flex flex-col sm:flex-row sm:items-stretch"
    >
      {flow.map((stage, i) => (
        <Fragment key={`${stage.kind}-${i}`}>
          <Node stage={stage} accent={accent} />
          {i < flow.length - 1 && <Connector />}
        </Fragment>
      ))}
    </div>
  );
}
