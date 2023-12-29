import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { Note as INote } from "../models/Note";
import NoteItem from "./Note";
import EmptyList from "./EmptyList";

interface NotesListProps {
  notes: INote[];
}

const NotesList: React.FC<NotesListProps> = ({ notes }) => {
  return (
    <View style={styles.noteList}>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItem note={item} />}
        ListEmptyComponent={() => <EmptyList />}
      />
    </View>
  );
};

export default NotesList;

const styles = StyleSheet.create({
  noteList: {},
});
