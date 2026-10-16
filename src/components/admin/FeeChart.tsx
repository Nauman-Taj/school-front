
"use client";

import { useEffect, useState } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type FeeSummary = {
  totalFees: number;
  collected: number;
  pending: number;
  overdue: number;
  collectionRate: number;
  invoiceCount: number;
};

const COLORS = ["#01796F", "#E5E7EB"];

const formatCurrency = (amount: number) =>
  `PKR ${amount.toLocaleString("en-PK")}`;

export default function FeeChart() {
  const [summary, setSummary] = useState<FeeSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadFeeSummary() {
      setLoading(true);
      setError("");

      try {
        const token = getAuthToken();

        if (!token) {
          throw new Error("Please log in as an administrator to view fee collection.");
        }

        const result = await apiRequest<FeeSummary>("/fees/summary", {
          token,
        });

        if (!cancelled) {
          setSummary(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load fee collection data."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadFeeSummary();

    return () => {
      cancelled = true;
    };
  }, []);

  const collected = summary?.collected ?? 0;
  const totalFees = summary?.totalFees ?? 0;

  // Use collected and total fees so partially paid invoices
  // are represented accurately.
  const remaining = Math.max(totalFees - collected, 0);

  const feeData = [
    { name: "Collected", value: collected },
    { name: "Remaining", value: remaining },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Fee Collection
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Current collection overview
        </p>
      </div>

      {loading ? (
        <div
          className="flex h-56 items-center justify-center text-sm text-gray-500"
          role="status"
        >
          Loading fee collection...
        </div>
      ) : error ? (
        <div className="flex h-56 flex-col items-center justify-center gap-3 text-center">
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div className="relative mx-auto h-56 w-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={feeData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={68}
                  outerRadius={92}
                  paddingAngle={2}
                  stroke="none"
                >
                  {feeData.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    formatCurrency(Number(value))
                  }
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">
                {summary?.collectionRate ?? 0}%
              </span>

              <span className="text-xs text-gray-500">
                collected
              </span>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-center">
            <p className="text-sm text-gray-600">
              Collected:{" "}
              <span className="font-semibold text-gray-900">
                {formatCurrency(collected)}
              </span>
            </p>

            <p className="text-sm text-gray-600">
              Total fees:{" "}
              <span className="font-semibold text-gray-900">
                {formatCurrency(totalFees)}
              </span>
            </p>
          </div>

          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#01796F]" />
              <span className="text-gray-600">Collected</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-300" />
              <span className="text-gray-600">Remaining</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
