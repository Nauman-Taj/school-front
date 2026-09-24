export type ParentExamStatus =
  | "Upcoming"
  | "Completed";

export type ParentExam = {
  id: number;
  childId: number;
  childName: string;
  className: string;
  examName: string;
  subject: string;
  date: string;
  time: string;
  room: string;
  status: ParentExamStatus;
};