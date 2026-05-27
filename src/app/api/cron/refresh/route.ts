import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Triggered daily by Vercel Cron (see vercel.json).
// Forces regeneration of cached news + PubMed data so the homepage
// shows fresh content every morning even without organic traffic.
export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  if (expected) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${expected}`) {
      return NextResponse.json(
        { ok: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  }

  // Revalidate the home page (which embeds news + pubmed widgets)
  revalidatePath("/", "page");
  // Revalidate API routes so their cached payloads are dropped
  revalidatePath("/api/news");
  revalidatePath("/api/pubmed");

  return NextResponse.json({
    ok: true,
    revalidated: ["/", "/api/news", "/api/pubmed"],
    at: new Date().toISOString(),
  });
}
