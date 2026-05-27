"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useNews, type NewsItem } from "@/hooks/useNews";
import {
  Newspaper,
  AlertCircle,
  ArrowUpRight,
  Search,
  Radio,
} from "lucide-react";

export function NoticiasNacionales() {
  const { items, loading, error, refetch } = useNews();

  return (
    <section
      id="noticias-nacionales"
      className="relative isolate overflow-hidden bg-white py-24 border-y border-slate-200"
    >
      {/* halo sutil amber para diferenciar de PubMed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[260px] bg-[radial-gradient(ellipse_at_top,rgba(0,176,166,0.07),transparent_70%)]"
      />

      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <SectionHeading
            eyebrow="06.4 · En medios colombianos"
            title="Lo que dice la prensa nacional"
            description="Cobertura reciente del brote de boca-mano-pie en Colombia, agregada de medios verificados. Actualizada cada 24 horas."
          />
          <div className="hidden sm:inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-3 py-1.5 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              En vivo · Google News
            </span>
          </div>
        </div>

        <div className="mt-10">
          {loading && <SkeletonGrid />}
          {!loading && error && <ErrorState onRetry={refetch} />}
          {!loading && !error && items.length === 0 && <EmptyState />}
          {!loading && !error && items.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2">
              {items.map((it) => (
                <NewsCard key={it.id} item={it} />
              ))}
            </div>
          )}
        </div>

        <p className="mt-10 text-xs text-slate-500 leading-relaxed max-w-3xl">
          <Radio className="inline h-3 w-3 mr-1 text-brand-accent" aria-hidden />
          Las noticias se obtienen automáticamente de Google News (medios colombianos). El equipo investigador no controla el contenido editorial de las fuentes enlazadas. Para datos epidemiológicos oficiales consulta el INS / SIVIGILA.
        </p>
      </Container>
    </section>
  );
}

function NewsCard({ item }: { item: NewsItem }) {
  const date = item.isoDate ? new Date(item.isoDate) : null;
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-brand-accent/40 hover:shadow-card-hover transition"
    >
      <ArrowUpRight
        className="absolute right-5 top-5 h-4 w-4 text-slate-300 group-hover:text-brand-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
        aria-hidden
      />

      <div className="flex items-center gap-2 text-xs">
        <span className="inline-flex items-center gap-1 rounded-md bg-brand-navy/5 text-brand-navy px-2 py-1 font-mono uppercase tracking-wide text-[10px]">
          <Newspaper className="h-3 w-3" />
          {item.source}
        </span>
        {date && (
          <span className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
            {formatRelative(date)}
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-brand-navy group-hover:underline pr-6">
        {item.title}
      </h3>

      {item.description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
          {item.description}
        </p>
      )}

      <span className="mt-auto pt-4 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-brand-accent group-hover:underline">
        Leer en {item.source}
        <ArrowUpRight className="h-3 w-3" aria-hidden />
      </span>
    </a>
  );
}

function formatRelative(date: Date): string {
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days < 1) return "hoy";
  if (days < 2) return "ayer";
  if (days < 7) return `hace ${days} días`;
  if (days < 30) return `hace ${Math.floor(days / 7)} sem`;
  if (days < 365) return `hace ${Math.floor(days / 30)} meses`;
  return `hace ${Math.floor(days / 365)} años`;
}

function SkeletonGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2" aria-hidden>
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl bg-slate-100 h-44 border border-slate-100"
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
        No se encontraron noticias recientes en medios colombianos.
      </p>
    </div>
  );
}

function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="h-8 w-8 text-slate-400" aria-hidden />
      <p className="mt-3 font-sans text-sm text-slate-600">
        No fue posible cargar las noticias en este momento. Inténtalo en unos minutos.
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
