export type Result = {
  id: string;
  studentId: number;
  student: string;
  examId: string;
  subjectId: string;
  subject: string;
  teacherId: string;
  teacher: string;
  className: string;
  section: string;
  obtainedMarks: number;
  totalMarks: number;
  percentage: number;
  grade: string;
  status: "Pass" | "Fail";
};