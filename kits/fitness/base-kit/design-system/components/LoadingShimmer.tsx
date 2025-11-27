import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { fitnessTheme } from "../theme";

interface LoadingShimmerProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
}

/**
 * LoadingShimmer component for skeleton loading states.
 * Uses Fitness UI Kit tokens for consistent styling.
 */
export function LoadingShimmer({
  width = "100%",
  height = 20,
  borderRadius,
  style,
}: LoadingShimmerProps) {
  const r = fitnessTheme.radius;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: fitnessTheme.colors.surface,
          borderRadius: borderRadius ?? r.small,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          flex: 1,
          backgroundColor: fitnessTheme.colors.primary,
          opacity,
        }}
      />
    </View>
  );
}

