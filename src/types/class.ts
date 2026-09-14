export type SchoolClass = {
  id: number;
  name: string;
  section: string;
  teacher: string;
  room: string;
  status: "Active" | "Inactive";
};