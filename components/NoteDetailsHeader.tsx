import { StyleSheet, View } from "react-native";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";
import { useNavigation } from "../hooks/useNavigation";
import { containsMarkdown } from "../utils/common";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { shareNote } from "../utils/notes";
import { Note } from "../models/Note";

interface NoteDetailsHeaderProps {
  route: RouteProp<ParamListBase, string>;
  side: "left" | "right";
}

const NoteDetailsHeader: React.FC<NoteDetailsHeaderProps> = ({
  route,
  side,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleNoteDelete = () => {
    navigation.navigate("HomeNavigator", {
      screen: "Home",
      params: {
        openDialog: true,
        noteToDelete: route.params?.note,
      },
    });
  };

  const handleNoteShare = (note: Note) => shareNote(note);

  return (
    <View style={styles.noteDetailsHeader}>
      {side === "left" && (
        <>
          <IconButton
            icon="arrow-left-thin"
            iconColor={colors.primary}
            size={22}
            onPress={() => navigation.goBack()}
          />
          {route.params?.edit && (
            <IconButton
              iconColor={colors.primary}
              icon={
                containsMarkdown(route.params.note.body)
                  ? "language-markdown"
                  : "format-text"
              }
              size={18}
            />
          )}
        </>
      )}
      {side === "right" && (
        <>
          <IconButton
            icon="share-variant"
            iconColor={colors.primary}
            size={18}
            onPress={handleNoteShare}
          />

          <IconButton
            icon="delete"
            iconColor={colors.primary}
            size={18}
            onPress={handleNoteDelete}
          />
        </>
      )}
    </View>
  );
};

export default NoteDetailsHeader;

const styles = StyleSheet.create({
  noteDetailsHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
});
