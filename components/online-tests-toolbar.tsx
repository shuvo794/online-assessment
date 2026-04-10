import Link from "next/link";

import { PlusIcon, SearchIcon } from "@/components/online-tests-icons";

export function OnlineTestsToolbar() {
  return (
    <div className="mb-2 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <h1 className="text-2xl font-semibold leading-[1.3] text-slate-700">
        Online Tests
      </h1>
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end lg:w-auto lg:gap-4">
        <div className="flex h-12 w-full min-w-0 max-w-[621px] items-center justify-between gap-2 rounded-lg border border-[#a086f7] bg-white px-3 py-2 shadow-[2px_2px_6px_rgba(73,123,241,0.24)] lg:flex-1">
          <input
            type="search"
            placeholder="Search by exam title"
            className="min-w-0 flex-1 bg-transparent text-xs text-slate-800 placeholder:text-[#7c8493] placeholder:opacity-50 focus:outline-none"
          />
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[rgba(103,63,237,0.1)] text-[#6633ff]">
            <SearchIcon className="size-5" />
          </span>
        </div>
        <Link
          href="/online-tests/manage"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#6633ff] px-6 text-base font-semibold text-white transition-colors hover:bg-[#5528e0] sm:min-w-[192px]"
        >
          <PlusIcon className="size-6" />
          Create Online Test
        </Link>
      </div>
    </div>
  );
}
