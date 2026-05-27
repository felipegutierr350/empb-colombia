"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FileText, ClipboardList, BookOpen, Users, X, Download } from "lucide-react";

type RecursoKind = "link" | "anchor" | "modal-padres" | "modal-medicos";

type Recurso = {
  icon: typeof FileText;
  title: string;
  body: string;
  cta: string;
  kind: RecursoKind;
  href?: string;
};

const recursos: Recurso[] = [
  {
    icon: FileText,
    title: "Ficha de notificación",
    body: "Formato sugerido para notificar casos sospechosos al estudio multicéntrico.",
    cta: "Descargar PDF",
    kind: "link",
    href: "/docs/ficha-notificacion.pdf",
  },
  {
    icon: ClipboardList,
    title: "Criterios diagnósticos",
    body: "Resumen operativo para reconocimiento clínico rápido en consulta o urgencias.",
    cta: "Ver criterios",
    kind: "anchor",
    href: "#clinica",
  },
  {
    icon: Users,
    title: "Material educativo para padres",
    body: "Recomendaciones de manejo en casa, signos de alarma y prevención de contagio.",
    cta: "Ver infografía",
    kind: "modal-padres",
  },
  {
    icon: BookOpen,
    title: "Material educativo para médicos",
    body: "Guía clínica rápida: etiología, complicaciones EV-A71, criterios de hospitalización y notificación SIVIGILA.",
    cta: "Ver infografía",
    kind: "modal-medicos",
  },
];

export function Recursos() {
  const [modal, setModal] = useState<null | "padres" | "medicos">(null);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [modal]);

  return (
    <section id="recursos" className="bg-brand-surface py-24">
      <Container>
        <SectionHeading
          eyebrow="06 · Recursos clínicos"
          title="Material para tu práctica"
          description="Documentos descargables para apoyar el reconocimiento, manejo y comunicación de la enfermedad mano-pie-boca."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {recursos.map((r) => (
            <RecursoCard key={r.title} recurso={r} onOpenModal={setModal} />
          ))}
        </div>

        <p className="mt-8 text-xs text-slate-500 italic">
          Los archivos PDF se publicarán próximamente en este sitio. Para acceso inmediato, escribir a{" "}
          <a className="text-brand-teal underline" href="mailto:ifgutierrez@colsanitas.com">
            ifgutierrez@colsanitas.com
          </a>
          .
        </p>
      </Container>

      {modal === "padres" && (
        <Modal onClose={() => setModal(null)} title="Material educativo para padres">
          <div className="relative w-full">
            <Image
              src="/educativo/padres.png"
              alt="Infografía educativa para padres y cuidadores sobre la enfermedad mano-pie-boca, con secciones de definición, síntomas, signos de alarma y cuidados en casa."
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 900px, 100vw"
              className="h-auto w-full rounded-lg"
              priority
            />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500 italic">
              Material educativo del estudio EMPB Colombia. Fuentes: CDC, AAP, KidsHealth/Nemours, Mayo Clinic, AEPED.
            </p>
            <a
              href="/educativo/padres.png"
              download="EMPB-Colombia-material-padres.png"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-deep transition self-start sm:self-auto"
            >
              <Download className="h-4 w-4" />
              Descargar imagen
            </a>
          </div>
        </Modal>
      )}

      {modal === "medicos" && (
        <Modal onClose={() => setModal(null)} title="Material educativo para médicos">
          <div className="relative w-full">
            <Image
              src="/educativo/medicos.png"
              alt="Infografía técnica para profesionales de la salud sobre la enfermedad mano-pie-boca: etiología y serotipos, presentación clínica, diagnóstico, complicaciones EV-A71, manejo ambulatorio, criterios de hospitalización, notificación SIVIGILA y epidemiología Colombia 2019–2026."
              width={1600}
              height={1000}
              sizes="(min-width: 1024px) 900px, 100vw"
              className="h-auto w-full rounded-lg"
              priority
            />
          </div>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500 italic max-w-2xl">
              Material educativo del estudio EMPB Colombia. Fuentes: CDC, AAP Red Book, OPS/PAHO Alerta Epidemiológica EMPB 26-mar-2025, INS Colombia RENS 2022;4(4):4-19, Mandell.
            </p>
            <a
              href="/educativo/medicos.png"
              download="EMPB-Colombia-material-medicos.png"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy-deep transition self-start sm:self-auto"
            >
              <Download className="h-4 w-4" />
              Descargar imagen
            </a>
          </div>
        </Modal>
      )}
    </section>
  );
}

function RecursoCard({
  recurso,
  onOpenModal,
}: {
  recurso: Recurso;
  onOpenModal: (k: "padres" | "medicos") => void;
}) {
  const { icon: Icon, title, body, cta, kind, href } = recurso;
  const isModal = kind === "modal-padres" || kind === "modal-medicos";

  const inner = (
    <>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-bold text-brand-navy tracking-tight">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{body}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-teal group-hover:gap-2 transition-all">
          {cta} <span aria-hidden>→</span>
        </span>
      </div>
    </>
  );

  if (isModal) {
    return (
      <button
        type="button"
        onClick={() =>
          onOpenModal(kind === "modal-padres" ? "padres" : "medicos")
        }
        className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-card hover:shadow-card-hover hover:border-brand-teal/40 transition text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
      >
        {inner}
      </button>
    );
  }

  return (
    <a
      href={href}
      className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-card hover:shadow-card-hover hover:border-brand-teal/40 transition"
    >
      {inner}
    </a>
  );
}

function Modal({
  onClose,
  title,
  children,
}: {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Vista previa
            </p>
            <h2 className="font-display text-lg font-bold text-brand-navy tracking-tight">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:bg-brand-navy hover:text-white hover:border-brand-navy transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
