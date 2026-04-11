"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

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
  id?: string;
  title: string;
  candidates: string;
  questionSet: string;
  duration?: string;
  slots?: string;
  examSlots?: string;
  questions?: any[];
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
  const router = useRouter();
  const [tests, setTests] = useState<TestData[]>([]);

  useEffect(() => {
    const savedTests: TestData[] = JSON.parse(
      localStorage.getItem("online_tests") || "[]"
    );
    const normalizedSaved = savedTests.map((t) => ({
      ...t,
      examSlots: t.slots,
    }));
    setTests([...MOCK_TESTS, ...normalizedSaved]);
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4">
      <OnlineTestsToolbar />

      <div className="grid gap-4 sm:grid-cols-2">
        {tests.map((test, i) => {
          const parsedDur = parseInt(test.duration || "", 10);
          const displayDur =
            Number.isFinite(parsedDur) && parsedDur > 0
              ? `${parsedDur} min`
              : "—";
          const questionCount = test.questions
            ? test.questions.length
            : test.questionSet || "?";

          return (
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
                  label="Questions:"
                  value={String(questionCount)}
                />
                <Stat
                  icon={<TimelineIcon className="size-6 text-slate-600" />}
                  label="Duration:"
                  value={displayDur}
                />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-[#6633ff] px-6 py-2.5 text-sm font-semibold text-[#6633ff] transition-colors hover:bg-violet-50"
                >
                  View Candidates
                </button>
                {test.id && (
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/online-tests/view?id=${test.id}`)
                    }
                    className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
                  >
                    Manage
                  </button>
                )}
              </div>
            </article>
          );
        })}
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
