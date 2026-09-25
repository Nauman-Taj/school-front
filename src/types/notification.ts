export type NotificationType = "Info" | "Success" | "Warning" | "Alert";

export type Notification = {
  id: number;
  userId: number;
  role: "Admin" | "Teacher" | "Student" | "Parent";

  title: string;
  message: string;
  type: NotificationType;

  date: string;
  time: string;
  read: boolean;

  announcementId?: number;
};