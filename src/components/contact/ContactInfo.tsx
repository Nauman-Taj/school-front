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
    detail: "Monday – Friday, 8:00 AM - 3:00 PM",
  },
  {
    icon: Mail,
    title: "Email Us",
    text: "info@garrisonschool.com",
    detail: "Catch us at info@garrisonschool.com.",
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

              <p className="mt-1 text-sm font-medium text-gray-700">
                {item.text}
              </p>

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