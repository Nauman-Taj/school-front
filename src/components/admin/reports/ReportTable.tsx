"use client";

import { useMemo, useState } from "react";
import { Download, FileSpreadsheet, FileText, LoaderCircle, Printer, X } from "lucide-react";

import { reports } from "@/data/reports";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Report } from "@/types/report";

type ReportColumn = { key: string; label: string };
type ReportRow = Record<string, string | number | null>;
type GeneratedReport = { id: number; title: string; generatedAt: string; columns: ReportColumn[]; rows: ReportRow[]; note?: string };

type ReportTableProps = { category: string; search: string };

export default function ReportTable({ category, search }: ReportTableProps) {
  const [generatedReport, setGeneratedReport] = useState<GeneratedReport | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [generatingId, setGeneratingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const filteredReports = useMemo(() => {
    const query = search.trim().toLowerCase();
    return reports.filter((report) => (category === "All" || report.category === category) && (!query || [report.name, report.category, report.description].join(" ").toLowerCase().includes(query)));
  }, [category, search]);

  async function handleGenerate(report: Report) {
    if (generatingId !== null) return;
    setGeneratingId(report.id);
    setError("");
    try {
      const token = getAuthToken();
      if (!token) throw new Error("Your session has expired. Please log in again.");
      const result = await apiRequest<GeneratedReport>(`/reports/${report.id}`, { method: "GET", token });
      setGeneratedReport(result);
      setShowPreview(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : `Unable to generate ${report.name}.`);
    } finally {
      setGeneratingId(null);
    }
  }

  function handleCsvExport() {
    if (!generatedReport) return;
    const records = [
      generatedReport.columns.map((column) => csvCell(column.label)).join(","),
      ...generatedReport.rows.map((row) => generatedReport.columns.map((column) => csvCell(row[column.key])).join(",")),
    ];
    downloadFile(`${fileName(generatedReport.title)}.csv`, `\uFEFF${records.join("\r\n")}`, "text/csv;charset=utf-8");
  }

  function handleExcelExport() {
    if (!generatedReport) return;
    const headers = generatedReport.columns.map((column) => `<Cell><Data ss:Type="String">${xmlEscape(column.label)}</Data></Cell>`).join("");
    const rows = generatedReport.rows.map((row) => `<Row>${generatedReport.columns.map((column) => excelCell(row[column.key])).join("")}</Row>`).join("");
    const xml = `<?xml version="1.0"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"><Worksheet ss:Name="Report"><Table><Row>${headers}</Row>${rows}</Table></Worksheet></Workbook>`;
    downloadFile(`${fileName(generatedReport.title)}.xml`, xml, "application/vnd.ms-excel;charset=utf-8");
  }

  function handlePrint() {
    if (!generatedReport) return;
    setShowPreview(true);
    window.setTimeout(() => window.print(), 200);
  }

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Available Reports</h2>
            <p className="mt-1 text-sm text-gray-500">Generate a report to preview and export its current records.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            <ExportButton disabled={!generatedReport} onClick={handlePrint}><FileText size={16}/>PDF</ExportButton>
            <ExportButton disabled={!generatedReport} onClick={handleExcelExport}><FileSpreadsheet size={16}/>Excel</ExportButton>
            <ExportButton disabled={!generatedReport} onClick={handleCsvExport}><Download size={16}/>CSV</ExportButton>
            <ExportButton disabled={!generatedReport} onClick={handlePrint}><Printer size={16}/>Print</ExportButton>
          </div>
        </div>

        {error && <div role="alert" className="m-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[850px] text-left text-sm">
            <thead className="bg-gray-50 text-gray-700"><tr><th className="px-5 py-4 font-semibold">Report</th><th className="px-5 py-4 font-semibold">Category</th><th className="px-5 py-4 font-semibold">Description</th><th className="px-5 py-4 text-center font-semibold">Action</th></tr></thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((report) => <tr key={report.id} className="transition hover:bg-gray-50"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]"><FileText size={18}/></div><span className="font-semibold text-gray-800">{report.name}</span></div></td><td className="px-5 py-4"><CategoryBadge category={report.category}/></td><td className="px-5 py-4 text-gray-600">{report.description}</td><td className="px-5 py-4 text-center"><GenerateButton report={report} loading={generatingId === report.id} onGenerate={handleGenerate}/></td></tr>)}
              {filteredReports.length === 0 && <tr><td colSpan={4} className="px-5 py-12 text-center text-gray-500">No reports found.</td></tr>}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:hidden">
          {filteredReports.map((report) => <article key={report.id} className="rounded-2xl border border-gray-100 p-5"><div className="flex items-start gap-3"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]"><FileText size={18}/></div><div className="min-w-0 flex-1"><h3 className="font-semibold text-gray-900">{report.name}</h3><div className="mt-2"><CategoryBadge category={report.category}/></div><p className="mt-2 text-sm text-gray-500">{report.description}</p></div></div><div className="mt-4"><GenerateButton report={report} loading={generatingId === report.id} onGenerate={handleGenerate} mobile/></div></article>)}
          {filteredReports.length === 0 && <div className="col-span-full py-10 text-center text-sm text-gray-500">No reports found.</div>}
        </div>

        <div className="border-t border-gray-100 px-5 py-4 text-sm text-gray-500">Showing {filteredReports.length} of {reports.length} reports</div>
      </section>

      {showPreview && generatedReport && <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-3 sm:p-6"><section id="reports-print-view" role="dialog" aria-modal="true" aria-labelledby="report-preview-title" className="mx-auto my-4 max-h-[calc(100vh-2rem)] w-full max-w-6xl overflow-hidden rounded-2xl bg-white shadow-xl sm:my-6"><header className="report-no-print flex flex-col gap-4 border-b border-gray-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 id="report-preview-title" className="text-xl font-bold text-gray-900">{generatedReport.title}</h2><p className="mt-1 text-sm text-gray-500">Generated {new Date(generatedReport.generatedAt).toLocaleString()}</p></div><div className="flex items-center gap-2"><ExportButton disabled={false} onClick={handleCsvExport}><Download size={16}/>CSV</ExportButton><ExportButton disabled={false} onClick={handleExcelExport}><FileSpreadsheet size={16}/>Excel</ExportButton><button type="button" onClick={handlePrint} className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50" aria-label="Print report"><Printer size={17}/></button><button type="button" onClick={() => setShowPreview(false)} className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2.5 text-gray-600 transition hover:bg-gray-50" aria-label="Close report preview"><X size={17}/></button></div></header><div className="max-h-[calc(100vh-11rem)] overflow-auto p-5"><div className="mb-4 hidden print:block"><h1 className="text-2xl font-bold">{generatedReport.title}</h1><p className="mt-1 text-sm text-gray-500">Generated {new Date(generatedReport.generatedAt).toLocaleString()}</p></div>{generatedReport.note && <p className="mb-4 rounded-xl bg-[#e6f4f2] px-4 py-3 text-sm text-[#015f58]">{generatedReport.note}</p>}<div className="overflow-x-auto rounded-xl border border-gray-100"><table className="w-full min-w-max text-left text-sm"><thead className="bg-gray-50 text-gray-700"><tr>{generatedReport.columns.map((column) => <th key={column.key} className="whitespace-nowrap px-4 py-3 font-semibold">{column.label}</th>)}</tr></thead><tbody className="divide-y divide-gray-100">{generatedReport.rows.map((row, index) => <tr key={index} className="hover:bg-gray-50">{generatedReport.columns.map((column) => <td key={column.key} className="whitespace-nowrap px-4 py-3 text-gray-700">{displayValue(row[column.key])}</td>)}</tr>)}{generatedReport.rows.length === 0 && <tr><td colSpan={generatedReport.columns.length} className="px-5 py-12 text-center text-gray-500">No records found for this report.</td></tr>}</tbody></table></div><p className="mt-3 text-sm text-gray-500">{generatedReport.rows.length} {generatedReport.rows.length === 1 ? "record" : "records"}</p></div></section></div>}

      <style jsx global>{`@media print { body * { visibility: hidden !important; } #reports-print-view, #reports-print-view * { visibility: visible !important; } #reports-print-view { position: absolute !important; inset: 0 auto auto 0 !important; width: 100% !important; max-width: none !important; max-height: none !important; overflow: visible !important; margin: 0 !important; box-shadow: none !important; } #reports-print-view > div { max-height: none !important; overflow: visible !important; } .report-no-print { display: none !important; } }`}</style>
    </>
  );
}

function ExportButton({ children, disabled, onClick }: { children: React.ReactNode; disabled: boolean; onClick: () => void }) {
  return <button type="button" disabled={disabled} onClick={onClick} className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-[#01796f] hover:text-[#01796f] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700">{children}</button>;
}

function GenerateButton({ report, loading, onGenerate, mobile = false }: { report: Report; loading: boolean; onGenerate: (report: Report) => void; mobile?: boolean }) {
  return <button type="button" disabled={loading} onClick={() => void onGenerate(report)} className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60 ${mobile ? "w-full" : ""}`}>{loading && <LoaderCircle size={16} className="animate-spin"/>}{loading ? "Generating..." : mobile ? "Generate Report" : "Generate"}</button>;
}

function CategoryBadge({ category }: { category: Report["category"] }) {
  const styles = { Student: "bg-blue-50 text-blue-700", Attendance: "bg-green-50 text-green-700", Academic: "bg-purple-50 text-purple-700", Financial: "bg-orange-50 text-orange-700" };
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${styles[category]}`}>{category}</span>;
}

function displayValue(value: string | number | null | undefined) { return value === null || value === undefined || value === "" ? "—" : String(value); }
function csvCell(value: string | number | null | undefined) {
  let content = value === null || value === undefined ? "" : String(value);
  if (typeof value === "string" && /^[=+@\-\t\r]/.test(content)) content = `'${content}`;
  return `"${content.replaceAll('"', '""')}"`;
}
function excelCell(value: string | number | null) {
  const type = typeof value === "number" ? "Number" : "String";
  return `<Cell><Data ss:Type="${type}">${xmlEscape(value === null ? "" : String(value))}</Data></Cell>`;
}
function xmlEscape(value: string) { return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;"); }
function fileName(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
function downloadFile(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url; anchor.download = name; document.body.append(anchor); anchor.click(); anchor.remove(); URL.revokeObjectURL(url);
}
