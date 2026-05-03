import { MD3DarkTheme } from "react-native-paper";

// Dark theme shared by Paper and Navigation
export const appTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: "#121212",
    surface: "#1E1E1E",
    primary: "#00C853",
    secondary: "#00C853",
    onPrimary: "#000000",
    onSurface: "#FFFFFF",
    outline: "#2E2E2E",
  },
};
