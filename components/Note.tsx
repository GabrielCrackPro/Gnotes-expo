import {
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
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigation } from "../models/navigation";

interface NoteProps {
  note: Note;
}

const NoteItem: React.FC<NoteProps> = ({ note }) => {
  const navigation = useNavigation<DrawerNavigation>();
  const { colors } = useTheme();

  const [containsHtml, _] = useState(note.body.includes("<"));
  const [changeTextColor, setChangeTextColor] = useState("");

  const defaultNoteItemStyles: StyleProp<ViewStyle> = {
    backgroundColor: colors.onSurface,
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
              source={containsHtml ? "language-html5" : "format-text"}
              color={colors.primary}
              size={22}
            />
          </View>
          {containsHtml ? (
            <WebView
              source={{ html: note.body }}
              minimumFontSize={18}
              textZoom={200}
              scrollEnabled={false}
              injectedJavaScript={changeTextColor}
              style={{
                height: 50,
                backgroundColor: colors.onSurface,
              }}
            />
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
