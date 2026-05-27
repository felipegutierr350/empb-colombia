"use client";

import { useCallback, useEffect, useState } from "react";

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  url: string;
  isoDate: string | null;
  description: string | null;
};

type ApiResponse = {
  items: NewsItem[];
  error: string | null;
  fetchedAt: string;
};

let cached: NewsItem[] | null = null;

export function useNews() {
  const [items, setItems] = useState<NewsItem[]>(() => cached ?? []);
  const [loading, setLoading] = useState<boolean>(() => cached === null);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const refetch = useCallback(() => {
    cached = null;
    setNonce((n) => n + 1);
  }, []);

  useEffect(() => {
    if (cached) {
      setItems(cached);
      setLoading(false);
      setError(null);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetch("/api/news", { signal: controller.signal })
      .then(async (res) => {
        const data = (await res.json()) as ApiResponse;
        if (!res.ok && data?.error) {
          setError(data.error);
          setItems([]);
          return;
        }
        if (data.error) {
          setError(data.error);
          setItems([]);
          return;
        }
        cached = data.items;
        setItems(data.items);
      })
      .catch((err) => {
        if ((err as Error)?.name === "AbortError") return;
        setError("No fue posible cargar las noticias en este momento.");
        setItems([]);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [nonce]);

  return { items, loading, error, refetch };
}
