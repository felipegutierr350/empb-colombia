import { Container } from "@/components/ui/Container";
import { ShieldCheck, MapPin, Microscope } from "lucide-react";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-white pt-10 pb-20 sm:pt-14 sm:pb-28"
    >
      {/* sutil grid editorial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(ellipse_at_top,rgba(46,117,182,0.08),transparent_60%)]"
      />

      <Container>
        {/* Wordmark */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white font-display font-bold text-sm tracking-tight">
              VN
            </div>
            <div className="leading-tight">
              <div className="font-display text-sm font-bold text-brand-navy tracking-tight">
                VIRAL Network LATAM
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                Vigilancia · Investigación · Acción
              </div>
            </div>
          </div>
          <a
            href="#formulario"
            className="hidden sm:inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-navy hover:border-brand-teal hover:text-brand-teal transition"
          >
            Colaborar con el estudio →
          </a>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10 items-end">
          {/* Texto principal */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/5 px-3 py-1 text-xs font-semibold text-brand-teal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
              </span>
              Brote activo · Colombia 2025–2026
            </div>

            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.02] tracking-tight text-brand-navy text-balance">
              Boca-mano-pie en Colombia: <span className="text-brand-teal">qué está pasando</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 text-pretty">
              Información clínica y científica para médicos. Brote sin precedentes que requiere atención de la comunidad médica colombiana.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#epidemiologia"
                className="inline-flex items-center justify-center rounded-xl bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy-deep transition shadow-sm hover:shadow"
              >
                Conocer la situación
              </a>
              <a
                href="#formulario"
                className="inline-flex items-center justify-center rounded-xl border-2 border-brand-navy bg-transparent px-6 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition"
              >
                Notificar caso / Colaborar
              </a>
            </div>
          </div>

          {/* Stat bloque editorial */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-brand-surface p-8 shadow-card">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Estudio en curso
              </p>
              <div className="mt-3 flex items-baseline gap-4">
                <span className="font-display text-6xl sm:text-7xl font-extrabold tracking-tighter text-brand-navy leading-none">
                  n=170
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  casos pediátricos<br />proyectados
                </span>
              </div>
              <div className="mt-6 h-px bg-slate-200" />
              <div className="mt-6 flex items-baseline gap-4">
                <span className="font-display text-5xl font-bold tracking-tight text-brand-teal leading-none">
                  3
                </span>
                <span className="text-sm text-slate-500 font-medium">
                  sedes participantes<br />en Colombia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ribbon */}
        <div className="mt-16 sm:mt-20 grid gap-3 sm:grid-cols-3 rounded-2xl border border-slate-200 bg-white px-2 py-2">
          <RibbonItem icon={<Microscope className="h-4 w-4" />} label="Investigación activa" />
          <RibbonItem icon={<MapPin className="h-4 w-4" />} label="3 sedes participantes" />
          <RibbonItem icon={<ShieldCheck className="h-4 w-4" />} label="Aprobación ética vigente" />
        </div>
      </Container>
    </section>
  );
}

function RibbonItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700">
      <span className="text-brand-teal">{icon}</span>
      {label}
    </div>
  );
}
