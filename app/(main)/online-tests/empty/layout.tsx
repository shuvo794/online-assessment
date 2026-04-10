import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Online Tests — Empty — Akij Resource",
};

export default function OnlineTestsEmptyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
