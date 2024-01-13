import {
  CommonActions,
  DrawerActions,
  useNavigation as useRNNavigation,
} from "@react-navigation/native";
import { DrawerNavigation } from "../models/navigation";
import { Note } from "../models/Note";
import { SCREEN_NAMES } from "../constants/screens";

export const useNavigation = () => {
  const navigation = useRNNavigation<DrawerNavigation>();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const goHome = () => {
    navigation.navigate(SCREEN_NAMES.HOME_NAVIGATOR, {
      screen: SCREEN_NAMES.HOME,
      params: { add: false },
    });
  };

  const goToNotes = (bookId: string) => {
    navigation.navigate(SCREEN_NAMES.HOME_NAVIGATOR, {
      screen: SCREEN_NAMES.NOTES,
      params: {
        bookId,
      },
    });
  };

  const goToNotesDetails = (note: Note) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: SCREEN_NAMES.NOTES_DETAILS,
        params: { note },
      }),
    );
  };

  const goToNotesDetailsEdit = (note: Note) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: SCREEN_NAMES.NOTES_DETAILS,
        params: { note, edit: true },
      }),
    );
  };

  const goToAddScreen = (screen: "Home" | "Notes", bookId?: string) => {
    if (screen === SCREEN_NAMES.NOTES) {
      navigation.navigate(SCREEN_NAMES.HOME_NAVIGATOR, {
        screen,
        params: {
          add: true,
          bookId,
        },
      });
    } else {
      navigation.navigate(SCREEN_NAMES.HOME_NAVIGATOR, {
        screen,
        params: {
          add: true,
        },
      });
    }
  };

  const goToStackScreen = (name: SCREEN_NAMES) => {
    navigation.dispatch(CommonActions.navigate({ name }));
  };

  const goToSettings = () => {
    navigation.navigate(SCREEN_NAMES.HOME_NAVIGATOR, {
      screen: SCREEN_NAMES.SETTINGS,
    });
  };

  const dissmissBottomSheet = (
    screen: SCREEN_NAMES.HOME | SCREEN_NAMES.NOTES,
    bookId?: string,
  ) => {
    navigation.navigate(SCREEN_NAMES.HOME_NAVIGATOR, {
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
    goToNotesDetails,
    goToNotesDetailsEdit,
    goToStackScreen,
    goBack,
    dissmissBottomSheet,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};
