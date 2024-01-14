import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Chip, useTheme } from "react-native-paper";
import { Note } from "../models/Note";
import { TextInput } from "../atoms";
import { Filters } from "../models/Filter";
import i18nConfig from "../locales/i18n-config";

interface NotesFilterProps {
  visible: boolean;
  notesToFilter: Note[];
  onFilterChange: (notes: Note[], filter: Filters, value?: string) => void;
}

const NotesFilter: React.FC<NotesFilterProps> = ({
  visible,
  notesToFilter,
  onFilterChange,
}) => {
  const { colors } = useTheme();

  const defaultChipStyles: StyleProp<ViewStyle> = {
    backgroundColor: colors.surfaceVariant,
  };
  const defaultChipTextStyles: StyleProp<TextStyle> = {
    color: colors.primary,
  };

  return visible ? (
    <View style={styles.filter}>
      <View style={styles.row}>
        <Chip
          icon="format-text"
          style={[defaultChipStyles, styles.chip]}
          textStyle={[defaultChipTextStyles, styles.chipText]}
          onPress={() => onFilterChange(notesToFilter, Filters.SIMPLE_TEXT)}
        >
          {i18nConfig.translate("notesFilter.simpleText")}
        </Chip>
        <Chip
          icon="language-markdown"
          style={[defaultChipStyles, styles.chip]}
          textStyle={[defaultChipTextStyles, styles.chipText]}
          onPress={() => onFilterChange(notesToFilter, Filters.MARKDOWN)}
        >
          {i18nConfig.translate("notesFilter.markdown")}
        </Chip>
      </View>
      <TextInput
        type="input"
        placeholder={i18nConfig.translate("notesFilter.title")}
        onChangeText={(text: string) =>
          onFilterChange(notesToFilter, Filters.TITLE, text)
        }
      />
      <TextInput
        type="textarea"
        placeholder={i18nConfig.translate("notesFilter.body")}
        onChangeText={(text: string) =>
          onFilterChange(notesToFilter, Filters.BODY, text)
        }
      />
    </View>
  ) : null;
};

export default NotesFilter;

const styles = StyleSheet.create({
  filter: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  chip: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  chipText: {},
});
