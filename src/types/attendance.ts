export type AttendanceStatus = "Present" | "Absent" | "Late";

export type AttendanceRecord = {
  id: number;
  name: string;
  role: "Student" | "Teacher";
  class?: string;
  department?: string;
  date: string;
  status: AttendanceStatus;
};