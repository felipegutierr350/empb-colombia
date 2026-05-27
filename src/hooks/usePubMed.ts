"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type PubMedArticle = {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: string | null;
  doi: string | null;
  url: string;
};

type ApiResponse = {
  articles: PubMedArticle[];
  error: string | null;
  query: string;
};

// In-memory cache shared across hook instances on the client.
const queryCache = new Map<string, PubMedArticle[]>();

export function usePubMed(query: string) {
  const [articles, setArticles] = useState<PubMedArticle[]>(
    () => queryCache.get(query) ?? []
  );
  const [loading, setLoading] = useState<boolean>(() => !queryCache.has(query));
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const refetch = useCallback(() => {
    queryCache.delete(query);
    setNonce((n) => n + 1);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    const cached = queryCache.get(query);
    if (cached) {
      setArticles(cached);
      setLoading(false);
      setError(null);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    fetch(`/api/pubmed?q=${encodeURIComponent(query)}`, {
      signal: controller.signal,
    })
      .then(async (res) => {
        const data = (await res.json()) as ApiResponse;
        if (!res.ok && data?.error) {
          setError(data.error);
          setArticles([]);
          return;
        }
        if (data.error) {
          setError(data.error);
          setArticles([]);
          return;
        }
        queryCache.set(query, data.articles);
        setArticles(data.articles);
      })
      .catch((err) => {
        if ((err as Error)?.name === "AbortError") return;
        setError("No fue posible cargar la literatura en este momento.");
        setArticles([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [query, nonce]);

  return { articles, loading, error, refetch };
}
