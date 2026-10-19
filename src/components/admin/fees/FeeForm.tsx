"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { Fee } from "@/types/fee";
import { students } from "@/data/students";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type FeeFormProps = {
  fee?: Fee & {
    invoiceNumber?: string;
  };
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
    fee ? String(fee.amount) : ""
  );

  const [dueDate, setDueDate] = useState(fee?.dueDate || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedStudent = students.find(
    (student) => student.id === Number(studentId)
  );

  const paidAmount = Number(fee?.paidAmount ?? 0);
  const amountValue = Number(amount);
  const remainingAmount = Math.max(amountValue - paidAmount, 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!fee && !selectedStudent) {
      setError("Please select a student.");
      return;
    }

    if (!Number.isFinite(amountValue) || amountValue <= 0) {
      setError("Fee amount must be greater than zero.");
      return;
    }

    if (fee && amountValue + 0.000001 < paidAmount) {
      setError(
        `Fee amount cannot be less than the amount already paid (Rs. ${paidAmount.toLocaleString()}).`
      );
      return;
    }

    if (!fee && !studentId) {
      setError("Please select a student.");
      return;
    }

    const token = getAuthToken();

    if (!token) {
      setError("Your session has expired. Please log in again.");
      return;
    }

    const payload = {
      feeType,
      amount: amountValue,
      dueDate,
      ...(!fee && selectedStudent
        ? { studentId: selectedStudent.id }
        : {}),
    };

    setSaving(true);

    try {
      if (fee) {
        await apiRequest<Fee>(
          `/fees/${encodeURIComponent(fee.id)}`,
          {
            method: "PATCH",
            token,
            body: JSON.stringify(payload),
          }
        );
      } else {
        await apiRequest<Fee>("/fees", {
          method: "POST",
          token,
          body: JSON.stringify(payload),
        });
      }

      router.push("/admin/fees");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save the fee. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <Link
        href="/admin/fees"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#01796F]"
      >
        <ArrowLeft size={18} />
        Back to Fees
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {fee ? "Edit Fee" : "Add Fee"}
        </h1>

        {fee && (
          <p className="mt-1 text-sm text-gray-500">
            Invoice Number:{" "}
            <span className="font-semibold text-[#01796F]">
              {fee.invoiceNumber ?? "Unavailable"}
            </span>
          </p>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-6"
      >
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Student
            </label>

            {fee ? (
              <input
                type="text"
                value={`${fee.student} (${fee.className}-${fee.section})`}
                readOnly
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
              />
            ) : (
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
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Class
            </label>
            <input
              type="text"
              value={
                fee
                  ? `${fee.className}-${fee.section}`
                  : selectedStudent
                    ? `${selectedStudent.className}-${selectedStudent.section}`
                    : ""
              }
              readOnly
              placeholder="Select student first"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
            />
          </div>

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
              {!["Tuition Fee", "Admission Fee", "Exam Fee"].includes(feeType) && (
                <option value={feeType}>{feeType}</option>
              )}
              <option value="Tuition Fee">Tuition Fee</option>
              <option value="Admission Fee">Admission Fee</option>
              <option value="Exam Fee">Exam Fee</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amount (Rs.)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min={fee ? paidAmount : 0.01}
              step="0.01"
              required
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Paid Amount (Rs.)
            </label>
            <input
              type="text"
              value={paidAmount.toLocaleString()}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Calculated from recorded payments.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Remaining Amount (Rs.)
            </label>
            <input
              type="text"
              value={amount ? remainingAmount.toLocaleString() : ""}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
            />
          </div>

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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>
            <input
              type="text"
              value={fee?.status ?? "Calculated when saved"}
              readOnly
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 outline-none"
            />
            <p className="mt-1 text-xs text-gray-500">
              Status is determined by payments and due date.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link
            href="/admin/fees"
            className="rounded-full border border-gray-200 px-5 py-3 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : fee
                ? "Update Fee"
                : "Add Fee"}
          </button>
        </div>
      </form>
    </div>
  );
}
