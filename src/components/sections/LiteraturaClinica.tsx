import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PubMedTabs, type PubMedTab } from "@/components/ui/PubMedTabs";

const tabs: PubMedTab[] = [
  {
    label: "General / Revisiones",
    query: '"hand foot mouth disease"[Title] AND review[ptyp]',
  },
  {
    label: "Epidemiología y brotes",
    query: '"hand foot mouth disease" AND (outbreak OR epidemiology)',
  },
  {
    label: "EV-A71 y complicaciones",
    query: '("EV-A71" OR "Enterovirus A71") AND (neurologic* OR complication*)',
  },
  {
    label: "América Latina",
    query:
      '"hand foot mouth disease" AND ("Latin America" OR Colombia OR Brazil OR Mexico OR Argentina)',
  },
];

export function LiteraturaClinica() {
  return (
    <section id="literatura-clinica" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="06.5 · Literatura"
          title="Literatura clínica reciente"
          description="Artículos científicos seleccionados de PubMed sobre la enfermedad mano-pie-boca, actualizados diariamente."
        />
        <span className="font-mono text-xs text-slate-400 mt-4 block">
          Fuente: PubMed / NCBI · Actualizado cada 24 horas
        </span>

        <div className="mt-10">
          <PubMedTabs tabs={tabs} />
        </div>
      </Container>
    </section>
  );
}
