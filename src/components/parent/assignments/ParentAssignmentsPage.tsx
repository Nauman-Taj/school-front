"use client";

import { useMemo, useState } from "react";
import {
    ClipboardList,
    CheckCircle2,
    Clock3,
    AlertCircle,
} from "lucide-react";

import { assignments as sharedAssignments } from "@/data/assignments";
import { getCurrentParentChildren } from "@/lib/parent";
import ParentAssignmentTable from "./ParentAssignmentTable";

export default function ParentAssignmentsPage() {
    const children = getCurrentParentChildren();

    const [selectedChild, setSelectedChild] = useState(
        children[0]?.studentId ?? 0
    );

    const selectedStudent = children.find(
        (child) => child.studentId === selectedChild
    );

    const assignments = useMemo(() => {
        if (!selectedStudent) {
            return [];
        }

        return sharedAssignments.filter(
            (assignment) =>
                assignment.className === selectedStudent.className &&
                assignment.section === selectedStudent.section
        );
    }, [selectedStudent]);

    const pending = assignments.filter(
        (assignment) => assignment.status === "Pending"
    ).length;

    const submitted = assignments.filter(
        (assignment) => assignment.status === "Submitted"
    ).length;

    const overdue = assignments.filter(
        (assignment) => assignment.status === "Overdue"
    ).length;

    const stats = [
        {
            title: "Total Assignments",
            value: assignments.length,
            icon: ClipboardList,
            iconClass: "bg-[#e6f4f2] text-[#01796f]",
        },
        {
            title: "Pending",
            value: pending,
            icon: Clock3,
            iconClass: "bg-yellow-50 text-yellow-600",
        },
        {
            title: "Submitted",
            value: submitted,
            icon: CheckCircle2,
            iconClass: "bg-green-50 text-green-600",
        },
        {
            title: "Overdue",
            value: overdue,
            icon: AlertCircle,
            iconClass: "bg-red-50 text-red-600",
        },
    ];

    return (
        <div className="space-y-5">
            {/* Heading */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Assignments
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    View your child's assignments and submission status.
                </p>
            </div>

            {/* Child Selector */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Student
                        </p>

                        <h2 className="mt-1 text-lg font-semibold text-gray-800">
                            {selectedStudent?.name ?? "No student selected"}
                        </h2>

                        {selectedStudent && (
                            <p className="mt-1 text-sm text-gray-500">
                                {selectedStudent.className} - Section{" "}
                                {selectedStudent.section}
                                {" • "}
                                Roll No: {selectedStudent.rollNo}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="child"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Select Child
                        </label>

                        <select
                            id="child"
                            value={selectedChild}
                            onChange={(e) =>
                                setSelectedChild(Number(e.target.value))
                            }
                            className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/20 sm:w-80"
                        >
                            {children.map((child) => (
                                <option
                                    key={child.studentId}
                                    value={child.studentId}
                                >
                                    {child.name} --- {child.className}-
                                    {child.section}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
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
                                <p className="text-sm font-medium text-gray-500">
                                    {stat.title}
                                </p>

                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
                                >
                                    <Icon size={19} />
                                </div>
                            </div>

                            <h2 className="mt-3 text-2xl font-bold text-gray-900">
                                {stat.value}
                            </h2>
                        </div>
                    );
                })}
            </div>

            {/* Assignments */}
            <ParentAssignmentTable assignments={assignments} />
        </div>
    );
}