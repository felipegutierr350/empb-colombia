import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AlertCircle, Activity, Baby, ShieldAlert } from "lucide-react";

const puntos = [
  {
    icon: AlertCircle,
    title: "Alta contagiosidad",
    body: "Transmisión por contacto directo, vía fecal-oral y secreciones respiratorias. Brotes frecuentes en jardines, colegios y entornos comunitarios.",
  },
  {
    icon: Baby,
    title: "Predominio pediátrico",
    body: "Afecta principalmente a menores de 5 años. Los adultos pueden infectarse, generalmente de forma asintomática o leve.",
  },
  {
    icon: Activity,
    title: "Autolimitada en la mayoría",
    body: "Evolución típica de 7 a 10 días con resolución espontánea. El manejo es sintomático: hidratación y control del dolor.",
  },
  {
    icon: ShieldAlert,
    title: "Riesgo según serotipo",
    body: "Determinados enterovirus (EV-A71) se asocian a complicaciones neurológicas, cardiopulmonares y mayor mortalidad pediátrica.",
  },
];

export function QueEs() {
  return (
    <section id="que-es" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="01 · Definición clínica"
          title="¿Qué es la enfermedad mano-pie-boca (EMPB)?"
          description={
            <>
              La <strong className="text-brand-navy">enfermedad mano-pie-boca (EMPB)</strong> es un exantema viral altamente contagioso que afecta predominantemente a la población pediátrica. Se caracteriza por fiebre, lesiones orales y un exantema vesicular en manos, pies y, ocasionalmente, otras zonas.
            </>
          }
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {puntos.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-card hover:shadow-card-hover hover:border-brand-teal/40 transition"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-brand-navy tracking-tight">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
