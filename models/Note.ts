export interface Note {
  createdAt: string;
  id: string;
  title: string;
  body: string;
  bookId: string;
}

export interface Book {
  createdAt: string;
  id: string;
  title: string;
  color: string;
  locked: boolean;
}
