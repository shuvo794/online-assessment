"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Question {
  id: string;
  type: string;
  points: number;
  text: string;
  options?: { text: string; correct: boolean }[];
  content?: string;
}

const MOCK_QUESTIONS: Question[] = [
  {
    id: "1",
    type: "MCQ",
    points: 1,
    text: "What is the Capital of Bangladesh?",
    options: [
      { text: "A. Dhaka", correct: true },
      { text: "B. Chattogram", correct: false },
      { text: "C. Rajshahi", correct: false },
      { text: "D. Barishal", correct: false },
    ],
  },
  {
    id: "2",
    type: "Checkbox",
    points: 1,
    text: "What is the Capital of Bangladesh?",
    options: [
      { text: "A. Dhaka", correct: true },
      { text: "B. Chattogram", correct: false },
      { text: "C. Rajshahi", correct: true },
      { text: "D. Barishal", correct: false },
    ],
  },
  {
    id: "3",
    type: "Text",
    points: 5,
    text: "Write a brief of your capital city",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
  },
];

function ManualQuestionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-8 md:p-10">
        {/* Header & Stepper Section */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="text-xl font-bold text-[#130b2c] sm:text-2xl">
              Manage Online Test
            </h1>
            <div className="flex items-center gap-6 sm:gap-10">
              <StepIndicator label="Basic Info" completed />
              <div
                className="hidden h-px w-16 bg-[#b1b1b1] sm:block"
                aria-hidden
              />
              <StepIndicator label="Questions Sets" completed />
            </div>
          </div>
          <Link
            href="/dashboard"
            className="shrink-0 rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-[#130b2c] shadow-sm transition-colors hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Questions List Section */}
        <div className="flex flex-col gap-8 rounded-2xl bg-[#f8fafc]/50 p-6 sm:p-10">
          <div className="flex flex-col gap-8">
            {MOCK_QUESTIONS.map((q, idx) => (
              <QuestionCard key={q.id} question={q} index={idx + 1} />
            ))}
          </div>

          {/* Save & Continue Button at the bottom */}
          <button
            type="button"
            onClick={() => router.push(`/online-tests/save?id=${id}`)}
            className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-[#6633ff] text-base font-bold text-white shadow-[0_8px_30px_rgb(102,51,255,0.2)] transition-all hover:bg-[#5528e0] active:scale-[0.99]"
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ question, index }: { question: Question; index: number }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      {/* Card Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-700">Question {index}</h3>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-gray-200 px-3 py-1 text-[11px] font-bold text-gray-400">
            {question.type}
          </span>
          <span className="rounded-md border border-gray-200 px-3 py-1 text-[11px] font-bold text-gray-400">
            {question.points} pt
          </span>
        </div>
      </div>

      {/* Question Text */}
      <p className="mb-6 text-base font-bold text-slate-800">
        {question.text}
      </p>

      {/* Question Body (Options or Content) */}
      <div className="mb-8 flex flex-col gap-3">
        {question.type === "Text" ? (
          <p className="text-sm leading-relaxed text-slate-500">
            {question.content}
          </p>
        ) : (
          question.options?.map((opt, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3.5"
            >
              <span className="text-sm font-medium text-slate-600">
                {opt.text}
              </span>
              {opt.correct && (
                <div className="flex size-5 items-center justify-center rounded-full bg-[#10b981] text-white">
                  <CheckIcon className="size-3" />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-6">
        <button className="text-sm font-bold text-[#6633ff] transition-colors hover:text-[#5528e0]">
          Edit
        </button>
        <button className="text-sm font-bold text-[#ff4d4d] transition-colors hover:text-red-600">
          Remove From Exam
        </button>
      </div>
    </div>
  );
}

/**
 * Manage Online Test — Questions Sets / Manual Question entry
 */
export default function ManualQuestionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManualQuestionsContent />
    </Suspense>
  );
}

function StepIndicator({
  label,
  completed,
  active,
}: {
  label: string;
  completed?: boolean;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={
          completed || active
            ? "flex size-6 shrink-0 items-center justify-center rounded-full bg-[#6633ff] text-white"
            : "flex size-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400"
        }
      >
        {completed ? (
          <CheckIcon className="size-4" />
        ) : (
          <span className="text-xs font-bold">1</span>
        )}
      </div>
      <span
        className={
          completed || active
            ? "text-sm font-bold text-[#130b2c]"
            : "text-sm font-bold text-gray-400"
        }
      >
        {label}
      </span>
    </div>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M20 6L9 17L4 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
