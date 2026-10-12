
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

export const getSession = (): AuthSession | null => {
  if (typeof window === "undefined") return null;

  const value =
    sessionStorage.getItem(SESSION_KEY) ??
    localStorage.getItem(SESSION_KEY);

  if (!value) return null;

  try {
    return JSON.parse(value) as AuthSession;
  } catch {
    return null;
  }
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;

  return (
    sessionStorage.getItem(TOKEN_KEY) ??
    localStorage.getItem(TOKEN_KEY)
  );
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
