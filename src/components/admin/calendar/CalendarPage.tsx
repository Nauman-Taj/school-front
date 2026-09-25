"use client";

import { useState } from "react";

import CalendarView from "@/components/admin/calendar/CalendarView";
import EventForm from "@/components/admin/calendar/EventForm";

import { calendarEvents as initialEvents } from "@/data/calendar";
import { CalendarEvent } from "@/types/calendar";

type CalendarViewType = "Month" | "Week" | "Day";

export default function CalendarPage() {
  const [view, setView] =
    useState<CalendarViewType>("Month");

  const [showForm, setShowForm] =
    useState(false);

  const [events, setEvents] =
    useState<CalendarEvent[]>(initialEvents);

  const handleAddEvent = (event: CalendarEvent) => {
    setEvents((currentEvents) => [
      ...currentEvents,
      event,
    ]);

    setShowForm(false);
  };

  const nextId =
    events.length > 0
      ? Math.max(
          ...events.map((event) => event.id)
        ) + 1
      : 1;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            School Calendar
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            Manage exams, holidays, meetings, events, and school activities.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d] sm:w-auto"
        >
          Add Event
        </button>
      </div>

      {/* View Buttons */}
      <div className="flex justify-center sm:justify-start">
        <div className="flex rounded-full border border-gray-200 bg-white p-1">
          {(["Month", "Week", "Day"] as CalendarViewType[]).map(
            (item) => (
              <button
                key={item}
                onClick={() => setView(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  view === item
                    ? "bg-[#01796f] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>

      {/* Calendar */}
      <CalendarView
        view={view}
        events={events}
      />

      {/* Form */}
      {showForm && (
        <EventForm
          onClose={() => setShowForm(false)}
          onAdd={handleAddEvent}
          nextId={nextId}
        />
      )}
    </div>
  );
}