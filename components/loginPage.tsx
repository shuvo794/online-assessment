"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("user", JSON.stringify({ email, role: "admin", isLoggedIn: true }));
      router.push("/dashboard");
    } else if (email && password) {
      localStorage.setItem("user", JSON.stringify({ email, role: "user", isLoggedIn: true }));
      router.push("/testOnlineDashboard");
    }
  };

  return (
    <div className="flex w-full max-w-[428px] flex-col gap-8 md:max-w-[571px]">
      <h1 className="text-center text-[28px] font-semibold leading-[1.2] text-[#130b2c] md:text-2xl md:text-slate-700">
        Sign In
      </h1>

      <form
        className="rounded-[20px] border border-[#f0f0f0] bg-white px-5 pb-8 pt-7 shadow-[0_4px_24px_rgba(0,0,0,0.02)] md:rounded-2xl md:border-gray-200 md:px-8 md:pb-10 md:pt-8"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-base font-medium leading-[1.5] text-[#130b2c] md:text-sm md:text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                placeholder="Your primary email address"
                className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5 text-base leading-[1.5] text-slate-800 placeholder:text-[#94a3b8] focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-[#6633ff]/10 md:rounded-lg md:border-gray-300 md:px-3 md:py-3 md:text-sm"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-base font-medium leading-[1.5] text-[#130b2c] md:text-sm md:text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3.5 text-base leading-[1.5] text-slate-800 placeholder:text-[#94a3b8] focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-[#6633ff]/10 md:rounded-lg md:border-gray-300 md:px-3 md:py-3 md:text-sm"
                required
              />
              <div className="flex justify-end pt-1">
                <a
                  href="#"
                  className="text-base font-medium leading-[1.5] text-[#130b2c] md:text-sm md:text-slate-700 underline-offset-4 hover:underline"
                >
                  Forget Password?
                </a>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center rounded-xl bg-[#6633ff] px-8 py-4 text-center text-lg font-semibold leading-[1.5] text-white transition-all hover:bg-[#5528e0] focus:outline-none focus:ring-2 focus:ring-[#6633ff] focus:ring-offset-2 active:scale-[0.98] md:py-3 md:text-base"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
