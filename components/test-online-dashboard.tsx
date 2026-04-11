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
  duration: string;
  questionSet: string;
  slots: string;
  candidates: string;
  questionType: string;
  startTime: string;
  endTime: string;
  questions?: any[];
}

// ── Confirm Modal ────────────────────────────────────────────────────────────
function StartConfirmModal({
  test,
  onConfirm,
  onCancel,
}: {
  test: TestRecord;
  onConfirm: (durationMinutes: number) => void;
  onCancel: () => void;
}) {
  const parsedDuration = parseInt(test.duration, 10);
  const defaultDuration =
    Number.isFinite(parsedDuration) && parsedDuration > 0 ? parsedDuration : 30;
  const [duration, setDuration] = useState(defaultDuration);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[460px] overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-5">
          <h2 className="text-lg font-bold text-[#130b2c]">Start Exam</h2>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{test.title}</p>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-5 px-6 py-6">
          {/* Duration input */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Duration (minutes)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                className="w-28 rounded-xl border border-gray-200 px-4 py-2.5 text-center text-2xl font-bold text-[#6633ff] focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-violet-100"
              />
              <span className="text-sm text-slate-500">
                minutes · {duration * 60} seconds
              </span>
            </div>
            {test.duration && test.duration !== "" ? (
              <p className="text-xs text-slate-400">
                ✓ Admin set: {test.duration} min — you can adjust if needed
              </p>
            ) : (
              <p className="text-xs text-amber-500">
                ⚠ No duration was set by admin. Please set one before starting.
              </p>
            )}
          </div>

          {/* Stats row */}
          <div className="flex gap-4 rounded-xl bg-slate-50 px-4 py-3 text-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-slate-400">Questions</span>
              <span className="font-bold text-slate-700">
                {test.questions ? test.questions.length : test.questionSet || "?"}
              </span>
            </div>
            <div className="w-px bg-slate-200" />
            <div className="flex flex-col gap-0.5">
              <span className="text-xs text-slate-400">Type</span>
              <span className="font-bold text-slate-700">
                {test.questionType?.toUpperCase() || "MCQ"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            onClick={onCancel}
            className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(duration)}
            className="rounded-xl bg-[#6633ff] px-8 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#5528e0]"
          >
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────
export function TestOnlineDashboard() {
  const router = useRouter();
  const [tests, setTests] = useState<TestRecord[]>([]);
  const [search, setSearch] = useState("");
  const [confirmTest, setConfirmTest] = useState<TestRecord | null>(null);

  useEffect(() => {
    const saved: TestRecord[] = JSON.parse(
      localStorage.getItem("online_tests") || "[]"
    );
    setTests(saved);
  }, []);

  const filtered = tests.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartConfirm = (durationMinutes: number) => {
    if (!confirmTest) return;

    // Save fresh active_exam (no startedAt — will be stamped on mcqExam mount)
    localStorage.setItem(
      "active_exam",
      JSON.stringify({
        testId: confirmTest.id,
        title: confirmTest.title,
        durationMinutes,
        questions: confirmTest.questions || [],
      })
    );

    setConfirmTest(null);
    router.push("/mcqExam");
  };

  return (
    <>
      {/* Confirm modal */}
      {confirmTest && (
        <StartConfirmModal
          test={confirmTest}
          onConfirm={handleStartConfirm}
          onCancel={() => setConfirmTest(null)}
        />
      )}

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
            {filtered.map((test) => {
              const parsedDur = parseInt(test.duration, 10);
              const displayDur =
                Number.isFinite(parsedDur) && parsedDur > 0
                  ? `${parsedDur} min`
                  : "Not set";

              return (
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
                      value={displayDur}
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
                      onClick={() => setConfirmTest(test)}
                      className="inline-block rounded-xl border border-[#6633ff] px-8 py-2.5 text-sm font-semibold text-[#6633ff] transition-colors hover:bg-[#6633ff]/5"
                    >
                      Start
                    </button>
                  </div>
                </article>
              );
            })}
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
    </>
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
