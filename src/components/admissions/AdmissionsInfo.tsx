"use client";

import { useEffect, useState } from "react";

import {
  Check,
  CheckCircle2,
  FileText,
  CalendarDays,
  GraduationCap,
  ClipboardList,
  Download,
} from "lucide-react";

const requirements = [
  "Completed admission application",
  "Recent student photograph",
  "Previous school academic records",
  "Required identification documents",
  "Parent or guardian information",
];

const eligibility = [
  "Admission is available for eligible students according to the selected class.",
  "Student's age and previous academic level are considered during admission.",
  "Previous school records may be required for students transferring from another school.",
];

const importantDates = [
  {
    title: "Admission Applications",
    description: "Applications are accepted during the announced admission period.",
  },
  {
    title: "Application Review",
    description: "Submitted applications are reviewed by the school administration.",
  },
  {
    title: "Admission Confirmation",
    description: "Parents or guardians are contacted after the application is processed.",
  },
];

export default function AdmissionsInfo() {
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  useEffect(() => {
    if (!showDownloadModal) return;

    const timer = setTimeout(() => {
      setShowDownloadModal(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [showDownloadModal]);
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto max-w-[1200px] space-y-12 px-6">
        {/* Intro */}
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Admission Information
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Everything you need to apply
          </h2>

          <p className="mt-5 leading-7 text-gray-500">
            We have designed the admission process to make it simple and
            convenient for parents and guardians. Prepare the required
            information and documents before submitting your application.
          </p>
        </div>

        {/* Eligibility + Documents */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Eligibility */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2]">
                <GraduationCap className="text-[#01796f]" size={22} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Eligibility & Age Criteria
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Admission requirements by class
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {eligibility.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#01796f]"
                  />

                  <p className="text-sm leading-6 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Documents */}
          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2]">
                <FileText className="text-[#01796f]" size={22} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Required Documents
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Keep these documents ready
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {requirements.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-[#01796f]"
                  />

                  <p className="text-sm leading-6 text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fee Structure */}
        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2]">
              <ClipboardList className="text-[#01796f]" size={22} />
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Fee Structure
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Information about admission and school fees
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "Admission Fee",
                text: "Applicable admission charges are communicated during the admission process.",
              },
              {
                title: "Tuition Fee",
                text: "Tuition fees depend on the student's class and applicable school fee structure.",
              },
              {
                title: "Other Charges",
                text: "Additional charges may apply for services or activities where applicable.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-[#f6f8f8] p-5"
              >
                <h4 className="font-semibold text-gray-900">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Dates */}
        <div>
          <div className="mb-6">
            <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
              Admission Timeline
            </span>

            <h3 className="mt-2 text-2xl font-bold text-gray-900">
              Important Dates
            </h3>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {importantDates.map((item, index) => (
              <div
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2]">
                  <CalendarDays className="text-[#01796f]" size={21} />
                </div>

                <p className="mt-5 text-sm font-semibold text-[#01796f]">
                  Step {index + 1}
                </p>

                <h4 className="mt-1 text-lg font-bold text-gray-900">
                  {item.title}
                </h4>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Application + Download */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[#01796f] p-7 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <ClipboardList size={22} />
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Online Application
            </h3>

            <p className="mt-3 text-sm leading-6 text-white/80">
              Parents and guardians can submit the student's admission
              information online, including child and guardian details.
              Applications are reviewed by the school administration.
            </p>

            <a
              href="#online-application"
              className="mt-6 inline-flex items-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#01796f] transition hover:bg-gray-100"
            >
              Apply Online
            </a>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2]">
              <Download className="text-[#01796f]" size={22} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-gray-900">
              Download Admission Form
            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Prefer to apply using a printed form? Download the admission
              form and submit the completed document according to the
              school's admission procedure.
            </p>

            <button
              type="button"
              onClick={() => setShowDownloadModal(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#01796f] px-5 py-3 text-sm font-semibold text-[#01796f] transition hover:bg-[#e6f4f2]"
            >
              <Download size={17} />
              Download Form
            </button>
          </div>
        </div>
      </div>
      {showDownloadModal && (
        <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          <Check size={17} />
          Form downloaded successfully.
        </div>
      )}
    </section>
  );
}