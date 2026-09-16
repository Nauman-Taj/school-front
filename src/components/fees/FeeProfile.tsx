import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  UserRound,
} from "lucide-react";

import { Fee } from "@/types/fee";

type FeeProfileProps = {
  fee: Fee;
};

export default function FeeProfile({ fee }: FeeProfileProps) {
  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/fees"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#01796f]"
      >
        <ArrowLeft size={17} />
        Back to Fees
      </Link>

      {/* Student Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <UserRound size={26} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {fee.studentName}
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {fee.rollNo} • {fee.className}
              </p>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-sm font-medium ${
              fee.status === "Paid"
                ? "bg-green-50 text-green-600"
                : fee.status === "Pending"
                ? "bg-yellow-50 text-yellow-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {fee.status}
          </span>
        </div>
      </div>

      {/* Fee Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <CircleDollarSign size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Amount
              </p>

              <p className="mt-1 text-xl font-bold text-gray-900">
                Rs. {fee.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <CreditCard size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Fee Type
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {fee.feeType}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <CalendarDays size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-400">
                Due Date
              </p>

              <p className="mt-1 font-semibold text-gray-800">
                {fee.dueDate}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-xs text-gray-400">
            Paid Date
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {fee.paidDate || "—"}
          </p>
        </div>
      </div>

      {/* Fee Details */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Fee Details
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-xs text-gray-400">
              Student
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {fee.studentName}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Roll Number
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {fee.rollNo}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Class
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {fee.className}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Fee Type
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {fee.feeType}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Amount
            </p>
            <p className="mt-1 font-medium text-gray-800">
              Rs. {fee.amount.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Status
            </p>
            <p className="mt-1 font-medium text-gray-800">
              {fee.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}