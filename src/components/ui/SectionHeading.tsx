import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  centered?: boolean;
}) {
  return (
    <div
      className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand-teal mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-brand-navy text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-slate-600 text-pretty">
          {description}
        </p>
      )}
    </div>
  );
}
