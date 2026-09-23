export type ParentAttendanceRecord = {
  id: number;
  childId: number;
  childName: string;
  className: string;
  date: string;
  status: "Present" | "Absent" | "Late";
};
