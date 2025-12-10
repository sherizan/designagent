"use client";

import { useState, useMemo, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getScreenBySlug, screens, type ScreenVariant } from "@/data/screens";
import { findComponentsByScreen } from "@/data/components";
import { ScreenPreview } from "@/components/screen/ScreenPreview";
import { ScreenCard } from "@/components/screen/ScreenCard";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemePreview } from "@/context/ThemePreviewContext";
import { isCustomTheme, serializeTheme } from "@/lib/themeUtils";
import { ThemeHeader } from "@/components/ThemeHeader";

// Determine preview base URL based on environment
function getPreviewBaseUrl(): string {
  // Allow explicit override via environment variable
  if (process.env.NEXT_PUBLIC_PREVIEW_BASE_URL) {
    return process.env.NEXT_PUBLIC_PREVIEW_BASE_URL;
  }

  // In development, use localhost
  if (process.env.NODE_ENV === "development") {
    const port = process.env.NEXT_PUBLIC_PREVIEW_PORT || "8081";
    return `http://localhost:${port}`;
  }

  // In production, use deployed URL
  return "https://designagent-preview-rn.vercel.app";
}

// Convert slug to PascalCase component name
function slugToComponentName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

// Extract base screen type from slug (e.g., "login" from "login-minimal")
function getBaseScreenType(slug: string): string {
  // Extract the first part before any hyphens (e.g., "login" from "login-minimal")
  return slug.split("-")[0];
}

interface ScreenDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ScreenDetailPage({ params }: ScreenDetailPageProps) {
  const [screen, setScreen] = useState<ScreenVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { themeId, mode, theme } = useThemePreview();

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

  const hasLivePreview = !!(screen?.livePreviewBaseUrl || screen?.livePreviewUrl);

  const iframeSrc = useMemo(() => {
    if (!screen) return undefined;
    
    const originalUrl = screen.livePreviewBaseUrl || screen.livePreviewUrl;
    if (!originalUrl) return undefined;

    // Extract the path from the original URL (e.g., "/login-simple" from "https://designagent-preview-rn.vercel.app/login-simple")
    let path = "";
    try {
      const urlObj = new URL(originalUrl);
      path = urlObj.pathname;
    } catch {
      // If it's not a valid URL, treat it as a path
      path = originalUrl.startsWith("/") ? originalUrl : `/${originalUrl}`;
    }

    // Get environment-aware base URL
    const previewBaseUrl = getPreviewBaseUrl();
    
    // Construct the new URL with environment-aware base
    const url = new URL(path, previewBaseUrl);
    
    // Use global theme context
    url.searchParams.set("themeId", themeId);
    url.searchParams.set("mode", mode);
    
    // If theme is custom, pass it as base64-encoded JSON
    if (isCustomTheme(theme, themeId)) {
      const customThemeData = serializeTheme(theme);
      if (customThemeData) {
        url.searchParams.set("customTheme", customThemeData);
      }
    }
    
    return url.toString();
  }, [screen, screen?.livePreviewBaseUrl, screen?.livePreviewUrl, themeId, mode, theme]);

  // Get related screens from the same category (excluding current screen)
  const relatedScreens = useMemo(() => {
    if (!screen) return [];
    return screens.filter(
      (s) => s.category === screen.category && s.slug !== screen.slug
    );
  }, [screen]);

  if (isLoading) {
    return null; // Loading state
  }

  if (!screen) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 pt-28 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Back Link */}
        <Link
          href="/screens"
          className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Screen Gallery
        </Link>

        {/* Theme Header */}
        <ThemeHeader
          title={screen.name}
          subtitle="Preview this screen in your current DesignAgent theme."
        />

        {/* Screen Meta */}
        <div className="mb-12 inline-flex items-center gap-2 flex-wrap">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 uppercase tracking-wider">
            Screen · Universal
          </div>
          {screen.access === "pro" && (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/90 text-black text-xs font-semibold uppercase tracking-wide shadow-sm">
              Pro
            </div>
          )}
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          <div className="space-y-6">
            <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
              {screen.description}
            </p>
            
            {/* Related Components */}
            {findComponentsByScreen(screen.slug).length > 0 && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {findComponentsByScreen(screen.slug).map((component) => (
                    <Link
                      key={component.slug}
                      href={`/components/${component.slug}`}
                      className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-3 py-1.5 text-sm text-zinc-200 hover:border-zinc-500 hover:bg-zinc-900/80 transition-colors"
                    >
                      <span>{component.name}</span>
                      <span className="text-xs text-zinc-500">
                        {component.variants.length} variant
                        {component.variants.length > 1 ? "s" : ""}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Copy Prompt Button */}
            <div className="space-y-2">
              <button
                type="button"
                onClick={async () => {
                  const componentName = slugToComponentName(screen.slug);
                  const baseScreenType = getBaseScreenType(screen.slug);
                  const componentsUsed = findComponentsByScreen(screen.slug);
                  const componentsList = componentsUsed.length > 0
                    ? `\n\nThis screen uses the following components:\n${componentsUsed.map(c => `- ${c.name}`).join("\n")}\n`
                    : "";
                  
                  const prompt = `Install the DesignAgent ${screen.name} screen into this project.${componentsList}

You MUST follow these rules:

1. First, call the \`get_screen_kit\` tool with:

   { "screenId": "${screen.slug}" }

2. For every file returned by the tool:

   - If the path contains \`design-system/components\`,

     write it under:

     \`src/design-system/components/...\`

     Create folders if needed.

     DO NOT modify unrelated existing components.

   - If the path contains \`design-system/screens\`,

     write it under:

     \`src/design-system/screens/${screen.category}/${screen.slug}.tsx\`

     or the closest matching path indicated by the tool.

     This is a **template screen**, not a route.

     Do NOT overwrite any existing app routes.

3. Check if a ${baseScreenType} route already exists, for example:

   - \`app/(${screen.category})/${baseScreenType}.tsx\`

   - \`app/${baseScreenType}.tsx\`

   - or \`src/screens/${componentName}.tsx\`

   - If a ${baseScreenType} screen already exists:

     - DO NOT modify or overwrite it.

     - Instead, just make sure the new \`${screen.slug}\` template is available

       from \`src/design-system/screens/${screen.category}/${screen.slug}.tsx\`,

       exported as a React component (e.g. \`DesignAgent${componentName}\`).

   - If NO ${baseScreenType} screen exists:

     - Create a **new route file** at:

       \`app/(${screen.category})/${baseScreenType}.tsx\`

     - In that file, render the DesignAgent ${baseScreenType} template, e.g.:

       \`\`\`tsx
       import { DesignAgent${componentName} } from "@/design-system/screens/${screen.category}/${screen.slug}";

       export default function ${componentName}Screen() {
         return <DesignAgent${componentName} />;
       }
       \`\`\`

4. When you're done:

   - List ALL files you created or modified.

   - Briefly confirm whether:

     - an existing ${baseScreenType} route was detected (and left untouched), OR

     - a new ${baseScreenType} route was created for the user.`;

                  try {
                    await navigator.clipboard.writeText(prompt);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch (err) {
                    console.error("Failed to copy:", err);
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 hover:bg-zinc-700 hover:border-zinc-600 font-medium text-sm transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy prompt
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Live Preview or Preview Image */}
          <div className="flex flex-col items-center lg:items-end gap-4">
            {iframeSrc ? (
              <div className="relative aspect-[9/19.5] w-full max-w-md">
                {/* Preview content - positioned inside bezel */}
                <div 
                  className="absolute rounded-[3.2rem] overflow-hidden z-0"
                  style={{
                    top: "6%",
                    left: "7%",
                    right: "7%",
                    bottom: "6%",
                  }}
                >
                  <iframe
                    key={`${screen.slug}-${themeId}-${mode}`}
                    src={iframeSrc}
                    className="w-full h-full border-0"
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
                {/* Status Bar - positioned at top of screen area, overlaying preview */}
                <div
                  className="absolute z-[5] pointer-events-none"
                  style={{
                    top: "6%",
                    left: "7%",
                    right: "7%",
                    height: "54px",
                  }}
                >
                  <Image
                    src="/images/status-bar.svg"
                    alt="Status bar"
                    fill
                    sizes="(max-width: 768px) 100vw, 448px"
                    className="object-contain object-top"
                    priority
                  />
                </div>
                {/* Bezel Image - on top to show device frame */}
                <Image
                  src="/images/bezel.png"
                  alt="Device bezel"
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-contain z-10 pointer-events-none"
                  priority
                />
              </div>
            ) : (
              <ScreenPreview screen={screen} size="large" />
            )}
          </div>
        </div>

        {/* Related Screens */}
        {relatedScreens.length > 0 && (
          <div className="mb-20 space-y-6">
            <h2 className="text-2xl font-semibold text-zinc-100">Related screens</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedScreens.map((relatedScreen) => (
                <ScreenCard key={relatedScreen.slug} variant={relatedScreen} />
              ))}
            </div>
          </div>
        )}


      </div>
    </div>
  );
}

