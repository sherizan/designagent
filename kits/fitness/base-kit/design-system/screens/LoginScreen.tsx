import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { fitnessTheme } from "../theme";

type LoginScreenProps = {
  onContinue?: (event: GestureResponderEvent) => void;
};

/**
 * Example login / landing screen using the Fitness UI Kit.
 *
 * This screen uses:
 * - fitnessTheme tokens for colors, spacing, radius, and typography
 * - the fitness login background image from assets/images/fitness-login-bg.jpg
 *
 * You can wire `onContinue` to your navigation (e.g. go to dashboard).
 */
export function FitnessLoginScreen({ onContinue }: LoginScreenProps) {
  const { colors, spacing, radius, typography } = fitnessTheme;

  const fontFamilyHeading = getFontFamily(typography.fontFamily, "semibold");
  const fontFamilyBody = getFontFamily(typography.fontFamily, "regular");

  return (
    <ImageBackground
      source={require("../../assets/images/fitness-login-bg.jpg")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text
            style={[
              styles.brand,
              { fontFamily: fontFamilyHeading, color: colors.text, fontSize: 26 * typography.headingScale },
            ]}
          >
            Fitness App
          </Text>
          <Text
            style={[
              styles.subtitle,
              {
                fontFamily: fontFamilyBody,
                color: colors.muted,
                fontSize: 13 * typography.bodyScale,
              },
            ]}
          >
            Track your strength. Build your streaks.
          </Text>
        </View>
        <View
          style={[
            styles.card,
            {
              backgroundColor: "rgba(15,23,42,0.94)",
              borderRadius: radius.large,
              padding: spacing.lg,
            },
          ]}
        >
          <Text
            style={[
              styles.cardTitle,
              {
                fontFamily: fontFamilyHeading,
                color: colors.text,
                fontSize: 16 * typography.bodyScale,
                marginBottom: spacing.sm,
              },
            ]}
          >
            Ready to lift?
          </Text>
          <TouchableOpacity
            style={[
              styles.primaryButton,
              {
                backgroundColor: colors.primary,
                borderRadius: radius.medium,
                paddingVertical: spacing.sm,
              },
            ]}
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.primaryButtonText,
                {
                  fontFamily: fontFamilyHeading,
                  color: colors.background,
                  fontSize: 14 * typography.bodyScale,
                },
              ]}
            >
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.secondaryButton,
              {
                borderRadius: radius.medium,
                paddingVertical: spacing.sm,
                borderColor: "rgba(148,163,184,0.7)",
              },
            ]}
            onPress={onContinue}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.secondaryButtonText,
                {
                  fontFamily: fontFamilyBody,
                  color: colors.text,
                  fontSize: 14 * typography.bodyScale,
                },
              ]}
            >
              Log in
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.terms,
              {
                fontFamily: fontFamilyBody,
                color: colors.muted,
                fontSize: 11 * typography.bodyScale,
                marginTop: spacing.xs,
              },
            ]}
          >
            By continuing you agree to our Terms & Privacy.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

/**
 * Helper to map typography.fontFamily (e.g. "Inter") to Expo font keys,
 * following the pattern used by the kit components (Inter_400Regular, Inter_600SemiBold, etc.).
 */
function getFontFamily(family: string, weight: "regular" | "semibold"): string {
  const base = family.replace(/\s+/g, "");
  const suffix = weight === "semibold" ? "600SemiBold" : "400Regular";
  return `${base}_${suffix}`;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    resizeMode: "cover",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "space-between",
  },
  header: {
    marginTop: 8,
  },
  brand: {},
  subtitle: {
    marginTop: 4,
  },
  card: {
    marginBottom: 8,
  },
  cardTitle: {},
  primaryButton: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  primaryButtonText: {
    fontWeight: "600",
  },
  secondaryButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginBottom: 4,
  },
  secondaryButtonText: {},
  terms: {},
});

