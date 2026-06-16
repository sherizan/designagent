import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { InstallBlock } from "@/components/InstallBlock";
import { CategoryIcon } from "@/components/CategoryIcon";
import { StatusBadge } from "@/components/StatusBadge";
import { getPlugin, getPlugins } from "@/lib/marketplace";
import { getPluginDoc } from "@/lib/plugins";
import { mdxComponents } from "@/components/mdx";

export function generateStaticParams() {
  return getPlugins().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const plugin = getPlugin(slug);
  if (!plugin) return {};
  return { title: plugin.name, description: plugin.description };
}

export default async function PluginPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plugin = getPlugin(slug);
  if (!plugin) notFound();

  const doc = getPluginDoc(slug);

  return (
    <article className="mx-auto max-w-[760px] px-6 py-16 sm:px-10">
      <Link
        href="/plugins"
        className="text-mono-sm text-on-surface-subtle transition-colors hover:text-on-surface"
      >
        ← all plugins
      </Link>

      <header className="mt-6">
        <div className="flex items-start justify-between">
          <CategoryIcon accent={plugin.accent} />
          <StatusBadge status={plugin.status} />
        </div>
        <h1 className="text-display-md mt-5 text-on-surface">{plugin.name}</h1>
        <p className="text-body-lg mt-3 text-on-surface-muted">
          {plugin.description}
        </p>
        <p className="text-mono-sm mt-3 text-on-surface-faint">
          {plugin.author}
          {plugin.repo ? ` · ${plugin.repo}` : ""}
        </p>
      </header>

      <div className="mt-8">
        <InstallBlock add={plugin.install.add} install={plugin.install.install} />
      </div>

      {doc ? (
        <div className="mt-12">
          <MDXRemote source={doc.body} components={mdxComponents} />
        </div>
      ) : (
        <p className="text-body-lg mt-12 text-on-surface-muted">
          Documentation coming soon. In the meantime, see the{" "}
          {plugin.repo ? (
            <a
              href={`https://github.com/${plugin.repo}`}
              className="text-on-surface underline decoration-on-surface-faint underline-offset-4 hover:decoration-on-surface"
            >
              source repository
            </a>
          ) : (
            "source repository"
          )}
          .
        </p>
      )}

      <footer className="text-body-sm mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-on-surface-subtle">
        {plugin.repo && (
          <a
            href={`https://github.com/${plugin.repo}`}
            className="transition-colors hover:text-on-surface"
          >
            {plugin.repo} ↗
          </a>
        )}
        <Link href="/submit" className="transition-colors hover:text-on-surface">
          Submit your own →
        </Link>
      </footer>
    </article>
  );
}
