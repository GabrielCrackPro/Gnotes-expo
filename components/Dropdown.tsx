import { StyleProp, StyleSheet, TextStyle, ViewStyle } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Book } from "../models/Note";
import { useTheme } from "react-native-paper";

interface DropdownProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  onSelect: (entry: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ data, onSelect }) => {
  const { colors } = useTheme();

  const defaultDropdownStyles: StyleProp<ViewStyle> = {
    backgroundColor: colors.surfaceVariant,
    height: 35,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 8,
  };

  const defaultDropdownRowStyles: StyleProp<ViewStyle> = {
    backgroundColor: colors.surfaceVariant,
    borderBottomColor: colors.border,
  };

  const defaultDropdownTextStyles: StyleProp<TextStyle> = {
    color: colors.placeholder,
  };

  const selectedRowTextStyles: StyleProp<TextStyle> = {
    color: colors.primary,
  };

  return (
    <SelectDropdown
      data={data}
      onSelect={onSelect}
      buttonStyle={defaultDropdownStyles}
      buttonTextStyle={defaultDropdownTextStyles}
      rowStyle={defaultDropdownRowStyles}
      rowTextStyle={defaultDropdownTextStyles}
      selectedRowTextStyle={selectedRowTextStyles}
    />
  );
};

export default Dropdown;
