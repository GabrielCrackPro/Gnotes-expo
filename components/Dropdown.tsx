import { StyleSheet } from "react-native";
import React from "react";
import SelectDropdown from "react-native-select-dropdown";
import { Book } from "../models/Note";

interface DropdownProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  onSelect: (entry: Book) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ data, onSelect }) => {
  return <SelectDropdown data={data} onSelect={onSelect} />;
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {},
});
