import { useEffect, useState } from "react";
import { getValue, setValue } from "../utils/storage";

export const useAppLocked = () => {
  const [isAppLocked, setIsAppLocked] = useState(false);

  const toggleAppLocked = () => {
    const newAppLocked = !isAppLocked;
    setIsAppLocked(newAppLocked);
    setValue("appLocked", JSON.stringify(newAppLocked));
  };

  useEffect(() => {
    const loadAppLocked = async () => {
      try {
        const appLockedString = (await getValue("appLocked")) || "";
        const appLocked = JSON.parse(appLockedString);
        setIsAppLocked(appLocked);
      } catch (error) {
        console.error("Error loading app lock", error);
      }
    };
    loadAppLocked();
  }, []);

  return { isAppLocked, toggleAppLocked };
};
