import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard — Akij Resource",
};

export default function DashboardNestedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
