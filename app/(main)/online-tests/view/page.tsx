import Link from "next/link";

/**
 * Manage Online Test — View / Read-only state
 */
export default function ViewOnlineTestPage() {
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
              <StepIndicator step={1} label="Basic Info" active />
              <div className="hidden h-px w-16 bg-gray-200 sm:block" aria-hidden />
              <StepIndicator step={2} label="Questions" />
            </div>
          </div>
          <Link
            href="/dashboard"
            className="shrink-0 rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-bold text-[#130b2c] shadow-sm transition-colors hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Basic Information Section */}
        <div className="rounded-xl bg-[#f8fafc]/50 p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">
              Basic Information
            </h2>
            <button
              type="button"
              className="flex items-center gap-2 text-sm font-semibold text-[#6633ff] transition-colors hover:text-[#5528e0]"
            >
              <EditIcon className="size-4" />
              Edit
            </button>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-slate-400">
                Online Test Title
              </span>
              <p className="text-base font-bold text-slate-900">
                Psychometric Test for Management Trainee Officer
              </p>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-slate-400">
                  Total Candidates
                </span>
                <p className="text-base font-bold text-slate-900">10,000</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-slate-400">
                  Total Slots
                </span>
                <p className="text-base font-bold text-slate-900">3</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-slate-400">
                  Total Question Set
                </span>
                <p className="text-base font-bold text-slate-900">2</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-medium text-slate-400">
                  Duration Per Slots (Minutes)
                </span>
                <p className="text-base font-bold text-slate-900">30</p>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[13px] font-medium text-slate-400">
                Question Type
              </span>
              <p className="text-base font-bold text-slate-900">MCQ</p>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-10 flex flex-col-reverse gap-4 border-t border-gray-100 pt-8 sm:flex-row sm:justify-end">
          <Link
            href="/dashboard"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-gray-200 bg-white px-10 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#6633ff] px-12 text-sm font-bold text-white transition-colors hover:bg-[#5528e0]"
          >
            Save & Continue
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

function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
