"use client";

import { useState } from "react";
import {
  ShieldCheck,
  KeyRound,
  UserCheck,
  Save,
} from "lucide-react";

import { userSettings } from "@/data/settings";

export default function UserSettings() {
  const [role, setRole] = useState(userSettings.role);
  const [permission, setPermission] = useState(
    userSettings.permission
  );
  const [passwordPolicy, setPasswordPolicy] = useState(
    userSettings.passwordPolicy
  );
  const [accountStatus, setAccountStatus] = useState(
    userSettings.accountStatus
  );

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-[#e6f4f2] p-2.5 text-[#01796f]">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              User Settings
            </h2>

            <p className="text-sm text-gray-500">
              Manage roles, permissions, and account security.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Role
          </label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>Administrator</option>
            <option>Principal</option>
            <option>Teacher</option>
            <option>Accountant</option>
            <option>Librarian</option>
          </select>
        </div>

        {/* Permissions */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Permissions
          </label>

          <select
            value={permission}
            onChange={(e) => setPermission(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>Full Access</option>
            <option>Manage Students</option>
            <option>Manage Teachers</option>
            <option>Manage Academics</option>
            <option>View Only</option>
          </select>
        </div>

        {/* Password Policy */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <KeyRound size={16} />
            Password Policy
          </label>

          <select
            value={passwordPolicy}
            onChange={(e) => setPasswordPolicy(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>Strong Password</option>
            <option>Medium Password</option>
            <option>Basic Password</option>
          </select>
        </div>

        {/* Account Status */}
        <div>
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <UserCheck size={16} />
            Account Status
          </label>

          <select
            value={accountStatus}
            onChange={(e) => setAccountStatus(e.target.value)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
          >
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

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