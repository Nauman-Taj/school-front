export type SchoolClass = {
  id: number;
  name: string;
  section: string;
  teacherId: string;
  teacher: string;
  room: string;
  status: "Active" | "Inactive";
};