export type ResultStatus = "Pass" | "Fail";

export type Result = {
  id: string;
  studentName: string;
  rollNo: string;
  className: string;
  exam: string;
  subject: string;
  teacher: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  status: ResultStatus;
};