"use client";

import { useState } from "react";
import {
    Bell,
    CalendarDays,
    ClipboardList,
    GraduationCap,
    UserRound,
    Wallet,
} from "lucide-react";

import { parents } from "@/data/parents";
import { parentDashboardData } from "@/data/parentDashboard";

export default function ParentDashboard() {
    // Temporary logged-in parent.
    // Later this will come from getSession().
    const parent = parents[0];

    const [selectedChild, setSelectedChild] = useState(
        parent.children[0]
    );

    const childData = parentDashboardData.find(
        (child) => child.childName === selectedChild
    );

    if (!childData) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                    Child data not found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    No dashboard information is available for this child.
                </p>
            </div>
        );
    }

    const stats = [
        {
            title: "Attendance",
            value: `${childData.attendance.percentage}%`,
            icon: CalendarDays,
        },
        {
            title: "Pending Assignments",
            value: childData.assignments.pending,
            icon: ClipboardList,
        },
        {
            title: "Pending Fees",
            value: `Rs. ${childData.fees.pending.toLocaleString()}`,
            icon: Wallet,
        },
        {
            title: "Upcoming Exams",
            value: childData.upcomingExams,
            icon: GraduationCap,
        },
    ];

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          Welcome back. Here's is your child regarding information.
        </p>
      </div>

            {/* Parent Information + Child Selector */}
            <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
                            <UserRound size={23} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-gray-800">
                                {parent.name}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {parent.email}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {parent.phone}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <label
                        htmlFor="child"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Select Child
                    </label>

                    <select
                        id="child"
                        value={selectedChild}
                        onChange={(e) => setSelectedChild(e.target.value)}
                        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                    >
                        {parent.children.map((child) => (
                            <option key={child} value={child}>
                                {child}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Selected Child */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Selected Child
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-gray-800">
                            {childData.childName}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {childData.className} - Section {childData.section}
                            {" • "}
                            Roll No: {childData.rollNo}
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-[#e6f4f2] px-3 py-1 text-sm font-medium text-[#01796F]">
                        Active Student
                    </span>
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

            {/* Child Summary */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Attendance */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Attendance
                    </h2>

                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-xl bg-[#e6f4f2] p-4">
                            <p className="text-xs text-gray-500">Present</p>
                            <p className="mt-1 text-xl font-bold text-gray-800">
                                {childData.attendance.present}
                            </p>
                        </div>

                        <div className="rounded-xl bg-red-50 p-4">
                            <p className="text-xs text-gray-500">Absent</p>
                            <p className="mt-1 text-xl font-bold text-gray-800">
                                {childData.attendance.absent}
                            </p>
                        </div>

                        <div className="rounded-xl bg-yellow-50 p-4">
                            <p className="text-xs text-gray-500">Late</p>
                            <p className="mt-1 text-xl font-bold text-gray-800">
                                {childData.attendance.late}
                            </p>
                        </div>

                        <div className="rounded-xl bg-blue-50 p-4">
                            <p className="text-xs text-gray-500">Leave</p>
                            <p className="mt-1 text-xl font-bold text-gray-800">
                                {childData.attendance.leave}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Academic Performance
                    </h2>

                    <div className="mt-5 grid grid-cols-3 gap-3">
                        <div className="rounded-xl bg-[#f6f8f8] p-4">
                            <p className="text-xs text-gray-500">Average</p>
                            <p className="mt-1 text-xl font-bold text-gray-800">
                                {childData.results.average}%
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#f6f8f8] p-4">
                            <p className="text-xs text-gray-500">Grade</p>
                            <p className="mt-1 text-xl font-bold text-gray-800">
                                {childData.results.grade}
                            </p>
                        </div>

                        <div className="rounded-xl bg-[#f6f8f8] p-4">
                            <p className="text-xs text-gray-500">Position</p>
                            <p className="mt-1 text-xl font-bold text-gray-800">
                                #{childData.results.position}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Notifications
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Important updates for {childData.childName}
                        </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                        <Bell size={20} />
                    </div>
                </div>

                <div className="mt-5 space-y-3">
                    <div className="rounded-xl border border-gray-100 bg-[#f6f8f8] p-4">
                        <p className="text-sm font-medium text-gray-800">
                            Absence Alert
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            {childData.childName} attendance information is available.
                        </p>
                    </div>

                    {childData.fees.pending > 0 && (
                        <div className="rounded-xl border border-gray-100 bg-[#f6f8f8] p-4">
                            <p className="text-sm font-medium text-gray-800">
                                Fee Reminder
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                Rs. {childData.fees.pending.toLocaleString()} is pending.
                            </p>
                        </div>
                    )}

                    {childData.assignments.pending > 0 && (
                        <div className="rounded-xl border border-gray-100 bg-[#f6f8f8] p-4">
                            <p className="text-sm font-medium text-gray-800">
                                Assignment Notification
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                                {childData.assignments.pending} assignment
                                {childData.assignments.pending !== 1 ? "s are" : " is"}{" "}
                                pending.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
