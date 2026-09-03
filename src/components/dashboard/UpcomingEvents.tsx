import { CalendarDays } from "lucide-react";

const events = [
  {
    title: "Parent-Teacher Meeting",
    date: "Sep 06, 2026",
  },
  {
    title: "Mid-Term Examinations",
    date: "Sep 14, 2026",
  },
  {
    title: "School Sports Day",
    date: "Sep 20, 2026",
  },
];

export default function UpcomingEvents() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Upcoming Events
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Important events coming up
        </p>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.title}
            className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#01796f]/10 text-[#01796f]">
              <CalendarDays size={19} />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-900">
                {event.title}
              </p>

              <p className="mt-1 text-xs text-[#01796f]">
                {event.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}