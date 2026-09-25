import {
  Clock3,
  Globe,
  Mail,
  MapPin,
  Phone,
  Siren,
} from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Us",
    text: "Garrison Grammar School",
    detail: "New Shah Shams Colony, Vehari Road, Multan",
  },
  {
    icon: Phone,
    title: "Call Us",
    text: "(061) 6527646",
    detail: "Boys Campus",
    href: "tel:+92616527646",
  },
  {
    icon: Phone,
    title: "Girls Campus",
    text: "(061) 6760531",
    detail: "Mumtazabad, Vehari Road, Multan",
    href: "tel:+92616760531",
  },
  {
    icon: Mail,
    title: "Email Us",
    text: "info@garrisonschool.edu.pk",
    detail: "We're happy to hear from you.",
    href: "mailto:info@garrisonschool.edu.pk",
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-5">
      {contactDetails.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex gap-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
              <Icon size={21} />
            </div>

            <div>
              <h3 className="font-bold text-gray-900">{item.title}</h3>

              <a
                href={item.href}
                className="mt-1 block text-sm font-medium text-gray-700 transition-colors hover:text-[#01796f]"
              >
                {item.text}
              </a>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {item.detail}
              </p>
            </div>
          </div>
        );
      })}

      {/* School Timings */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
            <Clock3 size={21} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900">School Timings</h3>

            <p className="mt-2 text-sm text-gray-600">
              Monday - Friday
            </p>

            <p className="mt-1 text-sm text-gray-500">
              8:00 AM - 3:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex gap-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#01796f]/10 text-[#01796f]">
            <Siren size={21} />
          </div>

          <div>
            <h3 className="font-bold text-gray-900">
              Emergency Contact
            </h3>

            <a
              href="tel:+92616527646"
              className="mt-1 block text-sm font-medium text-gray-700 hover:text-[#01796f]"
            >
              (061) 6527646
            </a>

            <p className="mt-1 text-sm text-gray-500">
              Contact the school office for urgent assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Social Media */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-gray-900">Follow Us</h3>

        <div className="mt-4 flex gap-3">
          <a
            href="#"
            className="flex items-center gap-2 rounded-lg bg-[#e6f4f2] px-4 py-2.5 text-sm font-medium text-[#01796f] transition hover:bg-[#01796f] hover:text-white"
          >
            <Globe size={18} />
            Facebook
          </a>

          <a
            href="#"
            className="flex items-center gap-2 rounded-lg bg-[#e6f4f2] px-4 py-2.5 text-sm font-medium text-[#01796f] transition hover:bg-[#01796f] hover:text-white"
          >
            <Globe size={18} />
            Instagram
          </a>
        </div>
      </div>
    </div>
  );
}