"use client";

import { useState } from "react";

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex w-full max-w-[571px] flex-col gap-6">
      <h1 className="text-center text-2xl font-semibold leading-[1.3] text-slate-700">
        Sign In
      </h1>

      <form
        className="rounded-2xl border border-gray-200 bg-white px-8 pb-10 pt-8 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium leading-[1.5] text-slate-700"
              >
                Email/ User ID
              </label>
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="username"
                placeholder="Enter your email/User ID"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm leading-[1.5] text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-[1.5] text-slate-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-3 pr-12 text-sm leading-[1.5] text-slate-800 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-slate-500 hover:text-slate-700"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </div>
              <div className="flex justify-end pt-1">
                <a
                  href="#"
                  className="text-sm font-medium leading-[1.5] text-slate-700 underline-offset-2 hover:underline"
                >
                  Forget Password?
                </a>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#6633ff] px-8 py-3 text-base font-semibold leading-[1.5] text-white transition-colors hover:bg-[#5528e0] focus:outline-none focus:ring-2 focus:ring-[#6633ff] focus:ring-offset-2"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path
          d="M3 12C3 12 7 5 12 5C17 5 21 12 21 12C21 12 17 19 12 19C7 19 3 12 3 12Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="12"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M4 4L20 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 12C2 12 6 5 12 5C18 5 22 12 22 12C22 12 18 19 12 19C6 19 2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
