import { Check, Clock3, X } from "lucide-react";

import { AttendanceRecord } from "@/types/attendance";

type AttendanceTableProps = {
  records: AttendanceRecord[];
};

function StatusBadge({
  status,
}: {
  status: AttendanceRecord["status"];
}) {
  const styles = {
    Present: "bg-green-50 text-green-700",
    Absent: "bg-red-50 text-red-700",
    Late: "bg-yellow-50 text-yellow-700",
  };

  const icons = {
    Present: <Check size={14} />,
    Absent: <X size={14} />,
    Late: <Clock3 size={14} />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {icons[status]}
      {status}
    </span>
  );
}

export default function AttendanceTable({
  records,
}: AttendanceTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Name
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Type
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Class / Department
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                Date
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {records.map((record) => (
              <tr
                key={record.id}
                className="hover:bg-gray-50"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {record.name}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {record.role}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {record.role === "Student"
                    ? record.class
                    : record.department}
                </td>

                <td className="px-6 py-4 text-sm text-gray-600">
                  {record.date}
                </td>

                <td className="px-6 py-4 text-center">
                  <StatusBadge status={record.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}