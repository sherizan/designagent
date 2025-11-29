"use client";

import { useState, useMemo, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getScreenBySlug, type ScreenVariant } from "@/data/screens";
import { findComponentsByScreen } from "@/data/components";
import { ScreenPreview } from "@/components/screen/ScreenPreview";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScreenDetailPageProps {
  params: Promise<{ slug: string }>;
}

type ModeOption = "light" | "dark" | "system";

export default function ScreenDetailPage({ params }: ScreenDetailPageProps) {
  const [screen, setScreen] = useState<ScreenVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedThemeKey, setSelectedThemeKey] = useState<string>("midnight");
  const [selectedMode, setSelectedMode] = useState<ModeOption>("system");

  // Resolve params promise
  useEffect(() => {
    let isMounted = true;
    
    params.then((resolvedParams) => {
      if (!isMounted) return;
      const foundScreen = getScreenBySlug(resolvedParams.slug);
      if (foundScreen) {
        setScreen(foundScreen);
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [params]);

  // Initialize theme when screen loads
  useEffect(() => {
    if (screen?.themes && screen.themes.length > 0) {
      setSelectedThemeKey(screen.themes[0].key);
    }
  }, [screen?.slug]);

  const hasThemes = !!screen?.themes && screen.themes.length > 0;
  const hasLivePreview = !!(screen?.livePreviewBaseUrl || screen?.livePreviewUrl);

  const iframeSrc = useMemo(() => {
    if (!screen) return undefined;
    
    const baseUrl = screen.livePreviewBaseUrl || screen.livePreviewUrl;
    if (!baseUrl) return undefined;

    const url = new URL(baseUrl);
    
    // Add theme parameter if themes are available
    if (hasThemes) {
      url.searchParams.set("theme", selectedThemeKey);
    }
    
    // Add mode parameter
    url.searchParams.set("mode", selectedMode);
    
    return url.toString();
  }, [screen, screen?.livePreviewBaseUrl, screen?.livePreviewUrl, hasThemes, selectedThemeKey, selectedMode]);

  // Default DesignAgent typography mapping shown in docs
  // Using Inter - a professional UI font that's widely used and looks great
  const defaultTypography = {
    fontFamilyBase: "Inter",
    heading: {
      fontSize: 24,
      lineHeight: 32,
    },
    body: {
      fontSize: 15,
      lineHeight: 22,
    },
    label: {
      fontSize: 12,
      lineHeight: 16,
    },
  } as const;

  const typographySnippet = useMemo(() => {
    return `import { createTheme } from "@designagent/rn";

export const myDesignAgentTheme = createTheme({
  // ... keep your colors / spacing / radius here
  typography: {
    fontFamilyBase: "${defaultTypography.fontFamilyBase}",
    heading: {
      fontSize: ${defaultTypography.heading.fontSize},
      lineHeight: ${defaultTypography.heading.lineHeight},
    },
    body: {
      fontSize: ${defaultTypography.body.fontSize},
      lineHeight: ${defaultTypography.body.lineHeight},
    },
    label: {
      fontSize: ${defaultTypography.label.fontSize},
      lineHeight: ${defaultTypography.label.lineHeight},
    },
  },
});`;
  }, []);

  if (isLoading) {
    return null; // Loading state
  }

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
            <div className="inline-flex items-center gap-2 flex-wrap">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Screen · Universal
              </div>
              {screen.access === "pro" && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/90 text-black text-xs font-semibold uppercase tracking-wide shadow-sm">
                  Pro
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {screen.name}
            </h1>

            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
              {screen.description}
            </p>
          </div>

          {/* Live Preview or Preview Image */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            {/* Theme and Mode selectors */}
            {(hasThemes || hasLivePreview) && (
              <div className="w-full max-w-md space-y-4">
                {/* Theme selector */}
                {hasThemes && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-zinc-300">Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {screen.themes!.map((theme) => {
                        const isActive = theme.key === selectedThemeKey;
                        return (
                          <button
                            key={theme.key}
                            type="button"
                            onClick={() => setSelectedThemeKey(theme.key)}
                            className={[
                              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                              isActive
                                ? "border-zinc-200 bg-zinc-200 text-zinc-900 shadow-sm"
                                : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800",
                            ].join(" ")}
                          >
                            {theme.accent && (
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: theme.accent }}
                              />
                            )}
                            <span>{theme.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                {/* Mode selector */}
                {hasLivePreview && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-zinc-300">Mode</h3>
                    <div className="flex flex-wrap gap-2">
                      {(["light", "dark", "system"] as ModeOption[]).map((mode) => {
                        const isActive = mode === selectedMode;
                        return (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setSelectedMode(mode)}
                            className={[
                              "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all capitalize",
                              isActive
                                ? "border-zinc-200 bg-zinc-200 text-zinc-900 shadow-sm"
                                : "border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800",
                            ].join(" ")}
                          >
                            <span>{mode}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-zinc-500">
                      {selectedMode === "system" 
                        ? "Follows your system preference"
                        : `Always use ${selectedMode} mode`}
                    </p>
                  </div>
                )}
              </div>
            )}

            {iframeSrc ? (
              <div className="relative aspect-[9/19.5] w-full max-w-md bg-zinc-950 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                <iframe
                  src={iframeSrc}
                  className="w-full h-full rounded-2xl border-0"
                  loading="lazy"
                  title={`${screen.name} live preview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  style={{
                    pointerEvents: "auto",
                    transform: "scale(1)",
                    transformOrigin: "top left",
                  }}
                />
              </div>
            ) : (
              <ScreenPreview screen={screen} size="large" />
            )}
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

        {/* Typography Preview */}
        <section className="mb-20 space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">Typography preview</h2>
          <p className="text-[11px] text-zinc-500">
            This is how DesignAgent maps <span className="font-mono">heading</span>,{" "}
            <span className="font-mono">body</span>, and{" "}
            <span className="font-mono">label</span> typography. Override these in
            your own theme so screens match your product&apos;s type system.
          </p>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
            {/* Left: visual samples */}
            <div className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-4">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-zinc-500">
                <span>Preview</span>
                <span className="font-mono text-[10px]">
                  {defaultTypography.fontFamilyBase}
                </span>
              </div>
              {/* Heading sample */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span className="uppercase tracking-wide">Heading</span>
                  <span className="font-mono">
                    {defaultTypography.heading.fontSize}/
                    {defaultTypography.heading.lineHeight}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: defaultTypography.heading.fontSize,
                    lineHeight: `${defaultTypography.heading.lineHeight}px`,
                    fontWeight: 600,
                  }}
                  className="text-zinc-50"
                >
                  Sign in to your account
                </p>
              </div>
              {/* Body sample */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span className="uppercase tracking-wide">Body</span>
                  <span className="font-mono">
                    {defaultTypography.body.fontSize}/
                    {defaultTypography.body.lineHeight}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: defaultTypography.body.fontSize,
                    lineHeight: `${defaultTypography.body.lineHeight}px`,
                  }}
                  className="text-zinc-300"
                >
                  Welcome back. Use your work email to continue.
                </p>
              </div>
              {/* Label sample */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span className="uppercase tracking-wide">Label</span>
                  <span className="font-mono">
                    {defaultTypography.label.fontSize}/
                    {defaultTypography.label.lineHeight}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontSize: defaultTypography.label.fontSize,
                    lineHeight: `${defaultTypography.label.lineHeight}px`,
                  }}
                  className="text-zinc-400"
                >
                  Email address
                </p>
              </div>
            </div>
            {/* Right: generated theme snippet */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-zinc-200">
                Generated <code className="text-zinc-300">createTheme</code> snippet
              </p>
              <p className="text-[11px] text-zinc-500">
                Copy this into your <code className="text-zinc-400">designagent.theme.ts</code>, then pass{" "}
                <code className="text-zinc-400">myDesignAgentTheme</code> to{" "}
                <code className="text-zinc-400">&lt;DesignAgentProvider theme=&#123;myDesignAgentTheme&#125; /&gt;</code>.
              </p>
              <pre className="mt-1 max-h-[320px] overflow-auto rounded-lg border border-zinc-800 bg-black/80 p-3 text-[11px] text-zinc-100 font-mono">
                {typographySnippet}
              </pre>
            </div>
          </div>
        </section>


        {/* Components used */}
        <section className="mb-20 space-y-4">
          <h2 className="text-2xl font-semibold text-zinc-100">Components used</h2>
          {findComponentsByScreen(screen.slug).length === 0 ? (
            <p className="text-[11px] text-zinc-500">
              This screen is not yet mapped to any shared components.
            </p>
          ) : (
            <>
              <p className="text-[11px] text-zinc-500">
                These DesignAgent components power this screen. Install the screen end-to-end,
                or reuse the building blocks directly.
              </p>
              <div className="flex flex-wrap gap-2">
                {findComponentsByScreen(screen.slug).map((component) => (
                  <Link
                    key={component.slug}
                    href={`/components/${component.slug}`}
                    className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1 text-[11px] text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900/80 transition-colors"
                  >
                    <span>{component.name}</span>
                    <span className="text-[10px] text-zinc-500">
                      {component.variants.length} variant
                      {component.variants.length > 1 ? "s" : ""}
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>

        {/* How to use this screen */}
        <div className="mb-20 space-y-6">
          <h2 className="text-2xl font-semibold text-zinc-100">How to use this screen</h2>
          <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 space-y-4">
            {screen.access === "pro" ? (
              <>
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-4">
                  <p className="text-amber-400 text-sm font-medium mb-1">Pro Feature</p>
                  <p className="text-zinc-400 text-sm">
                    This screen is part of DesignAgent Pro. In the future, code and MCP install will be available to Pro users.
                  </p>
                </div>
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
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

