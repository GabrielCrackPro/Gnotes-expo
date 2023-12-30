import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Note as INote } from "../models/Note";
import NoteItem from "./Note";
import EmptyList from "./EmptyList";

interface NotesListProps {
  notes: INote[];
  onLinkPress: (link: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onLinkPress }) => {
  return (
    <View style={styles.noteList}>
      <FlatList
        inverted
        data={notes}
        renderItem={({ item }) => (
          <NoteItem note={item} onLinkPress={onLinkPress} />
        )}
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  noteList: {},
});
