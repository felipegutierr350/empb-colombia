import { ReactNode } from "react";

export function Pill({
  children,
  tone = "navy",
}: {
  children: ReactNode;
  tone?: "navy" | "teal" | "green" | "accent" | "muted";
}) {
  const tones: Record<string, string> = {
    navy: "bg-brand-navy text-white",
    teal: "bg-brand-teal text-white",
    green: "bg-brand-green text-white",
    accent: "bg-brand-accent text-white",
    muted: "bg-slate-100 text-slate-700 border border-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
