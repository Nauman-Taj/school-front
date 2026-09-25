export type TeacherAttendance = {
  id: number;
  studentId: number;
  studentName: string;
  class: string;
  rollNo: string;
  status: "Present" | "Absent" | "Late" | "Leave";
};