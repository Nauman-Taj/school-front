"use client";

import { useState } from "react";
import { Eye, EyeOff, GraduationCap } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f8f8] px-4 py-8">
      <div className="w-full max-w-md">

        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#01796f] text-white">
            <GraduationCap size={30} strokeWidth={1.8} />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Garrison Grammar
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            School Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sign in to access your dashboard.
            </p>
          </div>

          <form className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="admin@garrisongrammar.edu.pk"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
              />
            </div>

            {/* Password */}
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
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-gray-400 hover:text-[#01796f]"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 accent-[#01796f]"
                />
                Remember me
              </label>

              <button
                type="button"
                className="text-sm font-medium text-[#01796f] hover:text-[#015f58]"
              >
                Forgot password?
              </button>
            </div>

            {/* Login */}
            <button
              type="submit"
              className="w-full rounded-xl bg-[#01796f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#015f58] focus:outline-none focus:ring-2 focus:ring-[#01796f]/30"
            >
              Sign in
            </button>

          </form>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          © 2026 Garrison Grammar School
        </p>
      </div>
    </main>
  );
}