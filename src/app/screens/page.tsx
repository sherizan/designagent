import { screens } from "@/data/screens";
import { ScreenCard } from "@/components/screen/ScreenCard";

export default function ScreensGalleryPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Screen Gallery
          </h1>
          <p className="text-xl text-zinc-400">
            Starter screens every app needs. Preview, customize, and integrate instantly.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {screens.map((variant) => (
            <ScreenCard key={variant.slug} variant={variant} />
          ))}
        </div>
      </div>
    </div>
  );
}

