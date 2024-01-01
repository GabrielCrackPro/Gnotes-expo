import React from "react";
import { Dialog, Button, Text, useTheme } from "react-native-paper";
import { Book, Note } from "../models/Note";
import { deleteNote } from "../utils/notes";
import { deleteBook } from "../utils/books";
import * as Haptics from "expo-haptics";
import i18nConfig from "../locales/i18n-config";

interface DeleteDialogProps {
  item?: Note | Book;
  type: "note" | "book";
  visible: boolean;
  onDismiss: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  item,
  type,
  visible,
  onDismiss,
}) => {
  const { colors } = useTheme();

  const handleDelete = () => {
    if (type === "note") {
      deleteNote(item as Note).then(() => onDismiss());
    } else {
      deleteBook(item as Book).then(() => onDismiss());
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <Dialog
      visible={visible}
      dismissable={false}
      dismissableBackButton={false}
      onDismiss={onDismiss}
      theme={{ colors: { elevation: { level3: colors.background } } }}
    >
      <Dialog.Icon icon="alert" size={30} color={colors.error} />
      <Dialog.Title>
        <Text style={{ color: colors.error, textAlign: "center" }}>
          {i18nConfig.translate("deleteDialog.title") + item?.title + "?"}
        </Text>
      </Dialog.Title>
      <Dialog.Content>
        <Text
          variant="bodyLarge"
          style={{ color: colors.text, textAlign: "center" }}
        >
          {type === "book"
            ? i18nConfig.translate("deleteDialog.book")
            : i18nConfig.translate("deleteDialog.note")}
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button textColor={colors.text} onPress={onDismiss}>
          {i18nConfig.translate("deleteDialog.cancel")}
        </Button>
        <Button
          theme={{ colors: { primary: colors.error } }}
          mode="contained"
          onPress={handleDelete}
        >
          {i18nConfig.translate("deleteDialog.delete")}
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeleteDialog;
