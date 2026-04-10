"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ResourceLogoMark } from "@/components/resource-logo-mark";

export function AppHeader() {
  const pathname = usePathname();
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
  const showLoginButton = isLogin || isHome;
  const showLeftDashboardNav = isDashboard && !isManageOnlineTest;

  return (
    <header className="relative flex min-h-20 shrink-0 items-center bg-white px-4 shadow-[0_6px_40px_rgba(192,192,192,0.12)] md:px-20">
      <div className="absolute left-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-3 md:left-20 md:gap-[clamp(1.5rem,5vw,6.25rem)]">
        <Link href="/dashboard" className="shrink-0">
          <ResourceLogoMark variant="onLight" />
        </Link>
        {showLoginButton && (
          <Link
            href="/login"
            className="shrink-0 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50"
          >
            Login
          </Link>
        )}
        {showLeftDashboardNav && (
          <span className="text-base font-normal text-[#130b2c]">Dashboard</span>
        )}
      </div>

      {showCenterTitle && (
        <p className="w-full text-center text-2xl font-semibold leading-[1.3] text-slate-700">
          Akij Resource
        </p>
      )}

      {showOnlineTestCenterTitle && (
        <p className="w-full text-center text-base font-medium leading-[1.4] text-[#130b2c] sm:text-lg">
          Online Test
        </p>
      )}

      {isDashboard && (
        <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-2 md:right-20">
          <div
            className="size-10 shrink-0 rounded-full bg-slate-200"
            aria-hidden
          />
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-semibold leading-[1.4] text-slate-700">
              Arif Hossain
            </span>
            <span className="text-xs font-medium leading-[1.5] text-slate-500">
              Ref. ID - 16101121
            </span>
          </div>
          <button
            type="button"
            className="rounded p-1 text-slate-600 hover:bg-slate-100"
            aria-label="Account menu"
          >
            <ChevronDownIcon className="size-4" />
          </button>
        </div>
      )}
    </header>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
