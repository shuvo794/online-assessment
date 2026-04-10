"use client";

import { useEffect, useState, type ReactNode } from "react";

import {
  ChevronDownSmallIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileIcon,
  TimelineIcon,
  UserGroupIcon,
} from "@/components/online-tests-icons";
import { OnlineTestsToolbar } from "@/components/online-tests-toolbar";

interface TestData {
  title: string;
  candidates: string;
  questionSet: string;
  slots?: string;
  examSlots?: string;
}

const MOCK_TESTS: TestData[] = [
  {
    title: "Psychometric Test for Management Trainee Officer",
    candidates: "10,000",
    questionSet: "3",
    examSlots: "3",
  },
];

/** Dashboard with test cards — route `/dashboard` */
export function DashboardOnlineTests() {
  const [tests, setTests] = useState<TestData[]>([]);

  useEffect(() => {
    const savedTests = JSON.parse(localStorage.getItem("online_tests") || "[]");
    // Normalize data from localStorage to match the display structure
    const normalizedSaved = savedTests.map((t: any) => ({
      ...t,
      examSlots: t.slots, // Map 'slots' from form to 'examSlots' for display
    }));
    
    setTests([...MOCK_TESTS, ...normalizedSaved]);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
      <OnlineTestsToolbar />

      <div className="grid gap-4 sm:grid-cols-2">
        {tests.map((test, i) => (
          <article
            key={i}
            className="flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white px-8 pb-10 pt-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold leading-[1.4] text-slate-700">
              {test.title}
            </h2>
            <div className="flex flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <Stat
                icon={<UserGroupIcon className="size-6 text-slate-600" />}
                label="Candidates:"
                value={test.candidates}
              />
              <Stat
                icon={<FileIcon className="size-6 text-slate-600" />}
                label="Question Set:"
                value={test.questionSet}
              />
              <Stat
                icon={<TimelineIcon className="size-6 text-slate-600" />}
                label="Exam Slots:"
                value={test.examSlots || test.slots || "Not Set"}
              />
            </div>
            <div>
              <button
                type="button"
                className="rounded-xl border border-[#6633ff] px-6 py-2.5 text-sm font-semibold text-[#6633ff] transition-colors hover:bg-violet-50"
              >
                View Candidates
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-[#f1f2f4] p-2 text-[#2e2e2f] hover:bg-gray-50"
            aria-label="Previous page"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <span className="flex size-8 items-center justify-center rounded-[10px] bg-[#f8f8f8] text-xs font-semibold text-[#2e2e2f]">
            1
          </span>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-[#f1f2f4] p-2 text-[#2e2e2f] hover:bg-gray-50"
            aria-label="Next page"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-[#666]">
            Online Test Per Page
          </span>
          <div className="flex h-8 items-center gap-2 rounded-lg border border-[#f1f2f4] bg-white px-2.5 text-xs font-medium text-[#2e2e2f]">
            8
            <ChevronDownSmallIcon className="size-4 text-slate-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2">
      {icon}
      <span className="text-sm font-normal text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-700">{value}</span>
    </div>
  );
}
