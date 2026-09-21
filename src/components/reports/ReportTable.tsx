"use client";

import { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileText,
  Printer,
} from "lucide-react";

import { reports } from "@/data/reports";

type ReportTableProps = {
  category: string;
  search: string;
};

export default function ReportTable({
  category,
  search,
}: ReportTableProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [action, setAction] = useState("");

  const filteredReports = reports.filter((report) => {
    const matchesCategory =
      category === "All" || report.category === category;

    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm) ||
      report.category.toLowerCase().includes(searchTerm) ||
      report.description.toLowerCase().includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  const handleExport = (format: string) => {
    setAction(`Export ${format}`);
    setShowConfirm(true);
  };

  const handleGenerate = (reportName: string) => {
    setAction(`Generate ${reportName}`);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    setAction("");
  };

  const getCategoryStyle = (category: string) => {
    switch (category) {
      case "Student":
        return "bg-blue-50 text-blue-700";

      case "Attendance":
        return "bg-green-50 text-green-700";

      case "Academic":
        return "bg-purple-50 text-purple-700";

      case "Financial":
        return "bg-orange-50 text-orange-700";

      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Available Reports
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Select a report and export it in your preferred format.
            </p>
          </div>

          {/* Export Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            <button
              onClick={() => handleExport("PDF")}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:text-[#01796f]"
            >
              <FileText size={16} />
              PDF
            </button>

            <button
              onClick={() => handleExport("Excel")}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:text-[#01796f]"
            >
              <FileSpreadsheet size={16} />
              Excel
            </button>

            <button
              onClick={() => handleExport("CSV")}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:text-[#01796f]"
            >
              <Download size={16} />
              CSV
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:text-[#01796f]"
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Report
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Description
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#e6f4f2] p-2 text-[#01796f]">
                        <FileText size={17} />
                      </div>

                      <span className="text-sm font-medium text-gray-900">
                        {report.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getCategoryStyle(
                        report.category
                      )}`}
                    >
                      {report.category}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {report.description}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => handleGenerate(report.name)}
                        className="rounded-full bg-[#01796f] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#01665d]"
                      >
                        Generate
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredReports.length === 0 && (
            <div className="py-12 text-center text-sm text-gray-500">
              No reports found.
            </div>
          )}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-3 p-4 md:hidden">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[#e6f4f2] p-2 text-[#01796f]">
                  <FileText size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {report.name}
                  </h3>

                  <span
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${getCategoryStyle(
                      report.category
                    )}`}
                  >
                    {report.category}
                  </span>

                  <p className="mt-2 text-sm text-gray-500">
                    {report.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleGenerate(report.name)}
                className="mt-4 w-full rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
              >
                Generate Report
              </button>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="py-10 text-center text-sm text-gray-500">
              No reports found.
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-10">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              {action}?
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to {action.toLowerCase()}?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}