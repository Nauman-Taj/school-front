
import { getSession, type AuthSession } from "@/lib/auth";

export type RegisteredStudent = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  cnicOrBForm?: string;
  address?: string;
  guardianName?: string;
  guardianPhone?: string;
  guardianEmail?: string;
  previousSchool?: string;
  applyingClass?: string;
  previousQualification?: string;
  emergencyContact?: string;
  medicalInformation?: string;
  status?: string;
};

export type RegisteredTeacher = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  cnic?: string;
  address?: string;
  fatherName?: string;
  qualification?: string;
  experience?: string;
  department?: string;
  designation?: string;
  subjects?: string[];
  joiningDate?: string;
  status?: string;
};

export type RegisteredParent = {
  id: number;
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  cnic?: string;
  address?: string;
  occupation?: string;
  relationship?: string;
  childName?: string;
  childRollNo?: string;
  status?: string;
};

type ProfileRecord = {
  id?: string | number;
  email?: string;
};

const PROFILE_KEYS = {
  Student: "registered-students",
  Teacher: "registered-teachers",
  Parent: "registered-parents",
} as const;

function readProfiles<T extends ProfileRecord>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(key);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    console.error(`Could not read profiles from "${key}".`);
    return [];
  }
}

function writeProfiles<T extends ProfileRecord>(
  key: string,
  profiles: T[]
): void {
  if (typeof window === "undefined") return;

  localStorage.setItem(key, JSON.stringify(profiles));
}

function matchesSession(
  profile: ProfileRecord,
  session: AuthSession
): boolean {
  const profileEmail = profile.email?.trim().toLowerCase();
  const sessionEmail = session.email.trim().toLowerCase();

  return (
    (!!profileEmail && profileEmail === sessionEmail) ||
    (profile.id !== undefined && String(profile.id) === String(session.id))
  );
}

/**
 * Find a registered profile for the current logged-in account.
 * Email is preferred so an account ID cannot accidentally select
 * another person's profile.
 */
export function getRegisteredProfile<T extends ProfileRecord>(
  role: keyof typeof PROFILE_KEYS,
  session?: AuthSession | null
): T | null {
  const currentSession = session ?? getSession();

  if (!currentSession || currentSession.role !== role) return null;

  const profiles = readProfiles<T>(PROFILE_KEYS[role]);
  const email = currentSession.email.trim().toLowerCase();

  return (
    profiles.find(
      (profile) =>
        !!profile.email && profile.email.trim().toLowerCase() === email
    ) ??
    profiles.find(
      (profile) =>
        profile.id !== undefined &&
        String(profile.id) === String(currentSession.id)
    ) ??
    null
  );
}

/**
 * Add or update a registered profile without duplicating its email.
 */
export function saveRegisteredProfile<T extends ProfileRecord>(
  role: keyof typeof PROFILE_KEYS,
  profile: T
): void {
  const profiles = readProfiles<T>(PROFILE_KEYS[role]);
  const email = profile.email?.trim().toLowerCase();

  const existingIndex = profiles.findIndex((existing) => {
    const existingEmail = existing.email?.trim().toLowerCase();

    if (email && existingEmail) return email === existingEmail;

    return (
      existing.id !== undefined &&
      profile.id !== undefined &&
      String(existing.id) === String(profile.id)
    );
  });

  if (existingIndex === -1) {
    writeProfiles(PROFILE_KEYS[role], [...profiles, profile]);
    return;
  }

  const updated = [...profiles];
  updated[existingIndex] = {
    ...updated[existingIndex],
    ...profile,
  };

  writeProfiles(PROFILE_KEYS[role], updated);
}

export const getRegisteredStudent = (session?: AuthSession | null) =>
  getRegisteredProfile<RegisteredStudent>("Student", session);

export const getRegisteredTeacher = (session?: AuthSession | null) =>
  getRegisteredProfile<RegisteredTeacher>("Teacher", session);

export const getRegisteredParent = (session?: AuthSession | null) =>
  getRegisteredProfile<RegisteredParent>("Parent", session);

export const saveRegisteredStudent = (profile: RegisteredStudent) =>
  saveRegisteredProfile("Student", profile);

export const saveRegisteredTeacher = (profile: RegisteredTeacher) =>
  saveRegisteredProfile("Teacher", profile);

export const saveRegisteredParent = (profile: RegisteredParent) =>
  saveRegisteredProfile("Parent", profile);
