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

import { getCurrentParent, getCurrentParentChildren } from "@/lib/parent";

import { students } from "@/data/students";
import { attendance } from "@/data/attendance";
import { assignments } from "@/data/assignments";
import { fees } from "@/data/fees";
import { exams } from "@/data/exams";
import { results } from "@/data/results";

export default function ParentDashboard() {
    const parent = getCurrentParent();
    const parentChildren = getCurrentParentChildren();

    const children = parentChildren
        .map((relation) =>
            students.find((student) => student.id === relation.studentId)
        )
        .filter(
            (student): student is (typeof students)[number] =>
                Boolean(student)
        );

    const [selectedChild, setSelectedChild] = useState(
        children[0]?.name ?? ""
    );

    if (!parent) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-gray-500">
                    Parent information not found.
                </p>
            </div>
        );
    }

    const selectedStudent =
        children.find((child) => child.name === selectedChild) ??
        children[0];

    if (!selectedStudent) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                    Child data not found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                    No student information is available for this parent.
                </p>
            </div>
        );
    }

    /* ---------------- Attendance ---------------- */

    const childAttendance = attendance.filter(
        (record) =>
            record.role === "Student" &&
            record.studentId === selectedStudent.id
    );

    const present = childAttendance.filter(
        (record) => record.status === "Present"
    ).length;

    const absent = childAttendance.filter(
        (record) => record.status === "Absent"
    ).length;

    const late = childAttendance.filter(
        (record) => record.status === "Late"
    ).length;

    const leave = childAttendance.filter(
        (record) => record.status === "Leave"
    ).length;

    const attendancePercentage =
        childAttendance.length > 0
            ? Math.round(
                  ((present + late) / childAttendance.length) * 100
              )
            : 0;

    /* ---------------- Assignments ---------------- */

    const childAssignments = assignments.filter(
        (assignment) =>
            assignment.className === selectedStudent.className &&
            assignment.section === selectedStudent.section
    );

    const pendingAssignments = childAssignments.filter(
        (assignment) => assignment.status === "Pending"
    ).length;

    /* ---------------- Fees ---------------- */

    const childFees = fees.filter(
        (fee) => fee.studentId === selectedStudent.id
    );

    const pendingFees = childFees.reduce(
        (total, fee) => total + fee.remainingAmount,
        0
    );

    /* ---------------- Exams ---------------- */

    const today = new Date().toISOString().split("T")[0];

    const childExams = exams.filter(
        (exam) =>
            exam.className === selectedStudent.className &&
            exam.section === selectedStudent.section
    );

    const upcomingExams = childExams.filter(
        (exam) =>
            exam.examDate >= today &&
            exam.status !== "Completed"
    ).length;

    /* ---------------- Results ---------------- */

    const childResults = results.filter(
        (result) => result.studentId === selectedStudent.id
    );

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

    const classResults = results.filter(
        (result) =>
            result.className === selectedStudent.className &&
            result.section === selectedStudent.section
    );

    const studentAverages = classResults
        .reduce<
            {
                studentId: number;
                percentage: number;
            }[]
        >((studentsList, result) => {
            const existing = studentsList.find(
                (student) => student.studentId === result.studentId
            );

            if (existing) {
                existing.percentage =
                    (existing.percentage + result.percentage) / 2;
            } else {
                studentsList.push({
                    studentId: result.studentId,
                    percentage: result.percentage,
                });
            }

            return studentsList;
        }, [])
        .sort((a, b) => b.percentage - a.percentage);

    const position =
        studentAverages.findIndex(
            (student) => student.studentId === selectedStudent.id
        ) + 1;

    /* ---------------- Dashboard Stats ---------------- */

    const stats = [
        {
            title: "Attendance",
            value: `${attendancePercentage}%`,
            icon: CalendarDays,
        },
        {
            title: "Pending Assignments",
            value: pendingAssignments,
            icon: ClipboardList,
        },
        {
            title: "Pending Fees",
            value: `Rs. ${pendingFees.toLocaleString()}`,
            icon: Wallet,
        },
        {
            title: "Upcoming Exams",
            value: upcomingExams,
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

            {/* Parent + Child Selection */}
            <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
                {/* Parent Information */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
                            <UserRound size={23} />
                        </div>

                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Parent
                            </p>

                            <h2 className="mt-1 font-semibold text-gray-800">
                                {parent.name}
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                {parent.email}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Child Selector */}
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
                        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
                    >
                        {children.map((child) => (
                            <option key={child.id} value={child.name}>
                                {child.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Selected Child */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                            Selected Child
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-gray-800">
                            {selectedStudent.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {selectedStudent.className} - Section{" "}
                            {selectedStudent.section}
                            {" • "}
                            Roll No: {selectedStudent.rollNo}
                        </p>
                    </div>

                    <span className="w-fit rounded-full bg-[#e6f4f2] px-3 py-1.5 text-sm font-medium text-[#01796F]">
                        Active Student
                    </span>
                </div>
            </div>

            {/* Statistics */}
            <div>
                <div className="mb-3">
                    <h2 className="text-lg font-semibold text-gray-800">
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
                                className="rounded-2xl border border-gray-200 bg-white p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">
                                            {stat.title}
                                        </p>

                                        <h3 className="mt-2 text-2xl font-bold text-gray-800">
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
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Attendance
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Attendance summary for {selectedStudent.name}
                            </p>
                        </div>

                        <div className="rounded-lg bg-[#e6f4f2] px-3 py-1.5 text-sm font-semibold text-[#01796F]">
                            {attendancePercentage}%
                        </div>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-xl border border-gray-100">
                        <div className="grid grid-cols-2 divide-x divide-gray-100 sm:grid-cols-4">
                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Present
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-800">
                                    {present}
                                </p>
                            </div>

                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Absent
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-800">
                                    {absent}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 p-4 sm:border-t-0">
                                <p className="text-xs text-gray-500">
                                    Late
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-800">
                                    {late}
                                </p>
                            </div>

                            <div className="border-t border-gray-100 p-4 sm:border-t-0">
                                <p className="text-xs text-gray-500">
                                    Leave
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-800">
                                    {leave}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Academic Performance */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
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

                                <p className="mt-1 text-xl font-bold text-gray-800">
                                    {average}%
                                </p>
                            </div>

                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Grade
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-800">
                                    {grade}
                                </p>
                            </div>

                            <div className="p-4">
                                <p className="text-xs text-gray-500">
                                    Position
                                </p>

                                <p className="mt-1 text-xl font-bold text-gray-800">
                                    #{position || "-"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-gray-200 bg-white">
                <div className="flex items-center justify-between border-b border-gray-100 p-5">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
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
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796F]">
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
                                        {attendancePercentage}%
                                    </span>
                                    .
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Fees */}
                    {pendingFees > 0 && (
                        <div className="p-5">
                            <div className="flex gap-3">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796F]">
                                    <Wallet size={18} />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-800">
                                        Fee Reminder
                                    </p>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Rs.{" "}
                                        <span className="font-medium text-gray-700">
                                            {pendingFees.toLocaleString()}
                                        </span>{" "}
                                        is currently pending.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Assignments */}
                    {pendingAssignments > 0 && (
                        <div className="p-5">
                            <div className="flex gap-3">
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796F]">
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
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796F]">
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
                    {pendingFees === 0 &&
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