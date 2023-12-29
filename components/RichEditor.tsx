import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import React, { forwardRef } from "react";
import {
  RichEditor as RNRichEditor,
  RichToolbar as RNRichToolbar,
  actions,
} from "react-native-pell-rich-editor";
import { useTheme } from "react-native-paper";

interface RichEditorProps {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  onChange: (text: string) => void;
}

const RichEditor: React.ForwardRefRenderFunction<
  RNRichEditor,
  RichEditorProps
> = ({ placeholder, style, onChange }, ref) => {
  const { colors, roundness } = useTheme();

  const editorActions = [
    actions.setBold,
    actions.setItalic,
    actions.setUnderline,
    actions.insertLink,
    actions.insertBulletsList,
    actions.insertOrderedList,
    actions.checkboxList,
    actions.code,
  ];

  return (
    <View style={{ flex: 1 }}>
      <RNRichToolbar
        editor={ref}
        iconTint={colors.primary}
        style={style}
        actions={editorActions}
      />
      <RNRichEditor
        ref={ref}
        placeholder={placeholder}
        editorStyle={{
          backgroundColor: colors.background,
          color: colors.onBackground,
          placeholderColor: colors.placeholder,
        }}
        style={[styles.editor, style]}
        onChange={onChange}
      />
    </View>
  );
};

export default forwardRef(RichEditor);

const styles = StyleSheet.create({
  editor: {},
});
