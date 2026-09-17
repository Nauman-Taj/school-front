export type NotificationType = "Info" | "Success" | "Warning" | "Alert";

export type Notification = {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  date: string;
  time: string;
  read: boolean;
};