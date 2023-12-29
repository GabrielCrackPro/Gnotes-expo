import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";

const lightThemeColors = {
  ...DefaultTheme.colors,
  text: "#000000",
  primary: "#FF5722",
  primaryContainer: "#7FAF73",
  secondary: "#03DAC6",
  secondaryContainer: "#333333",
  tertiary: "#800080",
  tertiaryContainer: "#FFA500",
  surface: "#F5F5F5",
  surfaceVariant: "#FEFEFE",
  surfaceDisabled: "#808080",
  background: "#FFFFFF",
  error: "#A52A2A",
  errorContainer: "#808080",
  onPrimary: "#FFFFFF",
  onPrimaryContainer: "#FFFFFF",
  onSecondary: "#000000",
  onSecondaryContainer: "#333333",
  onTertiary: "#FFFFFF",
  onTertiaryContainer: "#000080",
  onSurface: "#333333",
  onSurfaceVariant: "#FFD700",
  onSurfaceDisabled: "#808080",
  onError: "#FFFFFF",
  onErrorContainer: "#FF7F50",
  onBackground: "#333333",
  outline: "#CD853F",
  outlineVariant: "#708090",
  inverseSurface: "#7FFFD4",
  inverseOnSurface: "#BDB76B",
  inversePrimary: "#DA70D6",
  shadow: "#E6E6FA",
  scrim: "#D8BFD8",
  backdrop: "#808080",
};

const darkThemeColors = {
  ...DarkTheme.colors,
  primary: "#FF5722",
  text: "#ffffff",
  primaryContainer: "#7FAF73",
  secondary: "#03DAC6",
  secondaryContainer: "#333333",
  tertiary: "#800080",
  tertiaryContainer: "#FFA500",
  surface: "#121212",
  surfaceVariant: "#1E1E1E",
  surfaceDisabled: "#808080",
  background: "#121212",
  error: "#A52A2A",
  errorContainer: "#808080",
  onPrimary: "#FFFFFF",
  onPrimaryContainer: "#FFFFFF",
  onSecondary: "#FFFFFF",
  onSecondaryContainer: "#333333",
  onTertiary: "#FFFFFF",
  onTertiaryContainer: "#000080",
  onSurface: "#FFFFFF",
  onSurfaceVariant: "#FFD700",
  onSurfaceDisabled: "#808080",
  onError: "#FFFFFF",
  onErrorContainer: "#FF7F50",
  onBackground: "#FFFFFF",
  outline: "#CD853F",
  outlineVariant: "#708090",
  inverseSurface: "#7FFFD4",
  inverseOnSurface: "#BDB76B",
  inversePrimary: "#DA70D6",
  shadow: "#E6E6FA",
  scrim: "#D8BFD8",
  backdrop: "#090909",
  placeholder: "#CCCCCC",
};

export { lightThemeColors, darkThemeColors };