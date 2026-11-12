"use client";

import { Clock3, MapPin, UserRound } from "lucide-react";

import type { TimetableEntry } from "@/types/timetable";

type TimetableGridProps = {
    entries: TimetableEntry[];
    emptyMessage?: string;
    /** The day columns to render. Defaults to the whole school week. */
    days?: readonly TimetableEntry["day"][];
};

const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
] as const;

/**
 * Converts a 12-hour label such as "8:00 AM" into minutes since midnight,
 * so the time slots can be sorted in the order they actually happen.
 */
function toMinutes(value: string): number {
    const match = value.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);

    if (!match) return 0;

    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const suffix = match[3];

    if (suffix === "PM" && hours !== 12) hours += 12;
    if (suffix === "AM" && hours === 12) hours = 0;

    return hours * 60 + minutes;
}

/**
 * The weekly timetable grid.
 *
 * Shared by the Parent, Teacher and Student portals so every role shows the
 * same week layout; each portal passes its own entries.
 */
export default function TimetableGrid({
    entries,
    emptyMessage = "No classes scheduled.",
    days = weekDays,
}: TimetableGridProps) {
    const times = Array.from(
        new Set(entries.map((entry) => entry.startTime))
    ).sort((a, b) => toMinutes(a) - toMinutes(b));

    const getEntry = (day: string, time: string) =>
        entries.find(
            (entry) => entry.day === day && entry.startTime === time
        );

    if (entries.length === 0) {
        return (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                <p className="text-sm text-gray-500">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Desktop Timetable */}
            <div className="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white md:block">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr className="border-b border-gray-200 bg-gray-50">
                                <th className="w-28 px-4 py-4 text-left text-sm font-semibold text-gray-600">
                                    Time
                                </th>

                                {days.map((day) => (
                                    <th
                                        key={day}
                                        className="px-4 py-4 text-center text-sm font-semibold text-gray-700"
                                    >
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {times.map((time) => (
                                <tr
                                    key={time}
                                    className="border-b border-gray-100 last:border-0"
                                >
                                    <td className="px-4 py-4 align-top">
                                        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                                            <Clock3
                                                size={15}
                                                className="text-[#01796F]"
                                            />
                                            {time}
                                        </div>
                                    </td>

                                    {days.map((day) => {
                                        const entry = getEntry(day, time);

                                        return (
                                            <td
                                                key={`${day}-${time}`}
                                                className="p-3 align-top"
                                            >
                                                {entry ? (
                                                    <div className="rounded-xl border border-[#01796F]/10 bg-[#e6f4f2] p-3">
                                                        <p className="font-semibold text-[#01796F]">
                                                            {entry.subject}
                                                        </p>

                                                        <div className="mt-2 space-y-1.5 text-xs text-gray-600">
                                                            <div className="flex items-center gap-1.5">
                                                                <UserRound
                                                                    size={13}
                                                                />
                                                                {entry.teacher}
                                                            </div>

                                                            <div className="flex items-center gap-1.5">
                                                                <MapPin
                                                                    size={13}
                                                                />
                                                                {entry.room}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex min-h-[90px] items-center justify-center rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">
                                                        No class
                                                    </div>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Timetable */}
            <div className="space-y-4 md:hidden">
                {days.map((day) => {
                    const dayEntries = entries.filter(
                        (entry) => entry.day === day
                    );

                    return (
                        <div
                            key={day}
                            className="overflow-hidden rounded-2xl border border-gray-200 bg-white"
                        >
                            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                                <h2 className="font-semibold text-gray-900">
                                    {day}
                                </h2>
                            </div>

                            <div className="divide-y divide-gray-100">
                                {dayEntries.length > 0 ? (
                                    dayEntries.map((entry) => (
                                        <div key={entry.id} className="p-4">
                                            <div className="flex items-start justify-between gap-3">
                                                <div>
                                                    <p className="font-semibold text-[#01796F]">
                                                        {entry.subject}
                                                    </p>

                                                    <div className="mt-2 space-y-1.5 text-xs text-gray-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <UserRound
                                                                size={13}
                                                            />
                                                            {entry.teacher}
                                                        </div>

                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin size={13} />
                                                            {entry.room}
                                                        </div>
                                                    </div>
                                                </div>

                                                <span className="shrink-0 rounded-lg bg-[#e6f4f2] px-2.5 py-1 text-xs font-medium text-[#01796F]">
                                                    {entry.startTime}
                                                </span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-5 text-center text-sm text-gray-400">
                                        {emptyMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
