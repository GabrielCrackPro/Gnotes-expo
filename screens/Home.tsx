import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useTheme, Text, Icon } from "react-native-paper";
import BottomSheetComponent from "../components/BottomSheet";
import { Book, Note } from "../models/Note";
import DeleteDialog from "../components/DeleteDialog";
import { useNavigation } from "../hooks/useNavigation";

interface RouteParams {
  add: boolean;
  openDialog?: boolean;
  bookToDelete?: Book;
  noteToDelete?: Note;
}

const Home: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const route = useRoute();
  const add = (route.params as RouteParams)?.add;
  const openDialog = (route.params as RouteParams).openDialog;
  const bookToDelete = (route.params as RouteParams).bookToDelete;
  const noteToDelete = (route.params as RouteParams).noteToDelete;

  const [dialogVisible, setDialogVisible] = useState(false);

  useEffect(() => {
    // prevent going back on home screen
    navigation.addListener("beforeRemove", (event) => {
      event.preventDefault();
      return;
    });
  }, []);

  useEffect(() => {
    if (openDialog && (bookToDelete || noteToDelete)) {
      setDialogVisible(true);
    }
  }, [openDialog, bookToDelete, noteToDelete]);

  return (
    <View style={{ flex: 1 }}>
      {!add ? (
        <View style={styles.home}>
          <Icon source="book" size={140} color={colors.primary} />
          <View style={styles.container}>
            <Text
              variant="bodyLarge"
              style={{
                color: colors.primary,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Select a book from the sidebar to view notes
            </Text>
            <Text
              variant="bodyMedium"
              style={{ color: colors.text, textAlign: "center" }}
            >
              Or create a new one by pressing the + symbol
            </Text>
          </View>
          <DeleteDialog
            visible={dialogVisible}
            item={
              bookToDelete
                ? bookToDelete
                : noteToDelete
                  ? noteToDelete
                  : undefined
            }
            type={bookToDelete ? "book" : "note"}
            onDismiss={() => {
              if (bookToDelete) {
                setDialogVisible(false);
              } else {
                setDialogVisible(false);
                navigation.goToNotes(noteToDelete?.bookId as string);
              }
            }}
          />
        </View>
      ) : null}

      <BottomSheetComponent visible={add} content="book" id="0" />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  container: {
    marginBottom: 150,
    marginHorizontal: 20,
  },
});
