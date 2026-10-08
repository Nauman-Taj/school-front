"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
  Lock,
  Pencil,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";

import { parents } from "@/data/parents";
import { getCurrentParent } from "@/lib/parent";

export default function ParentProfilePage() {
  const currentParent = getCurrentParent();

  const parent =
    parents.find((item) => item.id === currentParent?.id) ??
    parents[0];

  const [profile, setProfile] = useState(parent);

  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    occupation: profile.occupation,
    address: profile.address,
  });

  const [passwordVisibility, setPasswordVisibility] =
    useState({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saved, setSaved] = useState(false);
  const [passwordUpdated, setPasswordUpdated] =
    useState(false);

  const handleSave = () => {
    setProfile((current) => ({
      ...current,
      ...form,
    }));

    setIsEditing(false);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  const togglePassword = (
    field:
      | "currentPassword"
      | "newPassword"
      | "confirmPassword"
  ) => {
    setPasswordVisibility((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  const handlePasswordUpdate = () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      return;
    }

    if (
      passwordForm.newPassword !==
      passwordForm.confirmPassword
    ) {
      return;
    }

    setPasswordUpdated(true);

    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setPasswordVisibility({
      currentPassword: false,
      newPassword: false,
      confirmPassword: false,
    });

    setTimeout(() => {
      setPasswordUpdated(false);
    }, 2500);
  };

  return (
    <div className="space-y-5">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Profile
        </h1>

        <p className="mt-1 text-sm text-gray-500 sm:text-base">
          View and manage your account information.
        </p>
      </div>

      {/* Profile Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
              <User size={30} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {profile.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Parent
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] sm:w-auto"
          >
            <Pencil size={16} />

            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Profile Information */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Personal Information
          </h2>
        </div>

        {isEditing ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Phone
              </label>

              <input
                type="text"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>

            {/* Occupation */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Occupation
              </label>

              <input
                type="text"
                value={form.occupation}
                onChange={(e) =>
                  setForm({
                    ...form,
                    occupation: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address
              </label>

              <input
                type="text"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
              />
            </div>

            {/* Save */}
            <div className="flex justify-end sm:col-span-2">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] sm:w-auto"
              >
                <Check size={17} />
                Save Changes
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <ProfileItem
              icon={User}
              label="Full Name"
              value={profile.name}
            />

            <ProfileItem
              icon={Mail}
              label="Email"
              value={profile.email}
            />

            <ProfileItem
              icon={Phone}
              label="Phone"
              value={profile.phone}
            />

            <ProfileItem
              icon={Briefcase}
              label="Occupation"
              value={profile.occupation}
            />

            <ProfileItem
              icon={MapPin}
              label="Address"
              value={profile.address}
            />

            <ProfileItem
              icon={User}
              label="Status"
              value={profile.status}
            />
          </div>
        )}
      </div>

      {/* Change Password */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-gray-900">
            Change Password
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Current Password */}
          <PasswordInput
            label="Current Password"
            value={passwordForm.currentPassword}
            onChange={(value) =>
              setPasswordForm({
                ...passwordForm,
                currentPassword: value,
              })
            }
            showPassword={
              passwordVisibility.currentPassword
            }
            onToggle={() =>
              togglePassword("currentPassword")
            }
          />

          {/* New Password */}
          <PasswordInput
            label="New Password"
            value={passwordForm.newPassword}
            onChange={(value) =>
              setPasswordForm({
                ...passwordForm,
                newPassword: value,
              })
            }
            showPassword={
              passwordVisibility.newPassword
            }
            onToggle={() =>
              togglePassword("newPassword")
            }
          />

          {/* Confirm Password */}
          <PasswordInput
            label="Confirm New Password"
            value={passwordForm.confirmPassword}
            onChange={(value) =>
              setPasswordForm({
                ...passwordForm,
                confirmPassword: value,
              })
            }
            showPassword={
              passwordVisibility.confirmPassword
            }
            onToggle={() =>
              togglePassword("confirmPassword")
            }
          />
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={handlePasswordUpdate}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#01796F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#015f58] sm:w-auto"
          >
            <Lock size={17} />
            Update Password
          </button>
        </div>
      </div>

      {/* Profile Feedback */}
      {saved && (
        <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          <Check size={17} />
          Profile updated successfully.
        </div>
      )}

      {/* Password Feedback */}
      {passwordUpdated && (
        <div className="fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white shadow-lg">
          <Check size={17} />
          Password updated successfully.
        </div>
      )}
    </div>
  );
}

type ProfileItemProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

function ProfileItem({
  icon: Icon,
  label,
  value,
}: ProfileItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e6f4f2] text-[#01796F]">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-medium text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

type PasswordInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  onToggle: () => void;
};

function PasswordInput({
  label,
  value,
  onChange,
  showPassword,
  onToggle,
}: PasswordInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-11 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#01796F]"
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}