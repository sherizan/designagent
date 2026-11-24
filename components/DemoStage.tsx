"use client";

import { useEffect, useState } from "react";

/**
 * The plugin in action: a looping, three-scene demo. On the left, what you type
 * to Claude; on the right, what happens on your Figma canvas. Each scene types
 * its prompt, then plays out. Viewers can jump between scenes; with reduced
 * motion the loop stops and each scene shows its finished state.
 */
const SCENES = [
  {
    tab: "Build it",
    prompt: "Design a sign-up card in my file",
    reply: "Built a card with a header, body and button. Auto layout is on.",
  },
  {
    tab: "Keep it on-system",
    prompt: "Use my spacing, corner and colour variables",
    reply: "Linked padding, corners and the button colour to your variables.",
  },
  {
    tab: "Add motion",
    prompt: "Fade it in and export a GIF",
    reply: "Added a fade-in and saved signup.gif to your project.",
  },
] as const;

const TYPE_MS = 34;
const HOLD_MS = 3400;

export function DemoStage() {
  const [scene, setScene] = useState(0);
  const [typed, setTyped] = useState(0);
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);

  const { prompt, reply } = SCENES[scene];
  // With reduced motion nothing types: every scene shows its finished state.
  const shown = reduced ? prompt.length : typed;
  const done = shown >= prompt.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Type the prompt, hold on the result, then move to the next scene.
  useEffect(() => {
    if (reduced) return;
    if (!done) {
      const t = setTimeout(() => setTyped((n) => n + 1), TYPE_MS);
      return () => clearTimeout(t);
    }
    if (!auto) return;
    const t = setTimeout(() => {
      setTyped(0);
      setScene((s) => (s + 1) % SCENES.length);
    }, HOLD_MS);
    return () => clearTimeout(t);
  }, [typed, done, auto, reduced, prompt.length]);

  function jump(index: number) {
    setAuto(false);
    setTyped(0);
    setScene(index);
  }

  // What the canvas shows: scene 0 builds the card, 1 restyles it from variables,
  // 2 fades it in. Later scenes keep what earlier ones made.
  const built = scene > 0 || done;
  const linked = (scene === 1 && done) || scene === 2;
  const exported = scene === 2 && done;
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";
  const piece = (delay: number): React.CSSProperties => ({
    opacity: built ? 1 : 0,
    transform: built ? "none" : "translateY(8px)",
    transition: reduced ? "none" : `opacity 420ms ${ease} ${delay}ms, transform 420ms ${ease} ${delay}ms`,
  });

  return (
    <div>
      <div
        className="card"
      >
        <div className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          {/* You, in Claude Code */}
          <div className="flex flex-col gap-5 border-b border-border p-6 sm:p-8 md:border-r md:border-b-0">
            <p className="text-eyebrow">You, in Claude Code</p>
            <p className="text-heading-md min-h-[3.4em] max-w-[18ch] text-on-surface" aria-live="polite">
              <span className="text-on-surface-faint">“</span>
              {prompt.slice(0, shown)}
              {done ? (
                <span className="text-on-surface-faint">”</span>
              ) : (
                <span aria-hidden className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[3px] bg-on-surface" />
              )}
            </p>
            <div
              className="mt-auto flex items-start gap-2.5 rounded-xl border border-border bg-surface-secondary px-4 py-3"
              style={{ opacity: done ? 1 : 0, transition: reduced || !done ? "none" : `opacity 400ms ${ease} 500ms` }}
            >
              <span aria-hidden className="text-success">✓</span>
              <p className="text-body-sm text-on-surface-muted">{reply}</p>
            </div>
          </div>

          {/* Your Figma canvas */}
          <div className="bg-crosshair relative flex min-h-[440px] flex-col bg-surface-secondary/60 p-6 sm:p-8">
            <p className="text-eyebrow">Your Figma canvas</p>
            <div className="flex flex-1 items-center justify-center py-6">
              <div
                key={scene === 2 ? "fade" : "still"}
                className={scene === 2 && !reduced ? "demo-fade" : ""}
              >
                <div
                  className="w-[260px] border border-border-strong bg-surface"
                  style={{
                    padding: linked ? 28 : 16,
                    borderRadius: linked ? 22 : 8,
                    transition: reduced ? "none" : `padding 600ms ${ease}, border-radius 600ms ${ease}`,
                  }}
                >
                  <div className="flex items-center gap-3" style={piece(0)}>
                    <span className="size-9 rounded-full bg-surface-tertiary" />
                    <span className="flex flex-1 flex-col gap-1.5">
                      <span className="h-2.5 w-3/4 rounded bg-surface-tertiary" />
                      <span className="h-2 w-1/2 rounded bg-surface-tertiary" />
                    </span>
                  </div>
                  <div className="mt-4 h-14 rounded-md bg-surface-tertiary" style={piece(140)} />
                  <div style={piece(280)}>
                    <div
                      className="text-label-md mt-4 flex h-10 items-center justify-center text-on-primary"
                      style={{
                        background: linked ? "var(--color-on-accent-figma)" : "var(--color-primary)",
                        borderRadius: linked ? 14 : 6,
                        transition: reduced ? "none" : `background 600ms ${ease}, border-radius 600ms ${ease}`,
                      }}
                    >
                      Sign up
                    </div>
                  </div>
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
                    opacity: linked && !exported ? 1 : 0,
                    transition: reduced ? "none" : `opacity 300ms ${ease} ${linked ? 200 + i * 90 : 0}ms`,
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
