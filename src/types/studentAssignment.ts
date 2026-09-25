export type StudentAssignmentStatus =
  | "Pending"
  | "Submitted"
  | "Overdue";

export interface StudentAssignment {
  id: number;
  title: string;
  subject: string;
  className: string;
  teacher: string;
  description: string;
  dueDate: string;
  file: string;
  submission: string;
  marks: string;
  teacherFeedback: string;
  status: StudentAssignmentStatus;
}