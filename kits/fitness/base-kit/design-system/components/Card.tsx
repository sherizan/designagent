import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { fitnessTheme } from "../theme";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

/**
 * Card component using Fitness UI Kit tokens.
 * Provides consistent surface styling with spacing and radius.
 */
export function Card({ children, style }: CardProps) {
  const s = fitnessTheme.spacing;
  const r = fitnessTheme.radius;

  return (
    <View
      style={[
        {
          backgroundColor: fitnessTheme.colors.surface,
          borderRadius: r.medium,
          padding: s.md,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

