import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Microscope, MapPin, Users } from "lucide-react";

const cards = [
  {
    icon: Microscope,
    label: "Diseño",
    title: "Observacional prospectivo",
    body: "Estudio descriptivo prospectivo multicéntrico. n = 170 casos pediátricos proyectados.",
  },
  {
    icon: MapPin,
    label: "Sedes",
    title: "3 centros participantes",
    body: "Clínica Santa María del Lago (Bogotá) · CEIP (Cali) · HOMI – Fundación Hospital Pediátrico la Misericordia (Bogotá).",
  },
  {
    icon: Users,
    label: "Equipo",
    title: "Investigadores",
    body: "Investigador Principal: Dr. Iván Felipe Gutiérrez Tobar. Co-Investigadora: Dra. Kelly Christina Márquez Herrera.",
  },
];

export function Estudio() {
  return (
    <section id="estudio" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="07 · Estudio en curso"
          title="Caracterización molecular, clínica y epidemiológica de la EMPB en pediatría — Colombia"
          description="Un esfuerzo multicéntrico para describir el brote, identificar serotipos circulantes y generar evidencia local sobre la EMPB en niños colombianos."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {cards.map(({ icon: Icon, label, title, body }) => (
            <article
              key={title}
              className="relative rounded-2xl border border-slate-200 bg-brand-surface p-7 shadow-card hover:shadow-card-hover transition"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">
                {label}
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-brand-navy tracking-tight">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{body}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-start gap-3 rounded-2xl border border-brand-green/30 bg-brand-green/5 p-5">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green text-white text-xs font-bold">
            ✓
          </span>
          <p className="text-sm leading-relaxed text-slate-700">
            <strong className="text-brand-navy">Aprobación ética vigente:</strong> el estudio se ejecuta conforme a la Resolución 8430 de 1993 del Ministerio de Salud de Colombia y se clasifica como <em>investigación con riesgo mínimo</em>.
          </p>
        </div>
      </Container>
    </section>
  );
}
