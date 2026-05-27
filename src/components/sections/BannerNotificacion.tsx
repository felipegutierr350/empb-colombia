import { Container } from "@/components/ui/Container";
import { BellRing, FileDown, ExternalLink, Clock, Zap } from "lucide-react";

const FICHA_900 =
  "https://www.ins.gov.co/buscador-eventos/Lineamientos/900_Evento_Sin_Establecer_2024.pdf";
const LINEAMIENTOS_BROTES =
  "https://www.ins.gov.co/buscador-eventos/Lineamientos/998_830_621_901_Y_Brotes_2024.pdf";
const PORTAL_FICHAS =
  "https://www.ins.gov.co/buscador-eventos/Paginas/Fichas-y-Protocolos.aspx";

export function BannerNotificacion() {
  return (
    <section
      id="notificacion"
      className="relative isolate overflow-hidden bg-brand-navy text-white"
    >
      {/* glow decorativo sutil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(0,176,166,0.18),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-white/10"
      />

      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Columna izquierda: mensaje principal */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/15 border border-amber-300/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">
              <BellRing className="h-3.5 w-3.5" />
              Notificación obligatoria · SIVIGILA
            </div>

            <h2 className="mt-6 font-display font-extrabold leading-[0.98] tracking-tighter text-white text-balance text-[clamp(2.25rem,6.5vw,5rem)]">
              Reporta cada caso al{" "}
              <span className="text-brand-accent">SIVIGILA</span>
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
              El síndrome mano-pie-boca se notifica como <strong className="text-white">Evento 900 — Evento sin establecer</strong>, de forma <strong className="text-white">semanal e individual</strong>. <span className="text-white/70">No solo los asociados a brotes — todos los casos.</span>
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 max-w-2xl">
              <FactItem
                icon={<Clock className="h-4 w-4" />}
                label="Oportunidad"
                value="Semanal"
              />
              <FactItem
                icon={<Zap className="h-4 w-4" />}
                label="Clasificación inicial"
                value="Confirmado por clínica"
              />
            </div>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/70 border-l-2 border-amber-300/60 pl-4">
              <strong className="text-white">¿Por qué importa?</strong> La notificación al SIVIGILA permite a la secretaría de salud detectar conglomerados, activar al equipo de respuesta a brotes y coordinar visitas a colegios y jardines para contención.
            </p>
          </div>

          {/* Columna derecha: códigos CIE-10 + CTAs */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm p-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
                Códigos diagnósticos · CIE-10
              </p>
              <ul className="mt-5 space-y-4">
                <li>
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-bold text-brand-accent tracking-tight">
                      B97.1
                    </span>
                    <span className="text-sm text-white/85 leading-snug">
                      Coxsackie (virus)
                    </span>
                  </div>
                </li>
                <li className="border-t border-white/10 pt-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-2xl font-bold text-brand-accent tracking-tight">
                      B08.4
                    </span>
                    <span className="text-sm text-white/85 leading-snug">
                      Estomatitis vesicular enteroviral con exantema
                    </span>
                  </div>
                </li>
              </ul>

              <div className="mt-7 flex flex-col gap-3">
                <a
                  href={FICHA_900}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-3 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-brand-navy hover:bg-brand-accent hover:text-white transition shadow-sm"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    Ficha Evento 900 · PDF
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                </a>
                <a
                  href={LINEAMIENTOS_BROTES}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-between gap-3 rounded-xl border border-white/20 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/40 transition"
                >
                  <span className="inline-flex items-center gap-2">
                    <FileDown className="h-4 w-4" />
                    Lineamientos · Brotes y eventos
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
                </a>
              </div>

              <a
                href={PORTAL_FICHAS}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-white/60 hover:text-brand-accent transition"
              >
                Portal INS · Fichas y protocolos
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FactItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
        <span className="text-amber-300">{icon}</span>
        {label}
      </p>
      <p className="mt-1 font-display text-lg font-bold text-white tracking-tight">
        {value}
      </p>
    </div>
  );
}
