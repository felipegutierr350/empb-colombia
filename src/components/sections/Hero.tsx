import { Container } from "@/components/ui/Container";

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
        {/* Top nav minimal */}
        <div className="flex items-center justify-end">
          <a
            href="#formulario"
            className="hidden sm:inline-flex items-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-brand-navy hover:border-brand-teal hover:text-brand-teal transition"
          >
            Colaborar con el estudio →
          </a>
        </div>

        <div className="mt-8 sm:mt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/5 px-3 py-1 text-xs font-semibold text-brand-teal">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-teal opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
            </span>
            Brote activo · Colombia 2025–2026
          </div>

          <h1 className="mt-6 font-display font-extrabold leading-[0.98] tracking-tighter text-brand-navy text-balance text-[clamp(2.75rem,9vw,8.5rem)]">
            Boca-mano-pie en Colombia:{" "}
            <span className="text-brand-teal">qué está pasando</span>
          </h1>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
            <p className="lg:col-span-7 text-lg sm:text-xl leading-relaxed text-slate-600 text-pretty">
              Información clínica y científica para médicos. Aumento de casos en Colombia que requiere atención de la comunidad médica y notificación oportuna al SIVIGILA.
            </p>

            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
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
        </div>

      </Container>
    </section>
  );
}
