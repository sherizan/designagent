import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { fitnessTheme } from "../theme";

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  style?: ViewStyle;
}

/**
 * StatCard component for displaying fitness metrics.
 * Uses Fitness UI Kit tokens for consistent styling.
 */
export function StatCard({ icon, value, label, style }: StatCardProps) {
  const s = fitnessTheme.spacing;
  const r = fitnessTheme.radius;
  const ty = fitnessTheme.typography;

  const getFontFamily = (fontName: string, weight: "regular" | "semibold" = "regular") => {
    const base = fontName.replace(/\s+/g, "");
    const suffix = weight === "semibold" ? "600SemiBold" : "400Regular";
    return `${base}_${suffix}`;
  };

  const fontFamilyRegular = getFontFamily(ty.fontFamily, "regular");
  const fontFamilyBold = getFontFamily(ty.fontFamily, "semibold");

  return (
    <View
      style={[
        {
          backgroundColor: fitnessTheme.colors.surface,
          borderRadius: r.medium,
          padding: s.md,
          flex: 1,
          alignItems: "center",
        },
        style,
      ]}
    >
      <View style={{ marginBottom: s.sm }}>{icon}</View>
      <Text
        style={{
          fontSize: 16 * ty.headingScale,
          fontWeight: "bold",
          color: fitnessTheme.colors.text,
          marginBottom: 2,
          fontFamily: fontFamilyBold,
        }}
      >
        {value}
      </Text>
      <Text
        style={{
          fontSize: 10 * ty.bodyScale,
          color: fitnessTheme.colors.muted,
          fontFamily: fontFamilyRegular,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

