import { UserRole } from "@/types/user";

export type AuthSession = {
  id: number;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  loginTime: string;
};

export const getSession = (): AuthSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const session =
    localStorage.getItem("auth-session") ||
    sessionStorage.getItem("auth-session");

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session) as AuthSession;
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("auth-session");
  localStorage.removeItem("isLoggedIn");

  sessionStorage.removeItem("auth-session");

  window.location.href = "/";
};