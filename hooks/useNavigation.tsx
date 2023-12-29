import {
  DrawerActions,
  useNavigation as useRNNavigation,
} from "@react-navigation/native";
import { DrawerNavigation } from "../models/navigation";

export const useNavigation = () => {
  const navigation = useRNNavigation<DrawerNavigation>();

  const goHome = () => {
    navigation.navigate("HomeNavigator", {
      screen: "Home",
      params: { add: false },
    });
  };

  const goToNotes = (bookId: string) => {
    navigation.navigate("HomeNavigator", {
      screen: "Notes",
      params: {
        bookId,
      },
    });
  };

  const goToAddScreen = (screen: "Home" | "Notes", bookId?: string) => {
    if (screen === "Notes") {
      navigation.navigate("HomeNavigator", {
        screen,
        params: {
          add: true,
          bookId,
        },
      });
    } else {
      navigation.navigate("HomeNavigator", {
        screen,
        params: {
          add: true,
        },
      });
    }
  };

  const goToSettings = () => {
    navigation.navigate("HomeNavigator", {
      screen: "Settings",
    });
  };

  const dissmissBottomSheet = (screen: "Home" | "Notes", bookId?: string) => {
    navigation.navigate("HomeNavigator", {
      screen,
      params: { add: false, bookId },
    });
  };

  const toggleDrawer = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const openDrawer = () => navigation.dispatch(DrawerActions.openDrawer());
  const closeDrawer = () => navigation.dispatch(DrawerActions.closeDrawer());

  return {
    ...navigation,
    goHome,
    goToNotes,
    goToSettings,
    goToAddScreen,
    dissmissBottomSheet,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};
