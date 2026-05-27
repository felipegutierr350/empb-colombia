"use client";

import { useId, useState } from "react";
import { AlertCircle, Search } from "lucide-react";
import { usePubMed } from "@/hooks/usePubMed";
import { PubMedArticleCard } from "./PubMedArticleCard";

export type PubMedTab = {
  label: string;
  query: string;
};

export function PubMedTabs({ tabs }: { tabs: PubMedTab[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const activeQuery = tabs[active]?.query ?? "";
  const { articles, loading, error, refetch } = usePubMed(activeQuery);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Categorías de literatura"
        className="flex gap-1 overflow-x-auto border-b border-slate-200 mb-8 -mx-2 px-2"
      >
        {tabs.map((tab, i) => {
          const isActive = i === active;
          return (
            <button
              key={tab.label}
              role="tab"
              type="button"
              id={`${id}-tab-${i}`}
              aria-selected={isActive}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(i)}
              className={[
                "whitespace-nowrap px-4 py-3 text-sm border-b-2 transition-all duration-200 -mb-px",
                isActive
                  ? "text-brand-navy border-brand-navy font-semibold"
                  : "text-slate-500 border-transparent hover:text-slate-800",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-${active}`}
        aria-labelledby={`${id}-tab-${active}`}
      >
        {loading && <SkeletonGrid />}
        {!loading && error && <ErrorState onRetry={refetch} />}
        {!loading && !error && articles.length === 0 && <EmptyState />}
        {!loading && !error && articles.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4">
            {articles.map((a) => (
              <PubMedArticleCard key={a.pmid} article={a} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SkeletonGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-4" aria-hidden>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl bg-slate-100 h-32 border border-slate-100"
        />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Search className="h-8 w-8 text-slate-300" aria-hidden />
      <p className="mt-3 font-sans text-sm text-slate-500 italic">
        No se encontraron artículos recientes en esta categoría.
      </p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="h-8 w-8 text-slate-400" aria-hidden />
      <p className="mt-3 font-sans text-sm text-slate-600">
        No fue posible cargar la literatura en este momento. Inténtalo en unos minutos.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white hover:bg-brand-navy-deep transition"
      >
        Reintentar
      </button>
    </div>
  );
}
