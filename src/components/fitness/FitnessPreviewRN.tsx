"use client";

import React from "react";
import { View, Text, ScrollView, TouchableOpacity, type DimensionValue } from "react-native";
import type { FitnessTheme } from "@/data/ui-kits";
import { Activity, Flame, Footprints, ChevronRight } from "lucide-react";

type FitnessPreviewRNProps = {
  theme: FitnessTheme;
};

export function FitnessPreviewRN({ theme }: FitnessPreviewRNProps) {
  const { tokens, iconStyle } = theme;
  const s = tokens.spacing;
  const r = tokens.radius;
  const ty = tokens.typography;

  // We map the font name to the CSS variable name or font family string
  // In React Native Web, we can usually use the font family name directly if loaded via CSS
  // or use the variable if we set it up that way.
  // Since we loaded them via Next.js Google Fonts with variables, 
  // we might need to map them or use the variable.
  // However, next/font usually sets the font-family on the class.
  // For RN Web, 'fontFamily' style expects the font name.
  // Next.js font variables like var(--font-inter) work in CSS. 
  // RN Web 'fontFamily' also accepts "Inter" if the global CSS sets it.
  
  // Let's rely on the font name being available because we injected the variables
  // AND usually Next.js fonts make the font available globally if we set it on body?
  // Actually, next/font variables are for Tailwind utility classes like 'font-sans'.
  // But here we are inside a "React Native" view which doesn't use Tailwind classes directly for text.
  // We need to pass the font stack.
  // The variables we added: --font-inter, --font-outfit, --font-dmsans, --font-urbanist.
  // These variables hold the font family string, e.g. "Inter, sans-serif".
  
  const getFontFamily = (name: string | undefined) => {
    switch(name) {
      case "Inter": return "var(--font-inter)";
      case "Outfit": return "var(--font-outfit)";
      case "DM Sans": return "var(--font-dmsans)";
      case "Urbanist": return "var(--font-urbanist)";
      default: return "inherit";
    }
  };

  const fontFamily = getFontFamily(ty.fontFamily);

  const styles = {
    container: {
      flex: 1,
      backgroundColor: tokens.background,
      padding: s.lg,
      paddingTop: 60, // status bar area
    },
    header: {
      marginBottom: s.xl,
    },
    greeting: {
      fontSize: 14 * ty.bodyScale,
      color: tokens.muted,
      marginBottom: s.xs,
      fontWeight: "500" as const,
      fontFamily,
    },
    title: {
      fontSize: 24 * ty.headingScale,
      fontWeight: "bold" as const,
      color: tokens.text,
      fontFamily,
    },
    statsRow: {
      flexDirection: "row" as const,
      justifyContent: "space-between" as const,
      marginBottom: s.xl,
      gap: s.sm,
    },
    statCard: {
      backgroundColor: tokens.surface,
      borderRadius: r.medium,
      padding: s.md,
      flex: 1,
      alignItems: "center" as const,
      // Shadow for depth
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    statValue: {
      fontSize: 16 * ty.headingScale,
      fontWeight: "bold" as const,
      color: tokens.text,
      marginTop: s.sm,
      marginBottom: 2,
      fontFamily,
    },
    statLabel: {
      fontSize: 10 * ty.bodyScale,
      color: tokens.muted,
      fontFamily,
    },
    streakCard: {
      backgroundColor: tokens.surface,
      borderRadius: r.large,
      padding: s.lg,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
      marginBottom: s.xl,
    },
    streakContent: {
      flex: 1,
    },
    streakTitle: {
      fontSize: 16 * ty.headingScale,
      fontWeight: "bold" as const,
      color: tokens.text,
      marginBottom: s.xs,
      fontFamily,
    },
    streakSubtitle: {
      fontSize: 12 * ty.bodyScale,
      color: tokens.muted,
      fontFamily,
    },
    streakBadge: {
      backgroundColor: tokens.primary + "20", // 20% opacity approximation if hex
      paddingHorizontal: s.md,
      paddingVertical: s.sm / 2 + 2,
      borderRadius: r.small,
    },
    streakBadgeText: {
      color: tokens.primary,
      fontWeight: "bold" as const,
      fontSize: 12 * ty.bodyScale,
      fontFamily,
    },
    sectionTitle: {
      fontSize: 18 * ty.headingScale,
      fontWeight: "bold" as const,
      color: tokens.text,
      marginBottom: s.lg,
      fontFamily,
    },
    workoutItem: {
      backgroundColor: tokens.surface,
      borderRadius: r.medium,
      padding: s.lg,
      marginBottom: s.md,
      flexDirection: "row" as const,
      alignItems: "center" as const,
      justifyContent: "space-between" as const,
    },
    workoutInfo: {
      flexDirection: "row" as const,
      alignItems: "center" as const,
    },
    workoutIcon: {
      width: 40,
      height: 40,
      alignItems: "center" as const,
      justifyContent: "center" as const,
      marginRight: s.md,
    },
    workoutTitle: {
      fontSize: 14 * ty.headingScale,
      fontWeight: "600" as const,
      color: tokens.text,
      marginBottom: 2,
      fontFamily,
    },
    workoutMeta: {
      fontSize: 12 * ty.bodyScale,
      color: tokens.muted,
      fontFamily,
    },
  };

  // Helper to render icons correctly in RN Web context
  // We wrap them in a View to ensure layout consistency
  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <View style={{ width: 24, height: 24, alignItems: "center", justifyContent: "center" }}>
      {children}
    </View>
  );

  function MetricIcon({ children }: { children: React.ReactNode }) {
    const commonStyle = {
      alignItems: "center" as const,
      justifyContent: "center" as const,
      width: 32,
      height: 32,
    };

    if (iconStyle === "minimal") {
       return (
         <View style={{ ...commonStyle }}>
           {children}
         </View>
       );
    }
    
    if (iconStyle === "outline") {
      return (
        <View style={{ 
          ...commonStyle, 
          borderWidth: 1.5, 
          borderColor: tokens.primary + "60",
          borderRadius: 8,
        }}>
          {children}
        </View>
      );
    }

    // filled
    return (
      <View style={{ 
        ...commonStyle, 
        backgroundColor: tokens.primary + "20", 
        borderRadius: 16, // Circle
      }}>
        {children}
      </View>
    );
  }

  function WorkoutIcon({ children }: { children: React.ReactNode }) {
     // For workout list, let's use a slightly larger version or just adapt the style
     if (iconStyle === "minimal") {
        return (
           <View style={{ 
             width: 40, 
             height: 40, 
             backgroundColor: tokens.background,
             borderRadius: r.small,
             alignItems: "center", 
             justifyContent: "center",
             marginRight: s.md
           }}>
             {children}
           </View>
        );
     }
     
     if (iconStyle === "outline") {
        return (
           <View style={{ 
             width: 40, 
             height: 40, 
             borderWidth: 1.5,
             borderColor: tokens.muted + "40",
             borderRadius: r.medium,
             alignItems: "center", 
             justifyContent: "center",
             marginRight: s.md
           }}>
             {children}
           </View>
        );
     }

     // filled
     return (
        <View style={{ 
          width: 40, 
          height: 40, 
          backgroundColor: tokens.surface === "#020617" ? "#1E293B" : "#F1F5F9", 
          borderRadius: r.large,
          alignItems: "center", 
          justifyContent: "center",
          marginRight: s.md
        }}>
          {children}
        </View>
     );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, Alex</Text>
        <Text style={styles.title}>Today's Progress</Text>
      </View>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <MetricIcon>
            <Footprints size={16} color={tokens.primary} />
          </MetricIcon>
          <Text style={styles.statValue}>6,240</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
        <View style={styles.statCard}>
          <MetricIcon>
            <Activity size={16} color={tokens.primary} />
          </MetricIcon>
          <Text style={styles.statValue}>45</Text>
          <Text style={styles.statLabel}>Mins</Text>
        </View>
        <View style={styles.statCard}>
          <MetricIcon>
            <Flame size={16} color={tokens.primary} />
          </MetricIcon>
          <Text style={styles.statValue}>320</Text>
          <Text style={styles.statLabel}>Kcal</Text>
        </View>
      </View>

      {/* Streak Card */}
      <View style={styles.streakCard}>
        <View style={styles.streakContent}>
          <Text style={styles.streakTitle}>7-Day Streak! 🔥</Text>
          <Text style={styles.streakSubtitle}>You're crushing your goals.</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakBadgeText}>Keep it up</Text>
        </View>
      </View>

      {/* Upcoming Workouts */}
      <Text style={styles.sectionTitle}>Upcoming Workouts</Text>

      <TouchableOpacity style={styles.workoutItem} activeOpacity={0.7}>
        <View style={styles.workoutInfo}>
          <WorkoutIcon>
             <Activity size={18} color={tokens.primary} />
          </WorkoutIcon>
          <View>
            <Text style={styles.workoutTitle}>Full Body HIIT</Text>
            <Text style={styles.workoutMeta}>30 min • High Intensity</Text>
          </View>
        </View>
        <ChevronRight size={16} color={tokens.muted} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.workoutItem} activeOpacity={0.7}>
        <View style={styles.workoutInfo}>
          <WorkoutIcon>
             <Activity size={18} color={tokens.primary} />
          </WorkoutIcon>
          <View>
            <Text style={styles.workoutTitle}>Upper Body Power</Text>
            <Text style={styles.workoutMeta}>45 min • Strength</Text>
          </View>
        </View>
        <ChevronRight size={16} color={tokens.muted} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.workoutItem} activeOpacity={0.7}>
        <View style={styles.workoutInfo}>
           <WorkoutIcon>
             <Activity size={18} color={tokens.primary} />
           </WorkoutIcon>
          <View>
            <Text style={styles.workoutTitle}>Recovery Yoga</Text>
            <Text style={styles.workoutMeta}>20 min • Flexibility</Text>
          </View>
        </View>
        <ChevronRight size={16} color={tokens.muted} />
      </TouchableOpacity>
    </ScrollView>
  );
}
