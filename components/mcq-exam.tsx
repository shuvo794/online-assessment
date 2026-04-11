"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

interface Question {
  id: string;
  type: string;
  points: number;
  text: string;
  options?: { text: string; correct: boolean }[];
  content?: string;
}

interface ActiveExam {
  testId: string;
  title: string;
  durationMinutes: number;
  questions: Question[];
  startedAt?: number; // unix ms — written when exam first loads
}

export function McqExam() {
  const router = useRouter();
  const [exam, setExam] = useState<ActiveExam | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const didTimeout = useRef(false);

  // ── Load exam & stamp startedAt ────────────────────────────────────────────
  useEffect(() => {
    const raw = localStorage.getItem("active_exam");
    if (!raw) {
      router.push("/testOnlineDashboard");
      return;
    }

    const data: ActiveExam = JSON.parse(raw);

    // Stamp start time once (persist so refresh keeps real countdown)
    if (!data.startedAt) {
      data.startedAt = Date.now();
      localStorage.setItem("active_exam", JSON.stringify(data));
    }

    const totalSeconds = data.durationMinutes * 60;
    const elapsedSeconds = Math.floor((Date.now() - data.startedAt) / 1000);
    const remaining = totalSeconds - elapsedSeconds;

    if (remaining <= 0) {
      // Time already expired (e.g. came back after timeout)
      localStorage.removeItem("active_exam");
      router.push("/testTimeout");
      return;
    }

    setExam(data);
    setSecondsLeft(remaining);
  }, [router]);

  // ── Countdown ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (secondsLeft === null || !exam) return;

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timerRef.current!);
          if (!didTimeout.current) {
            didTimeout.current = true;
            localStorage.removeItem("active_exam");
            router.push("/testTimeout");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exam]); // only restart if exam object changes

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    clearInterval(timerRef.current!);
    localStorage.removeItem("active_exam");
    router.push("/testSuccess");
  };

  const handleSelect = (optIdx: number) => {
    setSelectedOptions((prev) => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleSkip = () => {
    if (!exam) return;
    if (currentIdx < exam.questions.length - 1) {
      setCurrentIdx((i) => i + 1);
    }
  };

  // ── Helpers ────────────────────────────────────────────────────────────────
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // ── Render guards ──────────────────────────────────────────────────────────
  if (!exam || secondsLeft === null) {
    return (
      <div className="flex items-center justify-center p-20 text-slate-400">
        Loading exam...
      </div>
    );
  }

  if (exam.questions.length === 0) {
    return (
      <div className="mx-auto flex w-full max-w-[840px] flex-col items-center gap-6 rounded-2xl border border-[#f0f0f0] bg-white p-12 text-center shadow-sm">
        <h2 className="text-xl font-bold text-slate-700">No Questions Found</h2>
        <p className="text-slate-500">
          The administrator has not added any questions to this exam yet.
        </p>
        <button
          onClick={() => router.push("/testOnlineDashboard")}
          className="rounded-xl border border-[#f1f2f4] px-8 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const question = exam.questions[currentIdx];
  const isLastQuestion = currentIdx === exam.questions.length - 1;
  const isWarning = secondsLeft <= 60; // last 60 s → red pulse

  // ── UI ─────────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto flex w-full max-w-[840px] flex-col gap-4 md:gap-6">

      {/* ── Top Bar ── */}
      <div className="flex h-16 items-center justify-between rounded-2xl border border-[#f0f0f0] bg-white px-5 shadow-sm md:h-[72px] md:px-6">
        <div className="flex flex-col gap-0.5">
          <span className="text-lg font-medium text-[#130b2c] md:text-xl">
            Question ({currentIdx + 1}/{exam.questions.length})
          </span>
          <span className="text-xs font-medium text-slate-400 truncate max-w-[200px] md:max-w-xs">
            {exam.title}
          </span>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-2 rounded-xl px-5 py-2 text-lg font-bold transition-all md:px-7 md:py-2.5 md:text-xl ${
            isWarning
              ? "bg-red-50 text-red-600 ring-2 ring-red-200 animate-pulse"
              : "bg-[#f4f1ff] text-[#6633ff]"
          }`}
        >
          {/* clock icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {formatTime(secondsLeft)}
        </div>
      </div>

      {/* ── Question Card ── */}
      <div className="flex flex-col gap-6 rounded-2xl border border-[#f0f0f0] bg-white p-5 shadow-sm md:gap-8 md:p-8">
        <div className="flex flex-col gap-5 md:gap-6">

          {/* Type + points badge */}
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-600">
              {question.type}
            </span>
            <span className="text-xs text-slate-400">{question.points} pt</span>
          </div>

          <h2 className="text-lg font-semibold leading-normal text-[#130b2c] md:text-xl">
            Q{currentIdx + 1}. {question.text}
          </h2>

          {/* Options (MCQ / Checkbox) */}
          {question.type !== "Text" && question.options ? (
            <div className="flex flex-col gap-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`group relative flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3 transition-all hover:bg-slate-50 md:px-5 md:py-4 ${
                    selectedOptions[currentIdx] === index
                      ? "border-[#6633ff] bg-[#fdfcff]"
                      : "border-[#e5e7eb]"
                  }`}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="radio"
                      name={`mcq-option-${currentIdx}`}
                      className="peer sr-only"
                      checked={selectedOptions[currentIdx] === index}
                      onChange={() => handleSelect(index)}
                    />
                    <div className="size-5 rounded-full border border-slate-300 bg-white ring-offset-2 peer-checked:border-[5px] peer-checked:border-[#6633ff] transition-all md:size-6 md:peer-checked:border-[6px]" />
                  </div>
                  <span className="text-sm font-normal leading-normal text-slate-700 md:text-base">
                    {option.text}
                  </span>
                </label>
              ))}
            </div>
          ) : (
            /* Text question */
            <div className="rounded-xl border border-gray-100 bg-slate-50 p-4">
              <textarea
                rows={5}
                placeholder="Type your answer here..."
                className="w-full resize-none bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* Question number navigation */}
        <div className="flex flex-wrap items-center gap-2 py-1">
          {exam.questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                i === currentIdx
                  ? "bg-[#6633ff] text-white"
                  : selectedOptions[i] !== undefined
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col border-t border-slate-100 pt-5 gap-3 md:flex-row md:items-center md:justify-between md:pt-4">
          <button
            type="button"
            onClick={handleSkip}
            disabled={isLastQuestion}
            className="order-2 flex w-full items-center justify-center rounded-xl border border-[#f1f2f4] px-6 py-3 text-base font-medium text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 md:order-1 md:w-auto"
          >
            Skip this Question
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="order-1 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6633ff] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#5528e0] active:scale-[0.98] md:order-2 md:w-auto md:py-3"
            >
              {/* checkmark icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17L4 12" />
              </svg>
              Submit Exam
            </button>
          ) : (
            <button
              onClick={() => setCurrentIdx((i) => i + 1)}
              className="order-1 flex w-full items-center justify-center rounded-xl bg-[#6633ff] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all hover:bg-[#5528e0] active:scale-[0.98] md:order-2 md:w-auto md:py-3"
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#6633ff] transition-all duration-1000"
          style={{
            width: `${((exam.durationMinutes * 60 - secondsLeft) / (exam.durationMinutes * 60)) * 100}%`,
          }}
        />
      </div>
      <p className="text-center text-xs text-slate-400">
        Time elapsed · {exam.durationMinutes} min total
      </p>
    </div>
  );
}
