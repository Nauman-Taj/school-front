export type FeeStatus = "Paid" | "Pending" | "Overdue";

export type Fee = {
  id: string;
  studentName: string;
  rollNo: string;
  className: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: FeeStatus;
};