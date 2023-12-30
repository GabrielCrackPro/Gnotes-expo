import React from "react";
import { Dialog, Button, Text, useTheme } from "react-native-paper";
import { Book, Note } from "../models/Note";
import { deleteNote } from "../utils/notes";
import { deleteBook } from "../utils/books";
import * as Haptics from "expo-haptics";

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
          Delete {type === "book" ? "book" : "note"} {item?.title}
        </Text>
      </Dialog.Title>
      <Dialog.Content>
        <Text
          variant="bodyLarge"
          style={{ color: colors.text, textAlign: "center" }}
        >
          {type === "book"
            ? "The book and all its notes will be permanently lost"
            : "This action can't be undone"}
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button textColor={colors.text} onPress={onDismiss}>
          Cancel
        </Button>
        <Button
          theme={{ colors: { primary: colors.error } }}
          mode="contained"
          onPress={handleDelete}
        >
          Delete
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeleteDialog;
