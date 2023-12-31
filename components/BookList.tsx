import React, { useEffect, useState } from "react";
import { Book } from "../models/Note";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useTheme, Drawer, IconButton, Icon } from "react-native-paper";
import { getBooks } from "../utils/books";
import { useNavigation } from "../hooks/useNavigation";
import i18nConfig from "../locales/i18n-config";

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  const goToNotes = (bookId: string) => {
    navigation.navigate("HomeNavigator", {
      screen: "Notes",
      params: { bookId: bookId },
    });
  };

  const goBack = () => navigation.goHome();
  const goToSettings = () => navigation.goToSettings();
  const addBook = () => navigation.goToAddScreen("Home");

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
          <Drawer.Item
            label={i18nConfig.translate("drawer.home")}
            icon="home"
            theme={{ colors: { onSurfaceVariant: colors.primary } }}
            onPress={() => goBack()}
          />
          <Drawer.Item
            label={i18nConfig.translate("drawer.settings")}
            icon="cog"
            theme={{ colors: { onSurfaceVariant: colors.primary } }}
            onPress={() => goToSettings()}
          />
        </Drawer.Section>
        {books.length ? (
          books.map((book, index) => (
            <Drawer.Item
              key={index}
              label={book.title}
              icon="book"
              theme={{ colors: { onSurfaceVariant: colors.primary } }}
              style={{
                borderRadius: 12,
                borderWidth: 1,
                borderColor: book.color,
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
                    iconColor={colors.primary}
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
          <Drawer.Item
            icon="bookshelf"
            theme={{ colors: { onSurfaceVariant: colors.primary } }}
            label={i18nConfig.translate("drawer.noBooks")}
          />
        )}
        <Drawer.Item
          icon="plus"
          theme={{ colors: { onSurfaceVariant: colors.primary } }}
          label={i18nConfig.translate("drawer.createBook")}
          onPress={addBook}
        />
      </DrawerContentScrollView>
    </>
  );
};

export default BookList;
