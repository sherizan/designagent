"use client";

import Link from "next/link";
import { UIkit } from "@/data/ui-kits";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Footprints, Flame, Dumbbell } from "lucide-react";

interface UIKitCardProps {
  kit: UIkit;
}

export function UIKitCard({ kit }: UIKitCardProps) {

  // Special preview for fitness kit
  const isFitnessKit = kit.id === "fitness";
  const defaultTheme = kit.themes?.find(t => t.id === kit.defaultThemeId) || kit.themes?.[0];

  return (
    <Card className="group overflow-hidden bg-zinc-900 border-zinc-800 flex flex-col h-full hover:border-zinc-700 transition-all duration-300">
      <Link href={`/kits/${kit.id}`} className="block flex-1">
        {/* Thumbnail Area - Aspect Ratio 4:5 */}
        <div className="relative aspect-[4/5] bg-zinc-800 overflow-hidden">
          {isFitnessKit && defaultTheme ? (
            // Fitness Kit Custom Preview
            <div 
              className="absolute inset-0 p-4 flex flex-col"
              style={{ backgroundColor: defaultTheme.tokens.background }}
            >
              {/* Status bar */}
              <div className="flex justify-between items-center mb-3 px-2">
                <div className="text-[10px] text-zinc-500 font-medium">9:41</div>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                  <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                  <div className="w-1 h-1 rounded-full bg-zinc-600"></div>
                </div>
              </div>

              {/* Header */}
              <div className="mb-3 px-2">
                <div className="text-[9px] text-zinc-500 mb-1" style={{ color: defaultTheme.tokens.muted }}>
                  Good morning, Alex
                </div>
                <div className="text-base font-bold" style={{ color: defaultTheme.tokens.text }}>
                  Today's Progress
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex gap-2 mb-3 px-2">
                <div 
                  className="flex-1 rounded-lg p-2 flex flex-col items-center"
                  style={{ 
                    backgroundColor: defaultTheme.tokens.surface,
                    borderRadius: defaultTheme.tokens.radius.medium
                  }}
                >
                  <div 
                    className="w-5 h-5 rounded mb-1 flex items-center justify-center"
                    style={{ 
                      borderWidth: 1.5,
                      borderColor: defaultTheme.tokens.primary + "60"
                    }}
                  >
                    <Footprints className="w-2.5 h-2.5" style={{ color: defaultTheme.tokens.primary }} />
                  </div>
                  <div className="text-xs font-bold" style={{ color: defaultTheme.tokens.text }}>6,240</div>
                  <div className="text-[8px]" style={{ color: defaultTheme.tokens.muted }}>Steps</div>
                </div>
                <div 
                  className="flex-1 rounded-lg p-2 flex flex-col items-center"
                  style={{ 
                    backgroundColor: defaultTheme.tokens.surface,
                    borderRadius: defaultTheme.tokens.radius.medium
                  }}
                >
                  <div 
                    className="w-5 h-5 rounded mb-1 flex items-center justify-center"
                    style={{ 
                      borderWidth: 1.5,
                      borderColor: defaultTheme.tokens.primary + "60"
                    }}
                  >
                    <Activity className="w-2.5 h-2.5" style={{ color: defaultTheme.tokens.primary }} />
                  </div>
                  <div className="text-xs font-bold" style={{ color: defaultTheme.tokens.text }}>45</div>
                  <div className="text-[8px]" style={{ color: defaultTheme.tokens.muted }}>Mins</div>
                </div>
                <div 
                  className="flex-1 rounded-lg p-2 flex flex-col items-center"
                  style={{ 
                    backgroundColor: defaultTheme.tokens.surface,
                    borderRadius: defaultTheme.tokens.radius.medium
                  }}
                >
                  <div 
                    className="w-5 h-5 rounded mb-1 flex items-center justify-center"
                    style={{ 
                      borderWidth: 1.5,
                      borderColor: defaultTheme.tokens.primary + "60"
                    }}
                  >
                    <Flame className="w-2.5 h-2.5" style={{ color: defaultTheme.tokens.primary }} />
                  </div>
                  <div className="text-xs font-bold" style={{ color: defaultTheme.tokens.text }}>320</div>
                  <div className="text-[8px]" style={{ color: defaultTheme.tokens.muted }}>Kcal</div>
                </div>
              </div>

              {/* Streak Card */}
              <div 
                className="rounded-xl p-3 mb-3 mx-2 flex items-center justify-between"
                style={{ 
                  backgroundColor: defaultTheme.tokens.surface,
                  borderRadius: defaultTheme.tokens.radius.large
                }}
              >
                <div>
                  <div className="text-xs font-bold mb-0.5" style={{ color: defaultTheme.tokens.text }}>
                    7-Day Streak! 🔥
                  </div>
                  <div className="text-[8px]" style={{ color: defaultTheme.tokens.muted }}>
                    You're crushing it
                  </div>
                </div>
                <div 
                  className="px-2 py-0.5 rounded text-[8px] font-bold"
                  style={{ 
                    backgroundColor: defaultTheme.tokens.primary + "20",
                    color: defaultTheme.tokens.primary,
                    borderRadius: defaultTheme.tokens.radius.small
                  }}
                >
                  Keep it up
                </div>
              </div>

              {/* Workout Items */}
              <div className="flex-1 space-y-1.5 px-2">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg p-2 flex items-center"
                    style={{ 
                      backgroundColor: defaultTheme.tokens.surface,
                      borderRadius: defaultTheme.tokens.radius.medium
                    }}
                  >
                    <div 
                      className="w-6 h-6 rounded mr-2 flex items-center justify-center"
                      style={{ 
                        borderWidth: 1.5,
                        borderColor: defaultTheme.tokens.muted + "40",
                        borderRadius: defaultTheme.tokens.radius.medium
                      }}
                    >
                      <Dumbbell className="w-3 h-3" style={{ color: defaultTheme.tokens.primary }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-[9px] font-semibold mb-0.5" style={{ color: defaultTheme.tokens.text }}>
                        {i === 1 ? "Full Body HIIT" : "Upper Body Power"}
                      </div>
                      <div className="text-[7px]" style={{ color: defaultTheme.tokens.muted }}>
                        {i === 1 ? "30 min • High Intensity" : "45 min • Strength"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Primary Button */}
              <div className="px-2 mt-2">
                <div 
                  className="rounded-lg py-2 text-center"
                  style={{ 
                    backgroundColor: defaultTheme.tokens.primary,
                    borderRadius: defaultTheme.tokens.radius.medium
                  }}
                >
                  <span 
                    className="text-[9px] font-semibold"
                    style={{ color: defaultTheme.tokens.background }}
                  >
                    Start Workout
                  </span>
                </div>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-40 pointer-events-none" />
            </div>
          ) : (
            // Default placeholder for other kits
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                <span className="text-zinc-700 font-bold text-lg px-4 text-center">
                  {kit.name} Preview
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
            </>
          )}

          {/* Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {kit.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-zinc-300 text-[10px] border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <CardContent className="flex-1 p-5 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-white transition-colors">
              {kit.name}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2">{kit.description}</p>
          </div>

          {/* Mini Preview Strip */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {isFitnessKit && defaultTheme ? (
              // Fitness kit mini previews showing different screens
              <>
                {/* Login Screen Preview */}
                <div 
                  className="aspect-[3/4] rounded-md overflow-hidden border border-zinc-700/50 relative"
                  style={{ backgroundColor: defaultTheme.tokens.background }}
                >
                  <div className="absolute inset-0 p-1.5">
                    <div className="h-full rounded" style={{ backgroundColor: defaultTheme.tokens.surface }}>
                      <div className="h-1/3 bg-gradient-to-b from-zinc-800 to-transparent"></div>
                      <div className="p-1.5 mt-2">
                        <div 
                          className="h-2 rounded mb-1"
                          style={{ backgroundColor: defaultTheme.tokens.primary, width: "60%" }}
                        ></div>
                        <div 
                          className="h-1.5 rounded mb-2"
                          style={{ backgroundColor: defaultTheme.tokens.muted + "40", width: "80%" }}
                        ></div>
                        <div 
                          className="h-4 rounded mb-1"
                          style={{ backgroundColor: defaultTheme.tokens.primary, borderRadius: defaultTheme.tokens.radius.medium }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Dashboard Preview */}
                <div 
                  className="aspect-[3/4] rounded-md overflow-hidden border border-zinc-700/50 relative"
                  style={{ backgroundColor: defaultTheme.tokens.background }}
                >
                  <div className="absolute inset-0 p-1.5">
                    <div className="h-full rounded flex flex-col" style={{ backgroundColor: defaultTheme.tokens.background }}>
                      <div className="flex gap-1 mb-1.5">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i}
                            className="flex-1 h-8 rounded"
                            style={{ 
                              backgroundColor: defaultTheme.tokens.surface,
                              borderRadius: defaultTheme.tokens.radius.medium
                            }}
                          ></div>
                        ))}
                      </div>
                      <div 
                        className="h-12 rounded mb-1.5"
                        style={{ 
                          backgroundColor: defaultTheme.tokens.surface,
                          borderRadius: defaultTheme.tokens.radius.large
                        }}
                      ></div>
                      <div className="space-y-1">
                        {[1, 2].map((i) => (
                          <div 
                            key={i}
                            className="h-6 rounded"
                            style={{ 
                              backgroundColor: defaultTheme.tokens.surface,
                              borderRadius: defaultTheme.tokens.radius.medium
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Workout Detail Preview */}
                <div 
                  className="aspect-[3/4] rounded-md overflow-hidden border border-zinc-700/50 relative"
                  style={{ backgroundColor: defaultTheme.tokens.background }}
                >
                  <div className="absolute inset-0 p-1.5">
                    <div className="h-full rounded flex flex-col" style={{ backgroundColor: defaultTheme.tokens.background }}>
                      <div 
                        className="h-16 rounded mb-1.5"
                        style={{ 
                          backgroundColor: defaultTheme.tokens.surface,
                          borderRadius: defaultTheme.tokens.radius.large
                        }}
                      ></div>
                      <div className="space-y-1">
                        {[1, 2, 3].map((i) => (
                          <div 
                            key={i}
                            className="h-5 rounded"
                            style={{ 
                              backgroundColor: defaultTheme.tokens.surface,
                              borderRadius: defaultTheme.tokens.radius.medium
                            }}
                          ></div>
                        ))}
                      </div>
                      <div 
                        className="mt-auto h-6 rounded"
                        style={{ 
                          backgroundColor: defaultTheme.tokens.primary,
                          borderRadius: defaultTheme.tokens.radius.medium
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              // Default placeholders for other kits
              [0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="aspect-[3/4] rounded-md bg-zinc-800 border border-zinc-700/50 overflow-hidden"
                >
                  <div className="w-full h-full bg-zinc-800/50" />
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Link>

      <CardFooter className="p-5 pt-0">
        <Link 
          href={`/kits/${kit.id}`}
          className="w-full"
        >
          <Button 
            variant="outline" 
            className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            View Kit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
