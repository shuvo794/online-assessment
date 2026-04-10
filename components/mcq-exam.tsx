"use client";

import Link from "next/link";
import { useState } from "react";

export function McqExam() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    "Relative Strength Index (RSI)",
    "Moving Average Convergence Divergence (MACD)",
    "Bollinger Bands",
    "Fibonacci Retracement",
  ];

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

          <div className="flex flex-col gap-3">
            {options.map((option, index) => (
              <label
                key={index}
                className={`group relative flex cursor-pointer items-center gap-4 rounded-xl border px-4 py-3 transition-all hover:bg-slate-50 md:px-5 md:py-4 ${
                  selectedOption === index
                    ? "border-[#6633ff] bg-[#fdfcff]"
                    : "border-[#e5e7eb]"
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    name="mcq-option"
                    className="peer sr-only"
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                  />
                  <div className="size-5 rounded-full border border-slate-300 bg-white ring-offset-2 peer-checked:border-[5px] peer-checked:border-[#6633ff] transition-all md:size-6 md:peer-checked:border-[6px]" />
                </div>
                <span className="text-sm font-normal leading-normal text-slate-700 md:text-base">
                  {option}
                </span>
              </label>
            ))}
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
