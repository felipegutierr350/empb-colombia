import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const dx = [
  {
    name: "Varicela",
    body: "Distribución centrípeta (tronco-cara), lesiones pruriginosas en distintos estadios simultáneamente (mácula, pápula, vesícula, costra).",
  },
  {
    name: "Herpes simple",
    body: "Vesículas agrupadas peri-orales o genitales; gingivoestomatitis herpética con lesiones extensas y dolor intenso.",
  },
  {
    name: "Eritema multiforme",
    body: "Lesiones en diana, suele asociarse a fármacos o infección por HSV. Distribución distinta y curso clínico diferente.",
  },
  {
    name: "Otros exantemas virales",
    body: "Roséola, escarlatina, sarampión, infección por parvovirus B19. Diferenciar por morfología, distribución y síntomas prodrómicos.",
  },
];

export function Diferenciales() {
  return (
    <section id="diferenciales" className="bg-brand-surface py-24">
      <Container>
        <SectionHeading
          eyebrow="04 · Diagnóstico diferencial"
          title="Qué descartar"
          description="Cuadros frecuentes a considerar en el diagnóstico diferencial de la EMPB en el paciente pediátrico."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {dx.map((d) => (
            <div
              key={d.name}
              className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-card hover:shadow-card-hover transition"
            >
              <span className="font-display text-2xl font-bold text-brand-teal leading-none w-12 shrink-0">
                ⟶
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-brand-navy tracking-tight">
                  {d.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{d.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
