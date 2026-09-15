export type Exam = {
  id: string;
  name: string;
  subject: string;
  className: string;
  teacher: string;
  examDate: string;
  totalMarks: number;
  status: "Upcoming" | "Completed";
};