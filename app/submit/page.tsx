import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";

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
    <div className="mx-auto max-w-[1200px] px-6 py-16 sm:px-10">
      <Eyebrow>Submit</Eyebrow>
      <h1 className="text-heading-lg mt-3 text-on-surface">Submit a plugin</h1>
      <p className="text-body-lg mt-3 max-w-[680px] text-on-surface-muted">
        designagent is open. If you&apos;ve built a Claude Code plugin for
        designers, submit it and we&apos;ll review it. Submission opens a public
        GitHub issue — no account beyond GitHub, no form to chase.
      </p>
      <p className="text-body-md mt-3 max-w-[680px] text-on-surface-muted">
        New to building plugins? Start with the{" "}
        <Link
          href="/build"
          className="text-on-surface underline decoration-on-surface-faint underline-offset-4 hover:decoration-on-surface"
        >
          build guide
        </Link>
        .
      </p>

      <a
        href={ISSUE_URL}
        className="text-label-lg mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-[22px] py-[11px] text-on-primary transition-colors hover:bg-primary-hover"
      >
        Open the submission form ↗
      </a>

      <h2 className="text-heading-md mt-16 text-on-surface">
        What we&apos;re looking for
      </h2>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {CRITERIA.map((c) => (
          <li
            key={c.title}
            className="rounded-xl border border-border bg-surface-secondary p-6"
          >
            <p className="text-heading-sm text-on-surface">{c.title}</p>
            <p className="text-body-sm mt-2 text-on-surface-muted">{c.body}</p>
          </li>
        ))}
      </ul>

      <p className="text-body-sm mt-10 text-on-surface-subtle">
        Review is manual for now — Coco reads every submission, and she has
        opinions. Approved plugins get added to the{" "}
        <a
          href="https://github.com/sherizan/designagent/blob/main/.claude-plugin/marketplace.json"
          className="text-on-surface underline decoration-on-surface-faint underline-offset-4 hover:decoration-on-surface"
        >
          marketplace catalog
        </a>{" "}
        and a page here.
      </p>
    </div>
  );
}
