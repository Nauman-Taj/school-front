"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { Result } from "@/types/result";

type ParentResultsTableProps = {
    results: Result[];
};

export default function ParentResultsTable({
    results,
}: ParentResultsTableProps) {
    const [search, setSearch] = useState("");

    const filteredResults = results.filter((result) => {
        const searchTerm = search.toLowerCase();

        return (
            result.subject.toLowerCase().includes(searchTerm) ||
            result.examId.toLowerCase().includes(searchTerm) ||
            result.grade.toLowerCase().includes(searchTerm) ||
            result.percentage.toString().includes(searchTerm) ||
            result.obtainedMarks.toString().includes(searchTerm) ||
            result.totalMarks.toString().includes(searchTerm)
        );
    });

    return (
        <div className="space-y-5">
            {/* Search */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                <div className="relative">
                    <Search
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search results"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:bg-white focus:ring-2 focus:ring-[#01796F]/10"
                    />
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="px-5 py-4 font-semibold">
                                    Subject
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Exam
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Marks
                                </th>

                                <th className="px-5 py-4 font-semibold">
                                    Percentage
                                </th>

                                <th className="px-5 py-4 text-center font-semibold">
                                    Grade
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {filteredResults.map((result) => (
                                <tr
                                    key={result.id}
                                    className="transition hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4 font-medium text-gray-900">
                                        {result.subject}
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {result.examId}
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {result.obtainedMarks} /{" "}
                                        {result.totalMarks}
                                    </td>

                                    <td className="px-5 py-4 text-gray-600">
                                        {result.percentage}%
                                    </td>

                                    <td className="px-5 py-4 text-center">
                                        <span className="inline-flex min-w-10 justify-center rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                                            {result.grade}
                                        </span>
                                    </td>
                                </tr>
                            ))}

                            {filteredResults.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-5 py-8 text-center text-sm text-gray-500"
                                    >
                                        No results found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">
                    Showing {filteredResults.length} of {results.length} results
                </div>
            </div>

            {/* Mobile */}
            <p className="text-sm text-gray-500 md:hidden">
                Showing {filteredResults.length} of {results.length} results
            </p>

            <div className="space-y-3 md:hidden">
                {filteredResults.map((result) => (
                    <div
                        key={result.id}
                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {result.subject}
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {result.examId}
                                </p>
                            </div>

                            <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                                {result.grade}
                            </span>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                            <div>
                                <p className="text-gray-500">Marks</p>

                                <p className="mt-1 font-medium text-gray-900">
                                    {result.obtainedMarks} /{" "}
                                    {result.totalMarks}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Percentage
                                </p>

                                <p className="mt-1 font-medium text-gray-900">
                                    {result.percentage}%
                                </p>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredResults.length === 0 && (
                    <div className="rounded-2xl border border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
                        No results found.
                    </div>
                )}
            </div>
        </div>
    );
}