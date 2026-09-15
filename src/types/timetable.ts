export type TimetableEntry = {
  id: string;
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
  time: string;
  subject: string;
  teacher: string;
  className: string;
  room: string;
};