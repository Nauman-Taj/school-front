"use client";

import { useEffect, useState } from "react";
import { KeyRound, ShieldCheck, UserCheck } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import {
  notifySchoolSettingsUpdated,
  useSchoolSetting,
} from "@/lib/schoolSettings";

type Account = {
  role: string;
  status: string;
};

const permissions = [
  "Full Access",
  "Manage Students",
  "Manage Teachers",
  "Manage Academics",
  "View Only",
];

const roleLabels: Record<string, string> = {
  ADMIN: "Admin",
  TEACHER: "Teacher",
  STUDENT: "Student",
  PARENT: "Parent",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "Active",
  INACTIVE: "Inactive",
};

const selectClassName =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10";

export default function UserSettings() {
  const school = useSchoolSetting();
  const [role, setRole] = useState("Admin");
  const [permission, setPermission] = useState("Full Access");
  const [status, setStatus] = useState("Active");
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (school.permission && permissions.includes(school.permission)) {
      setPermission(school.permission);
    }
  }, [school.permission]);

  useEffect(() => {
    let active = true;

    const loadAccount = async () => {
      const token = getAuthToken();
      if (!token) {
        if (active) setMessage("Your session has expired. Please log in again.");
        return;
      }

      try {
        const account = await apiRequest<Account>("/auth/me", { token });
        if (!active) return;
        setRole(roleLabels[account.role] ?? account.role);
        setStatus(statusLabels[account.status] ?? account.status ?? "Active");
      } catch (error) {
        if (active) {
          setMessage(
            error instanceof Error ? error.message : "Unable to load account settings.",
          );
        }
      }
    };

    void loadAccount();
    return () => {
      active = false;
    };
  }, []);

  const saveUserSettings = async () => {
    const token = getAuthToken();
    if (!token) {
      setMessage("Your session has expired. Please log in again.");
      setShowConfirm(false);
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      await apiRequest("/school-settings", {
        method: "PATCH",
        token,
        body: JSON.stringify({ permission }),
      });
      notifySchoolSettingsUpdated();
      setShowConfirm(false);
      setMessage("User settings were saved.");
    } catch (error) {
      setShowConfirm(false);
      setMessage(error instanceof Error ? error.message : "Unable to save user settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
          <ShieldCheck size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">User Settings</h2>
      </div>

      {message && <p className="mb-4 text-sm text-gray-600">{message}</p>}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="settings-role">
            Role
          </label>
          <select
            id="settings-role"
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className={selectClassName}
          >
            {Object.values(roleLabels).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="settings-permissions">
            Permissions
          </label>
          <select
            id="settings-permissions"
            value={permission}
            onChange={(event) => setPermission(event.target.value)}
            className={selectClassName}
          >
            {permissions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-password-policy">
            <KeyRound size={16} />
            Password Policy
          </label>
          <select id="settings-password-policy" className={selectClassName} defaultValue="Minimum 8 characters">
            <option>Minimum 8 characters</option>
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-account-status">
            <UserCheck size={16} />
            Account Status
          </label>
          <select
            id="settings-account-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={selectClassName}
          >
            {Object.values(statusLabels).map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:opacity-60 sm:w-auto"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-10">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">Save Changes?</h3>
            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to save these user settings?
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
                  void saveUserSettings();
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
