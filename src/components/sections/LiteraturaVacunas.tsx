import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PubMedTabs, type PubMedTab } from "@/components/ui/PubMedTabs";

const tabs: PubMedTab[] = [
  {
    label: "EV-A71 vacunas (China)",
    query: '"EV-A71 vaccine" AND (efficacy OR safety OR licensure)',
  },
  {
    label: "Vacunas multivalentes",
    query:
      '("hand foot mouth disease" OR enterovirus) AND vaccine AND (multivalent OR bivalent OR "phase II" OR "phase III")',
  },
  {
    label: "Inmunogenicidad y duración",
    query:
      '"EV-A71 vaccine" AND (immunogenicity OR "long-term" OR "follow-up" OR durability)',
  },
  {
    label: "Implementación y costo-efectividad",
    query:
      '"EV-A71 vaccine" AND ("cost-effectiveness" OR implementation OR strategy OR "developing countries")',
  },
];

export function LiteraturaVacunas() {
  return (
    <section
      id="literatura-vacunas"
      className="bg-brand-surface py-24 border-t border-slate-200"
    >
      <Container>
        <SectionHeading
          eyebrow="06.7 · Vacunas"
          title="Vacunas y prevención"
          description="Estado actual de las vacunas frente al enterovirus EV-A71 y otros enterovirus causantes de EMPB."
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
