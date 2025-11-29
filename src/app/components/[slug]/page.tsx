import { notFound } from "next/navigation";
import Link from "next/link";
import { findComponentBySlug } from "@/data/components";
import { screens as screenVariants } from "@/data/screens";
import { ArrowLeft } from "lucide-react";

const PREVIEW_BASE_URL =
  process.env.NEXT_PUBLIC_PREVIEW_BASE_URL ??
  "https://designagent-preview-rn.vercel.app";

// Components that have live previews in the preview app
const PREVIEWABLE_COMPONENTS = [
  "button",
  "input-field",
  "text",
  "surface",
  "stack",
  "text-input",
  "card",
  "social-button",
  "divider",
  "icon",
  "auth-card",
  "auth-header",
  "form-field",
];

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ComponentDetailPage({ params }: Props) {
  const { slug } = await params;
  const component = findComponentBySlug(slug);

  if (!component) {
    return notFound();
  }

  const usedScreens = screenVariants.filter((screen) =>
    component.usedInScreens.includes(screen.slug)
  );

  // Determine import path based on category
  const importPath = component.category === "primitive"
    ? "@/design-system/components/primitives"
    : "@/design-system/components/patterns";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back Link */}
        <Link
          href="/components"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Components Gallery
        </Link>

        {/* Hero Section */}
        <div className="mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 flex-wrap">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Component · {component.category}
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              {component.framework === "react-native" ? "React Native" : component.framework}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
            {component.name}
          </h1>

          <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl">
            {component.description}
          </p>
        </div>

        {/* Variants gallery */}
        <section className="mb-20 space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-100">Variants</h2>
          <p className="text-zinc-400">
            These are the pre-built visual treatments you get out of the box.
            All variants are theme-aware and map to your DesignAgent tokens.
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {component.variants.map((variant) => (
              <div
                key={variant.key}
                className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6"
              >
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-zinc-200">
                      {variant.label}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      key: <span className="font-mono text-zinc-400">{variant.key}</span>
                    </p>
                  </div>
                  <div className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] text-zinc-300">
                    Preview
                  </div>
                </div>
                <p className="text-sm text-zinc-400">
                  {variant.description}
                </p>
                {/* Live RN preview via iframe or placeholder */}
                {PREVIEWABLE_COMPONENTS.includes(component.slug) ? (
                  <>
                    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-black">
                      <iframe
                        title={`${component.name} – ${variant.label} preview`}
                        src={`${PREVIEW_BASE_URL}/component/${component.slug}?variant=${encodeURIComponent(
                          variant.key
                        )}&theme=midnight&mode=dark`}
                        className="h-28 w-full"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <p className="text-xs text-zinc-500">
                      Previewing <span className="font-mono">{variant.key}</span> · theme:{" "}
                      <span className="font-mono">midnight</span> · mode:{" "}
                      <span className="font-mono">dark</span>
                    </p>
                  </>
                ) : (
                  <div className="rounded-xl border border-zinc-800 bg-gradient-to-tr from-zinc-900 to-zinc-950 p-4">
                    <div className="h-8 rounded-lg bg-zinc-900 flex items-center justify-center text-xs text-zinc-500">
                      Preview coming soon
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Code snippet */}
        <section className="mb-20 space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">Usage</h2>
          <p className="text-zinc-400">
            Import from your design system entry and pick the variant that matches your screen.
          </p>
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50">
            <pre className="max-h-[320px] overflow-auto rounded-lg border border-zinc-800 bg-black/80 p-4 text-xs text-zinc-100 font-mono">
{`import { ${component.name.replace(/\s+/g, "")} } from "${importPath}";

export function Example() {
  return (
    <${component.name.replace(/\s+/g, "")}
      /* props */
    />
  );
}`}
            </pre>
          </div>
        </section>

        {/* Used in Screens */}
        <section className="mb-20 space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">Used in screens</h2>
          {usedScreens.length === 0 ? (
            <p className="text-zinc-400">
              This component is not yet mapped to any screens.
            </p>
          ) : (
            <>
              <p className="text-zinc-400">
                These DesignAgent screens already use this component. Install the
                screen or reuse the component directly in your own flows.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {usedScreens.map((screen) => (
                  <Link
                    key={screen.slug}
                    href={`/screens/${screen.slug}`}
                    className="group flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/30 p-6 transition hover:border-zinc-600 hover:bg-zinc-900/50"
                  >
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-zinc-200">
                        {screen.name}
                      </p>
                      <p className="text-sm text-zinc-400">
                        {screen.description}
                      </p>
                    </div>
                    <div className="mt-4 text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      View screen →
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}
