import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";

const virus = [
  {
    code: "CV-A16",
    name: "Coxsackie A16",
    tag: "Forma clásica",
    tone: "teal" as const,
    body: "Cuadros leves y autolimitados. Históricamente el más frecuente como causa de EMPB típica.",
  },
  {
    code: "EV-A71",
    name: "Enterovirus A71",
    tag: "Mayor virulencia",
    tone: "navy" as const,
    body: "Epidemias extensas y mayor riesgo de complicaciones neurológicas graves: meningitis, encefalitis, parálisis flácida aguda y edema pulmonar.",
  },
  {
    code: "CV-A6",
    name: "Coxsackie A6",
    tag: "Atípica extensa",
    tone: "accent" as const,
    body: "Asociado a presentaciones atípicas con lesiones más extensas, fiebre alta, eccema coxsackium y onicomadesis post-infecciosa.",
  },
  {
    code: "CV-A10",
    name: "Coxsackie A10",
    tag: "Brotes recientes",
    tone: "green" as const,
    body: "Frecuentemente identificado en brotes recientes. Se asocia a herpangina y exantemas con presentaciones variables.",
  },
];

export function Etiologia() {
  return (
    <section id="etiologia" className="bg-brand-surface py-24">
      <Container>
        <SectionHeading
          eyebrow="02 · Etiología"
          title="Los 4 enterovirus principales"
          description={
            <>
              Causada por enterovirus del género <em>Enterovirus</em>, principalmente del grupo <em>Enterovirus A</em>. La identificación del serotipo circulante es clave para anticipar gravedad y patrones de brote.
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {virus.map((v) => (
            <article
              key={v.code}
              className="relative rounded-2xl border border-slate-200 bg-white p-7 shadow-card hover:shadow-card-hover transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">
                    Serotipo
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-brand-navy tracking-tight">
                    {v.name}
                  </h3>
                  <p className="mt-1 font-mono text-sm font-semibold text-brand-teal">
                    {v.code}
                  </p>
                </div>
                <Pill tone={v.tone}>{v.tag}</Pill>
              </div>
              <p className="mt-5 text-base leading-relaxed text-slate-600">{v.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-slate-500">
          <strong className="text-slate-700">Nota:</strong> la circulación viral es dinámica. En el contexto del actual brote en Colombia, la caracterización molecular sistemática es uno de los objetivos del estudio en curso.
        </p>
      </Container>
    </section>
  );
}
