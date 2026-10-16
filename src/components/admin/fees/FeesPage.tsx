"use client";

import {
  CircleDollarSign,
  Clock3,
  Plus,
  CreditCard,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import FeeTable from "./FeeTable";

interface FeeSummary {
  totalFees: number;
  collected: number;
  pending: number;
  overdue: number;
  collectionRate: number;
  invoiceCount: number;
}

const initialSummary: FeeSummary = {
  totalFees: 0,
  collected: 0,
  pending: 0,
  overdue: 0,
  collectionRate: 0,
  invoiceCount: 0,
};

export default function FeesPage() {
  const [summary, setSummary] =
    useState<FeeSummary>(initialSummary);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadFeeSummary() {
      try {
        setLoading(true);
        setError("");

        const token = getAuthToken();

        if (!token) {
          throw new Error(
            "Your session has expired. Please log in again.",
          );
        }

        const data = await apiRequest<FeeSummary>(
          "/fees/summary",
          { token },
        );

        if (active) {
          setSummary(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load fee statistics.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadFeeSummary();

    return () => {
      active = false;
    };
  }, []);

  const formatCurrency = (amount: number) =>
    `Rs. ${Number(amount).toLocaleString("en-PK", {
      maximumFractionDigits: 2,
    })}`;

  const stats = [
    {
      title: "Total Fees",
      value: formatCurrency(summary.totalFees),
      icon: CircleDollarSign,
      description: "Total invoiced fee amount",
    },
    {
      title: "Collected",
      value: formatCurrency(summary.collected),
      icon: CreditCard,
      description: "Payments received",
    },
    {
      title: "Pending",
      value: formatCurrency(summary.pending),
      icon: Clock3,
      description: "Outstanding fees not yet overdue",
    },
    {
      title: "Overdue",
      value: formatCurrency(summary.overdue),
      icon: AlertCircle,
      description: "Outstanding past-due fees",
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Fees
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage and track student fee payments.
          </p>
        </div>

        <Link
          href="/admin/fees/add"
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <Plus size={17} />
          Add Fee
        </Link>
      </div>

      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-white px-3 py-2 font-medium hover:bg-red-100"
          >
            <RefreshCw size={15} />
            Retry
          </button>
        </div>
      )}

      {/* Fee statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 break-words text-xl font-bold text-gray-900 sm:text-2xl">
                    {loading ? "0" : stat.value}
                  </h2>
                </div>

                <div className="shrink-0 rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {!loading && !error && (
        <p className="text-sm text-gray-500">
          {summary.invoiceCount}{" "}
          {summary.invoiceCount === 1 ? "invoice" : "invoices"}{" "}
          · Collection rate: {summary.collectionRate}%
        </p>
      )}

      {/* We'll connect this table to the API in the next step. */}
      <FeeTable />
    </div>
  );
}










// "use client";

// import {
//     CircleDollarSign,
//     Clock3,
//     Plus,
//     CreditCard,
//     AlertCircle,
// } from "lucide-react";

// import Link from "next/link";
// import { fees } from "@/data/fees";
// import FeeTable from "./FeeTable";

// export default function FeesPage() {
//     const totalFees = fees.reduce(
//         (total, fee) => total + fee.amount,
//         0
//     );

//     const paidFees = fees
//         .filter((fee) => fee.status === "Paid")
//         .reduce((total, fee) => total + fee.amount, 0);

//     const pendingFees = fees
//         .filter(
//             (fee) =>
//                 fee.status === "Pending" ||
//                 fee.status === "Partial"
//         )
//         .reduce(
//             (total, fee) => total + fee.remainingAmount,
//             0
//         );

//     const overdueFees = fees
//         .filter((fee) => fee.status === "Overdue")
//         .reduce(
//             (total, fee) => total + fee.remainingAmount,
//             0
//         );

//     const stats = [
//         {
//             title: "Total Fees",
//             value: `Rs. ${totalFees.toLocaleString()}`,
//             icon: CircleDollarSign,
//             description: "Total fee amount",
//         },
//         {
//             title: "Collected",
//             value: `Rs. ${paidFees.toLocaleString()}`,
//             icon: CreditCard,
//             description: "Fees collected",
//         },
//         {
//             title: "Pending",
//             value: `Rs. ${pendingFees.toLocaleString()}`,
//             icon: Clock3,
//             description: "Awaiting payment",
//         },
//         {
//             title: "Overdue",
//             value: `Rs. ${overdueFees.toLocaleString()}`,
//             icon: AlertCircle,
//             description: "Past due payments",
//         },
//     ];

//     return (
//         <div className="space-y-5">
//             <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

//                 <div>
//                     <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
//                         Fees
//                     </h1>

//                     <p className="mt-1 text-sm text-gray-500 sm:text-base">
//                         Manage and track student fee payments.
//                     </p>
//                 </div>
//                 <Link
//                     href="/admin/fees/add"
//                     className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
//                 >
//                     <Plus size={17} />
//                     Add Fee
//                 </Link>
//             </div>

//             {/* Stats */}
//             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//                 {stats.map((stat) => {
//                     const Icon = stat.icon;

//                     return (
//                         <div
//                             key={stat.title}
//                             className="rounded-2xl border border-gray-200 bg-white p-5"
//                         >
//                             <div className="flex items-start justify-between">
//                                 <div>
//                                     <p className="text-sm font-medium text-gray-500">
//                                         {stat.title}
//                                     </p>

//                                     <h2 className="mt-2 text-2xl font-bold text-gray-900">
//                                         {stat.value}
//                                     </h2>
//                                 </div>
//                                 <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
//                                     <Icon size={20} />
//                                 </div>
//                             </div>
//                             <p className="mt-3 text-sm text-gray-500">
//                                 {stat.description}
//                             </p>
//                         </div>
//                     );
//                 })}
//             </div>

//             <FeeTable />
//         </div>
//     );
// }