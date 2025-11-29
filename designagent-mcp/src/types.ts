export type DesignAgentFile = {
  path: string;
  content: string;
};

export type ScreenKitConfigFile = {
  outputPath: string; // where the file should be written in the target project
  sourcePath: string; // where to read the file from on disk (relative to this repo)
};

export type ScreenKitConfig = {
  id: string;
  name: string;
  description: string;
  framework: "react-native";
  tags: string[];
  files: ScreenKitConfigFile[];
};

export type ScreenKit = {
  id: string; // "login-simple"
  name: string; // "Login Simple"
  description: string;
  framework: "react-native";
  tags: string[];
  files: DesignAgentFile[];
};

export type ListScreenResult = {
  id: string;
  name: string;
  description: string;
  framework: "react-native";
  tags: string[];
};

export type ThemeKit = {
  id: string;
  name: string;
  description: string;
  files: DesignAgentFile[];
};

