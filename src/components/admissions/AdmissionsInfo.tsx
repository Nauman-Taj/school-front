import { CheckCircle2 } from "lucide-react";

const requirements = [
  "Completed admission application",
  "Recent student photograph",
  "Previous school academic records",
  "Required identification documents",
  "Parent or guardian information",
];

export default function AdmissionsInfo() {
  return (
    <section className="bg-[#f6f8f8] py-20">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 lg:grid-cols-2">
        <div>
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            Admission Information
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            What you need to get started
          </h2>

          <p className="mt-5 max-w-xl leading-7 text-gray-500">
            Preparing the required information in advance helps make the
            application process smooth and efficient.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900">
            Application checklist
          </h3>

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
    </section>
  );
}