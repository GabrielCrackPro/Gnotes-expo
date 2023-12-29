import React, { useEffect, useState } from "react";
import { Book } from "../models/Note";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTheme, Drawer, IconButton, Icon } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigation } from "../models/navigation";
import { getBooks } from "../utils/books";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const navigation = useNavigation<DrawerNavigation>();
  const { colors } = useTheme();

  const goToNotes = (bookId: string) => {
    navigation.navigate("HomeNavigator", {
      screen: "Notes",
      params: { bookId: bookId },
    });
  };

  const goBack = () => {
    navigation.navigate("HomeNavigator", {
      screen: "Home",
      params: { add: false },
    });
  };

  const goToSettings = () => {
    navigation.navigate("HomeNavigator", {
      screen: "Settings",
    });
  };

  const addBook = () => {
    navigation.navigate("HomeNavigator", {
      screen: "Home",
      params: { add: true },
    });
  };

  useEffect(() => {
    const loadBooks = async () => {
      const savedBooks = await getBooks();
      setBooks(savedBooks);
    };
    loadBooks();
  }, [books]);

  return (
    <>
      <DrawerContentScrollView>
        <Drawer.Section>
          <Drawer.Item label="Home" icon="home" onPress={() => goBack()} />
          <Drawer.Item
            label="Settings"
            icon="cog"
            onPress={() => goToSettings()}
          />
        </Drawer.Section>
        <Drawer.Section>
          {books.length ? (
            books.map((book, index) => (
              <Drawer.Item
                key={index}
                label={book.title}
                icon="book"
                style={{
                  backgroundColor: book.color,
                  marginVertical: 10,
                }}
                onPress={() => goToNotes(book.id)}
                right={() => (
                  <>
                    {book.locked && (
                      <Icon source="lock" size={18} color={colors.primary} />
                    )}
                    <IconButton
                      icon="delete"
                      iconColor={colors.error}
                      size={18}
                      onPress={() => {
                        navigation.navigate("HomeNavigator", {
                          screen: "Home",
                          params: {
                            bookToDelete: book,
                            openDialog: true,
                          },
                        });
                      }}
                    />
                  </>
                )}
              />
            ))
          ) : (
            <Drawer.Item icon="bookshelf" label="No books" />
          )}
        </Drawer.Section>
        <Drawer.Item icon="plus" label="Create Book" onPress={addBook} />
      </DrawerContentScrollView>
    </>
  );
};

export default BookList;
