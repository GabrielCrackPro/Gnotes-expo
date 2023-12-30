import { Book, Note } from "../models/Note";

const generateUuid = (): string => {
  const chars: string = "0123456789abcdef";
  const segments: number[] = [8, 4, 4, 4, 12]; // Length of segments in a UUID

  let uuid: string = "";
  segments.forEach((segment: number, index: number) => {
    for (let i = 0; i < segment; i++) {
      uuid += chars[Math.floor(Math.random() * chars.length)];
    }
    if (index < segments.length - 1) {
      uuid += "-";
    }
  });

  return uuid;
};

const validateFormFields = (
  type: "note" | "book",
  data: Note | Book,
): boolean => {
  if (type === "note") {
    const { id, title, body, bookId, createdAt } = data as Note;
    return !!id && !!title && !!body && !!createdAt && !!bookId; // Check for existence
  }

  if (type === "book") {
    const { id, title, color, createdAt } = data as Book;
    return !!id && !!title && !!createdAt && !!color; // Check for existence
  }

  return false;
};

const getMissingFields = (
  type: "note" | "book",
  data: Note | Book,
): string[] => {
  const missingFields: string[] = [];
  if (type === "note") {
    const { id, title, body, bookId, createdAt } = data as Note;
    if (!id) missingFields.push("id");
    if (!title) missingFields.push("title");
    if (!bookId) missingFields.push("bookId");
    if (!createdAt) missingFields.push("createdAt");
    if (!body) missingFields.push("body");
  } else if (type === "book") {
    const { id, title, color, createdAt } = data as Book;
    if (!id) missingFields.push("id");
    if (!title) missingFields.push("title");
    if (!color) missingFields.push("color");
    if (!createdAt) missingFields.push("createdAt");
  }
  return missingFields;
};

const getMissingFieldsString = (
  type: "note" | "book",
  data: Note | Book,
): string => {
  const missingFields = getMissingFields(type, data);

  if (missingFields.length === 0) {
    return "No missing fields.";
  }

  let missingFieldsString = missingFields.join(" and ");
  if (missingFields.length > 1) {
    const lastIndex = missingFieldsString.lastIndexOf(" and ");
    missingFieldsString =
      missingFieldsString.substring(0, lastIndex) +
      ", and " +
      missingFieldsString.substring(lastIndex + 5);
  }

  return `${missingFieldsString} ${
    missingFields.length > 1 ? "are" : "is"
  } missing.`;
};

const containsMarkdown = (text: string) => {
  const markdownRegExp = /[*#~`[\]!-_>|+`]/;
  return markdownRegExp.test(text);
};

export {
  generateUuid,
  validateFormFields,
  getMissingFieldsString,
  containsMarkdown,
};
