import {
  Dimensions,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { IconButton, Searchbar, Text, useTheme } from "react-native-paper";
import ThemeSwitcher from "./ThemeSwitcher";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawerActions,
  ParamListBase,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { getBookFromId } from "../utils/books";
import { DrawerNavigation } from "../models/navigation";

interface NavigationHeaderProps {
  route: RouteProp<ParamListBase, string>;
}

interface RouteParams {
  bookId: string;
  add: boolean;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ route }) => {
  const { colors } = useTheme();
  const navigation = useNavigation<DrawerNavigation>();

  const [bookName, setBookName] = useState("");
  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getBook = async () => {
      const book = await getBookFromId((route.params as RouteParams)?.bookId);
      setBookName(book.title);
    };
    if (route.name === "Notes") {
      getBook();
    }
  }, [route]);

  const headerDefaultStyles: StyleProp<ViewStyle> = {
    backgroundColor: colors.background,
    borderBottomColor: colors.primary,
    justifyContent: searchMode ? "flex-start" : "space-between",
  };

  const headerTitleDefaultStyles: StyleProp<TextStyle> = {
    fontWeight: "bold",
    color: colors.primary,
  };

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const addNote = (route: RouteProp<ParamListBase, string>) => {
    navigation.navigate("HomeNavigator", {
      screen: "Notes",
      params: {
        add: true,
        bookId: (route.params as RouteParams).bookId,
      },
    });
  };

  return (
    <SafeAreaView
      mode={Platform.OS === "ios" ? "margin" : "padding"}
      style={[headerDefaultStyles, styles.header]}
    >
      <IconButton
        icon="menu"
        iconColor={colors.primary}
        size={18}
        animated
        onPress={toggleDrawer}
      />
      <Text variant="titleMedium" style={[headerTitleDefaultStyles]}>
        {route.name === "Notes" ? bookName : route.name}
      </Text>
      {route.name === "Notes" && (
        <View style={styles.row}>
          <IconButton
            icon="plus"
            size={18}
            iconColor={colors.primary}
            onPress={() => addNote(route)}
          />
          <ThemeSwitcher />
        </View>
      )}
      {route.name !== "Notes" && <ThemeSwitcher />}
    </SafeAreaView>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    elevation: 8,
  },
  title: {
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
