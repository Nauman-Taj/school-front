"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  CreditCard,
  UserRound,
  ReceiptText,
  Plus,
  LoaderCircle,
  X,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { Fee } from "@/types/fee";

type FeePayment = {
  id: string;
  feeId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string | null;
  receiptNumber: string;
};

type FeeProfileProps = {
  fee: Fee & {
    id: string;
    invoiceNumber: string;
    payments?: FeePayment[];
  };
  onPaymentRecorded?: () => void;
};

type PaymentForm = {
  amount: string;
  paymentMethod: string;
  paymentDate: string;
  transactionId: string;
};

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatAmount(amount: number) {
  return `Rs. ${Number(amount).toLocaleString("en-PK")}`;
}

function formatDate(date: string) {
  if (!date) return "—";

  const [year, month, day] = date.slice(0, 10).split("-");
  return `${day}-${month}-${year}`;
}

function getStatusClass(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-50 text-green-600";
    case "Partial":
      return "bg-blue-50 text-blue-600";
    case "Pending":
      return "bg-yellow-50 text-yellow-600";
    case "Overdue":
      return "bg-red-50 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default function FeeProfile({
  fee,
  onPaymentRecorded,
}: FeeProfileProps) {
  const payments = fee.payments ?? [];
  const remainingAmount = Number(fee.remainingAmount);

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");

  const [form, setForm] = useState<PaymentForm>({
    amount: "",
    paymentMethod: "Cash",
    paymentDate: getTodayDate(),
    transactionId: "",
  });

  function resetPaymentForm() {
    setForm({
      amount: "",
      paymentMethod: "Cash",
      paymentDate: getTodayDate(),
      transactionId: "",
    });
    setPaymentError("");
    setPaymentSuccess("");
  }

  async function handleRecordPayment(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setPaymentError("");
    setPaymentSuccess("");

    const amount = Number(form.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setPaymentError("Enter a valid payment amount greater than zero.");
      return;
    }

    if (amount > remainingAmount) {
      setPaymentError(
        `Payment cannot exceed the remaining balance of ${formatAmount(remainingAmount)}.`,
      );
      return;
    }

    if (!form.paymentDate) {
      setPaymentError("Select the payment date.");
      return;
    }

    try {
      setSubmitting(true);

      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      // Use the UUID database ID for the payment endpoint.
      await apiRequest<FeePayment>(
        `/fees/${encodeURIComponent(fee.id)}/payments`,
        {
          method: "POST",
          token,
          body: JSON.stringify({
            amount,
            paymentMethod: form.paymentMethod,
            paymentDate: form.paymentDate,
            ...(form.transactionId.trim()
              ? { transactionId: form.transactionId.trim() }
              : {}),
          }),
        },
      );

      setShowPaymentForm(false);
      resetPaymentForm();
      setPaymentSuccess(
        `Payment recorded successfully for invoice ${fee.invoiceNumber}.`,
      );

      onPaymentRecorded?.();
    } catch (error) {
      setPaymentError(
        error instanceof Error
          ? error.message
          : "Failed to record payment. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <Link
        href="/admin/fees"
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
                {fee.student}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Invoice: {fee.invoiceNumber} · Student ID: {fee.studentId} ·{" "}
                {fee.className}-{fee.section}
              </p>
            </div>
          </div>

          <span
            className={`w-fit rounded-full px-3 py-1.5 text-sm font-medium ${getStatusClass(fee.status)}`}
          >
            {fee.status}
          </span>
        </div>
      </div>

      {/* Fee Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: "Total Amount",
            value: fee.amount,
            icon: CircleDollarSign,
          },
          {
            label: "Paid Amount",
            value: fee.paidAmount,
            icon: CreditCard,
          },
          {
            label: "Remaining Amount",
            value: fee.remainingAmount,
            icon: CircleDollarSign,
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                  <Icon size={20} />
                </div>

                <div>
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <p className="mt-1 text-xl font-bold text-gray-900">
                    {formatAmount(Number(item.value))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
              <CalendarDays size={20} />
            </div>

            <div>
              <p className="text-xs text-gray-400">Due Date</p>
              <p className="mt-1 font-semibold text-gray-800">
                {formatDate(fee.dueDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Details */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Fee Details</h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Invoice Number", fee.invoiceNumber],
            ["Student", fee.student],
            ["Student ID", String(fee.studentId)],
            ["Class", `${fee.className}-${fee.section}`],
            ["Fee Type", fee.feeType],
            ["Total Amount", formatAmount(Number(fee.amount))],
            ["Paid Amount", formatAmount(Number(fee.paidAmount))],
            ["Remaining Amount", formatAmount(remainingAmount)],
            ["Due Date", formatDate(fee.dueDate)],
            ["Status", fee.status],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-xs text-gray-400">{label}</p>
              <p className="mt-1 font-medium text-gray-800">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Record Payment */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Record Payment
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Invoice {fee.invoiceNumber} · Remaining balance:{" "}
              {formatAmount(remainingAmount)}
            </p>
          </div>

          {remainingAmount > 0 && (
            <button
              type="button"
              onClick={() => {
                setPaymentError("");
                setPaymentSuccess("");
                setShowPaymentForm((previous) => !previous);
              }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
            >
              {showPaymentForm ? <X size={17} /> : <Plus size={17} />}
              {showPaymentForm ? "Cancel" : "Record Payment"}
            </button>
          )}
        </div>

        {paymentSuccess && (
          <p
            role="status"
            className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700"
          >
            {paymentSuccess}
          </p>
        )}

        {paymentError && !showPaymentForm && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {paymentError}
          </p>
        )}

        {remainingAmount <= 0 && (
          <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
            This invoice is fully paid. No additional payment is required.
          </p>
        )}

        {showPaymentForm && remainingAmount > 0 && (
          <form
            onSubmit={handleRecordPayment}
            className="mt-6 space-y-5 border-t border-gray-100 pt-6"
          >
            {paymentError && (
              <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
                {paymentError}
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="paymentAmount"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Payment Amount (Rs.)
                </label>
                <input
                  id="paymentAmount"
                  type="number"
                  min="0.01"
                  max={remainingAmount}
                  step="0.01"
                  required
                  value={form.amount}
                  onChange={(event) =>
                    setForm({ ...form, amount: event.target.value })
                  }
                  placeholder={`Maximum ${remainingAmount}`}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="paymentMethod"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  required
                  value={form.paymentMethod}
                  onChange={(event) =>
                    setForm({ ...form, paymentMethod: event.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Online">Online</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="paymentDate"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Payment Date
                </label>
                <input
                  id="paymentDate"
                  type="date"
                  required
                  max={getTodayDate()}
                  value={form.paymentDate}
                  onChange={(event) =>
                    setForm({ ...form, paymentDate: event.target.value })
                  }
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="transactionId"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Transaction ID
                  <span className="ml-1 font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>
                <input
                  id="transactionId"
                  type="text"
                  value={form.transactionId}
                  onChange={(event) =>
                    setForm({ ...form, transactionId: event.target.value })
                  }
                  placeholder="Enter transaction reference"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <button
                type="button"
                disabled={submitting}
                onClick={() => {
                  setShowPaymentForm(false);
                  resetPaymentForm();
                }}
                className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting && (
                  <LoaderCircle size={17} className="animate-spin" />
                )}
                {submitting ? "Saving Payment..." : "Save Payment"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Payment History */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
        <div className="flex items-center gap-3 border-b border-gray-100 p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
            <ReceiptText size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Payment History
            </h2>
            <p className="text-sm text-gray-500">
              Invoice {fee.invoiceNumber} · {payments.length} payment
              {payments.length === 1 ? "" : "s"} recorded
            </p>
          </div>
        </div>

        {payments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 font-semibold text-gray-600">
                    Receipt
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-600">
                    Method
                  </th>
                  <th className="px-5 py-3 font-semibold text-gray-600">
                    Transaction
                  </th>
                  <th className="px-5 py-3 text-right font-semibold text-gray-600">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-medium text-gray-800">
                      {payment.receiptNumber}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {formatDate(payment.paymentDate)}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {payment.paymentMethod}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {payment.transactionId || "—"}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-gray-800">
                      {formatAmount(payment.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center">
            <CreditCard size={26} className="mx-auto text-gray-300" />
            <p className="mt-3 text-sm font-medium text-gray-700">
              No payments recorded
            </p>
            <p className="mt-1 text-sm text-gray-400">
              Payments for this invoice will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}