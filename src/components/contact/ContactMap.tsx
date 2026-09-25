import { MapPin } from "lucide-react";

export default function ContactMap() {
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-8">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Find Us
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Visit Our School
          </h2>

          <p className="mt-4 max-w-2xl leading-7 text-gray-500">
            Visit Garrison Grammar School at New Shah Shams Colony, Vehari
            Road, Multan.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <iframe
            title="Garrison Grammar School Location"
            src="https://www.google.com/maps?q=New+Shah+Shams+Colony,+Vehari+Road,+Multan,+Pakistan&output=embed"
            className="h-[400px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-5 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796f]">
            <MapPin size={20} />
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-900">
              School Address
            </p>

            <p className="mt-1 text-sm text-gray-500">
              New Shah Shams Colony, Vehari Road, Multan, Pakistan
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}