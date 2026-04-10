import Link from "next/link";

/**
 * Text Question Section — Modal/Editor UI
 */
export default function TextEditorPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-[840px] overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full border border-gray-300 text-sm font-bold text-gray-500">
              1
            </div>
            <span className="text-base font-bold text-[#130b2c]">Question 1</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-gray-600">Score:</span>
              <input
                type="text"
                defaultValue="1"
                className="w-12 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-center text-sm font-medium focus:border-[#6633ff] focus:outline-none"
              />
            </div>
            <div className="relative">
              <select className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-4 pr-10 text-sm font-medium text-gray-700 focus:border-[#6633ff] focus:outline-none">
                <option>Text</option>
                <option>MCQ</option>
                <option>Checkbox</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <ChevronDownIcon className="size-4" />
              </div>
            </div>
            <button className="text-gray-400 hover:text-red-500">
              <TrashIcon className="size-5" />
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="max-h-[70vh] overflow-y-auto p-6">
          {/* Question Editor */}
          <RichTextEditor placeholder="Type your question here..." />

          {/* Model Answer Section (A) */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex size-7 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-500 uppercase">
                A
              </div>
              <button className="text-gray-400 hover:text-red-500">
                <TrashIcon className="size-5" />
              </button>
            </div>
            <RichTextEditor />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-6">
          <button className="rounded-xl border border-gray-300 bg-white px-8 py-3 text-sm font-bold text-[#6633ff] transition-colors hover:bg-slate-50">
            Save
          </button>
          <button className="rounded-xl bg-[#6633ff] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-colors hover:bg-[#5528e0]">
            Save & Add More
          </button>
        </div>
      </div>
    </div>
  );
}

function RichTextEditor({ placeholder }: { placeholder?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-slate-50/20">
      {/* Toolbar */}
      <div className="flex items-center gap-4 border-b border-gray-100 px-4 py-2 text-gray-500">
        <button className="hover:text-gray-900"><UndoIcon className="size-4" /></button>
        <button className="hover:text-gray-900"><RedoIcon className="size-4" /></button>
        <div className="h-4 w-px bg-gray-200" />
        <button className="flex items-center gap-1 text-xs font-bold hover:text-gray-900">
          Normal text <ChevronDownIcon className="size-3" />
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <button className="hover:text-gray-900"><ListIcon className="size-4" /></button>
        <button className="text-base font-black hover:text-gray-900">B</button>
        <button className="italic hover:text-gray-900 font-serif">I</button>
      </div>
      {/* Input Area */}
      <div className="min-h-[100px] p-4 text-sm text-gray-800 focus:outline-none" contentEditable />
    </div>
  );
}

/* Icons (Re-declared locally for the standalone page context) */

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  );
}

function TrashIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
  );
}

function UndoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>
  );
}

function RedoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"/><path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/></svg>
  );
}

function ListIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
  );
}
