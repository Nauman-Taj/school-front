export type Fee = {
  id: string;
  studentId: number;
  student: string;
  className: string;
  section: string;
  /**
   * The backend accepts a free-form fee type, so the three known values keep
   * their autocomplete while any other value from the API stays valid.
   */
  feeType: "Tuition Fee" | "Admission Fee" | "Exam Fee" | (string & {});
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  dueDate: string;
  status: "Paid" | "Partial" | "Pending" | "Overdue";
};