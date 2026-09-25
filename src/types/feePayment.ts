export type FeePayment = {
  id: string;
  feeId: string;
  studentId: number;
  student: string;
  paymentDate: string;
  amount: number;
  paymentMethod: "Cash" | "Bank Transfer" | "Online";
  transactionId?: string;
  receiptNumber: string;
};