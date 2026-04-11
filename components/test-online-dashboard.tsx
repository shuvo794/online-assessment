"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";

import {
  ChevronDownSmallIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  FileIcon,
  NegativeMarkingIcon,
  SearchIcon,
  TimelineIcon,
} from "@/components/online-tests-icons";

interface TestRecord {
  id: string;
  title: string;
  duration: string; // minutes stored as string
  questionSet: string;
  slots: string;
  candidates: string;
  questionType: string;
  startTime: string;
  endTime: string;
  questions?: any[];
}

export function TestOnlineDashboard() {
  const router = useRouter();
  const [tests, setTests] = useState<TestRecord[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const saved: TestRecord[] = JSON.parse(
      localStorage.getItem("online_tests") || "[]"
    );
    setTests(saved);
  }, []);

  const filtered = tests.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleStart = (test: TestRecord) => {
    // Store the active exam context so mcqExam page can read it
    localStorage.setItem(
      "active_exam",
      JSON.stringify({
        testId: test.id,
        title: test.title,
        durationMinutes: Number(test.duration) || 30,
        questions: test.questions || [],
      })
    );
    router.push(`/mcqExam`);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-[1.2] text-[#130b2c]">
          Online Tests
        </h1>
        <div className="relative w-full max-w-[420px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by exam title"
            className="h-12 w-full rounded-xl border border-[#f1f2f4] bg-white pl-4 pr-12 text-sm text-slate-700 placeholder:text-slate-400 focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-[#6633ff]/10"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg bg-[#f4f1ff] text-[#6633ff] transition-colors hover:bg-[#e8e2ff]"
            aria-label="Search"
          >
            <SearchIcon className="size-4" />
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-center text-slate-400">
          {tests.length === 0
            ? "No exams available yet. Ask your administrator to create one."
            : "No exams match your search."}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.map((test) => (
            <article
              key={test.id}
              className="flex flex-col gap-6 rounded-2xl border border-[#f0f0f0] bg-white px-8 pb-10 pt-8 transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold leading-[1.4] text-slate-700">
                {test.title}
              </h2>
              <div className="flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                <Stat
                  icon={<TimelineIcon className="size-6 text-slate-400" />}
                  label="Duration:"
                  value={`${test.duration || "?"} min`}
                />
                <Stat
                  icon={<FileIcon className="size-6 text-slate-400" />}
                  label="Questions:"
                  value={
                    test.questions
                      ? String(test.questions.length)
                      : test.questionSet || "?"
                  }
                />
                <Stat
                  icon={<NegativeMarkingIcon className="size-6 text-slate-400" />}
                  label="Type:"
                  value={test.questionType?.toUpperCase() || "MCQ"}
                />
              </div>
              <div className="pt-2">
                <button
                  onClick={() => handleStart(test)}
                  className="inline-block rounded-xl border border-[#6633ff] px-8 py-2.5 text-sm font-semibold text-[#6633ff] transition-colors hover:bg-[#6633ff]/5"
                >
                  Start
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-[#f1f2f4] text-[#2e2e2f] hover:bg-gray-50 disabled:opacity-50"
            disabled
          >
            <ChevronLeftIcon className="size-4" />
          </button>
          <span className="flex size-8 items-center justify-center rounded-lg bg-[#f4f1ff] text-xs font-semibold text-[#6633ff]">
            1
          </span>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-[#f1f2f4] text-[#2e2e2f] hover:bg-gray-50"
          >
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-500">
            Online Test Per Page
          </span>
          <div className="flex h-8 items-center gap-2 rounded-lg border border-[#f1f2f4] bg-white px-3 text-xs font-medium text-slate-700">
            8
            <ChevronDownSmallIcon className="size-4 text-slate-400" />
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
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-sm font-normal text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-700">{value}</span>
    </div>
  );
}
