"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * Manage Online Test — Step 1 Basic Information
 * Figma node `1:6073` — https://www.figma.com/design/mhBxaav3SsrmdHKvDcM6N8/Interview-Task--Copy-?node-id=1-6073
 */
export function ManageOnlineTestBasicForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    candidates: "",
    slots: "",
    questionSet: "",
    questionType: "",
    startTime: "",
    endTime: "",
    duration: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.title || !formData.candidates || !formData.slots || !formData.questionSet || !formData.questionType) {
      alert("Please fill in all required fields.");
      return;
    }

    const newTest = {
      ...formData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const existingTests = JSON.parse(localStorage.getItem("online_tests") || "[]");
    localStorage.setItem("online_tests", JSON.stringify([...existingTests, newTest]));

    router.push(`/online-tests/view?id=${newTest.id}`);
  };

  return (
    <div className="mx-auto w-full max-w-[960px]">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:p-8 md:p-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Manage Online Test
          </h1>
          <Link
            href="/dashboard"
            className="shrink-0 self-start rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-6 sm:gap-10">
          <StepIndicator
            step={1}
            label="Basic Info"
            active
          />
          <div className="hidden h-px flex-1 min-w-[2rem] bg-gray-200 sm:block" aria-hidden />
          <StepIndicator step={2} label="Questions" active={false} />
        </div>

        <h2 className="mb-6 text-lg font-semibold text-slate-800">Basic Information</h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Field label="Online Test Title" required>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter online test title"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-violet-100"
              required
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Total Candidates" required>
              <input
                type="text"
                name="candidates"
                value={formData.candidates}
                onChange={handleChange}
                inputMode="numeric"
                placeholder="Enter total candidates"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-violet-100"
                required
              />
            </Field>
            <Field label="Total Slots" required>
              <SelectField
                name="slots"
                value={formData.slots}
                onChange={handleChange}
                placeholder="Select total slots"
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
                required
              />
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Total Question Set" required>
              <SelectField
                name="questionSet"
                value={formData.questionSet}
                onChange={handleChange}
                placeholder="Select total question set"
                options={[
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                ]}
                required
              />
            </Field>
            <Field label="Question Type" required>
              <SelectField
                name="questionType"
                value={formData.questionType}
                onChange={handleChange}
                placeholder="Select question type"
                options={[
                  { value: "mcq", label: "MCQ" },
                  { value: "subjective", label: "Subjective" },
                ]}
                required
              />
            </Field>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <Field label="Start Time" required>
              <TimeInput
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                placeholder="Enter start time"
              />
            </Field>
            <Field label="End Time" required>
              <TimeInput
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                placeholder="Enter end time"
              />
            </Field>
            <Field label="Duration (Minutes)">
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 30"
                min="1"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-violet-100"
              />
            </Field>
          </div>

          <div className="mt-4 flex flex-col-reverse gap-3 border-t border-gray-100 pt-8 sm:flex-row sm:justify-between">
            <button
              type="button"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              onClick={() => router.back()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#6633ff] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5528e0]"
            >
              Save & Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function StepIndicator({
  step,
  label,
  active,
}: {
  step: number;
  label: string;
  active: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={
          active
            ? "flex size-10 shrink-0 items-center justify-center rounded-full bg-[#6633ff] text-sm font-semibold text-white"
            : "flex size-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-500"
        }
      >
        {step}
      </div>
      <span
        className={
          active
            ? "text-sm font-medium text-[#6633ff]"
            : "text-sm font-medium text-gray-500"
        }
      >
        {label}
      </span>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium text-slate-500 sm:text-sm">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

function SelectField({
  name,
  placeholder,
  options,
  value,
  onChange,
  required,
}: {
  name: string;
  placeholder: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-violet-100"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

function TimeInput({
  name,
  placeholder,
  value,
  onChange,
  required,
}: {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#6633ff] focus:outline-none focus:ring-2 focus:ring-violet-100"
      />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        <ClockIcon className="size-5" />
      </span>
    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
