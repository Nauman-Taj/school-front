import { CreditCard, CircleDollarSign, Clock3, CheckCircle2 } from "lucide-react";

import { fees } from "@/data/fees";
import { students } from "@/data/students";

import StudentFeeTable from "./StudentFeeTable";

export default function StudentFeesPage() {
  const currentStudent = students.find(
    (student) => student.id === 1
  );

  const studentFees = currentStudent
    ? fees.filter(
        (fee) => fee.studentId === currentStudent.id
      )
    : [];

  const totalAmount = studentFees.reduce(
    (total, fee) => total + fee.amount,
    0
  );

  const paidAmount = studentFees.reduce(
    (total, fee) => total + fee.paidAmount,
    0
  );

  const remainingAmount = studentFees.reduce(
    (total, fee) => total + fee.remainingAmount,
    0
  );

  const pendingCount = studentFees.filter(
    (fee) => fee.status === "Pending" || fee.status === "Partial"
  ).length;

  const stats = [
    {
      title: "Total Fees",
      value: `Rs. ${totalAmount.toLocaleString()}`,
      icon: CircleDollarSign,
    },
    {
      title: "Paid Amount",
      value: `Rs. ${paidAmount.toLocaleString()}`,
      icon: CheckCircle2,
    },
    {
      title: "Remaining",
      value: `Rs. ${remainingAmount.toLocaleString()}`,
      icon: Clock3,
    },
    {
      title: "Pending Payments",
      value: pendingCount,
      icon: CreditCard,
    },
  ];

  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Fees
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View your fee details, payments, and outstanding balance.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-900">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                  <Icon size={21} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <StudentFeeTable fees={studentFees} />
    </main>
  );
}