import { Share } from "react-native";
import { Note } from "../models/Note";
import { checkExists, getValue, setValue } from "./storage";

const getNotes = async (): Promise<Note[]> => {
  try {
    const savedNotes = await getValue("notes");
    return JSON.parse(savedNotes ?? "[]");
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
};

const getNotesByBook = async (bookId: string): Promise<Note[]> => {
  try {
    const notes = await getNotes();
    return notes.filter((note: Note) => note.bookId === bookId);
  } catch (error) {
    console.error("Error fetching notes by book:", error);
    return [];
  }
};

const createNote = async (note: Note): Promise<void> => {
  try {
    const savedNotes = await getNotes();
    if (!checkExists(savedNotes, note)) {
      const newNotes = [...savedNotes, note];
      setValue("notes", JSON.stringify(newNotes));
    } else {
      console.log("Note already exists");
    }
  } catch (error) {
    console.error("Error creating note:", error);
  }
};

const deleteNote = async (note: Note): Promise<void> => {
  try {
    const notes = await getNotes();
    const newNotes = notes.filter((n: Note) => n.id !== note.id);
    setValue("notes", JSON.stringify(newNotes));
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};

const buildShareMessage = (note: Note): string =>
  `Hey here's my note created using Gnotes\n${note.title}\n${note.body}`;

const shareNote = async (note: Note) => {
  await Share.share({
    message: buildShareMessage(note),
    title: "Share note",
  });
};

export { getNotes, getNotesByBook, createNote, deleteNote, shareNote };
