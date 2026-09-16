"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { Fee } from "@/types/fee";

type FeeFormProps = {
  fee?: Fee;
};

export default function FeeForm({ fee }: FeeFormProps) {
  const router = useRouter();

  const [studentName, setStudentName] = useState(fee?.studentName || "");
  const [rollNo, setRollNo] = useState(fee?.rollNo || "");
  const [className, setClassName] = useState(fee?.className || "");
  const [feeType, setFeeType] = useState(fee?.feeType || "Monthly Fee");
  const [amount, setAmount] = useState(
    fee?.amount ? String(fee.amount) : ""
  );
  const [dueDate, setDueDate] = useState(fee?.dueDate || "");
  const [paidDate, setPaidDate] = useState(fee?.paidDate || "");
  const [status, setStatus] = useState<Fee["status"]>(
    fee?.status || "Pending"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const feeData = {
      id: fee?.id || `F${Date.now()}`,
      studentName,
      rollNo,
      className,
      feeType,
      amount: Number(amount),
      dueDate,
      paidDate: paidDate || undefined,
      status,
    };

    console.log(feeData);

    router.push("/dashboard/fees");
  };

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/dashboard/fees"
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

        {/* <p className="mt-1 text-sm text-gray-500">
          {fee
            ? "Update the fee record details."
            : "Add a new fee record for a student."}
        </p> */}
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-200 bg-white p-6"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Student Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Student Name
            </label>

            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          {/* Roll Number */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Roll Number
            </label>

            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="e.g. 101"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          {/* Class */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>

            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="">Select class</option>
              <option value="Grade 5">Grade 5</option>
              <option value="Grade 6">Grade 6</option>
              <option value="Grade 7">Grade 7</option>
              <option value="Grade 8">Grade 8</option>
            </select>
          </div>

          {/* Fee Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Fee Type
            </label>

            <select
              value={feeType}
              onChange={(e) => setFeeType(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            >
              <option value="Monthly Fee">Monthly Fee</option>
              <option value="Admission Fee">Admission Fee</option>
              <option value="Exam Fee">Exam Fee</option>
              <option value="Transport Fee">Transport Fee</option>
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

          {/* Paid Date */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Paid Date
            </label>

            <input
              type="date"
              value={paidDate}
              onChange={(e) => setPaidDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />

            {/* <p className="mt-1 text-xs text-gray-400">
              Leave empty if the fee has not been paid.
            </p> */}
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
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard/fees"
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