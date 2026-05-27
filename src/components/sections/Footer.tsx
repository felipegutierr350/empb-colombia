import { Container } from "@/components/ui/Container";
import { Mail } from "lucide-react";

const logos = [
  "VIRAL Network LATAM",
  "ACIN",
  "Unisanitas",
  "Clínica Santa María del Lago",
  "CEIP",
  "HOMI",
];

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-brand-navy font-display font-bold text-sm tracking-tight">
                VN
              </div>
              <div className="leading-tight">
                <div className="font-display text-base font-bold tracking-tight">
                  VIRAL Network LATAM
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
                  Vigilancia · Investigación · Acción
                </div>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80">
              Red de profesionales dedicados a la vigilancia de patógenos emergentes y reemergentes en Latinoamérica, con foco en pediatría.
            </p>

            <a
              href="mailto:ifgutierrez@colsanitas.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-accent transition"
            >
              <Mail className="h-4 w-4" />
              ifgutierrez@colsanitas.com
            </a>
          </div>

          <div className="lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">
              Instituciones participantes
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {logos.map((l) => (
                <div
                  key={l}
                  className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90"
                >
                  {l}
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-xl text-xs leading-relaxed text-white/60">
              Esta página tiene fines informativos y de captación científica. <strong className="text-white/80">No reemplaza el juicio clínico del médico tratante.</strong> El tratamiento de datos personales se realiza conforme a la Ley 1581 de 2012 de la República de Colombia.
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 VIRAL Network LATAM — Todos los derechos reservados.</div>
          <div className="font-mono uppercase tracking-[0.18em]">
            Estudio EMPB · Colombia · 2025–2026
          </div>
        </div>
      </Container>
    </footer>
  );
}
