export type BorrowingStatus =
  | "Borrowed"
  | "Returned"
  | "Overdue";

export type LibraryBorrowing = {
  id: string;
  bookId: number;
  book: string;
  studentId: number;
  student: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: BorrowingStatus;
};