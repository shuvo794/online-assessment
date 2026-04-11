"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ResourceLogoMark } from "@/components/resource-logo-mark";

interface UserInfo {
  email: string;
  role: "admin" | "user";
  isLoggedIn: boolean;
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) setUser(JSON.parse(raw));
  }, [pathname]); // re-read on route change

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("active_exam");
    router.push("/login");
  };

  const isLogin = pathname === "/login";
  const isHome = pathname === "/";
  const isManageOnlineTest =
    pathname.startsWith("/online-tests/manage") ||
    pathname.startsWith("/online-tests/view") ||
    pathname.startsWith("/online-tests/questions") ||
    pathname.startsWith("/online-tests/save");
  const isDashboard =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/online-tests") ||
    pathname.startsWith("/testOnlineDashboard");
  const showCenterTitle =
    isLogin ||
    isHome ||
    pathname === "/mcqExam" ||
    pathname === "/textExam" ||
    pathname === "/testSuccess" ||
    pathname === "/testTimeout";
  const showOnlineTestCenterTitle = isManageOnlineTest;
  const showLoginButton = (isLogin || isHome) && !user?.isLoggedIn;
  const showLeftDashboardNav = isDashboard && !isManageOnlineTest;

  const displayName = user?.email
    ? user.email.split("@")[0].replace(/\./g, " ")
    : "Guest";

  return (
    <header className="relative flex min-h-20 shrink-0 items-center justify-between bg-white px-4 shadow-[0_6px_40px_rgba(192,192,192,0.12)] md:px-20">
      
      {/* Left side */}
      <div className="flex z-10 items-center gap-3 md:gap-[clamp(1.5rem,5vw,6.25rem)]">
        <Link href={user?.role === "admin" ? "/dashboard" : user?.isLoggedIn ? "/testOnlineDashboard" : "/"} className="shrink-0">
          <ResourceLogoMark variant="onLight" />
        </Link>
        {showLeftDashboardNav && (
          <span className="hidden text-base font-normal text-[#130b2c] md:inline">Dashboard</span>
        )}
      </div>

      {/* Center section (Absolute centered) */}
      {showCenterTitle && (
        <p className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center text-xl font-semibold leading-[1.3] text-slate-700 md:block md:text-2xl">
          Akij Resource
        </p>
      )}

      {showOnlineTestCenterTitle && (
        <p className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-center text-base font-medium leading-[1.4] text-[#130b2c] sm:block sm:text-lg">
          Online Test
        </p>
      )}

      {/* Right side */}
      <div className="flex z-10 items-center gap-3">
        {showLoginButton && (
          <Link
            href="/login"
            className="shrink-0 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Login
          </Link>
        )}
        
        {user?.isLoggedIn && !isLogin && (
          <>
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold uppercase text-[#6633ff] md:size-10"
              aria-hidden
            >
              {displayName.charAt(0)}
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-sm font-semibold capitalize leading-[1.4] text-slate-700">
                {displayName}
              </span>
              <span className="text-xs font-medium leading-[1.5] text-slate-500">
                {user.role === "admin" ? "Administrator" : "Candidate"}
              </span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}
