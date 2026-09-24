export type ParentNotificationType =
  | "Attendance"
  | "Fee"
  | "Result"
  | "Assignment"
  | "Announcement";

export type ParentNotification = {
  id: number;
  childId: number;
  childName: string;
  className: string;
  title: string;
  message: string;
  date: string;
  type: ParentNotificationType;
  read: boolean;
};