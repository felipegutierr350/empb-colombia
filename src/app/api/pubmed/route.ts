import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 86400;

type Article = {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: string | null;
  doi: string | null;
  url: string;
};

type ResponseBody = {
  articles: Article[];
  error: string | null;
  query: string;
};

const NCBI_BASE = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const FETCH_TIMEOUT_MS = 8000;
const MAX_ARTICLES = 8;

function ncbiParams(extra: Record<string, string>): string {
  const tool = process.env.NCBI_TOOL || "empb-colombia";
  const email = process.env.NCBI_EMAIL || "ifgutierrez@colsanitas.com";
  const apiKey = process.env.NCBI_API_KEY?.trim();
  const params = new URLSearchParams({
    tool,
    email,
    ...extra,
  });
  if (apiKey) params.set("api_key", apiKey);
  return params.toString();
}

async function fetchWithTimeout(url: string, ms = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 86400 },
      headers: { Accept: "application/json" },
    });
  } finally {
    clearTimeout(timer);
  }
}

function formatAuthors(
  authors: Array<{ name?: string; authtype?: string }> | undefined
): string {
  if (!authors || authors.length === 0) return "";
  const named = authors.filter((a) => a.name && a.name.trim().length > 0);
  if (named.length === 0) return "";
  const first = named[0].name!.trim();
  return named.length === 1 ? first : `${first} et al.`;
}

function extractYear(pubdate?: string, epubdate?: string): string | null {
  const candidate = pubdate || epubdate || "";
  const m = candidate.match(/(\d{4})/);
  return m ? m[1] : null;
}

function truncate(s: string, max = 40): string {
  if (!s) return s;
  return s.length > max ? `${s.slice(0, max - 1).trimEnd()}…` : s;
}

function extractDoi(
  articleids: Array<{ idtype?: string; value?: string }> | undefined
): string | null {
  if (!articleids) return null;
  const hit = articleids.find((x) => x.idtype === "doi" && x.value);
  return hit?.value ?? null;
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") || "").trim();

  if (!q) {
    const body: ResponseBody = {
      articles: [],
      error: "Parámetro 'q' vacío.",
      query: q,
    };
    return NextResponse.json(body, { status: 400 });
  }

  const queryEcho = q;

  try {
    const esearchUrl = `${NCBI_BASE}/esearch.fcgi?${ncbiParams({
      db: "pubmed",
      term: q,
      retmax: String(MAX_ARTICLES),
      sort: "date",
      retmode: "json",
    })}`;

    const esearchRes = await fetchWithTimeout(esearchUrl);
    if (!esearchRes.ok) {
      throw new Error(`esearch HTTP ${esearchRes.status}`);
    }
    const esearchJson = (await esearchRes.json()) as {
      esearchresult?: { idlist?: string[] };
    };
    const ids = esearchJson?.esearchresult?.idlist ?? [];

    if (ids.length === 0) {
      const body: ResponseBody = { articles: [], error: null, query: queryEcho };
      return NextResponse.json(body, {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
      });
    }

    const esummaryUrl = `${NCBI_BASE}/esummary.fcgi?${ncbiParams({
      db: "pubmed",
      id: ids.join(","),
      retmode: "json",
    })}`;

    const esummaryRes = await fetchWithTimeout(esummaryUrl);
    if (!esummaryRes.ok) {
      throw new Error(`esummary HTTP ${esummaryRes.status}`);
    }
    const esummaryJson = (await esummaryRes.json()) as {
      result?: Record<string, unknown>;
    };
    const result = esummaryJson?.result;
    if (!result || typeof result !== "object") {
      throw new Error("esummary: respuesta inválida");
    }

    const uids = (result["uids"] as string[] | undefined) ?? ids;

    const articles: Article[] = [];
    for (const uid of uids) {
      const item = result[uid] as
        | {
            title?: string;
            authors?: Array<{ name?: string; authtype?: string }>;
            fulljournalname?: string;
            source?: string;
            pubdate?: string;
            epubdate?: string;
            articleids?: Array<{ idtype?: string; value?: string }>;
          }
        | undefined;
      if (!item) continue;

      const title = (item.title || "").trim();
      const authors = formatAuthors(item.authors);
      // Filter: skip items with no title or no authors per spec
      if (!title || !authors) continue;

      const journalRaw = item.fulljournalname || item.source || "";
      const journal = truncate(journalRaw, 40);
      const year = extractYear(item.pubdate, item.epubdate);
      const doi = extractDoi(item.articleids);

      articles.push({
        pmid: uid,
        title,
        authors,
        journal,
        year,
        doi,
        url: `https://pubmed.ncbi.nlm.nih.gov/${uid}/`,
      });
    }

    const body: ResponseBody = { articles, error: null, query: queryEcho };
    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.name === "AbortError"
          ? "Tiempo de espera agotado consultando PubMed."
          : err.message
        : "Error desconocido";
    console.error("[/api/pubmed] error:", message);
    const body: ResponseBody = {
      articles: [],
      error: "No fue posible cargar la literatura en este momento.",
      query: queryEcho,
    };
    return NextResponse.json(body, { status: 502 });
  }
}
