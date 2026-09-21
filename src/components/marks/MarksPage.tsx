"use client";

import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  Users,
} from "lucide-react";

import MarksTable from "./MarksTable";
import { results } from "@/data/results";

export default function MarksPage() {
  const total = results.length;

  const passed = results.filter(
    (result) => result.status === "Pass"
  ).length;

  const failed = results.filter(
    (result) => result.status === "Fail"
  ).length;

  const average =
    total > 0
      ? (
        results.reduce(
          (sum, result) => sum + result.percentage,
          0
        ) / total
      ).toFixed(1)
      : "0";

  const stats = [
    {
      title: "Total Students",
      value: total,
      icon: Users,
    },
    {
      title: "Passed",
      value: passed,
      icon: CheckCircle2,
    },
    {
      title: "Failed",
      value: failed,
      icon: Clock3,
    },
    {
      title: "Average",
      value: `${average}%`,
      icon: ClipboardList,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Marks
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Enter and manage student marks
        </p>
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
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-800">
                    {stat.value}
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                  <Icon size={21} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Marks */}
      <MarksTable />
    </div>
  );
}