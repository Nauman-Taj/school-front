"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    const Email = "admin@garrisonschool.edu.pk";
    const Password = "nauman360";

    setTimeout(() => {
      if (email === Email && password === Password) {

        localStorage.setItem("isLoggedIn", "true");

        router.push("/dashboard");
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    }, 700);
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

          <form onSubmit={handleSubmit} className="space-y-5">

            
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 text-sm text-gray-900 outline-none transition focus:border-[#01796f] focus:ring-2 focus:ring-[#01796f]/10"
                  required
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

            
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm font-medium text-[#01796f] hover:text-[#015f58]"
              >
                Forgot password?
              </button>
            </div>

            
            {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#01796f] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#015f58] focus:outline-none focus:ring-2 focus:ring-[#01796f]/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>
        </div>
      </div>
    </main>
  );
}