"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CircleDollarSign,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

import { fetchChildFees } from "@/lib/fees-api";
import { useParentProfile } from "@/lib/useParentProfile";
import type { Fee } from "@/types/fee";

import ParentFeeTable from "./ParentFeeTable";

export default function ParentFeesPage() {
  const {
    children,
    loading: profileLoading,
    error: profileError,
  } = useParentProfile();

  const [selectedChildId, setSelectedChildId] = useState<number | null>(null);

  const selectedStudent = useMemo(
    () =>
      children.find((child) => child.id === selectedChildId) ??
      children[0],
    [children, selectedChildId]
  );

  const selectedStudentId = selectedStudent?.id ?? null;

  const [feeState, setFeeState] = useState<{
    studentId: number | null;
    fees: Fee[];
    error: string;
  }>({
    studentId: null,
    fees: [],
    error: "",
  });

  useEffect(() => {
    if (selectedStudentId === null) return;

    let active = true;

    fetchChildFees(selectedStudentId)
      .then((data) => {
        if (!active) return;
        setFeeState({
          studentId: selectedStudentId,
          fees: data,
          error: "",
        });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setFeeState({
          studentId: selectedStudentId,
          fees: [],
          error:
            err instanceof Error ? err.message : "Unable to load fees.",
        });
      });

    return () => {
      active = false;
    };
  }, [selectedStudentId]);

  // A stored fee belongs to the previously selected child until the new
  // request resolves, so treat that mismatch as loading.
  const feesLoading =
    selectedStudentId !== null && feeState.studentId !== selectedStudentId;

  const results = feesLoading ? [] : feeState.fees;
  const feesError = feesLoading ? "" : feeState.error;

  const total = results.reduce((sum, fee) => sum + fee.amount, 0);

  const paid = results.reduce((sum, fee) => sum + fee.paidAmount, 0);

  // Outstanding balances are split by due date, the same way the Admin fee
  // summary does it, so a partly paid invoice is still counted.
  const today = new Date().toISOString().slice(0, 10);

  const outstanding = results.filter((fee) => fee.remainingAmount > 0);

  const pending = outstanding
    .filter((fee) => fee.dueDate >= today)
    .reduce((sum, fee) => sum + fee.remainingAmount, 0);

  const overdue = outstanding
    .filter((fee) => fee.dueDate < today)
    .reduce((sum, fee) => sum + fee.remainingAmount, 0);

  const formatAmount = (amount: number) => `Rs. ${amount.toLocaleString()}`;

  const stats = [
    {
      title: "Total Fees",
      value: formatAmount(total),
      icon: CircleDollarSign,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
    {
      title: "Paid",
      value: formatAmount(paid),
      icon: CheckCircle2,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
    {
      title: "Pending",
      value: formatAmount(pending),
      icon: Clock3,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
    {
      title: "Overdue",
      value: formatAmount(overdue),
      icon: AlertCircle,
      iconClass: "bg-[#e6f4f2] text-[#01796f]",
    },
  ];

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        Fees
      </h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View your child&apos;s fee details and payment status.
      </p>
    </div>
  );

  if (profileLoading) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">
            Loading fees...
          </p>
        </div>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="space-y-5">
        {header}

        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {profileError}
        </div>
      </div>
    );
  }

  if (!selectedStudent) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Child data not found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            No fee information is available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Heading */}
      {header}

      {/* Child Information + Selector */}
      <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="text-sm font-medium text-gray-500">
            Selected Child
          </p>

          <h2 className="mt-2 text-xl font-bold text-gray-800">
            {selectedStudent.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {selectedStudent.className} - Section{" "}
            {selectedStudent.section}
            {" • "}
            Roll No: {selectedStudent.rollNo}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <label
            htmlFor="child"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Select Child
          </label>

          <select
            id="child"
            value={selectedStudent.id}
            onChange={(e) =>
              setSelectedChildId(Number(e.target.value))
            }
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
          >
            {children.map((child) => (
              <option key={child.id} value={child.id}>
                {child.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon size={20} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {feesLoading ? "-" : stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Fee Records */}
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Fee Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Fee records for {selectedStudent.name}.
          </p>
        </div>

        {feesError && (
          <div
            role="alert"
            className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {feesError}
          </div>
        )}

        {feesLoading ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
            <p className="mt-4 text-sm text-gray-500">
              Loading fee records...
            </p>
          </div>
        ) : (
          <ParentFeeTable fees={results} />
        )}
      </div>
    </div>
  );
}
