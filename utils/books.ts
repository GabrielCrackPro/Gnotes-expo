import { Book } from "../models/Note";
import { checkExists, getValue, setValue } from "./storage";

const getBooksString = async (): Promise<string | null | undefined> => {
  return await getValue("books" ?? "[]");
};

const getBooks = async (): Promise<Book[]> => {
  const savedBooks = await getBooksString();
  return JSON.parse(savedBooks ?? "[]");
};

const createBook = async (book: Book): Promise<void> => {
  const savedBooks = await getBooks();

  if (!checkExists(savedBooks, book)) {
    const savedBooks = await getBooks();
    const newBooks = [...savedBooks, book];
    setValue("books", JSON.stringify(newBooks));
  } else {
    console.log("book already exists");
  }
};

const deleteBook = async (book: Book): Promise<void> => {
  const savedBooks = await getBooks();
  const newBooks = savedBooks.filter((books) => books.id !== book.id);
  setValue("books", JSON.stringify(newBooks));
};

const getBookFromId = async (id: string): Promise<Book> => {
  const books = await getBooks();
  return books.find((books) => books.id === id) as Book;
};

export { getBooks, getBookFromId, createBook, deleteBook };
