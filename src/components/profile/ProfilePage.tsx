"use client";

import { useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Lock,
  Mail,
  Pencil,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import { getAuthToken, getSession, updateAuthSession } from "@/lib/auth";

type Profile = {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
};

type ProfileResponse = Partial<Profile> & Pick<Profile, "id">;
type Feedback = { type: "success" | "error" | "info"; message: string } | null;

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      const token = getAuthToken();
      if (!token) {
        if (active) {
          setFeedback({ type: "error", message: "Your session has expired. Please log in again." });
          setLoading(false);
        }
        return;
      }

      try {
        const data = await apiRequest<ProfileResponse>("/auth/me", { token });
        if (!active) return;
        const currentSession = getSession();
        const loadedProfile: Profile = {
          id: data.id,
          name: data.name || currentSession?.name || data.username || "Admin",
          email: data.email || currentSession?.email || "",
          username: data.username || currentSession?.username || "",
          role: formatRole(data.role || currentSession?.role || "Admin"),
        };
        setProfile(loadedProfile);
        setName(loadedProfile.name);
        setEmail(loadedProfile.email);

        if (data.name && data.email) {
          updateAuthSession({ name: data.name, email: data.email });
        } else {
          setFeedback({
            type: "info",
            message: "The API connected to this page hasn’t been updated for profile editing yet. Your saved profile details are shown when available.",
          });
        }
      } catch (error) {
        if (active) {
          setFeedback({
            type: "error",
            message: error instanceof Error ? error.message : "Unable to load your profile.",
          });
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadProfile();
    return () => {
      active = false;
    };
  }, []);

  const cancelEditing = () => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
    setCurrentPassword("");
    setNewPassword("");
    setIsEditing(false);
    setFeedback(null);
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    if (newPassword && !currentPassword) {
      setFeedback({ type: "error", message: "Enter your current password to set a new password." });
      return;
    }
    if (currentPassword && !newPassword) {
      setFeedback({ type: "error", message: "Enter a new password to complete the password change." });
      return;
    }

    const body: {
      name?: string;
      email?: string;
      currentPassword?: string;
      newPassword?: string;
    } = {};
    if (trimmedName !== profile.name) body.name = trimmedName;
    if (trimmedEmail !== profile.email.toLowerCase()) body.email = trimmedEmail;
    if (currentPassword && newPassword) {
      body.currentPassword = currentPassword;
      body.newPassword = newPassword;
    }

    if (Object.keys(body).length === 0) {
      setFeedback({ type: "error", message: "Make a profile change before saving." });
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setFeedback({ type: "error", message: "Your session has expired. Please log in again." });
      return;
    }

    setSaving(true);
    setFeedback(null);
    try {
      const updated = await apiRequest<Profile>("/auth/me", {
        method: "PATCH",
        token,
        body: JSON.stringify(body),
      });
      const normalizedProfile = { ...updated, role: formatRole(updated.role) };
      setProfile(normalizedProfile);
      setName(updated.name);
      setEmail(updated.email);
      updateAuthSession({ name: updated.name, email: updated.email });
      setCurrentPassword("");
      setNewPassword("");
      setIsEditing(false);
      setFeedback({ type: "success", message: "Your profile was updated successfully." });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to save your profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your account information.</p>
        </div>

        {profile && profile.email && (
          <button
            type="button"
            onClick={() => {
              if (isEditing) {
                cancelEditing();
                return;
              }
              setFeedback(null);
              setIsEditing(true);
            }}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            {isEditing ? "Cancel" : <><Pencil size={17} /> Edit Profile</>}
          </button>
        )}
      </div>

      {feedback && (
        <div className={`flex items-start gap-2 rounded-xl border p-4 text-sm ${feedback.type === "success" ? "border-green-200 bg-green-50 text-green-800" : feedback.type === "info" ? "border-[#b8ded9] bg-[#e6f4f2] text-[#015f58]" : "border-red-200 bg-red-50 text-red-700"}`}>
          {feedback.type === "success" ? <CheckCircle2 size={18} className="mt-0.5 shrink-0" /> : <AlertCircle size={18} className="mt-0.5 shrink-0" />}
          <p>{feedback.message}</p>
        </div>
      )}

      {!profile ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
          Your profile could not be loaded. Refresh the page to try again.
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#e6f4f2] text-[#01796F]">
                <UserRound size={42} strokeWidth={1.6} />
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-800">{profile.name}</h2>
              <p className="mt-1 break-all text-sm text-gray-500">{profile.email}</p>
              <span className="mt-4 rounded-full bg-[#e6f4f2] px-4 py-1.5 text-xs font-semibold text-[#01796F]">
                {profile.role}
              </span>
            </div>

            <div className="mt-6 space-y-5 border-t border-gray-100 pt-5">
              <div className="flex items-center gap-3">
                <Mail size={17} className="text-gray-400" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="break-all text-sm font-medium text-gray-700">{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={17} className="text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Role</p>
                  <p className="text-sm font-medium text-gray-700">{profile.role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSave} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
                <p className="mt-1 text-sm text-gray-500">Update your name, email, or password.</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="profile-name" className="mb-2 block text-sm font-medium text-gray-700">Full Name</label>
                  <div className="relative">
                    <UserRound size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="profile-name" type="text" value={name} onChange={(event) => setName(event.target.value)} disabled={!isEditing || saving} required minLength={2} maxLength={100} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10 disabled:cursor-not-allowed disabled:text-gray-500" />
                  </div>
                </div>

                <div>
                  <label htmlFor="profile-email" className="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                  <div className="relative">
                    <Mail size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input id="profile-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={!isEditing || saving} required maxLength={254} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10 disabled:cursor-not-allowed disabled:text-gray-500" />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 border-t border-gray-100 pt-5">
                  <h3 className="mb-4 text-sm font-semibold text-gray-800">Change Password <span className="font-normal text-gray-400">(optional)</span></h3>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="current-password" className="mb-2 block text-sm font-medium text-gray-700">Current Password</label>
                      <div className="relative">
                        <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input id="current-password" type="password" autoComplete="current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} disabled={saving} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10 disabled:opacity-60" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="new-password" className="mb-2 block text-sm font-medium text-gray-700">New Password</label>
                      <div className="relative">
                        <Lock size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input id="new-password" type="password" autoComplete="new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} disabled={saving} minLength={8} maxLength={100} className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#01796F] focus:ring-2 focus:ring-[#01796F]/10 disabled:opacity-60" />
                      </div>
                      <p className="mt-1 text-xs text-gray-400">Use at least 8 characters.</p>
                    </div>
                  </div>
                </div>
              )}

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#01796F] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#015f58] disabled:cursor-not-allowed disabled:opacity-60">
                    <Save size={17} />
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function formatRole(role: string) {
  const roleNames: Record<string, string> = {
    ADMIN: "Admin",
    TEACHER: "Teacher",
    STUDENT: "Student",
    PARENT: "Parent",
  };
  return roleNames[role.toUpperCase()] ?? role;
}
