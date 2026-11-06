"use client";

import { useEffect, useState } from "react";
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

import { schoolSettings } from "@/data/settings";
import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import { notifySchoolSettingsUpdated } from "@/lib/schoolSettings";

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
  const [schoolName, setSchoolName] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
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

  useEffect(() => {
    let active = true;

    const loadSchoolSetting = async () => {
      const token = getAuthToken();
      if (!token) {
        if (active) setFeedback("Your session has expired. Please log in again.");
        return;
      }

      try {
        const data = await apiRequest<SchoolSettingResponse>("/school-settings", {
          token,
        });
        if (!active) return;
        setLoaded(true);
        setSchoolName(data.schoolName);
        setLogo(data.logo);
        setAddress(data.address);
        setPhone(data.phone);
        setEmail(data.email);
        setWebsite(data.website);
        setAcademicYear(data.academicYear);
        setPrincipalName(data.principalName);
      } catch (error) {
        if (active) {
          setFeedback(
            error instanceof Error
              ? error.message
              : "Unable to load school settings.",
          );
        }
      }
    };

    void loadSchoolSetting();
    return () => {
      active = false;
    };
  }, []);

  const handleLogoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      setLogo(URL.createObjectURL(file));
    }
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
              onChange={(e) => setSchoolName(e.target.value)}
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
              onChange={(e) => setAddress(e.target.value)}
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
              onChange={(e) => setPhone(e.target.value)}
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setWebsite(e.target.value)}
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
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-10 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
            <img
              src={logo}
              alt="School logo"
              className="h-12 w-12 rounded-xl border border-gray-200 object-cover"
            />

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