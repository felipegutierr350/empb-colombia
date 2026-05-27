import { ExternalLink } from "lucide-react";
import type { PubMedArticle } from "@/hooks/usePubMed";

export function PubMedArticleCard({ article }: { article: PubMedArticle }) {
  const hasMeta = Boolean(article.year || article.journal);

  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 hover:shadow-sm transition">
      {hasMeta && (
        <p className="font-mono text-xs uppercase tracking-wide text-brand-teal">
          {article.year ? <span>{article.year}</span> : null}
          {article.year && article.journal ? <span> · </span> : null}
          {article.journal ? <span>{article.journal}</span> : null}
        </p>
      )}

      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-brand-navy">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline focus:outline-none focus:underline"
        >
          {article.title}
        </a>
      </h3>

      <p className="mt-2 font-sans text-sm text-slate-600">{article.authors}</p>

      <div className="mt-auto pt-4 flex items-center gap-3 text-xs font-mono">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-brand-teal hover:underline"
        >
          PMID: {article.pmid}
          <ExternalLink className="h-3 w-3" aria-hidden />
        </a>
        {article.doi && (
          <>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <a
              href={`https://doi.org/${article.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-500 hover:text-brand-teal hover:underline"
              title={`DOI: ${article.doi}`}
            >
              DOI
              <ExternalLink className="h-3 w-3" aria-hidden />
            </a>
          </>
        )}
      </div>
    </article>
  );
}
