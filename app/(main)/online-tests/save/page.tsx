"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

interface Question {
  id: string;
  type: string;
  points: number;
  text: string;
  options?: { text: string; correct?: boolean; label?: string; selected?: boolean }[];
  content?: string;
}

const STATIC_QUESTIONS: Question[] = [
  {
    id: "1",
    type: "MCQ",
    points: 1,
    text: "What is the Capital of Bangladesh?",
    options: [
      { text: "A. Dhaka", correct: true, label: "A. Dhaka", selected: true },
      { text: "B. Chattogram", label: "B. Chattogram" },
      { text: "C. Rajshahi", label: "C. Rajshahi" },
      { text: "D. Barishal", label: "D. Barishal" },
    ],
  },
  {
    id: "2",
    type: "Checkbox",
    points: 1,
    text: "What is the Capital of Bangladesh?",
    options: [
      { text: "A. Dhaka", correct: true, label: "A. Dhaka", selected: true },
      { text: "B. Chattogram", label: "B. Chattogram" },
      { text: "C. Rajshahi", correct: true, label: "C. Rajshahi", selected: true },
      { text: "D. Barishal", label: "D. Barishal" },
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

/**
 * Manage Online Test — Save / List View
 */
export default function OnlineTestSavePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const [questions, setQuestions] = useState<Question[]>(STATIC_QUESTIONS);

  useEffect(() => {
    const userQuestions = JSON.parse(localStorage.getItem("user_added_questions") || "[]");
    setQuestions([...STATIC_QUESTIONS, ...userQuestions]);
  }, []);

  const handleRemove = (qid: string) => {
    const userQuestions = JSON.parse(localStorage.getItem("user_added_questions") || "[]");
    const updatedUserQuestions = userQuestions.filter((q: any) => q.id !== qid);
    localStorage.setItem("user_added_questions", JSON.stringify(updatedUserQuestions));
    setQuestions([...STATIC_QUESTIONS, ...updatedUserQuestions]);
  };

  return (
    <div className="mx-auto w-full max-w-[960px] pb-12">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-8 md:p-10">
        {/* Header & Stepper Section */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-8">
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

        {/* Question List */}
        <div className="flex flex-col gap-10">
          {questions.map((q, index) => (
            <QuestionCard
              key={q.id || index}
              number={index + 1}
              type={q.type}
              points={q.points}
              question={q.text}
              options={q.options?.map(opt => ({ 
                label: opt.label || opt.text || "", 
                selected: opt.selected || opt.correct || false 
              }))}
              content={q.content}
              onEdit={() => router.push(`/online-tests/questions/mcq-modal?id=${id}&qid=${q.id}`)}
              onRemove={() => handleRemove(q.id)}
            />
          ))}
        </div>

        {/* Actions Footer */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-8">
          <button
            type="button"
            onClick={() => router.push(`/online-tests/questions/mcq-modal?id=${id}`)}
            className="inline-flex h-14 items-center justify-center rounded-2xl border border-[#6633ff] px-10 text-base font-bold text-[#6633ff] transition-all hover:bg-violet-50"
          >
            Add Question
          </button>
          <button
            type="button"
            onClick={() => {
              // Persist the final question list onto the test record
              const allTests = JSON.parse(localStorage.getItem("online_tests") || "[]");
              const updatedTests = allTests.map((t: any) =>
                t.id === id ? { ...t, questions } : t
              );
              localStorage.setItem("online_tests", JSON.stringify(updatedTests));
              // Also clear the staging area
              localStorage.removeItem("user_added_questions");
              router.push("/dashboard");
            }}
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#6633ff] px-12 text-base font-bold text-white shadow-[0_8px_30px_rgb(102,51,255,0.2)] transition-all hover:bg-[#5528e0] active:scale-[0.99]"
          >
            Save & Finish
          </button>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({
  number,
  type,
  points,
  question,
  options,
  content,
  onEdit,
  onRemove
}: {
  number: number;
  type: string;
  points: number;
  question: string;
  options?: { label: string; selected?: boolean }[];
  content?: string;
  onEdit?: () => void;
  onRemove?: () => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      {/* Question Header */}
      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-[#130b2c]">
          Question {number}
        </span>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-medium text-gray-400">
            {type}
          </span>
          <span className="rounded-full border border-gray-100 bg-white px-3 py-1 text-xs font-medium text-gray-400">
            {points} pt
          </span>
        </div>
      </div>

      {/* Question Title */}
      <h3 className="text-lg font-bold text-[#130b2c]">{question}</h3>

      {/* Question Content (Options or Text) */}
      <div className="flex flex-col gap-3">
        {options ? (
          options.map((option, idx) => (
            <div
              key={idx}
              className={`flex items-center justify-between rounded-lg p-3 text-sm font-medium ${
                option.selected
                  ? "bg-slate-50 text-[#130b2c]"
                  : "bg-white text-gray-400"
              }`}
            >
              <span>{option.label}</span>
              {option.selected && (
                <div className="flex size-5 items-center justify-center rounded-full bg-[#10b981] text-white">
                  <CheckIcon className="size-3" />
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm leading-relaxed text-gray-500">{content}</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-2 flex items-center justify-between border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={onEdit}
          className="text-sm font-bold text-[#6633ff] hover:opacity-80"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm font-bold text-[#f43f5e] hover:opacity-80"
        >
          Remove From Exam
        </button>
      </div>
    </div>
  );
}

function StepIndicator({
  step,
  label,
  completed,
  active,
}: {
  step?: number;
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
          <span className="text-xs font-bold">{step}</span>
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
