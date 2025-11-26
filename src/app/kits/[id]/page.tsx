import { notFound } from "next/navigation";
import Link from "next/link";
import { uiKits } from "@/data/ui-kits";
import { CopyButton, PromptBlock, ScreenPromptCard } from "@/components/kit-copy-button";
import { ArrowLeft } from "lucide-react";
import { FitnessKitClient } from "@/components/fitness/FitnessKitClient";

interface KitPageProps {
  params: Promise<{ id: string }>;
}

export default async function KitPage({ params }: KitPageProps) {
  const { id } = await params;
  const kit = uiKits.find((k) => k.id === id);

  if (!kit) {
    notFound();
  }

  // Use new client component for fitness kit
  if (kit.id === "fitness") {
    return <FitnessKitClient kit={kit} />;
  }

  // Standard layout for other kits
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
              UI Kit · {kit.category}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {kit.name}
            </h1>
            
            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
              {kit.description}
            </p>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {kit.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 text-sm border border-zinc-800"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {kit.fullAppPrompt && (
                <CopyButton 
                  textToCopy={kit.fullAppPrompt} 
                  label="Copy Full-App Prompt" 
                  className="bg-white text-black hover:bg-zinc-200 min-w-[200px]"
                />
              )}
              <Link 
                href="#screens" 
                className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors bg-transparent border border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white min-w-[160px]"
              >
                View Screens
              </Link>
            </div>
          </div>
          
          <div className="relative aspect-[4/5] lg:aspect-square bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl shadow-black/50">
            {/* Placeholder for Hero Image */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
               <span className="text-zinc-700 font-bold text-2xl">
                 {kit.name} Preview
               </span>
            </div>
          </div>
        </div>

        {/* Preview Strip */}
        {kit.previewImages && kit.previewImages.length > 0 && (
          <div className="mb-20 space-y-6">
            <h3 className="text-2xl font-semibold text-zinc-100">Screen Previews</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {kit.previewImages.map((img, i) => (
                <div 
                  key={i} 
                  className="snap-center shrink-0 w-[200px] aspect-[9/19.5] rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-zinc-800/50 flex items-center justify-center">
                    <span className="text-xs text-zinc-600">Preview {i+1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's Included */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm">📱</span>
              Screens Included
            </h3>
            <ul className="space-y-3">
              {kit.includedScreens.map((screen, i) => (
                <li key={i} className="flex items-start text-zinc-400">
                  <span className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                  {screen}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-zinc-100 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-sm">🧩</span>
              Components
            </h3>
            <div className="flex flex-wrap gap-2">
              {kit.includedComponents.map((component, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1.5 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-400 text-sm font-mono"
                >
                  {component}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Prompts Section */}
        <div id="screens" className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-zinc-100">Cursor Prompts</h3>
            <p className="text-zinc-400 max-w-2xl">
              Use these prompts to generate the full app foundation or specific screens. 
              Copy and paste directly into Cursor's AI chat.
            </p>
          </div>

          {/* Full App Prompt */}
          {kit.fullAppPrompt && (
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-zinc-200">Full App Foundation</h4>
              <PromptBlock prompt={kit.fullAppPrompt} />
            </div>
          )}

          {/* Screen Prompts Grid */}
          {kit.screenPrompts && kit.screenPrompts.length > 0 && (
            <div className="space-y-4 pt-8">
              <h4 className="text-lg font-medium text-zinc-200">Screen-Specific Prompts</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kit.screenPrompts.map((prompt) => (
                  <ScreenPromptCard 
                    key={prompt.id}
                    label={prompt.label}
                    description={prompt.description}
                    prompt={prompt.prompt}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
