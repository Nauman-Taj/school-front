export type Assignment = {
  id: string;
  title: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacher: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Overdue";
};