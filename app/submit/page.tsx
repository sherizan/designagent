import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Submit a plugin",
  description:
    "Submit your Claude Code design plugin to the designagent marketplace.",
};

const ISSUE_URL =
  "https://github.com/sherizan/designagent/issues/new?template=plugin-submission.yml&labels=submission";

const CRITERIA = [
  {
    title: "It's a real Claude Code plugin",
    body: "Has a .claude-plugin/plugin.json manifest and installs through Claude Code's native plugin system.",
  },
  {
    title: "Two-command install",
    body: "Works via /plugin marketplace add … then /plugin install …@designagent. No clone, no setup script.",
  },
  {
    title: "Design-specific",
    body: "Does design work — Figma, design systems, design review, prototyping, redlines. Not a general dev tool.",
  },
  {
    title: "Public GitHub repo",
    body: "The source lives in a public repo so we can reference it and others can read it.",
  },
];

export default function SubmitPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Submit a plugin</h1>
      <p className="mt-4 max-w-xl leading-relaxed text-muted">
        designagent is open. If you&apos;ve built a Claude Code plugin for
        designers, submit it and we&apos;ll review it. Submission opens a public
        GitHub issue — no account beyond GitHub, no form to chase.
      </p>

      <a
        href={ISSUE_URL}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-sm font-medium text-accent-ink transition-opacity hover:opacity-90"
      >
        Open the submission form ↗
      </a>

      <h2 className="mt-14 text-xl font-semibold tracking-tight">
        What we&apos;re looking for
      </h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {CRITERIA.map((c) => (
          <li
            key={c.title}
            className="rounded-xl border border-border bg-card/40 p-5"
          >
            <p className="font-mono text-sm font-semibold text-foreground">
              {c.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-sm text-muted">
        Review is manual for now. Approved plugins get added to the{" "}
        <a
          href="https://github.com/sherizan/designagent/blob/main/.claude-plugin/marketplace.json"
          className="text-accent underline-offset-4 hover:underline"
        >
          marketplace catalog
        </a>{" "}
        and a page here.
      </p>
    </div>
  );
}
