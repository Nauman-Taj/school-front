"use client";

import { useEffect, useState } from "react";

import { fetchStudentProfile, type ApiStudentProfile } from "@/lib/student-api";

export type StudentProfileState = {
  profile: ApiStudentProfile | null;
  loading: boolean;
  error: string | null;
};

/**
 * Loads the signed-in student from GET /students/me.
 *
 * Shared by the Student portal pages so every module uses the same source of
 * truth instead of matching a student by name or roll number.
 */
export function useStudentProfile(): StudentProfileState {
  const [profile, setProfile] = useState<ApiStudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchStudentProfile()
      .then((data) => {
        if (!active) return;
        setProfile(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setProfile(null);
        setError(
          err instanceof Error ? err.message : "Unable to load your profile."
        );
      })
      .finally(() => {
        if (!active) return;
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    profile,
    loading,
    error,
  };
}
