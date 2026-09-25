export type Exam = {
  id: string;
  name: string;
  subjectId: string;
  subject: string;
  className: string;
  section: string;
  teacherId: string;
  teacher: string;
  examDate: string;
  totalMarks: number;
  status: "Upcoming" | "Completed";
};