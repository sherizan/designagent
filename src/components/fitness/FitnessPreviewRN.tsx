"use client";

import React, { ReactNode } from "react";
import { View, Text, ScrollView, TouchableOpacity, ImageBackground, Animated } from "react-native";
import type { FitnessTheme } from "@/data/ui-kits";
import { 
  Activity, 
  Flame, 
  Footprints, 
  ChevronRight, 
  User, 
  Settings, 
  Calendar, 
  ArrowLeft, 
  Check, 
  Play, 
  Clock, 
  TrendingUp,
  Dumbbell
} from "lucide-react";
import { FitnessScreenId } from "./FitnessCustomizer";

type FitnessPreviewRNProps = {
  theme: FitnessTheme;
  mode: "app" | "components";
  currentScreen: FitnessScreenId;
  onScreenChange: (screen: FitnessScreenId) => void;
  showLoading: boolean;
};

function Shimmer({
  theme,
  borderRadius,
  height,
  width,
  style,
}: {
  theme: FitnessTheme;
  borderRadius?: number;
  height?: number;
  width?: number | string;
  style?: any;
}) {
  const animated = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animated, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(animated, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    );
    loop.start();

    return () => loop.stop();
  }, [animated]);

  const backgroundColor = theme.tokens.surface;
  const highlightColor = "rgba(255,255,255,0.08)";

  const opacity = animated.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <Animated.View
      style={[
        {
          backgroundColor,
          borderRadius: borderRadius ?? theme.tokens.radius.medium,
          height: height ?? 16,
          width: width ?? "100%",
          overflow: "hidden",
          opacity,
        },
        style,
      ]}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: highlightColor,
          opacity: 0.4,
        }}
      />
    </Animated.View>
  );
}

function LoadingDashboardScreen({ theme }: { theme: FitnessTheme }) {
  const { tokens } = theme;
  const s = tokens.spacing;
  const r = tokens.radius;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: tokens.background,
        paddingHorizontal: s.md,
        paddingVertical: s.lg,
      }}
      contentContainerStyle={{ gap: s.lg, paddingTop: 60 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header shimmer */}
      <View style={{ gap: s.xs }}>
        <Shimmer theme={theme} width="40%" height={18} />
        <Shimmer theme={theme} width="60%" height={12} />
      </View>

      {/* Stats row */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", gap: s.sm }}>
        <Shimmer theme={theme} width="30%" height={80} borderRadius={r.large} />
        <Shimmer theme={theme} width="30%" height={80} borderRadius={r.large} />
        <Shimmer theme={theme} width="30%" height={80} borderRadius={r.large} />
      </View>

      {/* Streak card */}
      <Shimmer theme={theme} height={90} borderRadius={r.large} />

      {/* Workout list */}
      <View style={{ gap: s.sm }}>
        <Shimmer theme={theme} height={56} borderRadius={r.medium} />
        <Shimmer theme={theme} height={56} borderRadius={r.medium} />
        <Shimmer theme={theme} height={56} borderRadius={r.medium} />
      </View>
    </ScrollView>
  );
}

export function FitnessPreviewRN({ theme, mode, currentScreen, onScreenChange, showLoading }: FitnessPreviewRNProps) {
  const { tokens, iconStyle } = theme;
  const s = tokens.spacing;
  const r = tokens.radius;
  const ty = tokens.typography;

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

  // --- Shared Styles ---
  const styles = {
    container: {
      flex: 1,
      backgroundColor: tokens.background,
    },
    contentContainer: {
      padding: s.lg,
      paddingTop: 60, // status bar area
      paddingBottom: 40,
    },
    appContentContainer: {
      padding: s.lg,
      paddingTop: 60, // status bar area
      paddingBottom: 40,
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
    sectionTitle: {
      fontSize: 18 * ty.headingScale,
      fontWeight: "bold" as const,
      color: tokens.text,
      marginBottom: s.lg,
      fontFamily,
    },
    text: {
      color: tokens.text,
      fontFamily,
      fontSize: 14 * ty.bodyScale,
    },
    mutedText: {
      color: tokens.muted,
      fontFamily,
      fontSize: 12 * ty.bodyScale,
    },
    primaryButton: {
      backgroundColor: tokens.primary,
      paddingVertical: s.md,
      paddingHorizontal: s.lg,
      borderRadius: r.medium,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    primaryButtonText: {
      color: tokens.background, // Assuming primary contrast
      fontWeight: "bold" as const,
      fontSize: 14 * ty.bodyScale,
      fontFamily,
    },
    secondaryButton: {
      backgroundColor: tokens.surface,
      paddingVertical: s.md,
      paddingHorizontal: s.lg,
      borderRadius: r.medium,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    secondaryButtonText: {
      color: tokens.text,
      fontWeight: "600" as const,
      fontSize: 14 * ty.bodyScale,
      fontFamily,
    },
    ghostButton: {
      paddingVertical: s.md,
      paddingHorizontal: s.lg,
      borderRadius: r.medium,
      alignItems: "center" as const,
      justifyContent: "center" as const,
    },
    ghostButtonText: {
      color: tokens.primary,
      fontWeight: "600" as const,
      fontSize: 14 * ty.bodyScale,
      fontFamily,
    },
  };

  // --- Components ---

  const MetricIcon = ({ children }: { children: React.ReactNode }) => {
    const commonStyle = {
      alignItems: "center" as const,
      justifyContent: "center" as const,
      width: 32,
      height: 32,
    };

    if (iconStyle === "minimal") {
       return <View style={commonStyle}>{children}</View>;
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
        borderRadius: 16,
      }}>
        {children}
      </View>
    );
  };

  const WorkoutIcon = ({ children }: { children: React.ReactNode }) => {
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
  };

  const StatCard = ({ icon, value, label }: { icon: ReactNode, value: string, label: string }) => (
    <View style={{
      backgroundColor: tokens.surface,
      borderRadius: r.medium,
      padding: s.md,
      flex: 1,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
    }}>
      <MetricIcon>{icon}</MetricIcon>
      <Text style={{
        fontSize: 16 * ty.headingScale,
        fontWeight: "bold",
        color: tokens.text,
        marginTop: s.sm,
        marginBottom: 2,
        fontFamily,
      }}>{value}</Text>
      <Text style={{
        fontSize: 10 * ty.bodyScale,
        color: tokens.muted,
        fontFamily,
      }}>{label}</Text>
    </View>
  );

  const WorkoutItem = ({ title, meta, icon, onPress }: { title: string, meta: string, icon: ReactNode, onPress?: () => void }) => (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onPress}
      style={{
        backgroundColor: tokens.surface,
        borderRadius: r.medium,
        padding: s.lg,
        marginBottom: s.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <WorkoutIcon>{icon}</WorkoutIcon>
        <View>
          <Text style={{
            fontSize: 14 * ty.headingScale,
            fontWeight: "600",
            color: tokens.text,
            marginBottom: 2,
            fontFamily,
          }}>{title}</Text>
          <Text style={{
            fontSize: 12 * ty.bodyScale,
            color: tokens.muted,
            fontFamily,
          }}>{meta}</Text>
        </View>
      </View>
      <ChevronRight size={16} color={tokens.muted} />
    </TouchableOpacity>
  );

  // --- Screens ---

  const LoginScreen = () => (
    <ImageBackground
      // For RN Web preview
      source={{ uri: "/images/fitness-login-bg.jpg" }}
      style={{ flex: 1 }}
      imageStyle={{ resizeMode: "cover" }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          paddingHorizontal: s.lg,
          paddingVertical: s.lg,
          justifyContent: "space-between",
        }}
      >
        {/* Brand area */}
        <View style={{ marginTop: 60 }}>
          <Text
            style={{
              color: tokens.text,
              fontSize: 26 * ty.headingScale,
              fontFamily,
              fontWeight: "700",
            }}
          >
            Fitness App
          </Text>
          <Text
            style={{
              marginTop: s.sm,
              color: tokens.text,
              fontSize: 13 * ty.bodyScale,
              fontFamily,
              opacity: 0.9,
            }}
          >
            Track your strength. Build your streaks.
          </Text>
        </View>

        {/* CTA card */}
        <View
          style={{
            backgroundColor: "rgba(15,23,42,0.92)",
            padding: s.lg,
            borderRadius: r.large,
            gap: s.sm,
          }}
        >
          <Text
            style={{
              color: tokens.text,
              fontSize: 16 * ty.bodyScale,
              fontFamily,
              marginBottom: s.sm,
              fontWeight: "600",
            }}
          >
            Ready to lift?
          </Text>

          {/* Register */}
          <TouchableOpacity
            style={{
              backgroundColor: tokens.primary,
              borderRadius: r.medium,
              paddingVertical: s.md,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: s.xs,
            }}
            onPress={() => onScreenChange("dashboard")}
          >
            <Text
              style={{
                color: "#020617",
                fontSize: 14 * ty.bodyScale,
                fontFamily,
                fontWeight: "600",
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          {/* Log in */}
          <TouchableOpacity
            style={{
              borderRadius: r.medium,
              paddingVertical: s.md,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "rgba(148,163,184,0.4)",
            }}
            onPress={() => onScreenChange("dashboard")}
          >
            <Text
              style={{
                color: tokens.text,
                fontSize: 14 * ty.bodyScale,
                fontFamily,
                fontWeight: "600",
              }}
            >
              Log in
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              marginTop: s.xs,
              color: tokens.muted,
              fontSize: 11 * ty.bodyScale,
              fontFamily,
              textAlign: "center",
            }}
          >
            By continuing you agree to our Terms & Privacy.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );

  const OnboardingScreen = () => (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.appContentContainer, { flexGrow: 1, justifyContent: 'center' }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ alignItems: 'center', marginBottom: s.xl }}>
        <View style={{ 
          width: 80, height: 80, borderRadius: 40, 
          backgroundColor: tokens.primary, 
          alignItems: 'center', justifyContent: 'center',
          marginBottom: s.xl
        }}>
          <Activity size={40} color={tokens.background} />
        </View>
        <Text style={{ ...styles.title, textAlign: 'center', marginBottom: s.md }}>
          Welcome to FitLife
        </Text>
        <Text style={{ ...styles.text, textAlign: 'center', color: tokens.muted, lineHeight: 22 }}>
          Your personal fitness companion. Track workouts, monitor progress, and achieve your goals.
        </Text>
      </View>

      <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.primaryButton}
        onPress={() => onScreenChange("dashboard")}
      >
        <Text style={styles.primaryButtonText}>Get Started</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const DashboardScreen = () => (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.appContentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: s.xl }}>
        <View>
          <Text style={styles.greeting}>Good morning, Alex</Text>
          <Text style={styles.title}>Today's Progress</Text>
        </View>
        <TouchableOpacity onPress={() => onScreenChange("profile")}>
          <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: tokens.surface, alignItems: 'center', justifyContent: 'center' }}>
            <User size={20} color={tokens.text} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Stats Row */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: s.xl, gap: s.sm }}>
        <StatCard 
          icon={<Footprints size={16} color={tokens.primary} />}
          value="6,240"
          label="Steps"
        />
        <StatCard 
          icon={<Activity size={16} color={tokens.primary} />}
          value="45"
          label="Mins"
        />
        <StatCard 
          icon={<Flame size={16} color={tokens.primary} />}
          value="320"
          label="Kcal"
        />
      </View>

      {/* Streak Card */}
      <View style={{
        backgroundColor: tokens.surface,
        borderRadius: r.large,
        padding: s.lg,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: s.xl,
      }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16 * ty.headingScale, fontWeight: "bold", color: tokens.text, marginBottom: s.xs, fontFamily }}>
            7-Day Streak! 🔥
          </Text>
          <Text style={styles.mutedText}>You're crushing your goals.</Text>
        </View>
        <View style={{
          backgroundColor: tokens.primary + "20",
          paddingHorizontal: s.md,
          paddingVertical: s.sm / 2 + 2,
          borderRadius: r.small,
        }}>
          <Text style={{ color: tokens.primary, fontWeight: "bold", fontSize: 12 * ty.bodyScale, fontFamily }}>Keep it up</Text>
        </View>
      </View>

      {/* Upcoming Workouts */}
      <Text style={styles.sectionTitle}>Upcoming Workouts</Text>

      <WorkoutItem 
        title="Full Body HIIT"
        meta="30 min • High Intensity"
        icon={<Activity size={18} color={tokens.primary} />}
        onPress={() => onScreenChange("workoutDetail")}
      />
      <WorkoutItem 
        title="Upper Body Power"
        meta="45 min • Strength"
        icon={<Dumbbell size={18} color={tokens.primary} />}
        onPress={() => onScreenChange("workoutDetail")}
      />
      <WorkoutItem 
        title="Recovery Yoga"
        meta="20 min • Flexibility"
        icon={<TrendingUp size={18} color={tokens.primary} />}
        onPress={() => onScreenChange("workoutDetail")}
      />
    </ScrollView>
  );

  const WorkoutDetailScreen = () => (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={[styles.appContentContainer, { paddingBottom: 80 }]}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity onPress={() => onScreenChange("dashboard")} style={{ marginBottom: s.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ArrowLeft size={20} color={tokens.text} />
          <Text style={{ marginLeft: s.xs, color: tokens.text, fontFamily, fontSize: 14 * ty.bodyScale }}>Back</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.title}>Full Body HIIT</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: s.xs, marginBottom: s.lg }}>
        <Clock size={14} color={tokens.muted} style={{ marginRight: 4 }} />
        <Text style={styles.mutedText}>30 min</Text>
        <Text style={[styles.mutedText, { marginHorizontal: 8 }]}>•</Text>
        <Flame size={14} color={tokens.muted} style={{ marginRight: 4 }} />
        <Text style={styles.mutedText}>350 cal</Text>
      </View>

      <View style={{ height: 200, backgroundColor: tokens.surface, borderRadius: r.large, marginBottom: s.xl, alignItems: 'center', justifyContent: 'center' }}>
        <Play size={48} color={tokens.primary} />
      </View>

      <Text style={styles.sectionTitle}>Overview</Text>
      <Text style={{ ...styles.text, color: tokens.muted, marginBottom: s.xl, lineHeight: 22 }}>
        A high-intensity interval training session designed to boost your metabolism and build strength. 
        No equipment needed, just your body weight and determination.
      </Text>

      <Text style={styles.sectionTitle}>Exercises (4)</Text>
      {[1, 2, 3, 4].map((i) => (
        <View key={i} style={{ 
          flexDirection: 'row', alignItems: 'center', 
          backgroundColor: tokens.surface, padding: s.md, 
          borderRadius: r.medium, marginBottom: s.sm 
        }}>
          <View style={{ 
            width: 32, height: 32, borderRadius: 16, 
            backgroundColor: tokens.background, 
            alignItems: 'center', justifyContent: 'center', marginRight: s.md 
          }}>
            <Text style={{ color: tokens.muted, fontWeight: 'bold', fontFamily }}>{i}</Text>
          </View>
          <View>
            <Text style={{ color: tokens.text, fontWeight: '600', fontFamily, fontSize: 14 * ty.bodyScale }}>
              {i === 1 ? 'Jumping Jacks' : i === 2 ? 'Push-ups' : i === 3 ? 'Squats' : 'Burpees'}
            </Text>
            <Text style={styles.mutedText}>45 seconds</Text>
          </View>
        </View>
      ))}

      <View style={{ marginTop: s.xl }}>
        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
           <Text style={styles.primaryButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const ProfileScreen = () => (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.appContentContainer}
      showsVerticalScrollIndicator={false}
    >
       <TouchableOpacity onPress={() => onScreenChange("dashboard")} style={{ marginBottom: s.lg }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <ArrowLeft size={20} color={tokens.text} />
          <Text style={{ marginLeft: s.xs, color: tokens.text, fontFamily, fontSize: 14 * ty.bodyScale }}>Back</Text>
        </View>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginBottom: s.xl }}>
        <View style={{ 
          width: 80, height: 80, borderRadius: 40, 
          backgroundColor: tokens.surface, 
          alignItems: 'center', justifyContent: 'center',
          marginBottom: s.md,
          borderWidth: 2, borderColor: tokens.primary
        }}>
          <User size={40} color={tokens.text} />
        </View>
        <Text style={styles.title}>Alex Morgan</Text>
        <Text style={styles.mutedText}>Pro Member</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: s.md, marginBottom: s.xl }}>
         <View style={{ flex: 1, backgroundColor: tokens.surface, padding: s.md, borderRadius: r.medium, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: tokens.text, fontFamily }}>12</Text>
            <Text style={styles.mutedText}>Workouts</Text>
         </View>
         <View style={{ flex: 1, backgroundColor: tokens.surface, padding: s.md, borderRadius: r.medium, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: tokens.text, fontFamily }}>4.5h</Text>
            <Text style={styles.mutedText}>Time</Text>
         </View>
      </View>

      <Text style={styles.sectionTitle}>Settings</Text>
      
      {['Notifications', 'Privacy', 'Subscription', 'Help & Support'].map((item) => (
        <TouchableOpacity key={item} style={{ 
          flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
          paddingVertical: s.md, borderBottomWidth: 1, borderBottomColor: tokens.surface 
        }}>
           <Text style={styles.text}>{item}</Text>
           <ChevronRight size={16} color={tokens.muted} />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={{ marginTop: s.xl }}>
        <Text style={{ color: '#ef4444', textAlign: 'center', fontFamily, fontWeight: '600' }}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const ComponentsBoard = () => (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Buttons</Text>
      <View style={{ gap: s.md, marginBottom: s.xl }}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Primary Button</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Secondary Button</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ghostButton}>
          <Text style={styles.ghostButtonText}>Ghost Button</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Stat Cards</Text>
      <View style={{ flexDirection: "row", gap: s.sm, marginBottom: s.xl }}>
        <StatCard icon={<Activity size={16} color={tokens.primary} />} value="120" label="BPM" />
        <StatCard icon={<Flame size={16} color={tokens.primary} />} value="350" label="Kcal" />
      </View>

      <Text style={styles.sectionTitle}>List Items</Text>
      <View style={{ marginBottom: s.xl }}>
         <WorkoutItem 
            title="Workout Item"
            meta="Subtitle text"
            icon={<Dumbbell size={18} color={tokens.primary} />}
          />
          <WorkoutItem 
            title="Another Item"
            meta="With different icon"
            icon={<TrendingUp size={18} color={tokens.primary} />}
          />
      </View>

      <Text style={styles.sectionTitle}>Badges</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: s.sm, marginBottom: s.xl }}>
         <View style={{ backgroundColor: tokens.primary + '20', paddingHorizontal: s.md, paddingVertical: s.xs, borderRadius: r.small }}>
            <Text style={{ color: tokens.primary, fontWeight: 'bold', fontSize: 12, fontFamily }}>Primary</Text>
         </View>
         <View style={{ backgroundColor: tokens.surface, paddingHorizontal: s.md, paddingVertical: s.xs, borderRadius: r.small }}>
            <Text style={{ color: tokens.text, fontWeight: 'bold', fontSize: 12, fontFamily }}>Surface</Text>
         </View>
         <View style={{ borderWidth: 1, borderColor: tokens.muted, paddingHorizontal: s.md, paddingVertical: s.xs, borderRadius: r.small }}>
            <Text style={{ color: tokens.muted, fontWeight: 'bold', fontSize: 12, fontFamily }}>Outline</Text>
         </View>
      </View>

      <Text style={styles.sectionTitle}>Loading States</Text>
      <View style={{ gap: s.sm, marginBottom: s.xl }}>
        <Shimmer theme={theme} height={56} borderRadius={r.medium} />
        <Shimmer theme={theme} width="60%" height={16} borderRadius={r.small} />
      </View>
    </ScrollView>
  );

  // --- Main Render ---

  let content: ReactNode;

  if (mode === "components") {
    content = <ComponentsBoard />;
  } else {
    if (showLoading) {
      content = <LoadingDashboardScreen theme={theme} />;
    } else {
      switch (currentScreen) {
        case "login":
          content = <LoginScreen />;
          break;
        case "onboarding":
          content = <OnboardingScreen />;
          break;
        case "workoutDetail":
          content = <WorkoutDetailScreen />;
          break;
        case "profile":
          content = <ProfileScreen />;
          break;
        default:
          content = <DashboardScreen />;
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: tokens.background, borderRadius: theme.tokens.radius.large, overflow: "hidden" }}>
      {/* Content Area */}
      <View style={{ flex: 1 }}>
         {content}
      </View>
    </View>
  );
}
