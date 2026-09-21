"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";

import { calendarEvents } from "@/data/calendar";

type CalendarViewType = "Month" | "Week" | "Day";

type CalendarViewProps = {
  view: CalendarViewType;
};

const eventStyles = {
  Exam: "bg-red-50 text-red-700 border-red-100",
  Holiday: "bg-orange-50 text-orange-700 border-orange-100",
  Event: "bg-blue-50 text-blue-700 border-blue-100",
  "Parent Meeting": "bg-purple-50 text-purple-700 border-purple-100",
  "Teacher Meeting": "bg-green-50 text-green-700 border-green-100",
  "School Activity": "bg-teal-50 text-teal-700 border-teal-100",
};

export default function CalendarView({ view }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 8, 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToday = () => {
    setCurrentDate(new Date(2026, 8, 1));
  };

  const days = useMemo(() => {
    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  }, [daysInMonth]);

  const getEvents = (day: number) => {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return calendarEvents.filter((event) => event.date === date);
  };

  if (view === "Week") {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <CalendarHeader
          title={`${monthName} ${year}`}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
          goToday={goToday}
        />

        <div className="mt-6 grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="py-2 text-center text-xs font-semibold text-gray-500"
              >
                {day}
              </div>
            )
          )}

          {Array.from({ length: 7 }).map((_, index) => {
            const day = Math.min(index + 6, daysInMonth);
            const events = getEvents(day);

            return (
              <div
                key={index}
                className="min-h-48 rounded-xl border border-gray-200 p-3"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {day}
                </p>

                <div className="mt-3 space-y-2">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`rounded-lg border p-2 text-xs ${
                        eventStyles[event.type]
                      }`}
                    >
                      <p className="font-semibold">{event.title}</p>
                      <p className="mt-1 opacity-75">{event.type}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (view === "Day") {
    const day = 8;
    const events = getEvents(day);

    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5">
        <CalendarHeader
          title={`${monthName} ${day}, ${year}`}
          previousMonth={previousMonth}
          nextMonth={nextMonth}
          goToday={goToday}
        />

        <div className="mt-6 space-y-3">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className={`rounded-xl border p-4 ${
                  eventStyles[event.type]
                }`}
              >
                <p className="font-semibold">{event.title}</p>
                <p className="mt-1 text-sm">{event.type}</p>
                <p className="mt-2 text-sm opacity-75">
                  {event.description}
                </p>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <CalendarDays
                className="mx-auto text-gray-300"
                size={40}
              />
              <p className="mt-3 text-sm text-gray-500">
                No events scheduled for this day.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <CalendarHeader
        title={`${monthName} ${year}`}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
        goToday={goToday}
      />

      {/* Desktop Calendar */}
      <div className="mt-6 hidden md:block">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day) => (
              <div
                key={day}
                className="px-3 py-3 text-center text-xs font-semibold uppercase text-gray-500"
              >
                {day}
              </div>
            )
          )}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, index) => (
            <div
              key={`empty-${index}`}
              className="min-h-32 border-b border-r border-gray-100 bg-gray-50/50"
            />
          ))}

          {days.map((day) => {
            const events = getEvents(day);

            return (
              <div
                key={day}
                className="min-h-32 border-b border-r border-gray-100 p-2"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium text-gray-700">
                  {day}
                </div>

                <div className="mt-1 space-y-1">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`rounded-md border px-2 py-1 text-xs ${
                        eventStyles[event.type]
                      }`}
                    >
                      <p className="truncate font-medium">
                        {event.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Calendar */}
      <div className="mt-6 space-y-2 md:hidden">
        {days.map((day) => {
          const events = getEvents(day);

          return (
            <div
              key={day}
              className="rounded-xl border border-gray-200 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {monthName} {day}
                </span>

                <span className="text-xs text-gray-400">
                  {events.length} event
                  {events.length !== 1 ? "s" : ""}
                </span>
              </div>

              {events.length > 0 && (
                <div className="mt-3 space-y-2">
                  {events.map((event) => (
                    <div
                      key={event.id}
                      className={`rounded-lg border p-3 ${
                        eventStyles[event.type]
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs">
                        {event.type}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type CalendarHeaderProps = {
  title: string;
  previousMonth: () => void;
  nextMonth: () => void;
  goToday: () => void;
};

function CalendarHeader({
  title,
  previousMonth,
  nextMonth,
  goToday,
}: CalendarHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={goToday}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#01796f] hover:text-[#01796f]"
        >
          Today
        </button>

        <button
          onClick={previousMonth}
          className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-[#01796f] hover:text-[#01796f]"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={nextMonth}
          className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-[#01796f] hover:text-[#01796f]"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}