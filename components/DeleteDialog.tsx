import React from "react";
import { Dialog, Button, Text, useTheme } from "react-native-paper";
import { Book, Note } from "../models/Note";
import { deleteNote } from "../utils/notes";
import { deleteBook } from "../utils/books";

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
  };

  return (
    <Dialog
      visible={visible}
      dismissable={false}
      dismissableBackButton={false}
      onDismiss={onDismiss}
    >
      <Dialog.Title style={{ color: colors.error, fontWeight: "bold" }}>
        Delete {type === "book" ? "book" : "note"}
      </Dialog.Title>
      <Dialog.Content>
        <Text variant="bodyLarge" style={{ color: colors.text }}>
          {`Do you want to delete ${item?.title}?`}
        </Text>
        <Text variant="bodyMedium" style={{ color: colors.text }}>
          {type === "book"
            ? "The book and all its notes will be permanently lost"
            : "This action cannot be undone"}
        </Text>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button textColor={colors.error} onPress={handleDelete}>
          Delete
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default DeleteDialog;
