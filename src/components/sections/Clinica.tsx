import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stethoscope, Microscope } from "lucide-react";

const fotos = [
  {
    src: "/clinical/boca.png",
    alt: "Niño con lesiones periorales y vesículas en mucosa oral, característico de la enfermedad mano-pie-boca",
    location: "Boca y cara",
    detail: "Lesiones peribucales · estomatitis vesicular",
  },
  {
    src: "/clinical/manos.png",
    alt: "Palmas y dedos de un niño con vesículas eritematosas características de la enfermedad mano-pie-boca",
    location: "Manos",
    detail: "Vesículas en palmas, dedos y dorso",
  },
  {
    src: "/clinical/pies.png",
    alt: "Plantas de los pies de un niño con vesículas eritematosas características de la enfermedad mano-pie-boca",
    location: "Pies",
    detail: "Vesículas plantares y en dorso",
  },
];

const criterios = [
  "Fiebre aguda (generalmente < 39 °C) de inicio brusco.",
  "Exantema vesicular en manos y/o pies (palmas, plantas, dorso).",
  "Lesiones orales: úlceras o vesículas en mucosa, paladar, lengua.",
  "Curso 7–10 días con resolución espontánea en mayoría de casos.",
  "Considerar serotipo de mayor virulencia si hay síntomas neurológicos.",
];

export function Clinica() {
  return (
    <section id="clinica" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="03 · Presentación clínica"
          title="Cómo se presenta"
          description={
            <>
              El caso típico inicia con <strong className="text-brand-navy">fiebre aguda</strong> seguida en 1–2 días por exantema en manos, pies y/o lesiones orales (estomatitis). La evolución suele ser favorable en 7 a 10 días con tratamiento sintomático.
            </>
          }
        />

        {/* Galería clínica — full width grid */}
        <div className="mt-14">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 mb-5">
            Galería clínica
          </p>
          <div className="grid gap-5 sm:grid-cols-3">
            {fotos.map((f) => (
              <figure
                key={f.location}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card hover:shadow-card-hover transition"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
                  <Image
                    src={f.src}
                    alt={f.alt}
                    fill
                    sizes="(min-width: 1024px) 360px, (min-width: 640px) 33vw, 100vw"
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <figcaption className="px-5 py-4 border-t border-slate-100">
                  <p className="font-display text-sm font-bold text-brand-navy tracking-tight">
                    {f.location}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {f.detail}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Criterios + nota RT-PCR */}
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-2xl border border-brand-navy/15 bg-brand-surface p-7">
            <div className="flex items-center gap-2 text-brand-navy">
              <Stethoscope className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold tracking-tight">
                Criterios clínicos sugeridos
              </h3>
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {criterios.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 text-sm leading-relaxed text-slate-700"
                >
                  <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-7">
            <div className="flex items-center gap-2 text-brand-teal">
              <Microscope className="h-5 w-5" />
              <h3 className="font-display text-lg font-bold tracking-tight text-brand-navy">
                Confirmación virológica
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              El diagnóstico es <strong className="text-brand-navy">predominantemente clínico</strong>. Cuando se requiere confirmación, se realiza por <strong className="text-brand-navy">RT-PCR</strong> de muestras de:
            </p>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              <li className="flex gap-2">
                <span className="text-brand-teal">·</span> Hisopado faríngeo
              </li>
              <li className="flex gap-2">
                <span className="text-brand-teal">·</span> Líquido vesicular
              </li>
              <li className="flex gap-2">
                <span className="text-brand-teal">·</span> Materia fecal
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
