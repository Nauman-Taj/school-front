
import { UserRole } from "@/types/user";

export type AuthSession = {
  id: number;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  loginTime: string;
};

const SESSION_KEY = "auth-session";
const TOKEN_KEY = "auth-token";

let cachedRaw: string | null | undefined;
let cachedSession: AuthSession | null = null;

export const getSession = (): AuthSession | null => {
  if (typeof window === "undefined") return null;

  const value =
    sessionStorage.getItem(SESSION_KEY) ??
    localStorage.getItem(SESSION_KEY);

  // The same stored value has to return the same object, so the session can
  // be used as a useSyncExternalStore snapshot without re-rendering in a loop.
  if (value === cachedRaw) return cachedSession;

  cachedRaw = value;

  try {
    cachedSession = value ? (JSON.parse(value) as AuthSession) : null;
  } catch {
    cachedSession = null;
  }

  return cachedSession;
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return (
    sessionStorage.getItem(TOKEN_KEY) ??
    localStorage.getItem(TOKEN_KEY)
  );
};

export const updateAuthSession = (
  updates: Partial<Pick<AuthSession, "name" | "email">>,
): AuthSession | null => {
  const session = getSession();
  if (!session || typeof window === "undefined") return null;

  const updatedSession = { ...session, ...updates };
  const storage = sessionStorage.getItem(SESSION_KEY)
    ? sessionStorage
    : localStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
  window.dispatchEvent(new Event("auth-session-updated"));
  return updatedSession;
};

export const saveAuthSession = (
  session: AuthSession,
  token: string,
  rememberMe: boolean
) => {
  if (typeof window === "undefined") return;

  // Remove any previous login from both storage locations.
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(TOKEN_KEY);

  const storage = rememberMe ? localStorage : sessionStorage;

  storage.setItem(SESSION_KEY, JSON.stringify(session));
  storage.setItem(TOKEN_KEY, token);

  // Compatibility with existing frontend checks.
  localStorage.setItem("isLoggedIn", "true");
};

export const logout = () => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("isLoggedIn");

  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(TOKEN_KEY);

  window.location.href = "/login";
};
