import { UIKitGallery } from "@/components/ui-kit-gallery";

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
            The UI kit for Cursor.
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-light">
            Not a design tool, not a schema playground, not another MagicPatterns clone.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-4 pb-24 max-w-7xl mx-auto">
        <UIKitGallery />
      </section>
    </div>
  );
}
