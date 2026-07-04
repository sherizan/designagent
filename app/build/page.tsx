import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Eyebrow } from "@/components/Eyebrow";
import { mdxComponents } from "@/components/mdx";
import { getContentDoc } from "@/lib/plugins";

export const metadata: Metadata = {
  title: "How to build a design plugin",
  description:
    "A practical guide to building a Claude Code plugin for designers: the shapes, the manifest, the design-intelligence layer, and how to ship it to the designagent marketplace.",
};

export default function BuildPage() {
  const doc = getContentDoc("build");
  if (!doc) notFound();

  const title = (doc.frontmatter.title as string) ?? "How to build a design plugin";
  const description = doc.frontmatter.description as string | undefined;

  return (
    <article className="mx-auto max-w-[760px] px-6 py-16 sm:px-10">
      <Eyebrow>Guide</Eyebrow>
      <h1 className="text-display-md mt-3 text-on-surface">{title}</h1>
      {description && (
        <p className="text-body-lg mt-4 text-on-surface-muted">{description}</p>
      )}

      <div className="mt-10">
        <MDXRemote source={doc.body} components={mdxComponents} />
      </div>

      <footer className="text-body-sm mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-on-surface-subtle">
        <Link href="/submit" className="transition-colors hover:text-on-surface">
          Submit your plugin →
        </Link>
        <Link href="/plugins" className="transition-colors hover:text-on-surface">
          Browse the marketplace
        </Link>
      </footer>
    </article>
  );
}
