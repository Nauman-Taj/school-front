export type TeacherAnnouncement = {
  id: number;
  title: string;
  message: string;
  audience: string;
  date: string;
  status: "Active" | "Expired";
};