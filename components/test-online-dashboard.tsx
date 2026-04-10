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

const MOCK_TESTS = [
  {
    title: "Psychometric Test for Management Trainee Officer",
    duration: "30 min",
    questions: "20",
    negativeMarking: "-0.25/wrong",
  },
  {
    title: "Psychometric Test for Management Trainee Officer",
    duration: "30 min",
    questions: "20",
    negativeMarking: "-0.25/wrong",
  },
  {
    title: "Psychometric Test for Management Trainee Officer",
    duration: "30 min",
    questions: "20",
    negativeMarking: "-0.25/wrong",
  },
  {
    title: "Psychometric Test for Management Trainee Officer",
    duration: "30 min",
    questions: "20",
    negativeMarking: "-0.25/wrong",
  },
] as const;

export function TestOnlineDashboard() {
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
      <div className="grid gap-6 sm:grid-cols-2">
        {MOCK_TESTS.map((test, i) => (
          <article
            key={i}
            className="flex flex-col gap-6 rounded-2xl border border-[#f0f0f0] bg-white px-8 pb-10 pt-8 transition-shadow hover:shadow-md"
          >
            <h2 className="text-xl font-semibold leading-[1.4] text-slate-700">
              {test.title}
            </h2>
            <div className="flex flex-col gap-4 text-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Stat
                icon={<TimelineIcon className="size-6 text-slate-400" />}
                label="Duration:"
                value={test.duration}
              />
              <Stat
                icon={<FileIcon className="size-6 text-slate-400" />}
                label="Question:"
                value={test.questions}
              />
              <Stat
                icon={<NegativeMarkingIcon className="size-6 text-slate-400" />}
                label="Negative Marking:"
                value={test.negativeMarking}
              />
            </div>
            <div>
              <button
                type="button"
                className="rounded-xl border border-[#6633ff] px-8 py-2.5 text-sm font-semibold text-[#6633ff] transition-colors hover:bg-[#6633ff]/5"
              >
                Start
              </button>
            </div>
          </article>
        ))}
      </div>

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
