import Link from "next/link";
import { componentsRegistry } from "@/data/components";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

export default function ComponentsPage() {
  const primitives = componentsRegistry.filter((c) => c.category === "primitive");
  const patterns = componentsRegistry.filter((c) => c.category === "pattern");

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Components Gallery
          </h1>
          <p className="text-xl text-zinc-400">
            Reusable, theme-aware UI building blocks for your React Native apps.
            Split into atomic <strong>Primitives</strong> and composed <strong>Patterns</strong>.
          </p>
        </div>

        {/* Primitives Section */}
        <section className="mb-20 space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Primitives
            </h2>
            <p className="text-zinc-400">
              Atomic UI components that serve as the foundation for building interfaces.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {primitives.map((component) => (
              <Link key={component.slug} href={`/components/${component.slug}`} className="block group">
                <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
                  <CardContent className="flex-1 p-5 space-y-3 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                          {component.name}
                        </h3>
                        <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-500">
                          RN
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {component.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">
                          {component.variants.length} variant{component.variants.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Patterns Section */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
              Patterns
            </h2>
            <p className="text-zinc-400">
              Composed components that combine primitives into reusable interface patterns.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {patterns.map((component) => (
              <Link key={component.slug} href={`/components/${component.slug}`} className="block group">
                <Card className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full">
                  <CardContent className="flex-1 p-5 space-y-3 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/90 transition-colors">
                          {component.name}
                        </h3>
                        <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-500">
                          Pattern
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-3">
                        {component.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">
                          {component.variants.length} variant{component.variants.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
