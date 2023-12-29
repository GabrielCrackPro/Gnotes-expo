import { createContext, useContext } from "react";
interface AppContextType {
  isDark: boolean;
  isAppLocked: boolean;
  toggleAppLocked: () => void;
  toggleDark: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export default AppContext;
