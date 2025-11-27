/**
 * FitnessFontsProvider
 * 
 * Loads all required Google Fonts for the Fitness UI Kit.
 * 
 * Usage in App.tsx:
 * 
 * ```tsx
 * import { FitnessFontsProvider } from "./design-system/FontsProvider";
 * 
 * export default function App() {
 *   return (
 *     <FitnessFontsProvider>
 *       {/* your navigation + screens here *\/}
 *     </FitnessFontsProvider>
 *   );
 * }
 * ```
 */

import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useFonts as useInter, Inter_400Regular, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { useFonts as useOutfit, Outfit_400Regular, Outfit_600SemiBold } from "@expo-google-fonts/outfit";
import { useFonts as useDMSans, DMSans_400Regular, DMSans_600SemiBold } from "@expo-google-fonts/dm-sans";
import { useFonts as useUrbanist, Urbanist_400Regular, Urbanist_600SemiBold } from "@expo-google-fonts/urbanist";

type FontsProviderProps = {
  children: React.ReactNode;
};

export function FitnessFontsProvider({ children }: FontsProviderProps) {
  const [interLoaded] = useInter({ Inter_400Regular, Inter_600SemiBold });
  const [outfitLoaded] = useOutfit({ Outfit_400Regular, Outfit_600SemiBold });
  const [dmSansLoaded] = useDMSans({ DMSans_400Regular, DMSans_600SemiBold });
  const [urbanistLoaded] = useUrbanist({ Urbanist_400Regular, Urbanist_600SemiBold });

  const loaded = interLoaded && outfitLoaded && dmSansLoaded && urbanistLoaded;

  if (!loaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#020617" }}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return <>{children}</>;
}

