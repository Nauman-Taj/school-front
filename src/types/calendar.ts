export type CalendarEventType =
  | "Exam"
  | "Holiday"
  | "Event"
  | "Parent Meeting"
  | "Teacher Meeting"
  | "School Activity";

export type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  type: CalendarEventType;
  description: string;
};