import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TextStyle,
  StyleProp,
  ViewStyle,
} from "react-native";
import BottomSheet, { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { Book, Note } from "../models/Note";
import { createBook, getBookFromId } from "../utils/books";
import { DrawerNavigation } from "../models/navigation";
import { createNote } from "../utils/notes";
import {
  generateUuid,
  getMissingFields,
  getMissingFieldsString,
  validateFormFields,
} from "../utils/common";
import {
  useTheme,
  Button,
  Chip,
  IconButton,
  Checkbox,
  Text,
  Snackbar,
} from "react-native-paper";
import Animated from "react-native-reanimated";
import RichEditor from "./RichEditor";
import { RichEditor as RNRichEditor } from "react-native-pell-rich-editor";

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

  const editorRef = useRef<RNRichEditor>(null);

  const { colors } = useTheme();
  const navigation = useNavigation<DrawerNavigation>();

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["70%", "100%"], []);

  const [bookTitle, setBookTitle] = useState("");
  const [bookColor, setBookColor] = useState("");
  const [bookLocked, setBookLocked] = useState(false);

  const [book, setBook] = useState<Book>();

  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");

  const [insertHtml, setInsertHtml] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [errors, setErrors] = useState("");

  const defaultInputStyles: StyleProp<TextStyle> = {
    backgroundColor: colors.background,
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
        navigation.navigate("Home", { add: false });
        navigation.toggleDrawer();
      });
    } else {
      setSnackbarVisible(true);
      setErrors(getMissingFieldsString("book", book));
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
        navigation.navigate("Notes", { bookId: note.bookId });
      });
    } else {
      setSnackbarVisible(true);
      setErrors(getMissingFieldsString("note", note));
    }
  };

  const dissmissSheet = (screen: "Home" | "Notes", params: any) => {
    cleatFields();
    bottomSheetRef.current?.close();
    navigation.navigate("HomeNavigator", {
      screen: screen,
      params: params,
    });
  };

  const bottomSheetStyle: BottomSheetStyles = {
    main: {
      flex: 1,
    },
    container: {
      flex: 1,
    },
    background: {
      backgroundColor: colors.onSurface,
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
          keyboardBehavior="interactive"
        >
          <View
            style={[styles.contentContainer, { backgroundColor: colors.card }]}
          >
            {content === "book" && (
              <>
                <View style={[styles.row]}>
                  <Button
                    style={{ marginRight: 10 }}
                    mode="contained-tonal"
                    onPress={() => dissmissSheet("Home", { add: false })}
                  >
                    Cancel
                  </Button>
                  <Button mode="contained" onPress={addBook}>
                    Add new book
                  </Button>
                </View>
                <View style={styles.row}>
                  <BottomSheetTextInput
                    style={[
                      defaultInputStyles,
                      styles.input,
                      { color: colors.text },
                    ]}
                    placeholder="Book name"
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
                <View style={styles.row}>
                  <Button
                    mode="contained-tonal"
                    style={{ marginRight: 10 }}
                    onPress={() =>
                      dissmissSheet("Notes", { add: false, bookId: book?.id })
                    }
                  >
                    Cancel
                  </Button>
                  <Button mode="contained" onPress={addNote}>
                    Add new note
                  </Button>
                </View>

                <BottomSheetTextInput
                  style={[
                    defaultInputStyles,
                    styles.input,
                    { color: colors.text },
                  ]}
                  placeholder="Book Name"
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
                    placeholder="Note name"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(text: string) => setNoteTitle(text)}
                  />
                  <IconButton
                    icon={insertHtml ? "language-html5" : "format-text"}
                    iconColor={colors.primary}
                    onPress={() => setInsertHtml((prev) => !prev)}
                    animated
                  />
                </View>
                {insertHtml ? (
                  <RichEditor
                    style={[defaultInputStyles]}
                    ref={editorRef}
                    placeholder="Note Body"
                    onChange={(text: string) => setNoteBody(text)}
                  />
                ) : (
                  <BottomSheetTextInput
                    style={[
                      defaultInputStyles,
                      styles.textArea,
                      { color: colors.text },
                    ]}
                    placeholder="Note body"
                    placeholderTextColor={colors.placeholder}
                    onChangeText={(text: string) => setNoteBody(text)}
                  />
                )}
              </>
            )}
          </View>
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
    justifyContent: "center",
    marginTop: 23,
  },
  input: {
    width: 330,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
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
    justifyContent: "space-evenly",
  },
});

export default BottomSheetComponent;
