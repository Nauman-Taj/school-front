import { ArrowRight, FileText, ClipboardCheck, UserCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Submit an Application",
    text: "Complete the admission application with the required student and family information.",
  },
  {
    number: "02",
    icon: ClipboardCheck,
    title: "Assessment & Review",
    text: "Our team reviews the application and conducts any required academic assessment.",
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Admission Decision",
    text: "Successful applicants receive admission information and guidance for the next steps.",
  },
];

export default function AdmissionProcess() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-wider text-[#01796f]">
            How It Works
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            A simple admissions process
          </h2>

          <p className="mt-4 leading-7 text-gray-500">
            We aim to make the admissions journey clear and straightforward for
            every family.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
                    <Icon size={23} />
                  </div>

                  <span className="text-3xl font-bold text-gray-500">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {step.text}
                </p>

                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#01796f]">
                  Step {step.number}
                  <ArrowRight size={15} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}