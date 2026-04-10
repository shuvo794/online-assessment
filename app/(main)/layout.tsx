import type { ReactNode } from "react";

/** Route group only — header/footer come from root `app/layout.tsx`. */
export default function MainSectionLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
