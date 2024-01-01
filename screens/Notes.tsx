import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Book, Note } from "../models/Note";
import { getNotesByBook } from "../utils/notes";
import { getBookFromId } from "../utils/books";
import AuthView from "../components/AuthView";
import NotesList from "../components/NotesList";
import BottomSheetComponent from "../components/BottomSheet";
import * as WebBrowser from "expo-web-browser";
import i18nConfig from "../locales/i18n-config";

interface RouteParams {
  bookId: string;
  add: boolean;
}

const Notes: React.FC = () => {
  const route = useRoute();
  const { bookId, add } = route.params as RouteParams;

  const [notes, setNotes] = useState<Note[]>([]);
  const [book, setBook] = useState<Book | undefined>();

  const getNotes = async () => {
    const [retrievedNotes, retrievedBook] = await Promise.all([
      getNotesByBook(bookId),
      getBookFromId(bookId),
    ]);
    setNotes(retrievedNotes);
    setBook(retrievedBook);
  };

  useEffect(() => {
    getNotes();
  }, [notes]);

  const handleLink = (link: string) => WebBrowser.openBrowserAsync(link);

  return (
    <View style={styles.notes}>
      <AuthView
        authEnabled={(book?.locked as boolean) || false}
        authMessage={`${book?.title} ${i18nConfig.translate(
          "auth.bookLocked",
        )}`}
      >
        {!add && <NotesList notes={notes} onLinkPress={handleLink} />}
      </AuthView>
      <BottomSheetComponent visible={add} content="note" id={bookId} />
    </View>
  );
};

const styles = StyleSheet.create({
  notes: {
    flex: 1,
  },
});

export default Notes;
