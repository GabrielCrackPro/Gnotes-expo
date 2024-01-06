import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
  MD3Theme,
} from "react-native-paper";
import { darkThemeColors, lightThemeColors } from "./colors";

const lightTheme: MD3Theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: lightThemeColors,
};

const darkTheme: MD3Theme = {
  ...DarkTheme,
  roundness: 4,
  colors: darkThemeColors,
  mode: "adaptive",
};

export { lightTheme, darkTheme };
