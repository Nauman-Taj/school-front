export type TeacherMark = {
  id: number;
  studentId: number;
  studentName: string;
  class: string;
  subject: string;
  exam: string;
  obtainedMarks: number;
  totalMarks: number;
};