export type AttendanceStatus =
  | "Present"
  | "Absent"
  | "Late"
  | "Leave";

export type StudentAttendanceRecord = {
  id: number;
  studentId: number;
  name: string;
  role: "Student";
  className: string;
  section: string;
  date: string;
  status: AttendanceStatus;
};

export type TeacherAttendanceRecord = {
  id: number;
  teacherId: string;
  name: string;
  role: "Teacher";
  department: string;
  date: string;
  status: AttendanceStatus;
};

export type AttendanceRecord =
  | StudentAttendanceRecord
  | TeacherAttendanceRecord;