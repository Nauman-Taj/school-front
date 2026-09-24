"use client";


import { useMemo, useState } from "react";
import {
  CircleDollarSign,
  CheckCircle2,
  Clock3,
  AlertCircle,
} from "lucide-react";

import { parentFees } from "@/data/parentFees";
import { getCurrentParentChildren } from "@/lib/parent";
import ParentFeeTable from "./ParentFeeTable";

export default function ParentFeesPage() {
  const children = getCurrentParentChildren();

  const [selectedChild, setSelectedChild] = useState(
    children[0]?.id ?? 0
  );

  const fees = useMemo(
    () =>
      parentFees.filter(
        (fee) => fee.childId === selectedChild
      ),
    [selectedChild]
  );

  const total = fees.reduce(
    (sum, fee) => sum + fee.amount,
    0
  );

  const paid = fees
    .filter((fee) => fee.status === "Paid")
    .reduce((sum, fee) => sum + fee.amount, 0);

  const pending = fees
    .filter((fee) => fee.status === "Pending")
    .reduce((sum, fee) => sum + fee.amount, 0);

  const overdue = fees
    .filter((fee) => fee.status === "Overdue")
    .reduce((sum, fee) => sum + fee.amount, 0);

  const formatAmount = (amount: number) =>
    `Rs. ${amount.toLocaleString()}`;

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
      iconClass: "bg-green-50 text-green-600",
    },
    {
      title: "Pending",
      value: formatAmount(pending),
      icon: Clock3,
      iconClass: "bg-yellow-50 text-yellow-600",
    },
    {
      title: "Overdue",
      value: formatAmount(overdue),
      icon: AlertCircle,
      iconClass: "bg-red-50 text-red-600",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Fees
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your child's fee details and payment status.
        </p>
      </div>

      {/* Child Selector */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <label
          htmlFor="child"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Select Child
        </label>

        <select
          id="child"
          value={selectedChild}
          onChange={(e) =>
            setSelectedChild(Number(e.target.value))
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796f] sm:w-80"
        >
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name} — {child.className}
            </option>
          ))}
        </select>
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
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
                >
                  <Icon size={19} />
                </div>
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Fees */}
      <div>
        {/* <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Fee Records
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Fee records for the selected child.
          </p>
        </div> */}

        <ParentFeeTable fees={fees} />
      </div>
    </div>
  );
}
