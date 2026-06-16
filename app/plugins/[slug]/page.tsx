import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { InstallBlock } from "@/components/InstallBlock";
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
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/plugins"
        className="font-mono text-sm text-muted transition-colors hover:text-foreground"
      >
        ← all plugins
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3">
          <h1 className="font-mono text-3xl font-semibold tracking-tight">
            {plugin.name}
          </h1>
          <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted">
            {plugin.category}
          </span>
        </div>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          {plugin.description}
        </p>
      </header>

      <div className="mt-8">
        <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
          Install
        </p>
        <InstallBlock add={plugin.install.add} install={plugin.install.install} />
      </div>

      {doc ? (
        <div className="prose-designagent mt-12">
          <MDXRemote source={doc.body} components={mdxComponents} />
        </div>
      ) : (
        <p className="mt-12 text-muted">
          Documentation coming soon. In the meantime, see the{" "}
          {plugin.repo ? (
            <a
              href={`https://github.com/${plugin.repo}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              source repository
            </a>
          ) : (
            "source repository"
          )}
          .
        </p>
      )}

      <footer className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-sm text-muted">
        {plugin.repo && (
          <a
            href={`https://github.com/${plugin.repo}`}
            className="transition-colors hover:text-foreground"
          >
            {plugin.repo} ↗
          </a>
        )}
        <Link href="/submit" className="transition-colors hover:text-foreground">
          Submit your own →
        </Link>
      </footer>
    </article>
  );
}
