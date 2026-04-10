import Link from "next/link";

export default function Home() {
  return (
    <div className="flex max-w-lg flex-col items-center gap-6 px-2 text-center text-zinc-900">
      <h1 className="text-2xl font-semibold">Online assessment</h1>
      <p className="max-w-md text-center text-zinc-600">
        লগইন স্ক্রিন দেখতে নিচের লিঙ্কে যান।
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/dashboard"
          className="rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-violet-700"
        >
          Dashboard
        </Link>
        <Link
          href="/login"
          className="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
