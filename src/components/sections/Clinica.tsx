import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageIcon, Stethoscope } from "lucide-react";

const fotos = [
  { label: "Foto clínica 1", caption: "Lesiones vesiculares en manos" },
  { label: "Foto clínica 2", caption: "Lesiones orales / estomatitis" },
  { label: "Foto clínica 3", caption: "Lesiones en pies" },
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

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* Galería */}
          <div className="lg:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 mb-4">
              Galería clínica
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {fotos.map((f) => (
                <figure
                  key={f.label}
                  className="rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 flex flex-col items-center justify-center text-center min-h-[200px]"
                >
                  <ImageIcon className="h-8 w-8 text-slate-400" />
                  <figcaption className="mt-3 text-xs font-semibold text-slate-500">
                    [{f.label}]
                  </figcaption>
                  <p className="mt-1 text-xs text-slate-500 leading-snug">
                    {f.caption}
                  </p>
                </figure>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 italic">
              Las imágenes clínicas se incorporarán al sitio próximamente, con consentimiento documentado.
            </p>
          </div>

          {/* Criterios */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-brand-navy/20 bg-brand-surface p-7">
              <div className="flex items-center gap-2 text-brand-navy">
                <Stethoscope className="h-5 w-5" />
                <h3 className="font-display text-lg font-bold tracking-tight">
                  Criterios clínicos sugeridos
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {criterios.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-slate-700">
                    <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-brand-teal" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-slate-500 italic leading-relaxed">
                El diagnóstico es predominantemente clínico. La confirmación virológica se realiza por RT-PCR de muestras de hisopado faríngeo, vesicular o materia fecal.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
