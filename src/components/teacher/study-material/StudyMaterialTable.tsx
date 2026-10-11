"use client";

import Link from "next/link";
import { useState } from "react";
import {
    Search,
    Download,
    Pencil,
    Trash2,
    FileText,
    Video,
    ClipboardList,
} from "lucide-react";

import { StudyMaterial } from "@/types/studyMaterial";

type StudyMaterialTableProps = {
    materials: StudyMaterial[];
    onDelete: (id: number) => void;
};

export default function StudyMaterialTable({
    materials,
    onDelete,
}: StudyMaterialTableProps) {
    const [search, setSearch] = useState("");

    const handleDownload = (title: string) => {
        window.alert(
            `No downloadable file is attached to "${title}" yet.`
        );
    };

    const handleDelete = (item: StudyMaterial) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${item.title}"?`
        );

        if (confirmed) {
            onDelete(item.id);
        }
    };

    const filteredMaterials = materials.filter((item) =>
        `${item.title} ${item.subject} ${item.className} ${item.section} ${item.teacher}`
            .toLowerCase()
            .includes(search.trim().toLowerCase())
    );

    const getTypeIcon = (type: StudyMaterial["type"]) => {
        if (type === "Video") return <Video size={18} />;
        if (type === "Notes") return <ClipboardList size={18} />;

        return <FileText size={18} />;
    };

    const actionButtons = (item: StudyMaterial) => (
        <div className="flex justify-center gap-2">
            <button
                type="button"
                onClick={() => handleDownload(item.title)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796f]/10 hover:text-[#01796f]"
                aria-label={`Download ${item.title}`}
                title="Download"
            >
                <Download size={17} strokeWidth={1.8} />
            </button>

            <Link
                href={`/teacher/study-material/${item.id}/edit`}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-[#01796f]/10 hover:text-[#01796f]"
                aria-label={`Edit ${item.title}`}
                title="Edit"
            >
                <Pencil size={17} strokeWidth={1.8} />
            </Link>

            <button
                type="button"
                onClick={() => handleDelete(item)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                aria-label={`Delete ${item.title}`}
                title="Delete"
            >
                <Trash2 size={17} strokeWidth={1.8} />
            </button>
        </div>
    );

    return (
        <div className="rounded-2xl border border-gray-200 bg-white">
            <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Learning Materials
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        {materials.length} material{materials.length === 1 ? "" : "s"}
                    </p>
                </div>

                <div className="relative w-full sm:w-72">
                    <Search
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search material"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        className="w-full rounded-full border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                    />
                </div>
            </div>

            <div className="hidden overflow-x-auto md:block">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/70 text-left">
                            {["Material", "Subject", "Class", "Type", "Actions"].map(
                                (heading) => (
                                    <th
                                        key={heading}
                                        className={`px-5 py-4 text-xs font-semibold uppercase text-gray-500 ${heading === "Actions" ? "text-center" : ""
                                            }`}
                                    >
                                        {heading}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredMaterials.map((item) => (
                            <tr
                                key={item.id}
                                className="border-b border-gray-100 last:border-0"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                                            {getTypeIcon(item.type)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {item.title}
                                            </p>
                                            <p className="text-xs text-gray-400">{item.date}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {item.subject}
                                </td>

                                <td className="px-5 py-4 text-sm text-gray-600">
                                    {item.className}
                                    {item.section ? `-${item.section}` : ""}
                                </td>

                                <td className="px-5 py-4">
                                    <span className="rounded-full bg-[#e6f4f2] px-3 py-1 text-xs font-medium text-[#01796F]">
                                        {item.type}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    {actionButtons(item)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
                {filteredMaterials.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-xl border border-gray-200 p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                                    {getTypeIcon(item.type)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {item.subject} · {item.className}
                                        {item.section ? `-${item.section}` : ""}
                                    </p>
                                </div>
                            </div>

                            <span className="rounded-full bg-[#e6f4f2] px-2.5 py-1 text-xs text-[#01796F]">
                                {item.type}
                            </span>
                        </div>

                        <p className="mt-3 text-sm text-gray-500">
                            {item.description}
                        </p>

                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
                            <p className="text-xs text-gray-400">{item.date}</p>
                            {actionButtons(item)}
                        </div>
                    </div>
                ))}
            </div>

            {filteredMaterials.length === 0 && (
                <div className="p-10 text-center text-sm text-gray-500">
                    {materials.length === 0
                        ? "You have not added any study materials yet."
                        : "No study material matches your search."}
                </div>
            )}
        </div>
    );
}