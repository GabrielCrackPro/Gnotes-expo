import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";
import { darkThemeColors, lightThemeColors } from "./colors";

const lightTheme = {
  ...DefaultTheme,
  roundness: 4,
  colors: lightThemeColors,
};

const darkTheme = {
  ...DarkTheme,
  roundness: 4,
  colors: darkThemeColors,
};

export { lightTheme, darkTheme };
