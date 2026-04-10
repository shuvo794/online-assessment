import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Manage Online Test — Akij Resource",
};

export default function ManageOnlineTestLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
