export type TeacherExam = {
  id: number;
  title: string;
  subject: string;
  class: string;
  date: string;
  totalMarks: number;
  duration: string;
  status: "Upcoming" | "Completed";
};