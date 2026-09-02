import { Mail, MapPin, Phone } from "lucide-react";

const contactDetails = [
  {
    icon: MapPin,
    title: "Visit Us",
    text: "Garrison Grammar School",
    detail: "Mumtazabad Campus",
  },
  {
    icon: Phone,
    title: "Call Us",
    text: "+92 300 5454544",
    detail: "Monday - Friday, 8:00 AM - 3:00 PM",
    href: "tel:+923005454544",
  },
  {
    icon: Mail,
    title: "Email Us",
    text: "info@garrisonschool.com",
    detail: "We'd be happy to hear from you.",
    href: "mailto:info@linkkiodabaya.com",
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

              {item.href ? (
                <a
                  href={item.href}
                  className="mt-1 block text-sm font-medium text-gray-700 transition-colors hover:text-[#01796f]"
                >
                  {item.text}
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-gray-700">
                  {item.text}
                </p>
              )}

              <p className="mt-1 text-sm leading-6 text-gray-500">
                {item.detail}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}