import {
  CommonActions,
  DrawerActions,
  useNavigation as useRNNavigation,
} from "@react-navigation/native";
import { DrawerNavigation } from "../models/navigation";
import { Note } from "../models/Note";

export const useNavigation = () => {
  const navigation = useRNNavigation<DrawerNavigation>();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

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

  const goToNotesDetails = (note: Note) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "NotesDetails",
        params: { note },
      }),
    );
  };

  const goToNotesDetailsEdit = (note: Note) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "NotesDetails",
        params: { note, edit: true },
      }),
    );
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

  const goToNotifications = () => {
    navigation.dispatch(
      CommonActions.navigate({
        name: "Notifications",
      }),
    );
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
    goToNotesDetails,
    goToNotesDetailsEdit,
    goToNotifications,
    goBack,
    dissmissBottomSheet,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};
