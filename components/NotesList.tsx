import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Note as INote, Note } from "../models/Note";
import NoteItem from "./Note";
import EmptyList from "./EmptyList";
import i18nConfig from "../locales/i18n-config";
import { Button } from "react-native-paper";
import NotesFilter from "./NotesFilter";
import { Filters } from "../models/Filter";
import { containsMarkdown } from "../utils/common";

interface NotesListProps {
  notes: INote[];
  onLinkPress: (link: string) => void;
}

const NotesList: React.FC<NotesListProps> = ({ notes, onLinkPress }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(notes);

  const toggleFilter = () => setFilterVisible((prev) => !prev);
  const clearFilter = () => setFilteredNotes(notes);

  useEffect(() => setFilteredNotes(notes), []);

  const handleFilterChange = (
    notes: Note[],
    filter: Filters,
    value?: string,
  ) => {
    let filtered;
    switch (filter) {
      case Filters.TITLE:
        filtered = notes.filter((notes) =>
          notes.title.includes(value as string),
        );
        setFilteredNotes(filtered);
        break;
      case Filters.BODY:
        filtered = notes.filter((notes) =>
          notes.body.includes(value as string),
        );
        setFilteredNotes(filtered);
        break;
      case Filters.SIMPLE_TEXT:
        filtered = notes.filter((notes) => !containsMarkdown(notes.body));
        setFilteredNotes(filtered);
        break;
      case Filters.MARKDOWN:
        filtered = notes.filter((notes) => containsMarkdown(notes.body));
        setFilteredNotes(filtered);
    }
  };

  return (
    <View style={styles.noteList}>
      {notes.length > 0 && (
        <View style={styles.row}>
          <Button
            icon={filterVisible ? "filter-off" : "filter"}
            style={{ width: 100, alignSelf: "flex-end" }}
            onPress={toggleFilter}
          >
            {filterVisible
              ? i18nConfig.translate("notesFilter.visible")
              : i18nConfig.translate("notesFilter.hidden")}
          </Button>
          {filterVisible && (
            <Button icon="filter-remove" onPress={clearFilter}>
              {i18nConfig.translate("notesFilter.clear")}
            </Button>
          )}
        </View>
      )}

      <NotesFilter
        visible={filterVisible}
        notesToFilter={notes}
        onFilterChange={handleFilterChange}
      />
      <FlatList
        inverted={filterVisible ? filteredNotes.length > 0 : notes.length > 0}
        showsVerticalScrollIndicator={false}
        data={filterVisible ? filteredNotes : notes}
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
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
