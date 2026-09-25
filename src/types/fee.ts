export type Fee = {
  id: string;
  studentId: number;
  student: string;
  className: string;
  section: string;
  feeType: "Tuition Fee" | "Admission Fee" | "Exam Fee";
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Pending" | "Overdue";
};