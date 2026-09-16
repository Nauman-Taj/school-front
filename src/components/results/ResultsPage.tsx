"use client";

import {
    Award,
    CheckCircle2,
    Plus,
    ClipboardList,
    XCircle,
} from "lucide-react";

import Link from "next/link";
import { results } from "@/data/results";
import ResultTable from "./ResultTable";

export default function ResultsPage() {
    const totalResults = results.length;
    const passedResults = results.filter(
        (result) => result.status === "Pass"
    ).length;
    const failedResults = results.filter(
        (result) => result.status === "Fail"
    ).length;

    const averagePercentage =
        totalResults > 0
            ? (
                results.reduce(
                    (total, result) => total + result.percentage,
                    0
                ) / totalResults
            ).toFixed(1)
            : "0";

    const stats = [
        {
            title: "Total Results",
            value: totalResults,
            icon: ClipboardList,
            description: "Recorded results",
        },
        {
            title: "Passed",
            value: passedResults,
            icon: CheckCircle2,
            description: "Students passed",
        },
        {
            title: "Failed",
            value: failedResults,
            icon: XCircle,
            description: "Students failed",
        },
        {
            title: "Average Result",
            value: `${averagePercentage}%`,
            icon: Award,
            description: "Overall average",
        },
    ];

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Results
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        View and manage student examination results.
                    </p>
                </div>
                <Link
                    href="/dashboard/results/add"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
                >
                    <Plus size={17} />
                    Add Result
                </Link>
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
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        {stat.title}
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                        {stat.value}
                                    </h2>
                                </div>
                                <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
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

            {/* Results Table */}
            <ResultTable />
        </div >
    );
}