"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Option {
  id: string;
  letter: string;
  text: string;
  isCorrect: boolean;
}

/**
 * MCQ Section — Modal/Editor UI
 */
export default function MCQEditorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const qid = searchParams.get("qid") || "";
  const [points, setPoints] = useState(1);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState<Option[]>([
    { id: "1", letter: "A", text: "", isCorrect: false },
    { id: "2", letter: "B", text: "", isCorrect: false },
    { id: "3", letter: "C", text: "", isCorrect: false },
  ]);

  useEffect(() => {
    if (qid) {
      const userQuestions = JSON.parse(localStorage.getItem("user_added_questions") || "[]");
      const questionToEdit = userQuestions.find((q: any) => q.id === qid);
      if (questionToEdit) {
        setQuestionText(questionToEdit.text);
        setPoints(questionToEdit.points);
        
        const mappedOptions = questionToEdit.options.map((opt: any, i: number) => {
          const parts = opt.text.split(". ");
          return {
            id: i.toString(),
            letter: parts[0] || String.fromCharCode(65 + i),
            text: parts.slice(1).join(". ") || "",
            isCorrect: opt.correct
          };
        });
        setOptions(mappedOptions);
      }
    }
  }, [qid]);

  const handleAddOption = () => {
    const nextLetter = String.fromCharCode(65 + options.length);
    setOptions([...options, { id: Date.now().toString(), letter: nextLetter, text: "", isCorrect: false }]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 1) return;
    const newOptions = options.filter((_, i) => i !== index).map((opt, i) => ({
      ...opt,
      letter: String.fromCharCode(65 + i)
    }));
    setOptions(newOptions);
  };

  const handleOptionUpdate = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index].text = text;
    setOptions(newOptions);
  };

  const handleSetCorrect = (index: number) => {
    // For MCQ, only one can be correct
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index
    }));
    setOptions(newOptions);
  };

  const handleSave = () => {
    if (!questionText.trim()) {
      alert("Please enter a question");
      return;
    }

    const newQuestionData = {
      id: qid || Date.now().toString(),
      type: "MCQ",
      points: points,
      text: questionText,
      options: options.map(opt => ({
        text: `${opt.letter}. ${opt.text}`,
        correct: opt.isCorrect,
        label: `${opt.letter}. ${opt.text}`,
        selected: opt.isCorrect
      })),
    };

    const userQuestions = JSON.parse(localStorage.getItem("user_added_questions") || "[]");
    
    let updatedQuestions;
    if (qid) {
      // Update existing
      updatedQuestions = userQuestions.map((q: any) => q.id === qid ? newQuestionData : q);
    } else {
      // Add new
      updatedQuestions = [...userQuestions, newQuestionData];
    }
    
    localStorage.setItem("user_added_questions", JSON.stringify(updatedQuestions));

    router.push(`/online-tests/questions?id=${id}`);
  };

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
                type="number"
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-12 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-center text-sm font-medium focus:border-[#6633ff] focus:outline-none"
              />
            </div>
            <div className="relative">
              <select className="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-4 pr-10 text-sm font-medium text-gray-700 focus:border-[#6633ff] focus:outline-none">
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
          <div className="mb-4">
            <label className="mb-2 block text-xs font-bold text-gray-400 uppercase">Question Text</label>
            <RichTextEditor 
              placeholder="Type your question here..." 
              value={questionText}
              onChange={setQuestionText}
            />
          </div>

          {/* Options Section */}
          <div className="mt-8 flex flex-col gap-6">
            <label className="block text-xs font-bold text-gray-400 uppercase">Options</label>
            {options.map((opt, index) => (
              <OptionItem 
                key={opt.id}
                letter={opt.letter} 
                text={opt.text}
                isCorrect={opt.isCorrect}
                onTextChange={(val) => handleOptionUpdate(index, val)}
                onCorrectToggle={() => handleSetCorrect(index)}
                onRemove={() => handleRemoveOption(index)}
              />
            ))}
          </div>

          {/* Add Option Button */}
          <button 
            onClick={handleAddOption}
            className="mt-6 flex items-center gap-2 text-sm font-bold text-[#6633ff] hover:opacity-80"
          >
            <PlusIcon className="size-4" />
            Another options
          </button>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 p-6">
          <button 
            onClick={() => router.push(`/online-tests/questions?id=${id}`)}
            className="rounded-xl border border-gray-300 bg-white px-8 py-3 text-sm font-bold text-[#6633ff] transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="rounded-xl bg-[#6633ff] px-8 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition-colors hover:bg-[#5528e0]"
          >
            Save
          </button>
        </div>
      </div>

      {/* Background Hint for Preview */}
      <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center pointer-events-none opacity-20">
        <h2 className="text-4xl font-bold">Background Page Context</h2>
      </div>
    </div>
  );
}

function OptionItem({ 
  letter, 
  text, 
  isCorrect, 
  onTextChange, 
  onCorrectToggle,
  onRemove
}: { 
  letter: string;
  text: string;
  isCorrect: boolean;
  onTextChange: (val: string) => void;
  onCorrectToggle: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-7 items-center justify-center rounded-full border border-gray-300 text-xs font-bold text-gray-500 uppercase">
            {letter}
          </div>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={isCorrect}
              onChange={onCorrectToggle}
              className="size-4 rounded accent-[#6633ff]" 
            />
            <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Set as correct answer</span>
          </label>
        </div>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-500">
          <TrashIcon className="size-5" />
        </button>
      </div>
      <RichTextEditor 
        placeholder={`Option ${letter} text...`}
        value={text}
        onChange={onTextChange}
      />
    </div>
  );
}

function RichTextEditor({ 
  placeholder, 
  value, 
  onChange 
}: { 
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-slate-50/20">
      {/* Toolbar */}
      <div className="flex items-center gap-4 border-b border-gray-100 px-4 py-2 text-gray-500">
        <button className="hover:text-gray-900"><UndoIcon className="size-4" /></button>
        <button className="hover:text-gray-900"><RedoIcon className="size-4" /></button>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-1 text-xs font-bold">Normal text</div>
        <div className="h-4 w-px bg-gray-200" />
        <button className="text-sm font-black hover:text-gray-900">B</button>
        <button className="italic hover:text-gray-900 font-serif">I</button>
      </div>
      {/* Input Area */}
      <div className="relative min-h-[60px] p-4 text-sm text-gray-800 focus:outline-none">
        <div 
          className="min-h-[1.5rem] w-full"
          contentEditable 
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onInput={(e) => onChange(e.currentTarget.innerText)}
          suppressContentEditableWarning={true}
        >
          {value}
        </div>
        {!value && !isFocused && (
          <span className="pointer-events-none absolute left-4 top-4 text-gray-300">
            {placeholder}
          </span>
        )}
      </div>
    </div>
  );
}

/* Icons */

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

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
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
