"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";

type CalendarEvent = {
  id: number;
  title: string;
  date: string;
  type: string;
  description: string;
};

export default function UpcomingEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvents() {
      try {
        const token = getAuthToken();

        if (!token) {
          throw new Error("Please log in to view upcoming events.");
        }

        const data = await apiRequest<CalendarEvent[]>(
          "/calendar-events",
          { token },
        );

        if (!cancelled) {
          setEvents(data);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load upcoming events.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvents();

    return () => {
      cancelled = true;
    };
  }, []);

  // Use the local calendar date when filtering events.
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const upcomingEvents = events
    .filter((event) => event.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e6f4f2]">
          <CalendarDays className="h-5 w-5 text-[#01796F]" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Upcoming Events
          </h2>

          <p className="text-sm text-gray-500">
            School events and activities
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">
          Loading upcoming events...
        </p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : upcomingEvents.length === 0 ? (
        <p className="text-sm text-gray-500">
          No upcoming events.
        </p>
      ) : (
        <div className="space-y-2.5">
          {upcomingEvents.map((event) => {
            const eventDate = new Date(`${event.date}T12:00:00`);

            return (
              <div
                key={event.id}
                className="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-2.5"
              >
                <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-[#e6f4f2]">
                  <span className="text-[10px] font-medium uppercase text-[#01796F]">
                    {eventDate.toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>

                  <span className="text-base font-bold text-[#01796F]">
                    {eventDate.getDate()}
                  </span>
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-gray-900">
                    {event.title}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}