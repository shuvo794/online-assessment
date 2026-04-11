"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChecklistIcon } from "@/components/online-tests-icons";

export function TestSuccess() {
  const [displayName, setDisplayName] = useState("Candidate");

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      const user = JSON.parse(raw);
      if (user.email) {
        const name = user.email.split("@")[0].replace(/\./g, " ");
        setDisplayName(name);
      }
    }
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[840px] items-center justify-center pt-8 md:pt-16">
      <div className="flex w-full flex-col items-center gap-8 rounded-2xl border border-[#f0f0f0] bg-white px-6 py-12 text-center shadow-sm md:px-12 md:py-16">
        <div className="relative flex items-center justify-center">
          <ChecklistIcon className="size-16 text-[#3b82f6] md:size-20" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-[#130b2c] md:text-3xl">
            Test Completed
          </h1>
          <p className="max-w-[600px] text-base leading-relaxed text-slate-500 md:text-lg">
            Congratulations! <strong className="capitalize text-slate-800">{displayName}</strong>, You have completed your MCQ Exam. Thank you for participating.
          </p>
        </div>

        <Link
          href="/testOnlineDashboard"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-[#f1f2f4] px-8 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
