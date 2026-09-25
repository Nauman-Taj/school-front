export type Subject = {
  id: string;
  name: string;
  code: string;
  teacherId: string;
  teacher: string;
  className: string;
  section: string;
  status: "Active" | "Inactive";
};