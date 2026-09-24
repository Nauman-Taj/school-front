export type ParentAnnouncement = {
  id: number;
  childId: number;
  childName: string;
  className: string;
  title: string;
  message: string;
  date: string;
  category: "School" | "Academic" | "Event" | "Fee";
};