import { useTheme } from "react-native-paper";

const useMarkdownTheme = () => {
  const { colors } = useTheme();

  const markdownStyles = Object.freeze({
    blockQuote: {
      marginLeft: 10,
      opacity: 0.8,
    },
    codeBlock: {
      fontWeight: "500",
    },
    del: {
      textDecorationLine: "line-through",
    },
    em: {
      fontStyle: "italic",
    },
    p: {
      color: colors.text,
    },
    heading: {
      fontWeight: "700",
    },
    heading1: {
      color: colors.text,
      fontSize: 32,
      marginTop: 22,
      marginBottom: 22,
      marginLeft: 0,
      marginRight: 0,
    },
    heading2: {
      color: colors.text,
      fontSize: 24,
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 0,
      marginRight: 0,
    },
    heading3: {
      color: colors.text,
      fontSize: 20,
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 0,
      marginRight: 0,
    },
    heading4: {
      color: colors.text,
      fontSize: 16,
      marginTop: 22,
      marginBottom: 22,
      marginLeft: 0,
      marginRight: 0,
    },
    heading5: {
      color: colors.text,
      fontSize: 14,
      marginTop: 22,
      marginBottom: 22,
      marginLeft: 0,
      marginRight: 0,
    },
    heading6: {
      color: colors.text,
      fontSize: 11,
      marginTop: 24,
      marginBottom: 24,
      marginLeft: 0,
      marginRight: 0,
    },
    hr: {
      backgroundColor: "#ccc",
      height: 1,
    },
    imageWrapper: {
      padding: 4,
      width: 320,
      height: 320,
    },
    image: {
      flexGrow: 1,
    },
    inlineCode: {
      backgroundColor: "rgba(128, 128, 128, 0.25)",
      fontWeight: "500",
    },
    link: {
      color: colors.primary,
    },
    list: {
      margin: 8,
    },
    listItem: {
      flexDirection: "row",
    },
    listItemNumber: {
      minWidth: 32,
      paddingRight: 4,
    },
    listItemBullet: {
      minWidth: 32,
      paddingRight: 4,
    },
    listItemOrderedContent: {
      flex: 1,
    },
    listItemUnorderedContent: {
      flex: 1,
    },
    paragraph: {
      marginTop: 10,
      marginBottom: 10,
    },
    strong: {
      fontWeight: "700",
    },
    table: {
      margin: 4,
      borderColor: "#222",
    },
    tableHeaderCell: {
      borderColor: "#222",
    },
    tableHeaderCellContent: {
      fontWeight: "700",
    },
    tableCell: {
      padding: 5,
    },
    tableCellOddRow: {
      backgroundColor: "rgba(128, 128, 128, 0.1)",
    },
    tableCellEvenRow: {},
    tableCellLastRow: {
      borderBottomWidth: 0,
    },
    tableCellOddColumn: {},
    tableCellEvenColumn: {},
    tableCellLastColumn: {
      borderRightWidth: 0,
    },
    tableCellContent: {
      fontWeight: "bold",
    },
    tableCellContentOddRow: {},
    tableCellContentEvenRow: {},
    tableCellContentLastRow: {},
    tableCellContentOddColumn: {},
    tableCellContentEvenColumn: {},
    tableCellContentLastColumn: {},
    u: {
      textDecorationLine: "underline",
    },
  });

  return { markdownStyles };
};

export default useMarkdownTheme;
