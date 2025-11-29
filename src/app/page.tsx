import { screens } from "@/data/screens";
import { ScreenCard } from "@/components/screen/ScreenCard";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 pt-24 pb-20 min-h-[60vh]">
        <div className="text-center space-y-6 max-w-5xl">
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight leading-tight">
            <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
              DesignAgent v1
            </span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-zinc-200">
            The AI-native UI kit for React Native.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            Beautiful, functional, and ready-to-use UI components for React Native.
          </p>
        </div>
      </section>

      {/* Universal Screens Section */}
      <section className="px-4 pb-24 max-w-7xl mx-auto">
        <div className="space-y-6 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Universal Screens</h2>
            <p className="text-zinc-400">
              Essential screens every app needs — ready for Cursor + React Native.
            </p>
          </div>

          {/* All screens grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {screens.map((variant) => (
              <ScreenCard key={variant.slug} variant={variant} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
