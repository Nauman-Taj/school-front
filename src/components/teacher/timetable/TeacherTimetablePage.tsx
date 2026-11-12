"use client";

import { useEffect, useMemo, useState } from "react";
import {
    BookOpen,
    CalendarDays,
    GraduationCap,
    Layers,
} from "lucide-react";

import { fetchTeacherTimetable } from "@/lib/teacher-api";
import type { ApiTeacherClass, ApiTeacherSubject } from "@/lib/teacher-api";
import type { TimetableEntry } from "@/types/timetable";

import TimetableGrid from "@/components/timetable/TimetableGrid";

const days = [
    "All",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
] as const;

type DayFilter = (typeof days)[number];

export default function TeacherTimetablePage() {
    const [selectedDay, setSelectedDay] = useState<DayFilter>("All");

    const [state, setState] = useState<{
        loaded: boolean;
        periods: TimetableEntry[];
        classes: ApiTeacherClass[];
        subjects: ApiTeacherSubject[];
        error: string;
    }>({
        loaded: false,
        periods: [],
        classes: [],
        subjects: [],
        error: "",
    });

    useEffect(() => {
        let active = true;

        fetchTeacherTimetable()
            .then((data) => {
                if (!active) return;
                setState({
                    loaded: true,
                    periods: data.periods,
                    classes: data.classes,
                    subjects: data.subjects,
                    error: "",
                });
            })
            .catch((err: unknown) => {
                if (!active) return;
                setState({
                    loaded: true,
                    periods: [],
                    classes: [],
                    subjects: [],
                    error:
                        err instanceof Error
                            ? err.message
                            : "Unable to load your timetable.",
                });
            });

        return () => {
            active = false;
        };
    }, []);

    const filteredPeriods = useMemo(
        () =>
            selectedDay === "All"
                ? state.periods
                : state.periods.filter(
                      (period) => period.day === selectedDay
                  ),
        [selectedDay, state.periods]
    );

    const visibleDays = useMemo(
        () =>
            selectedDay === "All"
                ? undefined
                : ([selectedDay] as const),
        [selectedDay]
    );

    const teachingDays = new Set(
        state.periods.map((period) => period.day)
    ).size;

    const stats = [
        {
            title: "Periods per Week",
            value: state.periods.length,
            icon: CalendarDays,
        },
        {
            title: "Classes Assigned",
            value: state.classes.length,
            icon: Layers,
        },
        {
            title: "Subjects Taught",
            value: state.subjects.length,
            icon: BookOpen,
        },
        {
            title: "Teaching Days",
            value: teachingDays,
            icon: GraduationCap,
        },
    ];

    const header = (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Timetable
            </h1>

            <p className="mt-1 text-sm text-gray-500 sm:text-base">
                View your teaching schedule and assigned classes.
            </p>
        </div>
    );

    if (!state.loaded && !state.error) {
        return (
            <div className="space-y-5">
                {header}

                <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#01796F]" />
                    <p className="mt-4 text-sm text-gray-500">
                        Loading your timetable...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Heading */}
            {header}

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-500">
                                    {stat.title}
                                </p>

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                                    <Icon size={20} />
                                </div>
                            </div>

                            <p className="mt-2 text-2xl font-bold text-gray-800">
                                {state.loaded ? stat.value : "-"}
                            </p>
                        </div>
                    );
                })}
            </div>

            {state.error && (
                <div
                    role="alert"
                    className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                    {state.error}
                </div>
            )}

            {/* Day filter */}
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <label
                    htmlFor="day"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Day
                </label>

                <select
                    id="day"
                    value={selectedDay}
                    onChange={(e) =>
                        setSelectedDay(e.target.value as DayFilter)
                    }
                    className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/20"
                >
                    {days.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
                </select>
            </div>

            {/* Weekly schedule */}
            <div>
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
                        <CalendarDays size={19} />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Weekly Schedule
                        </h2>

                        <p className="text-sm text-gray-500">
                            Your teaching periods for the selected day.
                        </p>
                    </div>
                </div>

                <TimetableGrid
                    entries={filteredPeriods}
                    days={visibleDays}
                    emptyMessage="No periods scheduled for this day."
                />
            </div>

            {/* Classes assigned */}
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Classes Assigned to You
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        The classes you are responsible for this term.
                    </p>
                </div>

                {state.classes.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {state.classes.map((schoolClass) => (
                            <div
                                key={schoolClass.id}
                                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                                        <GraduationCap size={22} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900">
                                            {schoolClass.name} - Section{" "}
                                            {schoolClass.section}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            Room {schoolClass.room} •{" "}
                                            {schoolClass.studentCount}{" "}
                                            students
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
                        No classes are assigned to you yet.
                    </div>
                )}
            </div>

            {/* Subjects */}
            <div>
                <div className="mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Subjects You Teach
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        The subjects assigned to you this term.
                    </p>
                </div>

                {state.subjects.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {state.subjects.map((subject) => (
                            <div
                                key={subject.id}
                                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                                        <BookOpen size={22} />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900">
                                            {subject.name}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {subject.className} - Section{" "}
                                            {subject.section} • {subject.code}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500 shadow-sm">
                        No subjects are assigned to you yet.
                    </div>
                )}
            </div>
        </div>
    );
}
