import Link from "next/link";

/**
 * Manage Online Test — Questions Sets / Manual Question entry
 */
export default function ManualQuestionsPage() {
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

        {/* Add Question Section */}
        <div className="flex flex-col items-center justify-center rounded-2xl bg-[#f8fafc]/50 p-12 sm:p-24">
          <button
            type="button"
            className="flex h-24 w-full max-w-[720px] items-center justify-center rounded-2xl bg-[#6633ff] text-xl font-bold text-white shadow-[0_12px_40px_rgb(102,51,255,0.25)] transition-all hover:bg-[#5528e0] hover:shadow-[0_12px_40px_rgb(102,51,255,0.35)] active:scale-[0.98]"
          >
            Add Question
          </button>
        </div>
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
