export type ParentFeeStatus =
  | "Paid"
  | "Pending"
  | "Overdue";

export type ParentFee = {
  id: number;
  childId: number;
  childName: string;
  className: string;
  feeType: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: ParentFeeStatus;
};
