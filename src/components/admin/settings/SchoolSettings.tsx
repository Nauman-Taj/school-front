"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  CalendarDays,
  UserRound,
  Upload,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import {
  notifySchoolSettingsUpdated,
  useSchoolSetting,
  useSchoolSettingError,
} from "@/lib/schoolSettings";

type SchoolSettingResponse = {
  id: number;
  schoolName: string;
  logo: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  academicYear: string;
  principalName: string;
};

export default function SchoolSettings() {
  const school = useSchoolSetting();
  const loadError = useSchoolSettingError();
  const edited = useRef(false);
  const [schoolName, setSchoolName] = useState(school.schoolName);
  const [loaded, setLoaded] = useState(Boolean(school.schoolName || school.email));

  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [logo, setLogo] = useState(school.logo);
  const [address, setAddress] = useState(school.address);
  const [phone, setPhone] = useState(school.phone);
  const [email, setEmail] = useState(school.email);
  const [website, setWebsite] = useState(school.website);
  const [academicYear, setAcademicYear] = useState(school.academicYear);
  const [principalName, setPrincipalName] = useState(school.principalName);

  useEffect(() => {
    if (edited.current) return;
    if (!school.schoolName && !school.email && !school.address) return;

    setLoaded(true);
    setSchoolName(school.schoolName);
    setLogo(school.logo);
    setAddress(school.address);
    setPhone(school.phone);
    setEmail(school.email);
    setWebsite(school.website);
    setAcademicYear(school.academicYear);
    setPrincipalName(school.principalName);
  }, [school]);

  useEffect(() => {
    if (loadError) setFeedback(loadError);
  }, [loadError]);

  const handleLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      edited.current = true;
      setLogo(URL.createObjectURL(file));
    }
  };

  const editText =
    (update: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      edited.current = true;
      update(event.target.value);
    };

  const saveSchoolSetting = async () => {
    const token = getAuthToken();
    if (!token) {
      setFeedback("Your session has expired. Please log in again.");
      setShowConfirm(false);
      return;
    }

    const body: Partial<SchoolSettingResponse> = {
      schoolName: schoolName.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
      website: website.trim(),
      academicYear,
      principalName: principalName.trim(),
    };
    const logoIsPreview = logo.startsWith("blob:");
    if (!logoIsPreview) body.logo = logo;

    setSaving(true);
    setFeedback(null);
    try {
      const updated = await apiRequest<SchoolSettingResponse>("/school-settings", {
        method: "PATCH",
        token,
        body: JSON.stringify(body),
      });
      setSchoolName(updated.schoolName);
      setLogo(logoIsPreview ? logo : updated.logo);
      setAddress(updated.address);
      setPhone(updated.phone);
      setEmail(updated.email);
      setWebsite(updated.website);
      setAcademicYear(updated.academicYear);
      setPrincipalName(updated.principalName);
      setShowConfirm(false);
      notifySchoolSettingsUpdated();
      setFeedback(
        logoIsPreview
          ? "School settings were saved. The selected logo is only a preview on this page."
          : "School settings were saved.",
      );
    } catch (error) {
      setShowConfirm(false);
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to save school settings.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
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

            {/* <p className="text-sm text-gray-500">
              Manage your school's basic information.
            </p> */}
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
              onChange={editText(setSchoolName)}
              className="w-full rounded-xl border border-gray-200 px-10 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
              onChange={editText(setAddress)}
              className="w-full rounded-xl border border-gray-200 px-10 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
              onChange={editText(setPhone)}
              className="w-full rounded-xl border border-gray-200 px-10 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
              onChange={editText(setEmail)}
              className="w-full rounded-xl border border-gray-200 px-10 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
              onChange={editText(setWebsite)}
              className="w-full rounded-xl border border-gray-200 px-10 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
              onChange={editText(setAcademicYear)}
              disabled={!loaded}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-10 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            >
              {academicYear === "" && <option value=""></option>}
              {academicYear !== "" &&
                !["2026-2027", "2025-2026", "2024-2025"].includes(academicYear) && (
                  <option value={academicYear}>{academicYear}</option>
                )}
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
              onChange={editText(setPrincipalName)}
              className="w-full rounded-xl border border-gray-200 px-10 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
            />
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            School Logo
          </label>

          <div className="flex items-center gap-4">
            {logo ? (
              <img
                src={logo}
                alt="School logo"
                className="h-12 w-12 rounded-xl border border-gray-200 object-cover"
              />
            ) : (
              <div className="h-12 w-12 rounded-xl border border-gray-200 bg-gray-50" />
            )}

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
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
          onClick={() => setShowConfirm(true)}
          disabled={saving || !loaded}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:opacity-60 sm:w-auto"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {feedback && (
        <p className="mt-4 text-sm text-gray-600">{feedback}</p>
      )}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">
              Save Changes?
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to save these school settings?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="rounded-full border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  void saveSchoolSetting();
                }}
                className="rounded-full bg-[#01796f] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}