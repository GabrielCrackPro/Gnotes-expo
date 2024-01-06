import {
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Note } from "../models/Note";
import { useTheme, IconButton, Text, Icon } from "react-native-paper";
import { useState } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { MarkdownView } from "react-native-markdown-view";
import useMarkdownTheme from "../hooks/useMarkdownTheme";
import { shareNote } from "../utils/notes";
import { containsMarkdown, truncateText } from "../utils/common";

interface NoteProps {
  note: Note;
  onLinkPress: (link: string) => void;
}

const NoteItem: React.FC<NoteProps> = ({ note, onLinkPress }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { markdownStyles } = useMarkdownTheme();

  const [markdown, _] = useState(containsMarkdown(note.body));

  const defaultNoteItemStyles: StyleProp<ViewStyle> = {
    backgroundColor: colors.surfaceVariant,
    borderColor: colors.background,
  };
  const defaultNoteBodyStyles: StyleProp<TextStyle> = {
    color: colors.text,
    flexWrap: "wrap",
    padding: 5,
  };

  const expandNote = () => {
    navigation.goToNotesDetails(note);
  };

  const handleEditNote = (note: Note) => navigation.goToNotesDetailsEdit(note);
  const handleShareNote = (note: Note) => shareNote(note);

  return (
    <>
      <Pressable
        onPress={expandNote}
        style={[defaultNoteItemStyles, styles.noteItem]}
      >
        <View>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <Text variant="headlineSmall" style={{ color: colors.text }}>
              {note.title}
            </Text>
            <Icon
              source={markdown ? "language-markdown" : "format-text"}
              color={colors.primary}
              size={22}
            />
          </View>
          {markdown ? (
            <View>
              <ScrollView removeClippedSubviews>
                <MarkdownView onLinkPress={onLinkPress} styles={markdownStyles}>
                  {note.body}
                </MarkdownView>
              </ScrollView>
            </View>
          ) : (
            <Text selectable variant="bodyMedium" style={defaultNoteBodyStyles}>
              {truncateText(note.body)}
            </Text>
          )}

          <Text variant="bodySmall" style={defaultNoteBodyStyles}>
            {note.createdAt}
          </Text>
        </View>
        <View style={styles.row}>
          <IconButton
            icon="pencil"
            size={20}
            iconColor={colors.primary}
            onPress={() => handleEditNote(note)}
          />
          <IconButton
            icon="share-variant"
            size={20}
            iconColor={colors.primary}
            onPress={() => handleShareNote(note)}
          />
        </View>
      </Pressable>
    </>
  );
};

export default NoteItem;

const styles = StyleSheet.create({
  noteItem: {
    marginVertical: 10,
    marginHorizontal: 15,
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
  },
  title: {
    fontSize: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
