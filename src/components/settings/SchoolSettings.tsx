"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  CalendarDays,
  UserRound,
  Upload,
  Save,
} from "lucide-react";

import { schoolSettings } from "@/data/settings";

export default function SchoolSettings() {
  const [schoolName, setSchoolName] = useState(
    schoolSettings.schoolName
  );

  const [logo, setLogo] = useState(schoolSettings.logo);
  const [address, setAddress] = useState(schoolSettings.address);
  const [phone, setPhone] = useState(schoolSettings.phone);
  const [email, setEmail] = useState(schoolSettings.email);
  const [website, setWebsite] = useState(schoolSettings.website);
  const [academicYear, setAcademicYear] = useState(
    schoolSettings.academicYear
  );
  const [principalName, setPrincipalName] = useState(
    schoolSettings.principalName
  );

  const handleLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
            <Building2 size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              School Settings
            </h2>

            <p className="text-sm text-gray-500">
              Manage your school's basic information.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* School Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            School Name
          </label>

          <div className="relative">
            <Building2
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-10 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Address
          </label>

          <div className="relative">
            <MapPin
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-10 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone
          </label>

          <div className="relative">
            <Phone
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-10 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <div className="relative">
            <Mail
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-10 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Website
          </label>

          <div className="relative">
            <Globe
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-10 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>

        {/* Academic Year */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Academic Year
          </label>

          <div className="relative">
            <CalendarDays
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-10 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              <option>2026-2027</option>
              <option>2025-2026</option>
              <option>2024-2025</option>
            </select>
          </div>
        </div>

        {/* Principal */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Principal Name
          </label>

          <div className="relative">
            <UserRound
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={principalName}
              onChange={(e) => setPrincipalName(e.target.value)}
              className="w-full rounded-xl border border-gray-200 px-10 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            School Logo
          </label>

          <div className="flex items-center gap-4">
            <img
              src={logo}
              alt="School logo"
              className="h-12 w-12 rounded-xl border border-gray-200 object-cover"
            />

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <Upload size={17} />
              Upload Logo

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-[#01796f] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d]"
        >
          <Save size={17} />
          Save Changes
        </button>
      </div>
    </section>
  );
}