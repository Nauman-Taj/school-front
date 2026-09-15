export type Assignment = {
  id: string;
  title: string;
  subject: string;
  className: string;
  teacher: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Overdue";
};