/**
 * Empty state — Figma `1:8460`
 * https://www.figma.com/design/mhBxaav3SsrmdHKvDcM6N8/Interview-Task--Copy-?node-id=1-8460
 */
export function OnlineTestsEmptyState() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 shadow-[0_4px_24px_rgba(15,23,42,0.06)] sm:px-12 sm:py-16">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <EmptyStateIllustration className="mb-10" />
        <h2 className="text-xl font-semibold text-slate-800 sm:text-2xl">
          No Online Test Available
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 sm:text-base">
          Currently, there are no online tests available. Please check back
          later for updates.
        </p>
      </div>
    </div>
  );
}

function EmptyStateIllustration({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      role="img"
    >
      <circle cx="48" cy="44" r="5" fill="#22c55e" opacity="0.55" />
      <circle cx="232" cy="36" r="4" fill="#3b82f6" opacity="0.5" />
      <circle cx="218" cy="168" r="3" fill="#3b82f6" opacity="0.4" />

      <path
        d="M72 52h96l12 14h52c4 0 8 3 8 8v88c0 5-4 8-8 8H72c-4 0-8-3-8-8V60c0-5 4-8 8-8Z"
        fill="#64748b"
      />
      <path
        d="M72 52h96l12 14H64c-4 0-8 3-8 8v4h-4c-4 0-8-3-8-8V60c0-5 4-8 8-8Z"
        fill="#475569"
      />

      <rect
        x="118"
        y="78"
        width="100"
        height="64"
        rx="6"
        fill="#bfdbfe"
        stroke="#60a5fa"
        strokeWidth="2"
      />
      <rect x="126" y="86" width="84" height="40" rx="3" fill="#e0f2fe" />

      <path
        d="M108 150h120v8c0 3-2 6-6 6h-108c-4 0-6-3-6-6v-8Z"
        fill="#94a3b8"
      />

      <path
        d="M188 24c8 0 14 6 14 14v28c0 8-6 14-14 14h-36c-8 0-14-6-14-14V38c0-8 6-14 14-14h36Z"
        fill="#3b82f6"
      />
      <path
        d="m174 46 12 12M186 46-12 12"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
