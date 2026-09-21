export type ReportCategory =
  | "Student"
  | "Attendance"
  | "Academic"
  | "Financial";

export type Report = {
  id: number;
  name: string;
  category: ReportCategory;
  description: string;
};