import { Share } from "react-native";
import { Note } from "../models/Note";
import { checkExists, getValue, setValue } from "./storage";
import i18nConfig from "../locales/i18n-config";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const updateNotes = async (updatedNotes: Note[]): Promise<void> => {
  try {
    const serializedNotes = JSON.stringify(updatedNotes);
    await AsyncStorage.setItem("notes", serializedNotes);
  } catch (error) {
    console.error("Error updating notes:", error);
    throw error;
  }
};

const editNote = async (updatedNote: Note): Promise<Note[]> => {
  try {
    const notes = await getNotes();
    const notesUpdated = notes.map((note: Note) => {
      if (note.id === updatedNote.id) {
        return {
          ...note,
          title: updatedNote.title,
          body: updatedNote.body,
          createdAt: new Date().toLocaleDateString(),
        };
      }
      return note;
    });

    await updateNotes(notesUpdated);
    return notesUpdated;
  } catch (error) {
    console.error("Error editing note:", error);
    throw error;
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

const buildShareMessage = (note: Note): string => {
  const message = `${i18nConfig.translate("share.note")}\n${note.body}\n${
    note.body
  }`;
  return message;
};

const shareNote = async (note: Note) => {
  await Share.share({
    message: buildShareMessage(note),
    title: "Share note",
  });
};

export {
  getNotes,
  getNotesByBook,
  createNote,
  deleteNote,
  shareNote,
  editNote,
};
