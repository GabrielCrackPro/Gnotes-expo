import AsyncStorage from "@react-native-async-storage/async-storage";
import { Note, Book } from "../models/Note";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setValue = (key: string, value: any) => {
  try {
    AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting ${key} to ${value}`);
  }
};

const getValue = (key: string) => {
  try {
    const value = AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.error(`Error getting value for ${key}`);
  }
};

const checkExists = (
  arr: Note[] | Book[],
  newElement: Note | Book,
): boolean => {
  const ids = arr.map((el) => el.id);
  return ids.includes(newElement.id);
};

const clearStorage = async (callback: () => void) => {
  await AsyncStorage.multiRemove(["books", "notes", "notifications"]).then(
    callback,
  );
};

export { setValue, getValue, checkExists, clearStorage };
