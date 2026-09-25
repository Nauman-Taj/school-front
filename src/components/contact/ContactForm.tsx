"use client";

import { Check } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (!submitted) return;

    const timer = setTimeout(() => {
      setSubmitted(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [submitted]);

  return (
    <div className="self-start rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
      <h2 className="text-2xl font-bold text-gray-900">
        Send us a message
      </h2>

      {submitted && (
        <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          <Check size={17} />
          Message sent successfully.
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-semibold text-gray-700"
            >
              Your Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="text-sm font-semibold text-gray-700"
          >
            Subject
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            required
            className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            placeholder="What can we help you with?"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-sm font-semibold text-gray-700"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            rows={7}
            className="mt-2 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            placeholder="Write your message"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#01796f] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#015f58]"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}