"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type StudyMaterialFormProps = {
    mode: "add" | "edit";
    material?: {
        id: number;
        title: string;
        subject: string;
        className: string;
        type: "PDF" | "Document" | "Video" | "Notes";
        teacher: string;
        date: string;
        description: string;
    };
};

export default function StudyMaterialForm({
    mode,
    material,
}: StudyMaterialFormProps) {
    const [title, setTitle] = useState(material?.title || "");
    const [subject, setSubject] = useState(material?.subject || "");
    const [className, setClassName] = useState(
        material?.className || ""
    );
    const [type, setType] = useState<
        "PDF" | "Document" | "Video" | "Notes"
    >(material?.type || "PDF");
    const [teacher, setTeacher] = useState(
        material?.teacher || ""
    );
    const [date, setDate] = useState(
        material?.date || ""
    );
    const [description, setDescription] = useState(
        material?.description || ""
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (mode === "add") {
            window.alert(
                "Study material added successfully!"
            );
        } else {
            window.alert(
                "Study material updated successfully!"
            );
        }
    };

    return (
        <div className="space-y-5">
            {/* Header */}
            <div>
                <Link
                    href="/dashboard/study-material"
                    className="mb-4 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-[#01796F]"
                >
                    <ArrowLeft size={17} />
                    Back to Study Material
                </Link>

                <h2 className="text-2xl font-semibold text-gray-900">
                    {mode === "add"
                        ? "Add Study Material"
                        : "Edit Study Material"}
                </h2>

                {/* <p className="mt-1 text-sm text-gray-500">
                    {mode === "add"
                        ? "Add new learning material for students."
                        : "Update study material information."}
                </p> */}
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="rounded-2xl max-w-5xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Material Title
                        </label>

                        <input
                            type="text"
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Enter material title"
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Subject
                        </label>

                        <select
                            value={subject}
                            onChange={(e) =>
                                setSubject(e.target.value)
                            }
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                        >
                            <option value="">
                                Select subject
                            </option>
                            <option value="Mathematics">
                                Mathematics
                            </option>
                            <option value="Science">
                                Science
                            </option>
                            <option value="English">
                                English
                            </option>
                            <option value="Computer Science">
                                Computer Science
                            </option>
                            <option value="Urdu">
                                Urdu
                            </option>
                            <option value="Social Studies">
                                Social Studies
                            </option>
                            <option value="Islamiyat">
                                Islamiyat
                            </option>
                            <option value="Physics">
                                Physics
                            </option>
                        </select>
                    </div>

                    {/* Class */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Class
                        </label>

                        <select
                            value={className}
                            onChange={(e) =>
                                setClassName(e.target.value)
                            }
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                        >
                            <option value="">
                                Select class
                            </option>
                            <option value="5-A">5-A</option>
                            <option value="5-B">5-B</option>
                            <option value="6-A">6-A</option>
                            <option value="6-B">6-B</option>
                            <option value="7-A">7-A</option>
                            <option value="7-B">7-B</option>
                            <option value="8-A">8-A</option>
                            <option value="8-B">8-B</option>
                        </select>
                    </div>

                    {/* Type */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Material Type
                        </label>

                        <select
                            value={type}
                            onChange={(e) =>
                                setType(
                                    e.target.value as
                                        | "PDF"
                                        | "Document"
                                        | "Video"
                                        | "Notes"
                                )
                            }
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                        >
                            <option value="PDF">PDF</option>
                            <option value="Document">
                                Document
                            </option>
                            <option value="Video">
                                Video
                            </option>
                            <option value="Notes">
                                Notes
                            </option>
                        </select>
                    </div>

                    {/* Teacher */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Teacher
                        </label>

                        <select
                            value={teacher}
                            onChange={(e) =>
                                setTeacher(e.target.value)
                            }
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                        >
                            <option value="">
                                Select teacher
                            </option>
                            <option value="Ayesha Khan">
                                Ayesha Khan
                            </option>
                            <option value="Hassan Ali">
                                Hassan Ali
                            </option>
                            <option value="Fatima Noor">
                                Fatima Noor
                            </option>
                            <option value="Bilal Raza">
                                Bilal Raza
                            </option>
                            <option value="Sara Ahmad">
                                Sara Ahmad
                            </option>
                            <option value="Muhammad Usman">
                                Muhammad Usman
                            </option>
                            <option value="Zainab Malik">
                                Zainab Malik
                            </option>
                            <option value="Omar Farooq">
                                Omar Farooq
                            </option>
                        </select>
                    </div>

                    {/* Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Date
                        </label>

                        <input
                            type="date"
                            value={date}
                            onChange={(e) =>
                                setDate(e.target.value)
                            }
                            required
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                        />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            value={description}
                            onChange={(e) =>
                                setDescription(e.target.value)
                            }
                            placeholder="Enter material description"
                            rows={5}
                            required
                            className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                        />
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
                    <Link
                        href="/dashboard/study-material"
                        className="inline-flex items-center justify-center rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
                    >
                        {mode === "add"
                            ? "Add Material"
                            : "Update Material"}
                    </button>
                </div>
            </form>
        </div>
    );
}
