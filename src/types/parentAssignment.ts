export type ParentAssignment = {
  id: number;
  childId: number;
  childName: string;
  subject: string;
  title: string;
  teacher: string;
  dueDate: string;
  status: "Pending" | "Submitted" | "Overdue";
};
