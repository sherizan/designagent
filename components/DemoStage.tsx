"use client";

import { useEffect, useState } from "react";

/**
 * The plugin in action: a looping, three-scene demo of the chat inside Figma. On
 * the left, the DesignAgent panel: you type, Claude works through its steps. On
 * the right, your canvas: the design is assembled piece by piece while Claude's
 * cursor moves to whatever it is changing. Viewers can jump between scenes; with
 * reduced motion the loop stops and each scene shows its finished state.
 *
 * Each scene is a list of steps. A step says which of Claude's activity chips is
 * running and where its cursor sits (px, relative to the card on the canvas).
 */
type Step = { chip: number; cursor: [number, number] };

const SCENES: ReadonlyArray<{
  tab: string;
  prompt: string;
  chips: readonly string[];
  steps: readonly Step[];
  reply: string;
}> = [
  {
    tab: "Build it",
    prompt: "Design a sign-up card in my file",
    chips: ["Checking the file", "Building the layout", "Looking at the design"],
    steps: [
      { chip: 0, cursor: [-28, -18] },
      { chip: 1, cursor: [150, 36] }, // header lands
      { chip: 1, cursor: [196, 104] }, // body lands
      { chip: 1, cursor: [176, 164] }, // button lands
      { chip: 2, cursor: [246, 190] },
    ],
    reply: "Built a card with a header, body and button. Auto layout is on.",
  },
  {
    tab: "Keep it on-system",
    prompt: "Use my spacing, corner and colour variables",
    chips: ["Reading your variables", "Making several edits", "Looking at the design"],
    steps: [
      { chip: 0, cursor: [246, 190] },
      { chip: 1, cursor: [22, 22] }, // padding and corners follow the variables
      { chip: 1, cursor: [176, 196] }, // button colour follows
      { chip: 2, cursor: [236, 206] },
    ],
    reply: "Linked padding, corners and the button colour to your variables.",
  },
  {
    tab: "Add motion",
    prompt: "Fade it in and export a GIF",
    chips: ["Reading the selection", "Adding the animation", "Exporting the GIF"],
    steps: [
      { chip: 0, cursor: [236, 206] },
      { chip: 1, cursor: [130, 110] }, // fade starts
      { chip: 2, cursor: [150, 236] },
    ],
    reply: "Added a fade-in and saved signup.gif to your project.",
  },
];

const TYPE_MS = 34;
const STEP_MS = 950;
const HOLD_MS = 3200;
const CORAL = "#d97757"; // the plugin's own accent: its panel mark and Claude's cursor

export function DemoStage() {
  const [scene, setScene] = useState(0);
  const [typed, setTyped] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);

  const { prompt, chips, steps, reply } = SCENES[scene];
  // With reduced motion nothing types or steps: every scene shows its finished state.
  const shown = reduced ? prompt.length : typed;
  const sent = shown >= prompt.length;
  const at = reduced ? steps.length : step; // steps.length = the turn is finished
  const finished = sent && at >= steps.length;
  const current = steps[Math.min(at, steps.length - 1)];

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Type the prompt, walk Claude's steps, hold on the result, then the next scene.
  useEffect(() => {
    if (reduced) return;
    if (!sent) {
      const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    if (step < steps.length) {
      const t = setTimeout(() => setStep((n) => n + 1), STEP_MS);
      return () => clearTimeout(t);
    }
    if (!auto) return;
    const t = setTimeout(() => {
      setTyped(0);
      setStep(0);
      setScene((s) => (s + 1) % SCENES.length);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [typed, sent, step, steps.length, auto, reduced]);

  function jump(index: number) {
    setAuto(false);
    setTyped(0);
    setStep(0);
    setScene(index);
  }

  // What the canvas shows. Scene 0 builds the card a piece per step, scene 1
  // restyles it from variables, scene 2 fades it in. Later scenes keep what
  // earlier ones made.
  const working = sent ? at : -1;
  const pieceIn = (index: number) => scene > 0 || working > index;
  const shaped = (scene === 1 && working >= 1) || scene === 2;
  const coloured = (scene === 1 && working >= 2) || scene === 2;
  const fading = scene === 2 && working >= 1 && !reduced;
  const exported = scene === 2 && finished;
  const cursorOn = sent && !finished && !reduced;

  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  const piece = (index: number): React.CSSProperties => ({
    opacity: pieceIn(index) ? 1 : 0,
    transform: pieceIn(index) ? "none" : "translateY(8px)",
    transition: reduced ? "none" : `opacity 420ms ${ease}, transform 420ms ${ease}`,
  });

  return (
    <div>
      <div className="card">
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* The DesignAgent panel, in Figma */}
          <div className="flex flex-col gap-4 border-b border-border p-6 sm:p-8 md:border-r md:border-b-0">
            <p className="text-eyebrow">You, in the DesignAgent panel</p>

            <div className="flex min-h-[360px] flex-1 flex-col rounded-2xl border border-border bg-surface shadow-[0_1px_2px_rgb(0_0_0/0.05)]">
              {/* Panel header */}
              <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
                <span
                  aria-hidden
                  className="flex size-6 items-center justify-center rounded-md text-[13px] leading-none text-white"
                  style={{ background: CORAL }}
                >
                  ↔
                </span>
                <span className="text-label-md text-on-surface">Claude Bridge</span>
                <span className="text-body-sm ml-auto flex items-center gap-1.5 text-on-surface-muted">
                  <span aria-hidden className="size-2 rounded-full bg-success" />
                  Connected
                </span>
              </div>

              {/* Conversation */}
              <div className="flex flex-1 flex-col gap-2.5 px-4 py-4" aria-live="polite">
                {sent && (
                  <p className="text-body-sm max-w-[88%] self-end rounded-[14px_14px_4px_14px] bg-surface-tertiary px-3 py-2 text-on-surface">
                    {prompt}
                  </p>
                )}
                {sent &&
                  chips.map((label, i) => {
                    const state = finished || current.chip > i ? "done" : current.chip === i ? "running" : "hidden";
                    if (state === "hidden") return null;
                    return (
                      <span
                        key={label}
                        className="text-body-sm animate-rise flex items-center gap-2 self-start rounded-full border border-border bg-surface-secondary py-0.5 pr-3 pl-2 text-on-surface-muted"
                      >
                        {state === "done" ? (
                          <span aria-hidden className="w-3 text-center text-[11px] text-success">
                            ✓
                          </span>
                        ) : (
                          <span
                            aria-hidden
                            className="size-3 animate-spin rounded-full border-[1.5px] border-border-strong"
                            style={{ borderTopColor: CORAL }}
                          />
                        )}
                        {label}
                      </span>
                    );
                  })}
                {finished && <p className="text-body-sm animate-rise text-on-surface">{reply}</p>}
              </div>

              {/* Input */}
              <div className="flex items-end gap-2 border-t border-border px-3 py-3">
                <p className="text-body-sm min-h-[3.1em] flex-1 rounded-xl border border-border-strong px-3 py-2 text-on-surface">
                  {sent ? (
                    <span className="text-on-surface-faint">Ask Claude about this file…</span>
                  ) : (
                    <>
                      {prompt.slice(0, shown)}
                      <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-on-surface" />
                    </>
                  )}
                </p>
                <span
                  aria-hidden
                  className="text-label-md rounded-lg px-3 py-2 text-white"
                  style={{ background: CORAL, opacity: sent ? 0.45 : 1 }}
                >
                  Send
                </span>
              </div>
            </div>
          </div>

          {/* Your Figma canvas */}
          <div className="bg-crosshair relative flex min-h-[440px] flex-col bg-surface-secondary/60 p-6 sm:p-8">
            <p className="text-eyebrow">Your Figma canvas</p>
            <div className="flex flex-1 items-center justify-center py-6">
              <div className="relative">
                <div key={fading ? "fade" : "still"} className={fading ? "demo-fade" : ""}>
                  <div
                    className="w-[260px] border border-border-strong bg-surface"
                    style={{
                      padding: shaped ? 28 : 16,
                      borderRadius: shaped ? 22 : 8,
                      // Before the first piece lands there is no frame on the canvas yet.
                      opacity: pieceIn(0) ? 1 : 0,
                      transition: reduced
                        ? "none"
                        : `padding 600ms ${ease}, border-radius 600ms ${ease}, opacity 300ms ${ease}`,
                    }}
                  >
                    <div className="flex items-center gap-3" style={piece(0)}>
                      <span className="size-9 rounded-full bg-surface-tertiary" />
                      <span className="flex flex-1 flex-col gap-1.5">
                        <span className="h-2.5 w-3/4 rounded bg-surface-tertiary" />
                        <span className="h-2 w-1/2 rounded bg-surface-tertiary" />
                      </span>
                    </div>
                    <div className="mt-4 h-14 rounded-md bg-surface-tertiary" style={piece(1)} />
                    <div style={piece(2)}>
                      <div
                        className="text-label-md mt-4 flex h-10 items-center justify-center text-on-primary"
                        style={{
                          background: coloured ? "var(--color-on-accent-figma)" : "var(--color-primary)",
                          borderRadius: shaped ? 14 : 6,
                          transition: reduced ? "none" : `background 600ms ${ease}, border-radius 600ms ${ease}`,
                        }}
                      >
                        Sign up
                      </div>
                    </div>
                  </div>
                </div>

                {/* Claude's cursor: moves to whatever it is making or changing */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 z-10"
                  style={{
                    transform: `translate(${current.cursor[0]}px, ${current.cursor[1]}px)`,
                    opacity: cursorOn ? 1 : 0,
                    transition: reduced ? "none" : `transform 700ms ${ease}, opacity 300ms ${ease}`,
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" className="block">
                    <path
                      d="M2 2 L15.5 7.5 L9.6 9.6 L7.5 15.5 Z"
                      fill={CORAL}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="absolute top-[15px] left-[13px] rounded-[2px_9px_9px_9px] px-[7px] pt-[2px] pb-[3px] text-[11px] leading-[1.3] font-medium whitespace-nowrap text-white"
                    style={{ background: CORAL }}
                  >
                    Claude
                  </span>
                </div>
              </div>
            </div>

            {/* What changed, in plain labels */}
            <div className="flex min-h-[30px] flex-wrap items-center gap-2">
              {["spacing / md", "corner / lg", "colour / primary"].map((label, i) => (
                <span
                  key={label}
                  className="text-mono-sm rounded-md border border-on-accent-figma bg-accent-figma px-2 py-0.5 text-on-accent-figma"
                  style={{
                    opacity: coloured && !exported ? 1 : 0,
                    transition: reduced ? "none" : `opacity 300ms ${ease} ${coloured ? 200 + i * 90 : 0}ms`,
                    display: exported ? "none" : undefined,
                  }}
                >
                  {label}
                </span>
              ))}
              {exported && (
                <span className="text-mono-sm animate-rise rounded-md border border-border bg-surface px-2 py-0.5 text-on-surface">
                  signup.gif <span className="text-success">✓</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scene picker */}
      <div className="mt-5 flex flex-wrap gap-2">
        {SCENES.map((s, i) => (
          <button
            key={s.tab}
            type="button"
            onClick={() => jump(i)}
            aria-pressed={i === scene}
            className={`text-label-md rounded-full border px-3.5 py-2 transition-colors ${
              i === scene
                ? "border-primary bg-primary text-on-primary"
                : "border-border text-on-surface-subtle hover:border-border-strong hover:text-on-surface"
            }`}
          >
            {s.tab}
          </button>
        ))}
      </div>
    </div>
  );
}
