import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Fee } from "@/types/fee";

export type ApiFeePayment = {
  id: string;
  feeId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string | null;
  receiptNumber: string;
  createdAt: string;
};

export type ApiFee = {
  id: string;
  invoiceNumber: string;
  studentId: number;
  student: string;
  className: string;
  section: string;
  feeType: string;
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: Fee["status"];
  payments: ApiFeePayment[];
};

function getToken(): string {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Your session has expired. Please log in again.");
  }

  return token;
}

export function mapApiFee(item: ApiFee): Fee {
  return {
    id: item.id,
    studentId: item.studentId,
    student: item.student,
    className: item.className,
    section: item.section,
    feeType: item.feeType as Fee["feeType"],
    amount: item.amount,
    paidAmount: item.paidAmount,
    remainingAmount: item.remainingAmount,
    dueDate: item.dueDate.slice(0, 10),
    status: item.status,
  };
}

/**
 * Loads the fee invoices for one of the signed-in parent's children.
 *
 * The backend verifies the ParentStudent link first, then returns that
 * child's invoices with the amount paid, the remaining balance and the
 * payment history already attached to each invoice.
 */
export async function fetchChildFees(studentId: number) {
  const data = await apiRequest<ApiFee[]>(
    `/parents/me/children/${studentId}/fees`,
    { token: getToken() }
  );

  return data.map(mapApiFee);
}
