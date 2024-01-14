import { MD3Colors } from "react-native-paper/lib/typescript/types";
import { useAppContext } from "../AppContext";
import { darkTheme, lightTheme } from "../constants/themes";

const useCustomTheme = () => {
  const { isDark } = useAppContext();

  const lightColors = lightTheme.colors;
  const darkColors = darkTheme.colors;

  const getColors = (): MD3Colors => {
    return isDark ? darkColors : lightColors;
  };

  const updateColor = (colorId: string, newColor: string) => {
    const colors = getColors();
    const colorsArray = Object.entries(colors);
    const colorIndex = colorsArray.findIndex(([key, _]) => key === colorId);

    if (colorIndex !== -1) {
      colorsArray[colorIndex][1] = newColor;
    } else {
      console.log("Color ID not found");
    }
  };

  return { getColors, updateColor };
};

export default useCustomTheme;
