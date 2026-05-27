import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Globe2, MapPinned, Flag, ArrowUpRight } from "lucide-react";

const niveles = [
  {
    icon: Globe2,
    flag: "🌍",
    scope: "Mundial · OMS",
    title: "Brotes recurrentes",
    body: (
      <>
        Brotes recurrentes documentados en la región Asia-Pacífico, especialmente China, Vietnam y Japón. Mayor circulación de <strong className="text-brand-navy">EV-A71</strong> asociada a mortalidad pediátrica.
      </>
    ),
    href: "https://www.who.int/emergencies/disease-outbreak-news",
    sourceLabel: "WHO · Disease Outbreak News",
  },
  {
    icon: MapPinned,
    flag: "🌎",
    scope: "Américas · OPS/PAHO",
    title: "Incremento regional",
    body: (
      <>
        Notificaciones recientes de incremento de casos en la región latinoamericana. Distintos países han reportado actividad inusual de enterovirus en 2025.
      </>
    ),
    href: "https://www.paho.org/es",
    sourceLabel: "PAHO · Portal regional",
  },
  {
    icon: Flag,
    flag: "🇨🇴",
    scope: "Colombia · INS / SIVIGILA",
    title: "Aumento de casos pediátricos",
    body: (
      <>
        Incremento en el número de casos durante 2025–2026 respecto a años previos. Diagnóstico predominantemente clínico, <strong className="text-brand-navy">sin confirmación virológica rutinaria</strong>.
      </>
    ),
    href: "https://www.ins.gov.co",
    sourceLabel: "INS Colombia",
  },
];

export function Epidemiologia() {
  return (
    <section id="epidemiologia" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="05 · Situación epidemiológica"
          title="Tres niveles, una misma señal"
          description="La actividad de enterovirus se está documentando simultáneamente a nivel global, regional y nacional. La caracterización local es prioritaria."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {niveles.map(({ icon: Icon, flag, scope, title, body, href, sourceLabel }) => (
            <a
              key={scope}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-card hover:shadow-card-hover hover:border-brand-teal/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 transition"
            >
              <ArrowUpRight
                className="absolute right-5 top-5 h-4 w-4 text-slate-300 group-hover:text-brand-teal group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                aria-hidden
              />
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-3xl mr-5" aria-hidden>
                  {flag}
                </span>
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {scope}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold text-brand-navy tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 flex-1">
                {body}
              </p>
              <span className="mt-5 inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-wide text-brand-teal group-hover:underline">
                {sourceLabel}
                <ArrowUpRight className="h-3 w-3" aria-hidden />
              </span>
            </a>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-brand-navy/15 bg-brand-surface p-6 text-sm leading-relaxed text-slate-600">
          <strong className="text-brand-navy">¿Por qué importa caracterizar el brote local?</strong>{" "}
          Identificar el serotipo circulante permite anticipar formas graves, orientar la vigilancia y comunicar oportunamente a la comunidad médica y a la población general.
        </div>
      </Container>
    </section>
  );
}
