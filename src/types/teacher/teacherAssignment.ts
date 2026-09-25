export type TeacherAssignment = {
  id: number;
  title: string;
  subject: string;
  class: string;
  dueDate: string;
  totalMarks: number;
  submissions: number;
  pending: number;
  status: "Active" | "Closed";
};