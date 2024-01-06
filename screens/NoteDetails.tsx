import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { Note } from "../models/Note";
import { MarkdownView } from "react-native-markdown-view";
import { containsMarkdown } from "../utils/common";
import { editNote } from "../utils/notes";
import useMarkdownTheme from "../hooks/useMarkdownTheme";
import * as Browser from "expo-web-browser";
import MarkdownEditor from "../components/MarkdownEditor/MarkdownEditor";
import { useNavigation } from "../hooks/useNavigation";
import i18nConfig from "../locales/i18n-config";

interface RouteParams {
  note: Note;
  toggleMarkdown?: boolean;
}

const NoteDetails: React.FC = () => {
  const route = useRoute();
  const { note, toggleMarkdown } = route.params as RouteParams;
  const { markdownStyles } = useMarkdownTheme();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [editMode, setEditMode] = useState(route.params?.edit);

  const [editNoteTitle, setEditNoteTitle] = useState(note.title);
  const [editNoteBody, setEditNoteBody] = useState(note.body);

  const defaultInputStyles: StyleProp<TextStyle> = {
    backgroundColor: colors.surfaceVariant,
    color: colors.text,
  };

  const openLink = (url: string) => {
    Browser.openBrowserAsync(url);
  };

  const handleEditNote = async () => {
    const updatedNote: Note = {
      ...note,
      title: editNoteTitle,
      body: editNoteBody,
    };
    await editNote(updatedNote);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.noteDetails}>
      {!editMode && (
        <>
          <Text>{note.title}</Text>
          {containsMarkdown(note.body) ? (
            <MarkdownView styles={markdownStyles} onLinkPress={openLink}>
              {note.body}
            </MarkdownView>
          ) : (
            <Text>{note.body}</Text>
          )}
          <Text variant="bodySmall" style={{ color: colors.outlineVariant }}>
            {note.createdAt}
          </Text>
        </>
      )}
      {editMode && (
        <>
          <TextInput
            value={editNoteTitle}
            onChangeText={(text: string) => setEditNoteTitle(text)}
            style={[defaultInputStyles, styles.textInput]}
          />
          {containsMarkdown(note.body) || toggleMarkdown ? (
            <MarkdownEditor
              defaultValue={editNoteBody}
              onMarkdownChange={(text: string) => setEditNoteBody(text)}
              editorStyles={[defaultInputStyles, styles.textArea]}
              showEditorPreview
            />
          ) : (
            <TextInput
              value={editNoteBody}
              onChangeText={(text: string) => setEditNoteBody(text)}
              style={[defaultInputStyles, styles.textArea]}
            />
          )}
          <View style={styles.row}>
            <Button mode="text" onPress={() => navigation.goBack()}>
              {i18nConfig.translate("buttons.cancel")}
            </Button>
            <Button mode="contained" onPress={handleEditNote}>
              {i18nConfig.translate("buttons.accept")}
            </Button>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default NoteDetails;

const styles = StyleSheet.create({
  noteDetails: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginTop: 60,
  },
  textArea: {
    width: 360,
    height: 160,
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
  },
  textInput: {
    width: 360,
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
  },
});
