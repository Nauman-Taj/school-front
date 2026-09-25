"use client";

import { useState } from "react";
import {
  CheckCircle2,
  FileText,
  UserRound,
  Send,
} from "lucide-react";

export default function AdmissionForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="online-application" className="bg-[#f6f8f8] py-20">
      <div className="mx-auto max-w-[1000px] px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Online Admission
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Online Campus Admission Form
          </h2>

          <p className="mt-5 leading-7 text-gray-500">
            Please provide complete and accurate information about the student
            and parent or guardian. Your application will be reviewed by the
            school administration.
          </p>
        </div>

        {submitted ? (
          <div className="mt-10 rounded-2xl border border-gray-200 bg-[#f6f8f8] p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6f4f2]">
              <CheckCircle2 size={30} className="text-[#01796f]" />
            </div>

            <h3 className="mt-5 text-2xl font-bold text-gray-900">
              Application Submitted
            </h3>

            <p className="mx-auto mt-3 max-w-lg leading-7 text-gray-500">
              Thank you for submitting your admission application. Our
              administration team will review your information and contact you
              regarding the next steps.
            </p>

            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 rounded-lg bg-[#01796f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#015f58]"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            {/* Campus Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2]">
                  <FileText size={21} className="text-[#01796f]" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Campus Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Select the campus where you want to apply.
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <label className="text-sm font-medium text-gray-700">
                  Select Campus
                </label>

                <select
                  required
                  className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                >
                  <option value="">Select campus</option>
                  <option value="main">Main Campus</option>
                </select>
              </div>
            </div>

            {/* Student Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e6f4f2]">
                  <UserRound size={21} className="text-[#01796f]" />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Student Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Enter the student's information.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Student's Name
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="Enter student's full name"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Admission Required In
                  </label>

                  <select
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  >
                    <option value="">Select class</option>
                    <option>Grade 5</option>
                    <option>Grade 6</option>
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Student's Gender
                  </label>

                  <select
                    required
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  >
                    <option value="">Select gender</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Place of Birth
                  </label>

                  <input
                    type="text"
                    placeholder="Enter place of birth"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Student's Date of Birth
                  </label>

                  <input
                    required
                    type="date"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Previous Institute Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter previous school or institute"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Guardian Information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Provide parent or guardian contact information.
                </p>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Guardian Name
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="Enter guardian's full name"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Profession
                  </label>

                  <input
                    type="text"
                    placeholder="Enter profession"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Postal Address
                  </label>

                  <textarea
                    required
                    rows={3}
                    placeholder="Enter complete address"
                    className="mt-2 w-full resize-none rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    required
                    type="email"
                    placeholder="Enter email address"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>

                  <input
                    required
                    type="tel"
                    placeholder="Enter phone number"
                    className="mt-2 w-full rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  />
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
              <h3 className="text-xl font-bold text-gray-900">
                Admission Related Remarks
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add any additional information you would like to share.
              </p>

              <textarea
                rows={5}
                placeholder="Enter any remarks"
                className="mt-6 w-full resize-none rounded-lg border border-gray-200 bg-[#f6f8f8] px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#01796f] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#015f58] sm:w-auto"
              >
                <Send size={17} />
                Submit Admission Form
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}