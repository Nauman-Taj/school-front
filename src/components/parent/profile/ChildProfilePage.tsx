"use client";

import { useMemo, useState } from "react";
import {
    BookOpen,
    CheckCircle2,
    Mail,
    Phone,
    UserRound,
} from "lucide-react";

import { students } from "@/data/students";
import { getCurrentParentChildren } from "@/lib/parent";

export default function ChildProfilePage() {
    const parentChildren = getCurrentParentChildren();

    const children = useMemo(() => {
        return parentChildren
            .map((relation) =>
                students.find((student) => student.id === relation.studentId)
            )
            .filter(Boolean);
    }, [parentChildren]);

    const [selectedChildId, setSelectedChildId] = useState<number>(
        children[0]?.id ?? 0
    );

    const selectedChild = students.find(
        (student) => student.id === selectedChildId
    );

    if (!selectedChild) {
        return (
            <div className="space-y-5">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl" >Child Profile</h1>
                    <p className="mt-1 text-sm text-gray-500 sm:text-base">
                        View your child's academic and personal information.
                    </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                    <UserRound className="mx-auto h-12 w-12 text-gray-300" />
                    <p className="mt-3 text-sm text-gray-500">
                        No child profile is available.
                    </p>
                </div>
            </div>
        );
    }

    const className = `${selectedChild.className}-${selectedChild.section}`;

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl" >Child Profile</h1>
                <p className="mt-1 text-sm text-gray-500 sm:text-base">
                    View your child's academic and personal information.
                </p>
            </div>

            {/* Child Selector */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
                <div className="rounded-2xl border border-gray-200 bg-white p-5">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
                            <UserRound className="h-7 w-7" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                {selectedChild.name}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {className} • Roll No. {selectedChild.rollNo}
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
                        value={selectedChildId}
                        onChange={(e) => setSelectedChildId(Number(e.target.value))}
                        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                    >
                        {children.map((child) => (
                            <option key={child!.id} value={child!.id}>
                                {child!.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Profile Header */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
                        <UserRound className="h-10 w-10" />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900">
                                {selectedChild.name}
                            </h2>

                            <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${selectedChild.status === "Active"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                    }`}
                            >
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                {selectedChild.status}
                            </span>
                        </div>

                        <p className="mt-2 text-sm text-gray-500">
                            Student ID: {selectedChild.id} • {className} • Roll No.{" "}
                            {selectedChild.rollNo}
                        </p>
                    </div>
                </div>
            </div>

            {/* Personal Information */}
            <div className="rounded-2xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                    <h2 className="font-semibold text-gray-900">
                        Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Basic information about your child.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-2">
                    <InfoItem
                        icon={<UserRound className="h-5 w-5" />}
                        label="Full Name"
                        value={selectedChild.name}
                    />

                    <InfoItem
                        icon={<Mail className="h-5 w-5" />}
                        label="Email"
                        value={selectedChild.email}
                    />

                    <InfoItem
                        icon={<Phone className="h-5 w-5" />}
                        label="Phone"
                        value={selectedChild.phone}
                    />

                    <InfoItem
                        icon={<UserRound className="h-5 w-5" />}
                        label="Parent Name"
                        value={selectedChild.parentName}
                    />
                </div>
            </div>

            {/* Academic Information */}
            <div className="rounded-2xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-5 py-4">
                    <h2 className="font-semibold text-gray-900">
                        Academic Information
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Current academic details of your child.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 lg:grid-cols-4">
                    <InfoItem
                        icon={<BookOpen className="h-5 w-5" />}
                        label="Class"
                        value={selectedChild.className}
                    />

                    <InfoItem
                        icon={<BookOpen className="h-5 w-5" />}
                        label="Section"
                        value={selectedChild.section}
                    />

                    <InfoItem
                        icon={<BookOpen className="h-5 w-5" />}
                        label="Roll Number"
                        value={String(selectedChild.rollNo)}
                    />

                    <InfoItem
                        icon={<CheckCircle2 className="h-5 w-5" />}
                        label="Status"
                        value={selectedChild.status}
                    />
                </div>
            </div>
        </div>
    );
}

type InfoItemProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
};

function InfoItem({ icon, label, value }: InfoItemProps) {
    return (
        <div className="flex items-start gap-3 rounded-xl bg-[#f6f8f8] p-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796F]">
                {icon}
            </div>

            <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">{label}</p>
                <p className="mt-1 break-words text-sm font-semibold text-gray-900">
                    {value}
                </p>
            </div>
        </div>
    );
}