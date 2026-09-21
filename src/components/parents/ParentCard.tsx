"use client";

import Link from "next/link";
import {
    Pencil,
    Trash2,
    UserRound,
} from "lucide-react";

import { Parent } from "@/types/parent";

type ParentCardProps = {
    parent: Parent;
    onDelete: (id: number, name: string) => void;
};

export default function ParentCard({
    parent,
    onDelete,
}: ParentCardProps) {
    return (
        <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <div>
                    <h3 className="font-semibold text-gray-900">
                        {parent.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {parent.email}
                    </p>
                </div>

                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${parent.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                >
                    {parent.status}
                </span>
            </div>

            {/* Information */}
            <div className="mt-4 space-y-3 text-sm">
                <div>
                    <span className="font-medium text-gray-800">
                        Phone:
                    </span>{" "}
                    <span className="text-gray-600">
                        {parent.phone}
                    </span>
                </div>

                <div>
                    <span className="font-medium text-gray-800">
                        Occupation:
                    </span>{" "}
                    <span className="text-gray-600">
                        {parent.occupation}
                    </span>
                </div>

                {/* Children */}
                <div>
                    <p className="mb-2 font-medium text-gray-800">
                        Children:
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                        {parent.children.map((child) => (
                            <span
                                key={child}
                                className="rounded-full bg-[#e6f4f2] px-2.5 py-1 text-xs font-medium text-[#01796f]"
                            >
                                {child}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-center gap-2 border-t border-gray-100 pt-4">
                <Link
                    href={`/dashboard/parents/${parent.id}`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    title="View"
                >
                    <UserRound size={17} />
                </Link>

                <Link
                    href={`/dashboard/parents/${parent.id}/edit`}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#e6f4f2] hover:text-[#01796f]"
                    title="Edit"
                >
                    <Pencil size={17} />
                </Link>

                <button
                    type="button"
                    onClick={() => onDelete(parent.id, parent.name)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                >
                    <Trash2 size={17} strokeWidth={1.8} />
                </button>
            </div>
        </div>
    );
}