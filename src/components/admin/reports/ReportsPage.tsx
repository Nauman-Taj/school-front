"use client";

import { useState } from "react";
import { reports } from "@/data/reports";
import ReportFilters from "@/components/admin/reports/ReportFilters";
import ReportTable from "@/components/admin/reports/ReportTable";

export default function ReportsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const stats = [
    {
      title: "Student Reports",
      value: reports.filter((report) => report.category === "Student").length,
    },
    {
      title: "Attendance Reports",
      value: reports.filter((report) => report.category === "Attendance").length,
    },
    {
      title: "Academic Reports",
      value: reports.filter((report) => report.category === "Academic").length,
    },
    {
      title: "Financial Reports",
      value: reports.filter((report) => report.category === "Financial").length,
    },
  ];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Reports
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Generate and manage school reports.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-gray-500">{stat.title}</p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              {stat.value}
            </h2>
          </div>
        ))}
      </div>

      {/* Filters */}
      <ReportFilters
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
      />

      {/* Reports */}
      <ReportTable
        category={category}
        search={search}
      />
    </div>
  );
}
