import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";

const lightTheme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#6200EE",
    accent: "#03DAC6",
    background: "#FFFFFF",
    surface: "#FFFFFF",
    text: "#000000",
    placeholder: "#BDBDBD",
    onSurface: "#EEEEEE",
  },
};

const darkTheme = {
  ...DarkTheme,
  roundness: 4,
  colors: {
    ...DarkTheme.colors,
    primary: "#6200EE",
    accent: "#03DAC6",
    background: "#121212",
    surface: "#121212",
    surfaceDisabled: "#191919",
    text: "#FFFFFF",
    placeholder: "#8A8A8A",
    onSurface: "#404040",
  },
};

export { lightTheme, darkTheme };
