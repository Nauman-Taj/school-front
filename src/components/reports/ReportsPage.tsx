"use client";

import { useState } from "react";
import {
    FileText,
    Users,
    ClipboardCheck,
    GraduationCap,
    Wallet,
} from "lucide-react";

import ReportFilters from "@/components/reports/ReportFilters";
import ReportTable from "@/components/reports/ReportTable";

const stats = [
    {
        title: "Student Reports",
        value: "4",
        icon: Users,
    },
    {
        title: "Attendance Reports",
        value: "4",
        icon: ClipboardCheck,
    },
    {
        title: "Academic Reports",
        value: "5",
        icon: GraduationCap,
    },
    {
        title: "Financial Reports",
        value: "4",
        icon: Wallet,
    },
];

export default function ReportsPage() {
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Reports
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Generate and manage school reports.
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

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-[#e6f4f2] p-3 text-[#01796f]">
                                    <Icon size={21} />
                                </div>
                            </div>
                        </div>
                    );
                })}
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