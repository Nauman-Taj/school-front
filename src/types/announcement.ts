export type AnnouncementStatus = "Published" | "Draft";

export type AnnouncementAudience =
  | "All"
  | "Students"
  | "Teachers"
  | "Parents"
  | "Staff";

export type Announcement = {
  id: number;
  title: string;
  description: string;
  audience: AnnouncementAudience;
  date: string;
  status: AnnouncementStatus;
};