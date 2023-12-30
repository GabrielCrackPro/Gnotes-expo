import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Note } from "../models/Note";
import { useTheme, IconButton, Text, Icon } from "react-native-paper";
import WebView from "react-native-webview";
import { useState } from "react";
import { useNavigation } from "../hooks/useNavigation";
import { containsMarkdown } from "../utils/common";
import { MarkdownView } from "react-native-markdown-view";
import markdownStyles from "./MarkdownEditor/utils/styles";

interface NoteProps {
  note: Note;
  onLinkPress: (link: string) => void;
}

const NoteItem: React.FC<NoteProps> = ({ note, onLinkPress }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const [markdown, _] = useState(containsMarkdown(note.body));
  const [changeTextColor, setChangeTextColor] = useState("");

  const defaultNoteItemStyles: StyleProp<ViewStyle> = {
    backgroundColor: colors.surfaceVariant,
    borderColor: colors.background,
  };
  const defaultNoteBodyStyles: StyleProp<TextStyle> = {
    color: colors.text,
  };

  return (
    <>
      <View style={[defaultNoteItemStyles, styles.noteItem]}>
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
                <MarkdownView
                  onLinkPress={onLinkPress}
                  styles={{
                    ...markdownStyles,
                    link: { color: colors.primary },
                  }}
                >
                  {note.body}
                </MarkdownView>
              </ScrollView>
            </View>
          ) : (
            <Text variant="bodyMedium" style={defaultNoteBodyStyles}>
              {note.body}
            </Text>
          )}

          <Text variant="bodySmall" style={defaultNoteBodyStyles}>
            Created at:
            {note.createdAt}
          </Text>
        </View>
        <View style={styles.row}>
          <IconButton
            icon="pencil"
            size={20}
            iconColor={colors.primary}
            onPress={() => {}}
          />
          <IconButton
            icon="delete"
            size={20}
            iconColor={colors.primary}
            onPress={() => {
              navigation.navigate("HomeNavigator", {
                screen: "Home",
                params: {
                  openDialog: true,
                  noteToDelete: note,
                },
              });
            }}
          />
        </View>
      </View>
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
