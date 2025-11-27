# DesignAgent · Fitness UI Kit Rules

You are building a React Native app using the DesignAgent Fitness UI Kit.

Your job is to build new screens using the existing design system. Do not create custom visual styles or a second design system.

------------------------------------------------------------
1. Source of Truth (Always Use These)
------------------------------------------------------------

Use these files for all UI decisions:

design-system/tokens.json
design-system/theme.ts
design-system/components/*
design-system/screens/*
design-system/FontsProvider.tsx
assets/images/*

These define the complete Fitness design system. Never introduce new tokens or ad-hoc style systems.

------------------------------------------------------------
2. Import Pattern (Use Relative Paths)
------------------------------------------------------------

When inside screens or app code:

import { fitnessTheme } from "../design-system/theme";
import {
  Button,
  Card,
  StatCard,
  WorkoutListItem
} from "../design-system/components";

If the project uses a design-system barrel file:

import {
  fitnessTheme,
  Button,
  Card,
  StatCard,
  WorkoutListItem
} from "../design-system";

Do not assume "@/design-system" exists unless already configured.

------------------------------------------------------------
3. Typography Rules (Use the Helper)
------------------------------------------------------------

Fonts must always be resolved using typography.fontFamily and the helper:

const { typography } = fitnessTheme;

const getFontFamily = (weight = "regular") => {
  const base = typography.fontFamily.replace(/\s+/g, "");
  const suffix = weight === "semibold" ? "600SemiBold" : "400Regular";
  return `${base}_${suffix}`;
};

const fontFamilyHeading = getFontFamily("semibold");
const fontFamilyBody = getFontFamily("regular");

Do not hardcode fontFamily: "Inter"
Do not hardcode numbers like fontSize: 16 unless required for RN safe defaults.

------------------------------------------------------------
4. Tokens: Colors, Spacing, Radius, Typography
------------------------------------------------------------

All visual values must come from fitnessTheme.

COLORS:
Use colors.primary, colors.background, colors.surface, colors.text, colors.muted.
Do not use raw hex values like "#22C55E" or "#020617".

SPACING:
Use spacing.xs, spacing.sm, spacing.md, spacing.lg, spacing.xl.
In StyleSheet.create(), numeric fallbacks are allowed, but prefer tokens when applying layout styles inline.

RADIUS:
Use radius.small, radius.medium, radius.large.
Do not create unique radius values unless they match tokens.json.

TYPOGRAPHY:
Use typography.fontFamily with getFontFamily().
Base sizes on typography.bodyScale or typography.headingScale.

------------------------------------------------------------
5. Components First, Then Raw Primitives
------------------------------------------------------------

Whenever possible, use:

Button
Card
StatCard
WorkoutListItem

These components handle color, spacing, radius, and typography consistently.

Example (correct):

<Button title="Start Workout" variant="primary" onPress={handlePress} />

Avoid redefining buttons or cards manually.

Example (avoid):

<TouchableOpacity style={{ backgroundColor: colors.primary }}>
  <Text>Start</Text>
</TouchableOpacity>

Raw React Native primitives (View, ScrollView, TouchableOpacity) should only be used for layout structure, not visual styling patterns already provided by components.

------------------------------------------------------------
6. Layout Patterns (Follow Example Screens)
------------------------------------------------------------

Follow patterns from design-system/screens/LoginScreen.tsx:

SafeAreaView on top-level screens
ScrollView for long content
Card sections grouped together
StatCard rows for metrics
WorkoutListItem for lists of workouts

Example structure:

<View style={{ flexDirection: "row", gap: spacing.sm }}>
  <StatCard label="Workouts" value="4 / week" />
  <StatCard label="Streak" value="5 days" />
</View>

Spacing must use tokens.

------------------------------------------------------------
7. Image Rules
------------------------------------------------------------

Use theme assets:

import bgImage from "../../assets/images/fitness-login-bg.jpg";

This ensures login and hero screens follow the Fitness Kit style.

Do not introduce custom local images unless specifically required.

------------------------------------------------------------
8. Final Checklist for Every Screen
------------------------------------------------------------

Before finalizing any UI:

[1] Are you reusing design-system components?
[2] Are colors, spacing, radius from fitnessTheme?
[3] Are fonts resolved using getFontFamily()?
[4] Does the layout follow kit patterns?
[5] Are you avoiding hardcoded hex values?
[6] Are imports using correct relative paths?

If all answers are YES, the screen is valid.

------------------------------------------------------------
9. Final Reminder
------------------------------------------------------------

The Fitness UI Kit is the single design source. All generated UI must stay consistent with its tokens, components, structures, and patterns.
