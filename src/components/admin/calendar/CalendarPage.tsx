
"use client";

import { useCallback, useEffect, useState } from "react";

import CalendarView from "@/components/admin/calendar/CalendarView";
import EventForm from "@/components/admin/calendar/EventForm";

import { CalendarEvent } from "@/types/calendar";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type CalendarViewType = "Month" | "Week" | "Day";

export default function CalendarPage() {
  const [view, setView] = useState<CalendarViewType>("Month");
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(
    null
  );
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const data = await apiRequest<CalendarEvent[]>("/calendar-events", {
        method: "GET",
        token,
      });

      setEvents(
        [...data].sort(
          (a, b) => a.date.localeCompare(b.date) || a.id - b.id
        )
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load calendar events."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  const sortEvents = (items: CalendarEvent[]) =>
    [...items].sort(
      (a, b) => a.date.localeCompare(b.date) || a.id - b.id
    );

  const handleEventAdded = (event: CalendarEvent) => {
    setEvents((current) => sortEvents([...current, event]));
    setShowForm(false);
    setEditingEvent(null);
    setActionError("");
  };

  const handleEventUpdated = (updatedEvent: CalendarEvent) => {
    setEvents((current) =>
      sortEvents(
        current.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        )
      )
    );

    setShowForm(false);
    setEditingEvent(null);
    setActionError("");
  };

  const handleEdit = (event: CalendarEvent) => {
    setActionError("");
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEvent(null);
  };

  const handleDelete = async (event: CalendarEvent) => {
    if (deletingId !== null) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmed) {
      return;
    }

    setActionError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      setDeletingId(event.id);

      await apiRequest<unknown>(
        `/calendar-events/${encodeURIComponent(String(event.id))}`,
        {
          method: "DELETE",
          token,
        }
      );

      setEvents((current) =>
        current.filter((item) => item.id !== event.id)
      );

      if (editingEvent?.id === event.id) {
        handleCloseForm();
      }
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Failed to delete the calendar event."
      );
    } finally {
      setDeletingId(null);
    }
  };

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
          onClick={() => {
            setActionError("");
            setEditingEvent(null);
            setShowForm(true);
          }}
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Add Event
        </button>
      </div>

      {/* View Buttons */}
      <div className="flex justify-center sm:justify-start">
        <div className="flex rounded-full border border-gray-200 bg-white p-1">
          {(["Month", "Week", "Day"] as CalendarViewType[]).map((item) => (
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
          ))}
        </div>
      </div>

      {/* Delete and action errors */}
      {actionError && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>{actionError}</p>

            <button
              type="button"
              onClick={() => setActionError("")}
              className="self-start font-medium underline sm:self-auto"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Loading and fetch error states */}
      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white py-12 text-center text-sm text-gray-500">
          Loading calendar events...
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-red-200 bg-white p-5">
          <p className="text-sm text-red-600">{error}</p>

          <button
            onClick={() => void loadEvents()}
            className="mt-3 rounded-full bg-[#01796f] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#015f58]"
          >
            Try Again
          </button>
        </div>
      ) : (
        <CalendarView
          view={view}
          events={events}
          onEdit={handleEdit}
          onDelete={(event) => void handleDelete(event)}
          deletingId={deletingId}
        />
      )}

      {/* Create / Edit Form */}
      {showForm && (
        <EventForm
          key={editingEvent?.id ?? "new-event"}
          event={editingEvent}
          onClose={handleCloseForm}
          onAdd={handleEventAdded}
          onUpdate={handleEventUpdated}
        />
      )}
    </div>
  );
}
