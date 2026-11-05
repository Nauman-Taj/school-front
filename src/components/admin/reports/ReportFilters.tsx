"use client";

import { Search } from "lucide-react";

type ReportFiltersProps = {
  category: string;
  setCategory: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
};

export default function ReportFilters({ category, setCategory, search, setSearch }: ReportFiltersProps) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search reports"
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#01796f] focus:bg-white focus:ring-2 focus:ring-[#01796f]/10"
          />
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10 sm:w-auto"
        >
          <option value="All">All Reports</option>
          <option value="Student">Student Reports</option>
          <option value="Attendance">Attendance Reports</option>
          <option value="Academic">Academic Reports</option>
          <option value="Financial">Financial Reports</option>
        </select>
      </div>
    </div>
  );
}
