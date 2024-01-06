import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { MarkdownView } from "react-native-markdown-view";
import renderFormatButtons from "./utils/renderFormatButtons";
import { IconButton, TextInput, useTheme } from "react-native-paper";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { MarkdownFormat } from "./utils/Formats";
import useMarkdownTheme from "../../hooks/useMarkdownTheme";
import i18nConfig from "../../locales/i18n-config";

interface MarkdownEditorProps {
  Formats?: MarkdownFormat[];
  showEditorPreview?: boolean;
  editorStyles?: StyleProp<ViewStyle>;
  defaultValue?: string;
  onMarkdownChange: (text: string) => void;
  markdownButton?: () => React.ReactNode;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  Formats,
  defaultValue,
  showEditorPreview,
  editorStyles,
  onMarkdownChange,
  markdownButton,
}) => {
  const { colors } = useTheme();
  const { markdownStyles } = useMarkdownTheme();

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
            {text === "" ? i18nConfig.translate("sheet.preview") : text}
          </MarkdownView>
        </ScrollView>
      </View>
    );
  };

  const WrapperView = Platform.OS === "ios" ? KeyboardAvoidingView : View;
  return (
    <WrapperView behavior="padding" style={editorStyles}>
      <TextInput
        style={[defaultInputStyles, styles.composeText, { color: colors.text }]}
        multiline
        underlineColorAndroid="transparent"
        onChangeText={changeText}
        onSelectionChange={onSelectionChange}
        value={text}
        placeholder={i18nConfig.translate("sheet.body")}
        placeholderTextColor={colors.placeholder}
        ref={textInput}
        selection={selection}
      />
      <View style={[defaultInputStyles, styles.buttonContainer]}>
        <IconButton
          icon={showPreview ? "eye-off" : "eye"}
          iconColor={colors.primary}
          size={15}
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
  preview: {
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
  },
});

export default MarkdownEditor;
