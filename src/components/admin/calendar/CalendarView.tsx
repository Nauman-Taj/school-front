"use client";

import { useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { CalendarEvent } from "@/types/calendar";

type CalendarViewType = "Month" | "Week" | "Day";

type CalendarViewProps = {
  view: CalendarViewType;
  events: CalendarEvent[];
};

const eventStyles: Record<CalendarEvent["type"], string> = {
  Exam: "bg-red-50 text-red-700 border-red-100",
  Holiday: "bg-orange-50 text-orange-700 border-orange-100",
  Event: "bg-blue-50 text-blue-700 border-blue-100",
  "Parent Meeting": "bg-purple-50 text-purple-700 border-purple-100",
  "Teacher Meeting": "bg-green-50 text-green-700 border-green-100",
  "School Activity": "bg-teal-50 text-teal-700 border-teal-100",
};

export default function CalendarView({
  view,
  events,
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState<Date>(() => {
    const today = new Date();

    return new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const days = Array.from(
    { length: daysInMonth },
    (_, index) => index + 1
  );

  const getEvents = (day: number) => {
    const date = formatDate(
      new Date(year, month, day)
    );

    return events.filter(
      (event) => event.date === date
    );
  };

  const goPrevious = () => {
    const date = new Date(currentDate);

    if (view === "Month") {
      date.setMonth(date.getMonth() - 1);
    }

    if (view === "Week") {
      date.setDate(date.getDate() - 7);
    }

    if (view === "Day") {
      date.setDate(date.getDate() - 1);
    }

    setCurrentDate(date);
  };

  const goNext = () => {
    const date = new Date(currentDate);

    if (view === "Month") {
      date.setMonth(date.getMonth() + 1);
    }

    if (view === "Week") {
      date.setDate(date.getDate() + 7);
    }

    if (view === "Day") {
      date.setDate(date.getDate() + 1);
    }

    setCurrentDate(date);
  };

  const goToday = () => {
    const today = new Date();

    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      )
    );
  };

  const currentTitle =
    view === "Day"
      ? currentDate.toLocaleDateString("default", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      : view === "Week"
        ? getWeekTitle(currentDate)
        : `${monthName} ${year}`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <CalendarHeader
        title={currentTitle}
        previous={goPrevious}
        next={goNext}
        today={goToday}
      />

      {view === "Month" && (
        <MonthView
          year={year}
          monthName={monthName}
          firstDay={firstDay}
          days={days}
          getEvents={getEvents}
        />
      )}

      {view === "Week" && (
        <WeekView
          currentDate={currentDate}
          events={events}
        />
      )}

      {view === "Day" && (
        <DayView
          currentDate={currentDate}
          events={events}
        />
      )}
    </div>
  );
}

/* =========================
   Month View
========================= */

function MonthView({
  year,
  monthName,
  firstDay,
  days,
  getEvents,
}: {
  year: number;
  monthName: string;
  firstDay: number;
  days: number[];
  getEvents: (day: number) => CalendarEvent[];
}) {
  return (
    <>
      {/* Desktop */}
      <div className="mt-6 hidden md:block">
        <div className="grid grid-cols-7 border-b border-gray-200">
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div
              key={day}
              className="px-3 py-3 text-center text-xs font-semibold uppercase text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map(
            (_, index) => (
              <div
                key={`empty-${index}`}
                className="min-h-32 border-b border-r border-gray-100 bg-gray-50/50"
              />
            )
          )}

          {days.map((day) => {
            const dayEvents = getEvents(day);

            return (
              <div
                key={day}
                className="min-h-32 border-b border-r border-gray-100 p-2"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium text-gray-700">
                  {day}
                </div>

                <div className="mt-1 space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`rounded-md border px-2 py-1 text-xs ${eventStyles[event.type]
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

      {/* Mobile */}
      <div className="mt-6 space-y-2 md:hidden">
        {days.map((day) => {
          const dayEvents = getEvents(day);

          return (
            <div
              key={day}
              className="rounded-xl border border-gray-200 p-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  {monthName} {day}, {year}
                </span>

                <span className="text-xs text-gray-400">
                  {dayEvents.length} event
                  {dayEvents.length !== 1 ? "s" : ""}
                </span>
              </div>

              {dayEvents.length > 0 && (
                <div className="mt-3 space-y-2">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`rounded-lg border p-3 ${eventStyles[event.type]
                        }`}
                    >
                      <p className="text-sm font-semibold">
                        {event.title}
                      </p>

                      <p className="mt-1 text-xs">
                        {event.type}
                      </p>

                      <p className="mt-1 text-xs opacity-75">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =========================
   Week View
========================= */

function WeekView({
  currentDate,
  events,
}: {
  currentDate: Date;
  events: CalendarEvent[];
}) {
  const startOfWeek = new Date(currentDate);

  startOfWeek.setDate(
    currentDate.getDate() - currentDate.getDay()
  );

  const weekDays = Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date(startOfWeek);

      date.setDate(
        startOfWeek.getDate() + index
      );

      return date;
    }
  );

  return (
    <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-7">
      {weekDays.map((date) => {
        const dateString = formatDate(date);

        const dayEvents = events.filter(
          (event) => event.date === dateString
        );

        return (
          <div
            key={dateString}
            className="min-h-48 rounded-xl border border-gray-200 p-3"
          >
            <p className="text-xs font-medium text-gray-500">
              {date.toLocaleString("default", {
                weekday: "short",
              })}
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              {date.getDate()}
            </p>

            <div className="mt-3 space-y-2">
              {dayEvents.map((event) => (
                <div
                  key={event.id}
                  className={`rounded-lg border p-2 text-xs ${eventStyles[event.type]
                    }`}
                >
                  <p className="font-semibold">
                    {event.title}
                  </p>

                  <p className="mt-1 opacity-75">
                    {event.type}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================
   Day View
========================= */

function DayView({
  currentDate,
  events,
}: {
  currentDate: Date;
  events: CalendarEvent[];
}) {
  const dateString = formatDate(currentDate);

  const dayEvents = events.filter(
    (event) => event.date === dateString
  );

  return (
    <div className="mt-6 space-y-3">
      {dayEvents.length > 0 ? (
        dayEvents.map((event) => (
          <div
            key={event.id}
            className={`rounded-xl border p-4 ${eventStyles[event.type]
              }`}
          >
            <p className="font-semibold">
              {event.title}
            </p>

            <p className="mt-1 text-sm">
              {event.type}
            </p>

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
  );
}

/* =========================
   Calendar Header
========================= */

function CalendarHeader({
  title,
  previous,
  next,
  today,
}: {
  title: string;
  previous: () => void;
  next: () => void;
  today: () => void;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-lg font-semibold text-gray-900">
        {title}
      </h2>

      <div className="flex items-center justify-center gap-2">
        <button
          onClick={today}
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-[#01796f] hover:text-[#01796f]"
        >
          Today
        </button>

        <button
          onClick={previous}
          className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-[#01796f] hover:text-[#01796f]"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={next}
          className="rounded-full border border-gray-200 p-2 text-gray-600 transition hover:border-[#01796f] hover:text-[#01796f]"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

/* =========================
   Helpers
========================= */

function formatDate(date: Date) {
  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

function getWeekTitle(date: Date) {
  const start = new Date(date);

  start.setDate(
    date.getDate() - date.getDay()
  );

  const end = new Date(start);

  end.setDate(
    start.getDate() + 6
  );

  const startMonth = start.toLocaleString(
    "default",
    {
      month: "short",
    }
  );

  const endMonth = end.toLocaleString(
    "default",
    {
      month: "short",
    }
  );

  if (
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth()
  ) {
    return `${startMonth} ${start.getDate()}–${end.getDate()}, ${start.getFullYear()}`;
  }

  return `${startMonth} ${start.getDate()} – ${endMonth} ${end.getDate()}, ${end.getFullYear()}`;
}

