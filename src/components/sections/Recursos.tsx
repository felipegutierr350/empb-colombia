import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FileText, ClipboardList, BookOpen, Users } from "lucide-react";

const recursos = [
  {
    icon: FileText,
    title: "Ficha de notificación",
    body: "Formato sugerido para notificar casos sospechosos al estudio multicéntrico.",
    cta: "Descargar PDF",
    href: "/docs/ficha-notificacion.pdf",
  },
  {
    icon: ClipboardList,
    title: "Criterios diagnósticos",
    body: "Resumen operativo para reconocimiento clínico rápido en consulta o urgencias.",
    cta: "Ver criterios",
    href: "#clinica",
  },
  {
    icon: Users,
    title: "Material educativo para padres",
    body: "Recomendaciones de manejo en casa, signos de alarma y prevención de contagio.",
    cta: "Descargar PDF",
    href: "/docs/padres.pdf",
  },
  {
    icon: BookOpen,
    title: "Material educativo para médicos",
    body: "Revisión clínica resumida con bibliografía clave sobre EMPB y enterovirus.",
    cta: "Descargar PDF",
    href: "/docs/medicos.pdf",
  },
];

export function Recursos() {
  return (
    <section id="recursos" className="bg-brand-surface py-24">
      <Container>
        <SectionHeading
          eyebrow="06 · Recursos clínicos"
          title="Material para tu práctica"
          description="Documentos descargables para apoyar el reconocimiento, manejo y comunicación de la enfermedad mano-pie-boca."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {recursos.map(({ icon: Icon, title, body, cta, href }) => (
            <a
              key={title}
              href={href}
              className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-card hover:shadow-card-hover hover:border-brand-teal/40 transition"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold text-brand-navy tracking-tight">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal group-hover:gap-2 transition-all">
                  {cta} <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-8 text-xs text-slate-500 italic">
          Los archivos PDF se publicarán próximamente en este sitio. Para acceso inmediato, escribir a <a className="text-brand-teal underline" href="mailto:ifgutierrez@colsanitas.com">ifgutierrez@colsanitas.com</a>.
        </p>
      </Container>
    </section>
  );
}
