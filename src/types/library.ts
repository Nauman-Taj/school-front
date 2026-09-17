export type BookStatus = "Available" | "Borrowed" | "Unavailable";

export type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  publisher: string;
  quantity: number;
  availableCopies: number;
  status: BookStatus;
};