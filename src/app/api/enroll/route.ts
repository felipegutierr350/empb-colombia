import { NextRequest, NextResponse } from "next/server";
import { enrollSchema } from "@/lib/enrollSchema";
import { getSupabaseServer } from "@/lib/supabaseServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo de petición inválido." },
      { status: 400 }
    );
  }

  const parsed = enrollSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Datos inválidos.",
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const supabase = getSupabaseServer();
  if (!supabase) {
    // Sin credenciales aún (modo desarrollo previo a Supabase): aceptar y registrar.
    console.warn("[/api/enroll] Supabase no configurado; registro recibido pero no persistido:", parsed.data);
    return NextResponse.json({ ok: true, persisted: false });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    null;

  const { error } = await supabase.from("medico_enrollments").insert({
    nombre: parsed.data.nombre,
    especialidad: parsed.data.especialidad,
    email: parsed.data.email,
    telefono: parsed.data.telefono,
    institucion: parsed.data.institucion,
    ciudad: parsed.data.ciudad,
    mensaje: parsed.data.mensaje || null,
    autorizacion_datos: parsed.data.autorizacion_datos,
    ip_origen: ip,
  });

  if (error) {
    console.error("[/api/enroll] Supabase insert error:", error);
    return NextResponse.json(
      { ok: false, error: "No fue posible guardar el registro. Intenta de nuevo." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, persisted: true });
}
