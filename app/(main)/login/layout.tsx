import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign In — Akij Resource",
};

export default function LoginNestedLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
