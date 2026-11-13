"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Bell,
    CalendarDays,
    ClipboardList,
    GraduationCap,
    UserRound,
    Wallet,
} from "lucide-react";

import { fetchChildAttendance } from "@/lib/attendance-api";
import { fetchChildAssignments } from "@/lib/assignments-api";
import { fetchChildExams } from "@/lib/exams-api";
import { fetchChildFees } from "@/lib/fees-api";
import {
    fetchChildClassPosition,
    fetchChildResults,
} from "@/lib/results-api";
import { useParentProfile } from "@/lib/useParentProfile";
import type { AttendanceRecord } from "@/types/attendance";
import type { Assignment } from "@/types/assignment";
import type { Exam } from "@/types/exam";
import type { Fee } from "@/types/fee";
import type { Result } from "@/types/result";

type DashboardData = {
    attendance: AttendanceRecord[];
    exams: Exam[];
    results: Result[];
    assignments: Assignment[];
    fees: Fee[];
    position: number | null;
    totalStudents: number;
};

const emptyData: DashboardData = {
    attendance: [],
    exams: [],
    results: [],
    assignments: [],
    fees: [],
    position: null,
    totalStudents: 0,
};

export default function ParentDashboard() {
    const {
        profile,
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

    const [dataState, setDataState] = useState<{
        studentId: number | null;
        data: DashboardData;
        error: string;
    }>({
        studentId: null,
        data: emptyData,
        error: "",
    });

    useEffect(() => {
        if (selectedStudentId === null) return;

        let active = true;

        // Every request is settled on its own so one failing section cannot
        // blank the whole dashboard.
        const load = async () => {
            const [attendance, exams, results, assignments, fees, position] =
                await Promise.allSettled([
                    fetchChildAttendance(selectedStudentId),
                    fetchChildExams(selectedStudentId),
                    fetchChildResults(selectedStudentId),
                    fetchChildAssignments(selectedStudentId),
                    fetchChildFees(selectedStudentId),
                    fetchChildClassPosition(selectedStudentId),
                ]);

            if (!active) return;

            const failures: string[] = [];

            const read = <T,>(
                result: PromiseSettledResult<T>,
                label: string,
                fallback: T
            ): T => {
                if (result.status === "fulfilled") return result.value;

                failures.push(label);

                return fallback;
            };

            const classPosition =
                position.status === "fulfilled" ? position.value : null;

            if (!classPosition) failures.push("Class position");

            setDataState({
                studentId: selectedStudentId,
                data: {
                    attendance: read(attendance, "Attendance", []),
                    exams: read(exams, "Exams", []),
                    results: read(results, "Results", []),
                    assignments: read(assignments, "Assignments", []),
                    fees: read(fees, "Fees", []),
                    position: classPosition?.position ?? null,
                    totalStudents: classPosition?.totalStudents ?? 0,
                },
                error: failures.length
                    ? `Could not load: ${failures.join(", ")}.`
                    : "",
            });
        };

        load();

        return () => {
            active = false;
        };
    }, [selectedStudentId]);

    // A stored value belongs to the previously selected child until the new
    // requests resolve, so treat that mismatch as loading.
    const dashboardLoading =
        selectedStudentId !== null &&
        dataState.studentId !== selectedStudentId;

    const {
        attendance: childAttendance,
        exams: childExams,
        results: childResults,
        assignments: childAssignments,
        fees: childFees,
    } = dataState.data;

    const dataError = dashboardLoading ? "" : dataState.error;

    if (profileLoading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
                    <p className="mt-4 text-sm text-gray-500">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    if (profileError) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-gray-500">{profileError}</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-gray-500">
                    Parent information not found.
                </p>
            </div>
        );
    }

    if (!selectedStudent) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                    Child data not found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    No student information is available for this parent.
                </p>
            </div>
        );
    }

    /* ---------------- Attendance ---------------- */

    const present = childAttendance.filter(
        (record) =>
            record.role === "Student" && record.status === "Present"
    ).length;

    const absent = childAttendance.filter(
        (record) =>
            record.role === "Student" && record.status === "Absent"
    ).length;

    const late = childAttendance.filter(
        (record) =>
            record.role === "Student" && record.status === "Late"
    ).length;

    const leave = childAttendance.filter(
        (record) =>
            record.role === "Student" && record.status === "Leave"
    ).length;

    const attendancePercentage =
        childAttendance.length > 0
            ? Math.round(
                  ((present + late) / childAttendance.length) * 100
              )
            : 0;

    /* ---------------- Assignments ---------------- */

    const pendingAssignments = childAssignments.filter(
        (assignment) => assignment.status === "Pending"
    ).length;

    /* ---------------- Fees ---------------- */

    // The outstanding balance is split by due date, the same way the Fees
    // module and the Admin fee summary do it.
    const today = new Date().toISOString().slice(0, 10);

    const outstandingFees = childFees.filter(
        (fee) => fee.remainingAmount > 0
    );

    const outstandingTotal = outstandingFees.reduce(
        (total, fee) => total + fee.remainingAmount,
        0
    );

    const overdueFees = outstandingFees
        .filter((fee) => fee.dueDate < today)
        .reduce((total, fee) => total + fee.remainingAmount, 0);

    const dueFees = outstandingFees
        .filter((fee) => fee.dueDate >= today)
        .reduce((total, fee) => total + fee.remainingAmount, 0);

    const feeReminder =
        overdueFees > 0 && dueFees > 0
            ? `Rs. ${overdueFees.toLocaleString()} is overdue and Rs. ${dueFees.toLocaleString()} is due.`
            : overdueFees > 0
              ? `Rs. ${overdueFees.toLocaleString()} is overdue.`
              : `Rs. ${dueFees.toLocaleString()} is currently pending.`;

    /* ---------------- Exams ---------------- */

    const upcomingExams = childExams.filter(
        (exam) => exam.status === "Upcoming"
    ).length;

    /* ---------------- Results ---------------- */

    const average =
        childResults.length > 0
            ? Math.round(
                  childResults.reduce(
                      (total, result) => total + result.percentage,
                      0
                  ) / childResults.length
              )
            : 0;

    const grade =
        childResults.length > 0
            ? childResults.reduce((best, result) =>
                  result.percentage > best.percentage
                      ? result
                      : best
              ).grade
            : "-";

    const position = dataState.data.position;

    const show = (value: string | number) =>
        dashboardLoading ? "0" : value;

    /* ---------------- Dashboard Stats ---------------- */

    const stats = [
        {
            title: "Attendance",
            value: show(`${attendancePercentage}%`),
            icon: CalendarDays,
        },
        {
            title: "Pending Assignments",
            value: show(pendingAssignments),
            icon: ClipboardList,
        },
        {
            title: "Outstanding Fees",
            value: show(`Rs. ${outstandingTotal.toLocaleString()}`),
            icon: Wallet,
        },
        {
            title: "Upcoming Exams",
            value: show(upcomingExams),
            icon: GraduationCap,
        },
    ];

    return (
        <div className="space-y-5">
            {/* Page Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    Dashboard
                </h1>

                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    Monitor your child's academic progress and school
                    activities.
                </p>
            </div>

            {dataError && (
                <div
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                    {dataError}
                </div>
            )}

            {/* Parent + Child Selection */}
            <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
                {/* Parent Information */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
                            <UserRound size={23} />
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Parent
                            </p>

                            <h2 className="mt-1 font-semibold text-gray-900">
                                {profile.name}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {profile.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Child Selector */}
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

            {/* Selected Child */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Selected Child
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-gray-900">
                            {selectedStudent.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {selectedStudent.className} - Section{" "}
                            {selectedStudent.section}
                            {" • "}
                            Roll No: {selectedStudent.rollNo}
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-[#e6f4f2] px-3 py-1.5 text-sm font-medium text-[#01796f]">
                        Active Student
                    </span>
                </div>
            </div>

            {/* Statistics */}
            <div>
                <div className="mb-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Overview
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Current academic and school activity summary.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.title}
                                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            {stat.title}
                                        </p>

                                        <h3 className="mt-2 text-2xl font-bold text-gray-900">
                                            {stat.value}
                                        </h3>
                                    </div>

                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                                        <Icon size={21} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Attendance + Academic Performance */}
            <div className="grid gap-5 lg:grid-cols-2">
                {/* Attendance */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Attendance
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Attendance summary for {selectedStudent.name}
                            </p>
                        </div>

                        <div className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796f]">
                            {show(`${attendancePercentage}%`)}
                        </div>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-xl border border-gray-100">
                        <div className="grid grid-cols-2 divide-x divide-gray-100 sm:grid-cols-4">
                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Present
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    {show(present)}
                                </p>
                            </div>

                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Absent
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    {show(absent)}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 p-4 sm:border-t-0">
                                <p className="text-xs text-gray-500">
                                    Late
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    {show(late)}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 p-4 sm:border-t-0">
                                <p className="text-xs text-gray-500">
                                    Leave
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    {show(leave)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Performance */}
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Academic Performance
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Current result summary for {selectedStudent.name}
                        </p>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-xl border border-gray-100">
                        <div className="grid grid-cols-3 divide-x divide-gray-100">
                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Average
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    {show(`${average}%`)}
                                </p>
                            </div>

                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Grade
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    {show(grade)}
                                </p>
                            </div>

                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Position
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-900">
                                    {show(
                                        position
                                            ? `#${position}`
                                            : "-"
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-gray-100 p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Recent Activity
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Important updates related to your child.
                        </p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                        <Bell size={20} />
                    </div>
                </div>

                <div className="divide-y divide-gray-100">
                    {/* Attendance */}
                    <div className="p-5">
                        <div className="flex gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                                <CalendarDays size={18} />
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-800">
                                    Attendance Update
                                </p>

                                <p className="mt-1 text-sm text-gray-500">
                                    {selectedStudent.name} currently has an
                                    attendance rate of{" "}
                                    <span className="font-medium text-gray-700">
                                        {show(`${attendancePercentage}%`)}
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Fees */}
                    {outstandingTotal > 0 && (
                        <div className="p-5">
                            <div className="flex gap-3">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                                    <Wallet size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Fee Reminder
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {feeReminder}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Assignments */}
                    {pendingAssignments > 0 && (
                        <div className="p-5">
                            <div className="flex gap-3">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                                    <ClipboardList size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Assignment Update
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {pendingAssignments} assignment
                                        {pendingAssignments !== 1
                                            ? "s are"
                                            : " is"}{" "}
                                        currently pending.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Exams */}
                    {upcomingExams > 0 && (
                        <div className="p-5">
                            <div className="flex gap-3">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                                    <GraduationCap size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Upcoming Exams
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {upcomingExams} upcoming exam
                                        {upcomingExams !== 1 ? "s are" : " is"}{" "}
                                        scheduled.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* No extra activity */}
                    {outstandingTotal === 0 &&
                        pendingAssignments === 0 &&
                        upcomingExams === 0 && (
                            <div className="p-5 text-center">
                                <p className="text-sm text-gray-500">
                                    No additional pending activities at the
                                    moment.
                                </p>
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}
