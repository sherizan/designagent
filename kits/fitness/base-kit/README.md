# DesignAgent · Fitness UI Kit (Wellness Peach)

Complete React Native UI kit for fitness / wellness apps with a themed design system, reusable components, loading states, and Cursor AI integration.

This kit is designed to be dropped into a brand-new Expo React Native project and controlled via Cursor using the latest `.cursor/rules` setup.

---

## 1. Install dependencies (Expo)

From your Expo app folder:

```bash
expo install @expo-google-fonts/inter @expo-google-fonts/outfit @expo-google-fonts/dm-sans @expo-google-fonts/urbanist expo-font
```

If you are not using Expo, you can still use this kit, but you'll need to install and link the equivalent Google Fonts manually.

---

## 2. Add the UI Kit files

Copy the following folders from this ZIP into the root of your React Native project:

* `design-system/`

* `assets/`

Your project should look like:

```text
my-app/
  App.tsx
  design-system/
  assets/
    images/
      fitness-login-bg.jpg
```

---

## 3. Wire up fonts

Wrap your app with the `FitnessFontsProvider` so all Google Fonts used by the kit are loaded before rendering UI.

In `App.tsx`:

```tsx
import React from "react";
import { FitnessFontsProvider } from "./design-system/FontsProvider";

export default function App() {
  return (
    <FitnessFontsProvider>
      {/* your navigation + screens here */}
    </FitnessFontsProvider>
  );
}
```

The UI kit components already use the theme's `typography.fontFamily` plus a helper to resolve the correct Expo font keys (e.g. `Inter_400Regular`, `Inter_600SemiBold`).

---

## 4. Add Cursor rules (latest Cursor)

This kit is optimized for the modern Cursor rules layout.

1. Ensure your project has a `.cursor/rules` folder:

```bash
mkdir -p .cursor/rules
```

2. Move the rules file from the kit into your project:

```bash
mv cursor-rules/designagent-fitness.md .cursor/rules/designagent-fitness.md
```

Cursor will automatically load this file when generating UI.

---

## 5. How to use with Cursor

Once:

* `design-system/` and `assets/` are in your app

* `FitnessFontsProvider` wraps your app

* `.cursor/rules/designagent-fitness.md` is in place

You can:

1. Open your project in Cursor.

2. Use the **Full-App Fitness prompt** from the DesignAgent Fitness kit page to scaffold core screens.

3. Use the **screen-level prompts** (login, dashboard, workout detail, profile, etc.) to add more flows.

The rules file tells Cursor to:

* Reuse components from `design-system/components/*`

* Use tokens from `design-system/tokens.json`

* Keep layout, spacing, colors, and typography consistent with the kit

* Use the fitness login background from `assets/images/fitness-login-bg.jpg` where appropriate

---

## 6. What's included

* `design-system/tokens.json` – core design tokens (colors, spacing, radius, typography)

* `design-system/theme.ts` – TypeScript wrapper for the Fitness theme

* `design-system/components/`:

  * `Button` – primary / secondary / ghost

  * `Card` – generic container

  * `StatCard` – metrics / KPIs

  * `WorkoutListItem` – list rows for workouts

  * `LoadingShimmer` – skeleton loading primitive

* `design-system/FontsProvider.tsx` – Expo Google Fonts loader

* `assets/images/fitness-login-bg.jpg` – hero background for login / landing

* `cursor-rules/designagent-fitness.md` – Cursor rules for this kit

You can extend the kit by adding new components and screens under `design-system/` and updating the Cursor rules accordingly.

---

## 7. Customizing the theme

You can tweak the Fitness theme by editing `design-system/tokens.json`:

* Change `colors.primary` to adjust the accent color.

* Adjust `radius.*` for more/less rounded UI.

* Adjust `spacing.*` to tighten or loosen layouts.

* Change `typography.fontFamily` to another Google Font family name (the components will automatically resolve to the correct Expo font key if you add that family to `FitnessFontsProvider`).
