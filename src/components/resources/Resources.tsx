"use client";

import {
  BookOpen,
  CalendarDays,
  FileText,
  GraduationCap,
  ClipboardList,
  Clock3,
  Download,
  X,
  Check,
} from "lucide-react";
import { useEffect, useState } from "react";

const resources = [
  {
    icon: BookOpen,
    title: "School Prospectus",
    description:
      "Learn about our school, academic approach and educational environment.",
    content:
      "The Garrison Grammar School prospectus provides an overview of our school, academic programs, learning approach, facilities and student activities.",
  },
  {
    icon: FileText,
    title: "Fee Structure",
    description:
      "View the available fee information for students and families.",
    content:
      "The fee structure contains information about admission fees, tuition fees and other applicable school charges.",
  },
  {
    icon: CalendarDays,
    title: "Academic Calendar",
    description:
      "Keep track of important academic dates, events and holidays.",
    content:
      "The academic calendar includes important dates such as term periods, examinations, holidays, parent meetings and school activities.",
  },
  {
    icon: ClipboardList,
    title: "Admission Forms",
    description:
      "Access forms and information required during the admission process.",
    content:
      "Admission forms contain the information required from students and guardians during the school admission process.",
  },
  {
    icon: GraduationCap,
    title: "Rules & Regulations",
    description:
      "Review the guidelines that support a safe and respectful school environment.",
    content:
      "School rules and regulations provide guidance regarding attendance, discipline, academic responsibilities, student conduct and school procedures.",
  },
  {
    icon: Clock3,
    title: "Timetable",
    description:
      "Access class scheduling and timetable information.",
    content:
      "The timetable provides information about class periods, subjects and the daily academic schedule.",
  },
];

export default function Resources() {
  const [selectedResource, setSelectedResource] =
    useState<(typeof resources)[number] | null>(null);

  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = (resource: (typeof resources)[number]) => {
    const fileContent = `${resource.title}

Garrison Grammar School

${resource.description}

${resource.content}
`;

    const blob = new Blob([fileContent], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${resource.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")}.txt`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    setDownloaded(true);
  };

  useEffect(() => {
    if (!downloaded) return;

    const timer = setTimeout(() => {
      setDownloaded(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [downloaded]);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Downloads & Resources
          </span>

          <h1 className="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl">
            Useful school resources
          </h1>

          <p className="mt-5 leading-7 text-gray-600">
            Access important information, forms and resources for students and
            parents in one place.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <div
                key={resource.title}
                className="rounded-2xl border border-gray-200 bg-[#f6f8f8] p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2] text-[#01796f]">
                  <Icon size={22} />
                </div>

                <h2 className="mt-5 text-lg font-bold text-gray-900">
                  {resource.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {resource.description}
                </p>

                <div className="mt-5 flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleDownload(resource)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#01796f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
                  Resource
                </p>

                <h2 className="mt-2 text-2xl font-bold text-gray-900">
                  {selectedResource.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-5 leading-7 text-gray-600">
              {selectedResource.content}
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleDownload(selectedResource)}
                className="flex items-center gap-2 rounded-lg bg-[#01796f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#015f58]"
              >
                <Download size={16} />
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {downloaded && (
        <div className="fixed left-1/2 top-5 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          <Check size={17} />
          Resource downloaded successfully.
        </div>
      )}
    </section>
  );
}