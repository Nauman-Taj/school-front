"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { KeyRound, ShieldCheck, UserCheck } from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import {
  notifySchoolSettingsUpdated,
  useSchoolSetting,
  useSchoolSettingError,
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

const passwordPolicy = "Minimum 8 characters";
const ACCOUNT_KEY = "garrison-signed-in-account";
const ACCOUNT_CHANGED = "garrison-account-changed";

const selectClassName =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10 disabled:opacity-60";

const blankAccount = { role: "", status: "" };
let currentAccount = blankAccount;
let accountRestored = false;

function restoreAccount() {
  if (accountRestored || typeof window === "undefined") return;
  accountRestored = true;

  try {
    const saved = sessionStorage.getItem(ACCOUNT_KEY);
    if (!saved) return;
    currentAccount = JSON.parse(saved) as { role: string; status: string };
  } catch {
    currentAccount = blankAccount;
  }
}

function rememberAccount(account: { role: string; status: string }) {
  currentAccount = account;
  accountRestored = true;

  try {
    sessionStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
  } catch {
    // The account still stays in memory for this page.
  }

  window.dispatchEvent(new Event(ACCOUNT_CHANGED));
}

function subscribeToAccount(onStoreChange: () => void) {
  window.addEventListener(ACCOUNT_CHANGED, onStoreChange);
  return () => window.removeEventListener(ACCOUNT_CHANGED, onStoreChange);
}

function getAccount() {
  restoreAccount();
  return currentAccount;
}

function useSignedInAccount() {
  const account = useSyncExternalStore(
    subscribeToAccount,
    getAccount,
    () => blankAccount,
  );

  useEffect(() => {
    let active = true;

    const loadAccount = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        const data = await apiRequest<Account>("/auth/me", { token });
        if (!active) return;
        rememberAccount({
          role: roleLabels[data.role] ?? data.role,
          status: statusLabels[data.status] ?? data.status,
        });
      } catch {
        if (!active || currentAccount.role) return;
        rememberAccount(blankAccount);
      }
    };

    void loadAccount();
    return () => {
      active = false;
    };
  }, []);

  return account;
}

function withCurrent(options: string[], current: string) {
  if (current && !options.includes(current)) return [current, ...options];
  return options;
}

export default function UserSettings() {
  const school = useSchoolSetting();
  const loadError = useSchoolSettingError();
  const account = useSignedInAccount();
  const edited = useRef(false);
  const [role, setRole] = useState(account.role);
  const [permission, setPermission] = useState(school.permission ?? "");
  const [status, setStatus] = useState(account.status);
  const [loaded, setLoaded] = useState(Boolean(school.permission || school.email));
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (edited.current) return;
    if (!school.schoolName && !school.email && !school.permission) return;

    setLoaded(true);
    setPermission(school.permission ?? "");
  }, [school]);

  useEffect(() => {
    if (edited.current) return;
    if (!account.role && !account.status) return;

    setRole(account.role);
    setStatus(account.status);
  }, [account]);

  useEffect(() => {
    if (loadError) setMessage(loadError);
  }, [loadError]);

  const editValue =
    (update: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      edited.current = true;
      update(event.target.value);
    };

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
      edited.current = false;
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

  const accountReady = Boolean(role && status);
  const permissionOptions = withCurrent(permissions, permission);
  const roleOptions = withCurrent(Object.values(roleLabels), role);
  const statusOptions = withCurrent(Object.values(statusLabels), status);

  return (
    <section className="max-w-5xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
          <ShieldCheck size={20} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">User Settings</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="settings-role">
            Role
          </label>
          <select
            id="settings-role"
            value={role}
            onChange={editValue(setRole)}
            disabled={!accountReady}
            className={selectClassName}
          >
            {role === "" && <option value=""></option>}
            {roleOptions.map((item) => (
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
            onChange={editValue(setPermission)}
            disabled={!loaded}
            className={selectClassName}
          >
            {permission === "" && <option value=""></option>}
            {permissionOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700" htmlFor="settings-password-policy">
            <KeyRound size={16} />
            Password Policy
          </label>
          <select
            id="settings-password-policy"
            value={accountReady ? passwordPolicy : ""}
            onChange={() => undefined}
            disabled={!accountReady}
            className={selectClassName}
          >
            {!accountReady && <option value=""></option>}
            {accountReady && <option>{passwordPolicy}</option>}
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
            onChange={editValue(setStatus)}
            disabled={!accountReady}
            className={selectClassName}
          >
            {status === "" && <option value=""></option>}
            {statusOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={() => setShowConfirm(true)}
          disabled={saving || !loaded || !accountReady}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#01665d] disabled:opacity-60 sm:w-auto"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {message && <p className="mt-4 text-sm text-gray-600">{message}</p>}

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
