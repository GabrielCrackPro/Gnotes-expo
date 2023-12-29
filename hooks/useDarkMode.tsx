import { useEffect, useState } from "react";
import { getValue, setValue } from "../utils/storage";

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleDark = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    setValue("isDark", JSON.stringify(newIsDark));
  };

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const isDarkString = await getValue("isDark" ?? "");
        const isDark = JSON.parse(isDarkString as string);
        setIsDark(isDark);
      } catch (error) {
        console.error("Error setting theme", error);
      }
    };
    loadTheme();
  }, []);

  return { isDark, toggleDark };
};
