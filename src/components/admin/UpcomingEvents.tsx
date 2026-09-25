import { CalendarDays } from "lucide-react";
import { calendarEvents } from "@/data/calendar";

const upcomingEvents = calendarEvents
  .filter(
    (event) =>
      event.date >= new Date().toISOString().split("T")[0]
  )
  .sort((a, b) => a.date.localeCompare(b.date))
  .slice(0, 4);

export default function UpcomingEvents() {
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

      {upcomingEvents.length === 0 ? (
        <p className="text-sm text-gray-500">
          No upcoming events.
        </p>
      ) : (
        <div className="space-y-2.5">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 rounded-xl border border-gray-100 px-3 py-2.5"
            >
              <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-[#e6f4f2]">
                <span className="text-[10px] font-medium uppercase text-[#01796F]">
                  {new Date(event.date).toLocaleDateString(
                    "en-US",
                    { month: "short" }
                  )}
                </span>

                <span className="text-base font-bold text-[#01796F]">
                  {new Date(event.date).getDate()}
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
          ))}
        </div>
      )}
    </div>
  );
}