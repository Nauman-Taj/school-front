"use client";

import { useSyncExternalStore } from "react";

import { getSession, type AuthSession } from "@/lib/auth";

const SESSION_EVENT = "auth-session-updated";

function subscribe(onStoreChange: () => void) {
  window.addEventListener(SESSION_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(SESSION_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

/**
 * Reads the signed-in session from the browser storage.
 *
 * The session lives outside React, so it is read through
 * `useSyncExternalStore` instead of being copied into state inside an
 * effect. That keeps the header in sync with `updateAuthSession()` and
 * `saveAuthSession()`, and it returns `null` on the server so the markup
 * matches on the first render.
 */
export function useAuthSession(): AuthSession | null {
  return useSyncExternalStore(subscribe, getSession, () => null);
}
