"use client";

import { Search } from "lucide-react";

type ReportFiltersProps = {
    category: string;
    setCategory: (value: string) => void;
    search: string;
    setSearch: (value: string) => void;
};

export default function ReportFilters({
    category,
    setCategory,
    search,
    setSearch,
}: ReportFiltersProps) {
    return (
        // <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1">
                <Search
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                />
            </div>
            
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
                <option value="All">All Reports</option>
                <option value="Student">Student Reports</option>
                <option value="Attendance">Attendance Reports</option>
                <option value="Academic">Academic Reports</option>
                <option value="Financial">Financial Reports</option>
            </select>
        </div>
        // {/* </div> */}
    );
}