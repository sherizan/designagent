import { notFound } from "next/navigation";
import Link from "next/link";
import { getScreenBySlug } from "@/data/screens";
import { ScreenPreview } from "@/components/screen/ScreenPreview";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScreenDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ScreenDetailPage({ params }: ScreenDetailPageProps) {
  const { slug } = await params;
  const screen = getScreenBySlug(slug);

  if (!screen) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back Link */}
        <Link
          href="/screens"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Screen Gallery
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              Screen · Universal
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {screen.title}
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
              {screen.description}
            </p>
          </div>

          {/* Preview Image */}
          <div className="flex justify-center lg:justify-end">
            <ScreenPreview screen={screen} size="large" />
          </div>
        </div>

        {/* How this screen is built */}
        <div className="mb-20 space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-100">How this screen is built</h2>
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50">
            <p className="text-zinc-400 mb-4">
              This screen uses the following components from the DesignAgent component library:
            </p>
            <div className="flex flex-wrap gap-2">
              {screen.components.map((component, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm font-mono"
                >
                  {component}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* How to use this screen */}
        <div className="mb-20 space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-100">How to use this screen</h2>
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 space-y-4">
            <p className="text-zinc-400">
              Install the DesignAgent React Native package and add this screen to your project:
            </p>
            <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-800 font-mono text-sm">
              <div className="text-zinc-400 mb-2"># Install packages</div>
              <div className="text-zinc-300 mb-4">
                npm install @designagent/rn-core @designagent/rn-screens
              </div>
              <div className="text-zinc-400 mb-2"># Initialize DesignAgent</div>
              <div className="text-zinc-300 mb-4">npx designagent init</div>
              <div className="text-zinc-400 mb-2"># Add this screen</div>
              <div className="text-zinc-300">npx designagent add screen {screen.slug}</div>
            </div>
          </div>
        </div>

        {/* Live Theme Preview (Coming Soon) */}
        <div className="mb-20 space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-100">Live Theme Preview (Coming Soon)</h2>
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50">
            <div className="aspect-video bg-zinc-950 rounded-lg border border-zinc-800 flex items-center justify-center">
              <p className="text-zinc-600 text-lg">Theme preview coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

