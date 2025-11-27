import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { fitnessTheme } from "../theme";

interface WorkoutListItemProps {
  title: string;
  meta: string;
  icon: React.ReactNode;
  onPress?: () => void;
}

/**
 * WorkoutListItem component for displaying workout items in lists.
 * Uses Fitness UI Kit tokens for consistent styling.
 */
export function WorkoutListItem({ title, meta, icon, onPress }: WorkoutListItemProps) {
  const s = fitnessTheme.spacing;
  const r = fitnessTheme.radius;
  const ty = fitnessTheme.typography;

  const getFontFamily = (fontName: string, weight: "regular" | "semibold" = "regular") => {
    const base = fontName.replace(/\s+/g, "");
    const suffix = weight === "semibold" ? "600SemiBold" : "400Regular";
    return `${base}_${suffix}`;
  };

  const fontFamilyRegular = getFontFamily(ty.fontFamily, "regular");
  const fontFamilySemiBold = getFontFamily(ty.fontFamily, "semibold");

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        backgroundColor: fitnessTheme.colors.surface,
        borderRadius: r.medium,
        padding: s.lg,
        marginBottom: s.md,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <View
          style={{
            width: 40,
            height: 40,
            backgroundColor: fitnessTheme.colors.background,
            borderRadius: r.small,
            alignItems: "center",
            justifyContent: "center",
            marginRight: s.md,
          }}
        >
          {icon}
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 14 * ty.headingScale,
              fontWeight: "600",
              color: fitnessTheme.colors.text,
              marginBottom: 2,
              fontFamily: fontFamilySemiBold,
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              fontSize: 12 * ty.bodyScale,
              color: fitnessTheme.colors.muted,
              fontFamily: fontFamilyRegular,
            }}
          >
            {meta}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

