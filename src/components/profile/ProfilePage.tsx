"use client";

import { useState } from "react";
import {
  UserRound,
  Mail,
  ShieldCheck,
  Pencil,
  Phone,
  Lock,
  Save,
} from "lucide-react";

import { getSession } from "@/lib/auth";

export default function ProfilePage() {
  const session = getSession();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(session?.name || "");
  const [email, setEmail] = useState(session?.email || "");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const role = session?.role || "User";

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            My Profile
          </h1>

          {/* <p className="mt-1 text-sm text-gray-500">
            View and manage your profile information
          </p> */}
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
        >
          {isEditing ? (
            <>
              <Save size={17} />
              Save Profile
            </>
          ) : (
            <>
              <Pencil size={17} />
              Edit Profile
            </>
          )}
        </button>
      </div>

      {/* Profile Card */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* User summary */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
              <UserRound size={42} strokeWidth={1.6} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-gray-800">
              {name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {email}
            </p>

            <span className="mt-4 rounded-full bg-[#e6f4f2] px-4 py-1.5 text-xs font-semibold text-[#01796F]">
              {role}
            </span>
          </div>

          <div className="mt-6 space-y-4 border-t border-gray-100 pt-5">
            <div className="flex items-center gap-3">
              <Mail size={17} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-700">
                  {email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck size={17} className="text-gray-400" />
              <div>
                <p className="text-xs text-gray-400">Role</p>
                <p className="text-sm font-medium text-gray-700">
                  {role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal information */}
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800">
                Personal Information
              </h2>

              {/* <p className="mt-1 text-sm text-gray-500">
                Update your personal account information
              </p> */}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10 disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email Address
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
                    disabled={!isEditing}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10 disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10 disabled:cursor-not-allowed disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Role
                </label>

                <div className="relative">
                  <ShieldCheck
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={role}
                    disabled
                    className="w-full rounded-xl border border-gray-200 bg-gray-100 py-3 pl-10 pr-4 text-sm text-gray-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            {isEditing && (
              <div className="mt-5">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  New Password
                </label>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your new password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
                  />
                </div>
              </div>
            )}

            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#01796F] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58]"
                >
                  <Save size={17} />
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}