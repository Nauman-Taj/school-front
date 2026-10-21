
"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  CalendarEvent,
  CalendarEventType,
} from "@/types/calendar";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type EventFormProps = {
  event: CalendarEvent | null;
  onClose: () => void;
  onAdd: (event: CalendarEvent) => void;
  onUpdate: (event: CalendarEvent) => void;
};

export default function EventForm({
  event,
  onClose,
  onAdd,
  onUpdate,
}: EventFormProps) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [type, setType] = useState<CalendarEventType>(
    event?.type ?? "Event"
  );
  const [description, setDescription] = useState(
    event?.description ?? ""
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const isEditing = event !== null;

  const handleSubmit = async () => {
    if (!title.trim() || !date || saving) {
      return;
    }

    setSaving(true);
    setError("");

    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error("Your session has expired. Please log in again.");
      }

      const payload = {
        title: title.trim(),
        date,
        type,
        description: description.trim(),
      };

      const savedEvent = await apiRequest<CalendarEvent>(
        isEditing
          ? `/calendar-events/${encodeURIComponent(String(event.id))}`
          : "/calendar-events",
        {
          method: isEditing ? "PATCH" : "POST",
          token,
          body: JSON.stringify(payload),
        }
      );

      if (isEditing) {
        onUpdate(savedEvent);
      } else {
        onAdd(savedEvent);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `Failed to ${isEditing ? "update" : "create"} the calendar event.`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/40 px-4 pb-8 pt-20">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit Calendar Event" : "Add Calendar Event"}
          </h2>

          <button
            onClick={onClose}
            disabled={saving}
            aria-label="Close event form"
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={(formEvent) => {
            formEvent.preventDefault();
            void handleSubmit();
          }}
        >
          <div className="mt-6 space-y-5">
            <div>
              <label
                htmlFor="event-title"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Event Title
              </label>

              <input
                id="event-title"
                value={title}
                onChange={(inputEvent) => setTitle(inputEvent.target.value)}
                maxLength={150}
                required
                placeholder="Enter event title"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="event-date"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Date
                </label>

                <input
                  id="event-date"
                  type="date"
                  value={date}
                  onChange={(inputEvent) => setDate(inputEvent.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="event-type"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Type
                </label>

                <select
                  id="event-type"
                  value={type}
                  onChange={(inputEvent) =>
                    setType(inputEvent.target.value as CalendarEventType)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                >
                  <option value="Exam">Exam</option>
                  <option value="Holiday">Holiday</option>
                  <option value="Event">Event</option>
                  <option value="Parent Meeting">Parent Meeting</option>
                  <option value="Teacher Meeting">Teacher Meeting</option>
                  <option value="School Activity">School Activity</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="event-description"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Description
              </label>

              <textarea
                id="event-description"
                value={description}
                onChange={(inputEvent) =>
                  setDescription(inputEvent.target.value)
                }
                maxLength={1000}
                rows={3}
                placeholder="Enter event description"
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              />
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="w-full rounded-full border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!title.trim() || !date || saving}
              className="w-full rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
            >
              {saving
                ? isEditing
                  ? "Saving Changes..."
                  : "Saving..."
                : isEditing
                  ? "Save Changes"
                  : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
