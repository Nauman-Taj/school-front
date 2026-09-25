"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { Fee } from "@/types/fee";
import { students } from "@/data/students";

type FeeFormProps = {
  fee?: Fee;
};

export default function FeeForm({ fee }: FeeFormProps) {
  const router = useRouter();

  const [studentId, setStudentId] = useState(
    fee?.studentId ? String(fee.studentId) : ""
  );

  const [feeType, setFeeType] = useState<Fee["feeType"]>(
    fee?.feeType || "Tuition Fee"
  );

  const [amount, setAmount] = useState(
    fee?.amount ? String(fee.amount) : ""
  );

  const [paidAmount, setPaidAmount] = useState(
    fee?.paidAmount !== undefined ? String(fee.paidAmount) : "0"
  );

  const [dueDate, setDueDate] = useState(fee?.dueDate || "");

  const [status, setStatus] = useState<Fee["status"]>(
    fee?.status || "Pending"
  );

  const selectedStudent = students.find(
    (student) => student.id === Number(studentId)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStudent) return;

    const amountValue = Number(amount);
    const paidAmountValue = Number(paidAmount);
    const remainingAmountValue = Math.max(
      amountValue - paidAmountValue,
      0
    );

    const feeData: Fee = {
      id: fee?.id || `F${Date.now()}`,
      studentId: selectedStudent.id,
      student: selectedStudent.name,
      className: selectedStudent.className,
      section: selectedStudent.section,
      feeType,
      amount: amountValue,
      paidAmount: paidAmountValue,
      remainingAmount: remainingAmountValue,
      dueDate,
      status,
    };

    console.log(feeData);

    router.push("/admin/fees");
  };

  return (
    <div className="space-y-5">
      {/* Back */}
      <Link
        href="/admin/fees"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#01796F]"
      >
        <ArrowLeft size={18} />
        Back to Fees
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {fee ? "Edit Fee" : "Add Fee"}
        </h1>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Student */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Student
            </label>

            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="">Select student</option>

              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name} ({student.className}-{student.section})
                </option>
              ))}
            </select>
          </div>

          {/* Class */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>

            <input
              type="text"
              value={
                selectedStudent
                  ? `${selectedStudent.className}-${selectedStudent.section}`
                  : ""
              }
              readOnly
              placeholder="Select student first"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
            />
          </div>

          {/* Fee Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Fee Type
            </label>

            <select
              value={feeType}
              onChange={(e) =>
                setFeeType(e.target.value as Fee["feeType"])
              }
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="Tuition Fee">Tuition Fee</option>
              <option value="Admission Fee">Admission Fee</option>
              <option value="Exam Fee">Exam Fee</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amount
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          {/* Paid Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Paid Amount
            </label>

            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(e.target.value)}
              placeholder="Enter paid amount"
              min="0"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          {/* Remaining Amount */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Remaining Amount
            </label>

            <input
              type="text"
              value={
                amount
                  ? `Rs. ${Math.max(
                      Number(amount) - Number(paidAmount || 0),
                      0
                    ).toLocaleString()}`
                  : ""
              }
              readOnly
              placeholder="Calculated automatically"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
            />
          </div>

          {/* Due Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as Fee["status"])
              }
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="Paid">Paid</option>
              <option value="Partial">Partial</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/fees"
            className="rounded-full border border-gray-200 px-5 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            {fee ? "Update Fee" : "Add Fee"}
          </button>
        </div>
      </form>
    </div>
  );
}