"use client";

import { useEffect, useState } from "react";

import {
  fetchTeacherProfile,
  type ApiTeacherProfile,
} from "@/lib/teacher-api";

export type TeacherProfileState = {
  profile: ApiTeacherProfile | null;
  loading: boolean;
  error: string | null;
};

/**
 * Loads the signed-in teacher from GET /teachers/me.
 *
 * Shared by the Teacher portal pages so every module uses the same source of
 * truth instead of matching a teacher by name or email.
 */
export function useTeacherProfile(): TeacherProfileState {
  const [profile, setProfile] = useState<ApiTeacherProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchTeacherProfile()
      .then((data) => {
        if (!active) return;
        setProfile(data);
        setError(null);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setProfile(null);
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your profile."
        );
      })
      .finally(() => {
        if (active) setLoading(false);
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
