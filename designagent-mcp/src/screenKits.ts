import { promises as fs } from "fs";
import path from "path";
import type {
  ScreenKitConfig,
  ListScreenResult,
  ScreenKit,
  DesignAgentFile,
} from "./types.js";

// Path resolution helpers
const PROJECT_ROOT = path.resolve(process.cwd());
const PREVIEW_RN_ROOT =
  process.env.DESIGNAGENT_PREVIEW_ROOT ??
  "/Users/sherizan/Public/designagent/preview-rn";

export const screenKitConfigs: ScreenKitConfig[] = [
  {
    id: "login-simple",
    name: "Login Simple",
    description:
      "Password-based login screen using DesignAgent Button and InputField components with theme-aware styling.",
    framework: "react-native",
    tags: ["auth", "login", "rn", "designagent"],
    files: [
      {
        outputPath: "src/design-system/screens/login-simple.tsx",
        sourcePath: "src/screens/auth/LoginSimpleScreen.tsx",
      },
    ],
  },
  {
    id: "login-minimal",
    name: "Login Minimal",
    description:
      "Minimal login screen with clean, simple design using DesignAgent components.",
    framework: "react-native",
    tags: ["auth", "login", "rn", "designagent", "minimal"],
    files: [
      {
        outputPath: "src/design-system/screens/login-minimal.tsx",
        sourcePath: "src/screens/auth/LoginMinimalScreen.tsx",
      },
      {
        outputPath: "src/design-system/components/primitives/TextInput.tsx",
        sourcePath: "src/design-system/components/primitives/TextInput.tsx",
      },
    ],
  },
  {
    id: "login-hero",
    name: "Login Hero",
    description:
      "Hero-style login screen with prominent branding and social login options using DesignAgent patterns.",
    framework: "react-native",
    tags: ["auth", "login", "rn", "designagent", "hero", "social"],
    files: [
      {
        outputPath: "src/design-system/screens/login-hero.tsx",
        sourcePath: "src/screens/auth/LoginHeroScreen.tsx",
      },
    ],
  },
];

export function listScreens(): ListScreenResult[] {
  return screenKitConfigs.map((kit) => ({
    id: kit.id,
    name: kit.name,
    description: kit.description,
    framework: kit.framework,
    tags: kit.tags,
  }));
}

export async function loadScreenKit(
  id: string
): Promise<ScreenKit | undefined> {
  const config = screenKitConfigs.find((kit) => kit.id === id);
  if (!config) return undefined;

  const files: DesignAgentFile[] = [];

  for (const fileConfig of config.files) {
    const absSourcePath = path.resolve(PREVIEW_RN_ROOT, fileConfig.sourcePath);
    const content = await fs.readFile(absSourcePath, "utf8");
    files.push({
      path: fileConfig.outputPath,
      content,
    });
  }

  return {
    id: config.id,
    name: config.name,
    description: config.description,
    framework: config.framework,
    tags: config.tags,
    files,
  };
}
