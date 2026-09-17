export type AnnouncementStatus = "Published" | "Draft";

export type Announcement = {
  id: number;
  title: string;
  description: string;
  audience: string;
  date: string;
  status: AnnouncementStatus;
};