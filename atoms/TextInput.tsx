import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";
import { useTheme } from "react-native-paper";

interface TextInputProps extends RNTextInputProps {
  type: "input" | "textarea";
  style?: StyleProp<TextStyle>;
}

const TextInput: React.FC<TextInputProps> = ({ type, style, ...props }) => {
  const { colors } = useTheme();

  const defaultInputStyles: StyleProp<TextStyle> = {
    backgroundColor: colors.surfaceVariant,
    color: colors.text,
    borderColor: colors.border,
  };

  return (
    <RNTextInput
      style={[
        defaultInputStyles,
        type === "input" ? styles.textInput : styles.textArea,
        style,
      ]}
      placeholderTextColor={colors.placeholder}
      multiline={type === "textarea"}
      {...props}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    width: 330,
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
    flexWrap: "wrap",
  },
  textArea: {
    width: 330,
    height: 160,
    marginTop: 8,
    borderRadius: 10,
    fontSize: 16,
    padding: 8,
  },
});
