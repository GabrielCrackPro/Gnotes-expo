import { StyleProp, TextStyle, ViewStyle } from "react-native";
import {
  applyWrapFormatNewLines,
  applyListFormat,
  applyWebLinkFormat,
  applyWrapFormat,
} from "react-native-markdown-editor";

export interface MarkdownFormat {
  key: string;
  title: string;
  wrapper: string;
  onPress: () => void;
  style: StyleProp<ViewStyle | TextStyle>;
}

export default [
  {
    key: "B",
    title: "B",
    wrapper: "**",
    onPress: applyWrapFormat,
    style: { fontWeight: "bold" },
  },
  {
    key: "I",
    title: "I",
    wrapper: "*",
    onPress: applyWrapFormat,
    style: { fontStyle: "italic" },
  },
  {
    key: "U",
    title: "U",
    wrapper: "__",
    onPress: applyWrapFormat,
    style: { textDecorationLine: "underline" },
  },
  {
    key: "S",
    title: "S",
    wrapper: "~~",
    onPress: applyWrapFormat,
    style: { textDecorationLine: "line-through" },
  },
  { key: "C", title: "C", wrapper: "`", onPress: applyWrapFormat },
  { key: "CC", title: "CC", wrapper: "```", onPress: applyWrapFormatNewLines },
  { key: "L", title: "L", prefix: "-", onPress: applyListFormat },
  { key: "WEB", title: "WEB", onPress: applyWebLinkFormat },
  { key: "H1", title: "H1", prefix: "#", onPress: applyListFormat },
  { key: "H2", title: "H2", prefix: "##", onPress: applyListFormat },
  { key: "H3", title: "H3", prefix: "###", onPress: applyListFormat },
  { key: "H4", title: "H4", prefix: "####", onPress: applyListFormat },
  { key: "H5", title: "H5", prefix: "#####", onPress: applyListFormat },
  { key: "H6", title: "H6", prefix: "######", onPress: applyListFormat },
] as MarkdownFormat[];
