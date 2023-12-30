import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  TextStyle,
} from "react-native";
import { MarkdownView } from "react-native-markdown-view";
import renderFormatButtons from "./utils/renderFormatButtons";
import { IconButton, useTheme } from "react-native-paper";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { MarkdownFormat } from "./utils/Formats";

interface MarkdownEditorProps {
  Formats?: MarkdownFormat[];
  showEditorPreview?: boolean;
  defaultValue?: string;
  onMarkdownChange: (text: string) => void;
  markdownButton?: () => React.ReactNode;
}

const markdownStyles = {
  heading1: {
    fontSize: 24,
    color: "purple",
  },
  link: {
    color: "pink",
  },
  mailTo: {
    color: "orange",
  },
  text: {
    color: "#555555",
  },
};

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  Formats,
  defaultValue,
  showEditorPreview,
  onMarkdownChange,
  markdownButton,
}) => {
  const { colors } = useTheme();
  const [text, setText] = useState(defaultValue || "");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [showPreview, setShowPreview] = useState(showEditorPreview ?? false);

  const textInput = useRef(null);

  const changeText = (input: string) => {
    setText(input);
    if (onMarkdownChange) onMarkdownChange(input);
  };

  const onSelectionChange = (event) => {
    setSelection(event.nativeEvent.selection);
  };

  const getState = () => {
    setSelection({ start: 1, end: 1 });
    return { text, selection, showPreview };
  };

  const defaultInputStyles: StyleProp<TextStyle> = {
    backgroundColor: colors.surfaceVariant,
  };

  const convertMarkdown = () => {
    setShowPreview(!showPreview);
  };

  const renderPreview = () => {
    return (
      <View style={[defaultInputStyles, styles.preview]}>
        <ScrollView removeClippedSubviews>
          <MarkdownView styles={markdownStyles}>
            {text === "" ? "Preview" : text}
          </MarkdownView>
        </ScrollView>
      </View>
    );
  };

  const WrapperView = Platform.OS === "ios" ? KeyboardAvoidingView : View;
  return (
    <WrapperView behavior="padding" style={styles.screen}>
      <BottomSheetTextInput
        style={[defaultInputStyles, styles.composeText, { color: colors.text }]}
        multiline
        underlineColorAndroid="transparent"
        onChangeText={changeText}
        onSelectionChange={onSelectionChange}
        value={text}
        placeholder="Note body"
        placeholderTextColor={colors.placeholder}
        ref={textInput}
        selection={selection}
      />
      <View style={[defaultInputStyles, styles.buttonContainer]}>
        <IconButton
          icon={showPreview ? "eye-off" : "eye"}
          iconColor={colors.primary}
          onPress={convertMarkdown}
        />

        {renderFormatButtons(
          {
            getState,
            setState: (state, callback) => {
              textInput.current?.focus();
              setText(state.text);
              setSelection(state.selection);
              setShowPreview(state.showPreview);
              if (callback) callback();
            },
          },
          Formats,
          markdownButton,
        )}
      </View>

      {showPreview ? renderPreview() : null}
    </WrapperView>
  );
};

const styles = StyleSheet.create({
  composeText: {
    fontSize: 16,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  inlinePadding: {
    padding: 8,
  },
  preview: {},
  screen: {
    height: 100,
  },
});

export default MarkdownEditor;
