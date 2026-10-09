export type SchoolClass = {
  id: number;
  name: string;
  section: string;
  teacherId: string;
  teacher: string;
  room: string;
  status: "Active" | "Inactive";
};

export type TeacherClassView = {
  id: number;
  className: string;
  section: string;
  subject: string;
  room: string;
  schedule: string;
  students: number;
  classTeacher: boolean;
};