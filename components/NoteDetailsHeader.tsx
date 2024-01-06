import { StyleSheet, View } from "react-native";
import React from "react";
import { Icon, IconButton, useTheme } from "react-native-paper";
import { useNavigation } from "../hooks/useNavigation";
import { containsMarkdown } from "../utils/common";

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

  const handleNoteEdit = () => {
    navigation.goToNotesDetailsEdit(route.params.note);
  };

  const toggleMarkdown = () => {
    navigation.goToNotesDetailsEdit(
      route.params.note,
      !containsMarkdown(route.params.note.body),
    );
    console.log(route.params);
  };

  const handleNoteDelete = () => {
    navigation.navigate("HomeNavigator", {
      screen: "Home",
      params: {
        openDialog: true,
        noteToDelete: route.params.note,
      },
    });
  };

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
          {route.params.edit && (
            <IconButton
              iconColor={colors.primary}
              icon={
                containsMarkdown(route.params.note.body)
                  ? "language-markdown"
                  : "format-text"
              }
              size={18}
              onPress={toggleMarkdown}
            />
          )}
        </>
      )}
      {side === "right" && (
        <>
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
