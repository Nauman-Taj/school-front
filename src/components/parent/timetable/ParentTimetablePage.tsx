"use client";

import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";

import { parentTimetable } from "@/data/parentTimetable";
import { getCurrentParentChildren } from "@/lib/parent";
import ParentTimetableTable from "./ParentTimetableTable";

export default function ParentTimetablePage() {
  const children = getCurrentParentChildren();

  const [selectedChild, setSelectedChild] = useState(
    children[0]?.id ?? 0
  );

  const timetable = useMemo(
    () =>
      parentTimetable.filter(
        (item) => item.childId === selectedChild
      ),
    [selectedChild]
  );

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Timetable
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View your child's weekly class timetable.
        </p>
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
          onChange={(e) =>
            setSelectedChild(Number(e.target.value))
          }
          className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#01796F] sm:w-80"
        >
          {children.map((child) => (
            <option key={child.id} value={child.id}>
              {child.name} --- {child.className}
            </option>
          ))}
        </select>
      </div>

      {/* Timetable Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796F]">
          <CalendarDays size={19} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Weekly Timetable
          </h2>

          {/* <p className="text-sm text-gray-500">
            Class schedule for the selected child.
          </p> */}
        </div>
      </div>

      {/* Timetable */}
      <ParentTimetableTable timetable={timetable} />
    </div>
  );
}