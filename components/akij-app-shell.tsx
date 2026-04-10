"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";

export function AkijAppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isHome = pathname === "/";
  const centeredMain = isLogin || isHome;

  return (
    <div className="flex min-h-screen flex-col bg-[#f9fafb] text-slate-800">
      <AppHeader />
      <main
        className={
          centeredMain
            ? "flex flex-1 flex-col items-center justify-center px-4 py-12"
            : "flex flex-1 flex-col px-4 pb-12 pt-8 md:px-12 lg:px-20"
        }
      >
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
