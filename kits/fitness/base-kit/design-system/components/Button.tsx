import React from "react";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { fitnessTheme } from "../theme";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
}

/**
 * Primary button component using Fitness UI Kit tokens.
 * 
 * Maps theme fontFamily to Expo Google Fonts:
 * - "Inter" → "Inter_400Regular" / "Inter_600SemiBold"
 * - "Outfit" → "Outfit_400Regular" / "Outfit_600SemiBold"
 * - "DM Sans" → "DMSans_400Regular" / "DMSans_600SemiBold"
 * - "Urbanist" → "Urbanist_400Regular" / "Urbanist_600SemiBold"
 */
export function Button({ title, onPress, variant = "primary", disabled = false }: ButtonProps) {
  const s = fitnessTheme.spacing;
  const r = fitnessTheme.radius;
  const ty = fitnessTheme.typography;

  const getFontFamily = (fontName: string, weight: "regular" | "semibold" = "regular") => {
    const base = fontName.replace(/\s+/g, "");
    const suffix = weight === "semibold" ? "600SemiBold" : "400Regular";
    return `${base}_${suffix}`;
  };

  const fontFamily = getFontFamily(ty.fontFamily, "semibold");

  const buttonStyle: ViewStyle = {
    paddingVertical: s.md,
    paddingHorizontal: s.lg,
    borderRadius: r.medium,
    alignItems: "center",
    justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  };

  const textStyle: TextStyle = {
    fontSize: 14 * ty.bodyScale,
    fontFamily,
    fontWeight: "600",
  };

  if (variant === "primary") {
    buttonStyle.backgroundColor = fitnessTheme.colors.primary;
    textStyle.color = fitnessTheme.colors.background;
  } else if (variant === "secondary") {
    buttonStyle.backgroundColor = fitnessTheme.colors.surface;
    textStyle.color = fitnessTheme.colors.text;
  } else {
    // ghost
    textStyle.color = fitnessTheme.colors.primary;
  }

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

