"use client";

import Link from "next/link";

import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  NormalTextIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from "@/components/online-tests-icons";

export function RichTextExam() {
  return (
    <div className="mx-auto flex w-full max-w-[840px] flex-col gap-4 md:gap-6">
      {/* Top Bar: Question Progress & Timer */}
      <div className="flex h-16 items-center justify-between rounded-2xl border border-[#f0f0f0] bg-white px-5 shadow-sm md:h-[72px] md:px-6">
        <span className="text-lg font-medium text-[#130b2c] md:text-xl">
          Question (1/20)
        </span>
        <div className="rounded-xl bg-[#f4f1ff] px-6 py-2 text-lg font-semibold text-[#130b2c] md:px-8 md:py-2.5 md:text-xl">
          20:31
        </div>
      </div>

      {/* Question Card */}
      <div className="flex flex-col gap-6 rounded-2xl border border-[#f0f0f0] bg-white p-5 shadow-sm md:gap-8 md:p-8">
        <div className="flex flex-col gap-5 md:gap-6">
          <h2 className="text-lg font-semibold leading-normal text-[#130b2c] md:text-xl">
            Q1. Which of the following indicators is used to measure market volatility?
          </h2>

          <div className="flex flex-col overflow-hidden rounded-xl border border-[#e5e7eb] bg-white">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 border-b border-[#e5e7eb] bg-[#f9fafb]/50 px-3 py-2.5 md:px-4 md:py-3">
              <div className="flex items-center gap-1 border-r border-[#e5e7eb] pr-2 md:gap-1.5 md:pr-3">
                <ToolbarButton icon={<UndoIcon className="size-4 md:size-5" />} />
                <ToolbarButton icon={<RedoIcon className="size-4 md:size-5" />} />
              </div>
              <div className="flex items-center gap-2 border-r border-[#e5e7eb] pr-2 md:gap-3 md:pr-3">
                <button className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 md:gap-2 md:text-sm">
                  Normal text
                  <NormalTextIcon className="size-3.5 md:size-4" />
                </button>
              </div>
              <div className="flex items-center gap-1 border-r border-[#e5e7eb] pr-2 md:gap-1.5 md:pr-3">
                <ToolbarButton icon={<ListIcon className="size-4 md:size-5" />} />
              </div>
              <div className="flex items-center gap-1 md:gap-1.5">
                <ToolbarButton icon={<BoldIcon className="size-4 md:size-5" />} />
                <ToolbarButton icon={<ItalicIcon className="size-4 md:size-5" />} />
                <ToolbarButton icon={<StrikethroughIcon className="size-4 md:size-5" />} />
                <ToolbarButton icon={<UnderlineIcon className="size-4 md:size-5" />} />
              </div>
            </div>
            {/* Editor Area */}
            <textarea
              className="min-h-[250px] w-full resize-none bg-white p-4 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none md:min-h-[300px] md:p-6 md:text-base"
              placeholder="Type questions here.."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col border-t border-slate-50 pt-5 md:flex-row md:items-center md:justify-between md:pt-4">
          <Link
            href="/testSuccess"
            className="order-1 flex w-full items-center justify-center rounded-xl bg-[#6633ff] px-8 py-3.5 text-base font-semibold text-white transition-all hover:bg-[#5528e0] shadow-sm active:scale-[0.98] md:order-2 md:w-auto md:py-3"
          >
            Submit
          </Link>
          <button
            type="button"
            className="order-2 mt-3 flex w-full items-center justify-center rounded-xl border border-[#f1f2f4] px-6 py-3 text-base font-medium text-slate-600 transition-colors hover:bg-slate-50 md:order-1 md:mt-0 md:w-auto"
          >
            Skip this Question
          </button>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({
  icon,
  active,
}: {
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`flex size-8 items-center justify-center rounded-md transition-colors ${
        active
          ? "bg-slate-200 text-slate-900"
          : "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
      }`}
    >
      {icon}
    </button>
  );
}
