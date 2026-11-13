"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Award,
    BookOpen,
    GraduationCap,
    TrendingUp,
} from "lucide-react";

import { fetchChildResults } from "@/lib/results-api";
import { useParentProfile } from "@/lib/useParentProfile";
import type { Result } from "@/types/result";

import ParentResultsTable from "./ParentResultsTable";

export default function ParentResultsPage() {
    const {
        children,
        loading: profileLoading,
        error: profileError,
    } = useParentProfile();

    const [selectedChildId, setSelectedChildId] = useState<number | null>(
        null
    );

    const selectedStudent = useMemo(
        () =>
            children.find((child) => child.id === selectedChildId) ??
            children[0],
        [children, selectedChildId]
    );

    const selectedStudentId = selectedStudent?.id ?? null;

    const [resultState, setResultState] = useState<{
        studentId: number | null;
        results: Result[];
        error: string;
    }>({
        studentId: null,
        results: [],
        error: "",
    });

    useEffect(() => {
        if (selectedStudentId === null) return;

        let active = true;

        fetchChildResults(selectedStudentId)
            .then((data) => {
                if (!active) return;
                setResultState({
                    studentId: selectedStudentId,
                    results: data,
                    error: "",
                });
            })
            .catch((err: unknown) => {
                if (!active) return;
                setResultState({
                    studentId: selectedStudentId,
                    results: [],
                    error:
                        err instanceof Error
                            ? err.message
                            : "Unable to load results.",
                });
            });

        return () => {
            active = false;
        };
    }, [selectedStudentId]);

    // A stored result belongs to the previously selected child until the new
    // request resolves, so treat that mismatch as loading.
    const resultsLoading =
        selectedStudentId !== null &&
        resultState.studentId !== selectedStudentId;

    const results = resultsLoading ? [] : resultState.results;
    const resultsError = resultsLoading ? "" : resultState.error;

    const average =
        results.length > 0
            ? Math.round(
                  results.reduce(
                      (sum, result) => sum + result.percentage,
                      0
                  ) / results.length
              )
            : 0;

    const highest = results.length
        ? Math.max(
              ...results.map((result) => result.percentage)
          )
        : 0;

    const passed = results.filter(
        (result) => result.status === "Pass"
    ).length;

    const stats = [
        {
            title: "Average",
            value: `${average}%`,
            icon: TrendingUp,
            iconClass: "bg-[#e6f4f2] text-[#01796f]",
        },
        {
            title: "Highest",
            value: `${highest}%`,
            icon: Award,
            iconClass: "bg-[#e6f4f2] text-[#01796f]",
        },
        {
            title: "Subjects",
            value: results.length,
            icon: BookOpen,
            iconClass: "bg-[#e6f4f2] text-[#01796f]",
        },
        {
            title: "Passed",
            value: `${passed}/${results.length}`,
            icon: GraduationCap,
            iconClass: "bg-[#e6f4f2] text-[#01796f]",
        },
    ];

    const header = (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Results
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
                View your child's examination results and academic
                performance.
            </p>
        </div>
    );

    if (profileLoading) {
        return (
            <div className="space-y-5">
                {header}

                <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
                    <p className="mt-4 text-sm text-gray-500">
                        Loading results...
                    </p>
                </div>
            </div>
        );
    }

    if (profileError) {
        return (
            <div className="space-y-5">
                {header}

                <div
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                    {profileError}
                </div>
            </div>
        );
    }

    if (!selectedStudent) {
        return (
            <div className="space-y-5">
                {header}

                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Child data not found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        No results information is available.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Heading */}
            {header}

            {/* Child Information + Selector */}
            <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Selected Child
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-gray-900">
                        {selectedStudent.name}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {selectedStudent.className} - Section{" "}
                        {selectedStudent.section}
                        {" • "}
                        Roll No: {selectedStudent.rollNo}
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <label
                        htmlFor="child"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Select Child
                    </label>

                    <select
                        id="child"
                        value={selectedStudent.id}
                        onChange={(e) =>
                            setSelectedChildId(Number(e.target.value))
                        }
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
                    >
                        {children.map((child) => (
                            <option key={child.id} value={child.id}>
                                {child.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    {stat.title}
                                </p>

                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                                >
                                    <Icon size={20} />
                                </div>
                            </div>

                            <h2 className="mt-2 text-2xl font-bold text-gray-900">
                                {resultsLoading ? "0" : stat.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* Results Records */}
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Results Records
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Examination results for {selectedStudent.name}.
                    </p>
                </div>

                {resultsError && (
                    <div
                        role="alert"
                        className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                    >
                        {resultsError}
                    </div>
                )}

                {resultsLoading ? (
                    <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
                        <p className="mt-4 text-sm text-gray-500">
                            Loading results records...
                        </p>
                    </div>
                ) : (
                    <ParentResultsTable results={results} />
                )}
            </div>
        </div>
    );
}
