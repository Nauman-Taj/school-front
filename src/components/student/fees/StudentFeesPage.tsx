"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
} from "lucide-react";

import { fetchStudentFees } from "@/lib/student-api";
import type { ApiStudentFee } from "@/lib/student-api";

import StudentStatCards from "../StudentStatCards";
import StudentFeeTable from "./StudentFeeTable";

export default function StudentFeesPage() {
  const [search, setSearch] = useState("");

  const [state, setState] = useState<{
    loaded: boolean;
    fees: ApiStudentFee[];
    error: string;
  }>({
    loaded: false,
    fees: [],
    error: "",
  });

  useEffect(() => {
    let active = true;

    fetchStudentFees()
      .then((fees) => {
        if (!active) return;
        setState({ loaded: true, fees, error: "" });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          loaded: true,
          fees: [],
          error:
            err instanceof Error
              ? err.message
              : "Unable to load your fees.",
        });
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredFees = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return state.fees;

    return state.fees.filter(
      (fee) =>
        fee.invoiceNumber.toLowerCase().includes(value) ||
        fee.feeType.toLowerCase().includes(value) ||
        fee.status.toLowerCase().includes(value) ||
        fee.dueDate.toLowerCase().includes(value)
    );
  }, [search, state.fees]);

  const totalAmount = state.fees.reduce(
    (total, fee) => total + fee.amount,
    0
  );

  const paidAmount = state.fees.reduce(
    (total, fee) => total + fee.paidAmount,
    0
  );

  const remainingAmount = state.fees.reduce(
    (total, fee) => total + fee.remainingAmount,
    0
  );

  const pendingCount = state.fees.filter(
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

  const header = (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Fees</h1>

      <p className="mt-1 text-sm text-gray-500 sm:text-base">
        View your fee details, payments, and outstanding balance.
      </p>
    </div>
  );

  if (!state.loaded && !state.error) {
    return (
      <div className="space-y-5">
        {header}

        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
          <p className="mt-4 text-sm text-gray-500">Loading your fees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {header}

      {state.error && (
        <div
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {state.error}
        </div>
      )}

      <StudentStatCards stats={stats} />

      <StudentFeeTable
        fees={filteredFees}
        search={search}
        setSearch={setSearch}
        total={state.fees.length}
      />
    </div>
  );
}
