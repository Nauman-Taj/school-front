"use client";

import { useEffect, useState } from "react";

import { fetchParentProfile } from "@/lib/parent";
import type { Parent, ParentChild } from "@/types/parent";

export type ParentProfileState = {
  profile: Parent | null;
  children: ParentChild[];
  loading: boolean;
  error: string | null;
};

/**
 * Loads the signed-in parent from GET /parents/me.
 *
 * Shared by the Parent portal pages so each module uses the same source of
 * truth instead of matching hardcoded parent data by email.
 */
export function useParentProfile(): ParentProfileState {
  const [profile, setProfile] = useState<Parent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fetchParentProfile()
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
    children: profile?.children ?? [],
    loading,
    error,
  };
}
