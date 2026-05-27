import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 86400;

type NewsItem = {
  id: string;
  title: string;
  source: string;
  url: string;
  isoDate: string | null;
  description: string | null;
};

type ResponseBody = {
  items: NewsItem[];
  error: string | null;
  fetchedAt: string;
};

const QUERY =
  '("manos pies boca" OR "mano pie boca" OR "boca mano pie" OR "enfermedad mano-pie-boca" OR coxsackie OR "enterovirus A71") colombia';
const RSS_URL = `https://news.google.com/rss/search?q=${encodeURIComponent(
  QUERY
)}&hl=es-CO&gl=CO&ceid=CO:es-419`;
const FETCH_TIMEOUT_MS = 9000;
const MAX_ITEMS = 8;

function decodeEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function pickField(block: string, tag: string): string | null {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decodeEntities(m[1]) : null;
}

function parseRss(xml: string): NewsItem[] {
  const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
  const out: NewsItem[] = [];
  for (const raw of itemBlocks) {
    const block = raw.replace(/^<item>|<\/item>$/g, "");

    const rawTitle = pickField(block, "title") || "";
    let source = pickField(block, "source") || "";
    let title = rawTitle.trim();
    // Google News tends to format: "Title - Source"
    if (!source && /\s-\s[^-]+$/.test(title)) {
      const idx = title.lastIndexOf(" - ");
      source = title.slice(idx + 3).trim();
      title = title.slice(0, idx).trim();
    }
    // If Source is present and embedded in title, strip the suffix
    if (source && title.endsWith(`- ${source}`)) {
      title = title.slice(0, -(source.length + 2)).trim();
    }

    const url = (pickField(block, "link") || "").trim();
    const pubDate = pickField(block, "pubDate");
    const description = pickField(block, "description");

    if (!title || !url) continue;

    let isoDate: string | null = null;
    if (pubDate) {
      const d = new Date(pubDate);
      if (!isNaN(d.getTime())) isoDate = d.toISOString();
    }

    const cleanDesc = description ? stripHtml(description).slice(0, 220) : null;
    const id = url.split("/").pop() || `${title.slice(0, 32)}-${pubDate || ""}`;

    out.push({
      id,
      title,
      source: source || "Fuente",
      url,
      isoDate,
      description: cleanDesc,
    });
    if (out.length >= MAX_ITEMS) break;
  }
  return out;
}

async function fetchWithTimeout(url: string, ms = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
      next: { revalidate: 86400 },
    });
  } finally {
    clearTimeout(timer);
  }
}

export async function GET() {
  try {
    const res = await fetchWithTimeout(RSS_URL);
    if (!res.ok) throw new Error(`RSS HTTP ${res.status}`);
    const xml = await res.text();
    const items = parseRss(xml);
    const body: ResponseBody = {
      items,
      error: null,
      fetchedAt: new Date().toISOString(),
    };
    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.name === "AbortError"
          ? "Tiempo de espera agotado consultando medios."
          : err.message
        : "Error desconocido";
    console.error("[/api/news] error:", message);
    const body: ResponseBody = {
      items: [],
      error: "No fue posible cargar las noticias en este momento.",
      fetchedAt: new Date().toISOString(),
    };
    return NextResponse.json(body, { status: 502 });
  }
}
