import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Note as INote } from "../models/Note";
import NoteItem from "./Note";
import EmptyList from "./EmptyList";
import i18nConfig from "../locales/i18n-config";

interface NotesListProps {
  notes: INote[];
  onLinkPress: (link: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onLinkPress }) => {
  return (
    <View style={styles.noteList}>
      <FlatList
        inverted={notes.length > 0}
        showsVerticalScrollIndicator={false}
        data={notes}
        renderItem={({ item }) => (
          <NoteItem note={item} onLinkPress={onLinkPress} />
        )}
        ListEmptyComponent={() => (
          <EmptyList
            icon="note-multiple"
            title={i18nConfig.translate("emptyList.noNotes")}
            description={i18nConfig.translate("emptyList.subNoNotes")}
          />
        )}
      />
    </View>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  noteList: {},
});
