import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Book, Note } from "../models/Note";
import { createBook, getBookFromId } from "../utils/books";
import { createNote } from "../utils/notes";
import {
  generateUuid,
  getMissingFieldsString,
  validateFormFields,
} from "../utils/common";
import {
  useTheme,
  Button,
  IconButton,
  Text,
  Snackbar,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import { useNavigation } from "../hooks/useNavigation";
import * as Haptics from "expo-haptics";
import MarkdownEditor from "./MarkdownEditor/MarkdownEditor";
import i18nConfig from "../locales/i18n-config";

type BottomSheetStyle = StyleProp<
  Animated.AnimateStyle<
    Omit<
      ViewStyle,
      | "left"
      | "right"
      | "top"
      | "bottom"
      | "opacity"
      | "flexDirection"
      | "position"
      | "transform"
    >
  >
>;

interface BottomSheetProps {
  content: "note" | "book";
  visible: boolean;
  id: string;
}

interface BottomSheetStyles {
  main: BottomSheetStyle;
  background: BottomSheetStyle;
  container: StyleProp<ViewStyle>;
}

const BottomSheetComponent: React.FC<BottomSheetProps> = ({
  visible,
  content,
  id,
}) => {
  const bookColors = ["#EF9A9A", "#64B5F6", "#81C784", "#FFD54F"];

  const { colors } = useTheme();
  const navigation = useNavigation();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["100%", "200%"], []);

  const [bookTitle, setBookTitle] = useState("");
  const [bookColor, setBookColor] = useState("");
  const [bookLocked, setBookLocked] = useState(false);

  const [book, setBook] = useState<Book>();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const [insertMarkdown, setInsertMarkdown] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [errors, setErrors] = useState("");

  const defaultInputStyles: StyleProp<TextStyle> = {
    backgroundColor: colors.surfaceVariant,
  };

  useEffect(() => {
    const getBook = async () => {
      const book = await getBookFromId(id);
      setBook(book);
    };
    getBook();
  }, [id]);

  const cleatFields = () => {
    setBookTitle("");
    setBookColor("");
    setBookLocked(false);
    setInsertMarkdown(false);
  };

  const addBook = async () => {
    const book: Book = {
      createdAt: new Date().toLocaleString(),
      id: generateUuid(),
      title: bookTitle,
      color: bookColor,
      locked: bookLocked,
    };
    if (validateFormFields("book", book)) {
      await createBook(book).then(() => {
        cleatFields();
        navigation.toggleDrawer();
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      });
    } else {
      setSnackbarVisible(true);
      setErrors(getMissingFieldsString("book", book));
      Haptics.placeholder(Haptics.NotificationFeedbackType.Error);
    }
  };

  const addNote = async () => {
    const note: Note = {
      createdAt: new Date().toLocaleString(),
      id: generateUuid(),
      bookId: id,
      title: noteTitle,
      body: noteBody,
    };

    if (validateFormFields("note", note)) {
      await createNote(note).then(() => {
        navigation.goToNotes(note.bookId);
      });
    } else {
      setSnackbarVisible(true);
      setErrors(getMissingFieldsString("note", note));
    }
  };

  const dissmissSheet = (screen: "Home" | "Notes", bookId?: string) => {
    cleatFields();
    bottomSheetRef.current?.close();
    navigation.dissmissBottomSheet(screen, bookId);
  };

  const bottomSheetStyle: BottomSheetStyles = {
    main: {
      zIndex: 30,
    },
    container: {
      backgroundColor: colors.background,
    },
    background: {
      backgroundColor: colors.surface,
    },
  };

  return (
    visible && (
      <View style={styles.container}>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          style={bottomSheetStyle.main}
          containerStyle={bottomSheetStyle.container}
          backgroundStyle={bottomSheetStyle.background}
          handleIndicatorStyle={{ backgroundColor: colors.primary }}
          keyboardBehavior="extend"
        >
          <BottomSheetScrollView
            style={[styles.contentContainer, { backgroundColor: colors.card }]}
          >
            {content === "book" && (
              <>
                <View style={styles.buttonsRow}>
                  <Button
                    style={{ marginRight: 10 }}
                    mode="text"
                    onPress={() => dissmissSheet("Home")}
                  >
                    {i18nConfig.translate("sheet.cancel")}
                  </Button>
                  <Button mode="contained" onPress={addBook}>
                    {i18nConfig.translate("sheet.addBook")}
                  </Button>
                </View>
                <View style={styles.row}>
                  <BottomSheetTextInput
                    style={[
                      defaultInputStyles,
                      styles.input,
                      { color: colors.text },
                    ]}
                    placeholder={i18nConfig.translate("sheet.name")}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(text: string) => setBookTitle(text)}
                  />
                  <IconButton
                    icon={bookLocked ? "lock" : "lock-open-variant"}
                    iconColor={colors.primary}
                    size={18}
                    animated
                    onPress={() => setBookLocked((prev) => !prev)}
                  />
                </View>
                <View style={styles.row}>
                  {bookColors.map((color, index) => (
                    <IconButton
                      key={index}
                      icon={bookColor === color ? "check" : "tag"}
                      animated
                      size={bookColor === color ? 18 : 15}
                      mode="contained-tonal"
                      iconColor={color}
                      onPress={() => setBookColor(color)}
                    />
                  ))}
                </View>
              </>
            )}
            {content === "note" && (
              <>
                <View style={styles.buttonsRow}>
                  <Button
                    mode="text"
                    style={{ marginRight: 10 }}
                    onPress={() => dissmissSheet("Notes", book?.id)}
                  >
                    {i18nConfig.translate("sheet.cancel")}
                  </Button>
                  <Button mode="contained" onPress={addNote}>
                    {i18nConfig.translate("sheet.addNote")}
                  </Button>
                </View>

                <BottomSheetTextInput
                  style={[
                    defaultInputStyles,
                    styles.input,
                    { color: colors.text },
                  ]}
                  placeholder={i18nConfig.translate("sheet.name")}
                  placeholderTextColor={colors.placeholder}
                  editable={false}
                  value={book?.title}
                />
                <View style={styles.row}>
                  <BottomSheetTextInput
                    style={[
                      defaultInputStyles,
                      styles.input,
                      {
                        color: colors.text,
                      },
                    ]}
                    placeholder={i18nConfig.translate("sheet.name")}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(text: string) => setNoteTitle(text)}
                  />
                  <IconButton
                    icon={insertMarkdown ? "language-markdown" : "format-text"}
                    iconColor={colors.primary}
                    onPress={() => setInsertMarkdown((prev) => !prev)}
                    animated
                  />
                </View>
                {insertMarkdown ? (
                  <MarkdownEditor
                    onMarkdownChange={(text: string) => setNoteBody(text)}
                    editorStyles={styles.textArea}
                  />
                ) : (
                  <BottomSheetTextInput
                    style={[
                      defaultInputStyles,
                      styles.textArea,
                      { color: colors.text },
                    ]}
                    placeholder={i18nConfig.translate("sheet.body")}
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(text: string) => setNoteBody(text)}
                    multiline
                  />
                )}
              </>
            )}
          </BottomSheetScrollView>
        </BottomSheet>
        <Snackbar
          visible={snackbarVisible}
          style={{
            backgroundColor: colors.errorContainer,
            position: "absolute",
            bottom: 0,
            marginHorizontal: 25,
            marginVertical: 25,
          }}
          duration={1200}
          elevation={1}
          onDismiss={() => setSnackbarVisible(false)}
        >
          <Text style={{ color: colors.error }}>{errors}</Text>
        </Snackbar>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 20,
    marginTop: 23,
  },
  input: {
    width: 330,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
    flexWrap: "wrap",
  },
  textArea: {
    width: 330,
    height: 160,
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
});

export default BottomSheetComponent;
