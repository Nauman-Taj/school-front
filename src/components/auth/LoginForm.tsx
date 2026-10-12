
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { apiRequest } from "@/lib/api";
import { saveAuthSession, type AuthSession } from "@/lib/auth";
import type { UserRole } from "@/types/user";

type LoginResponse = {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    username: string;
    role: string;
  };
};

const roleMap: Record<string, UserRole> = {
  ADMIN: "Admin",
  TEACHER: "Teacher",
  STUDENT: "Student",
  PARENT: "Parent",
};

const routes: Record<UserRole, string> = {
  Admin: "/admin",
  Teacher: "/teacher",
  Student: "/student",
  Parent: "/parent",
};

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await apiRequest<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          // The backend accepts either username or email in this field.
          username: identifier.trim(),
          password,
        }),
      });

      const role = roleMap[result.user.role.toUpperCase()];

      if (!role) {
        throw new Error("Your account has an unsupported role.");
      }

      const session: AuthSession = {
        id: result.user.id,
        name: result.user.name,
        email: result.user.email,
        username: result.user.username,
        role,
        loginTime: new Date().toISOString(),
      };

      saveAuthSession(session, result.accessToken, rememberMe);

      router.replace(routes[role]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8f8] px-4 py-8">
      <div className="grid w-full max-w-md justify-center">
        <div className="mb-8 text-center">
          <Image
            src="/images/school.jpg"
            alt="School Logo"
            width={80}
            height={80}
            className="mx-auto mb-4 object-contain"
          />

          <h1 className="text-3xl font-bold text-gray-900">
            Garrison Grammar School
          </h1>
        </div>

        <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="identifier"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email / Username
              </label>

              <input
                id="identifier"
                type="text"
                autoComplete="username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your email or username"
                className="w-full rounded-full border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-full border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:text-[#01796f]"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 accent-[#01796f]"
                />

                <span className="text-sm text-gray-600">
                  Remember me
                </span>
              </label>

              <button
                type="button"
                onClick={() =>
                  setError("Password recovery has not been connected yet.")
                }
                className="text-sm font-medium text-[#01796f] hover:text-[#015f58]"
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#01796f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#015f58] focus:outline-none focus:ring-2 focus:ring-[#01796f]/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-5 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="inline-flex items-center text-sm font-medium text-[#01796F] transition hover:text-[#015f58] hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
