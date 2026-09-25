export type TimetableEntry = {
  id: string;
  classId: number;
  className: string;
  section: string;
  subjectId: string;
  subject: string;
  teacherId: string;
  teacher: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  startTime: string;
  endTime: string;
  room: string;
};