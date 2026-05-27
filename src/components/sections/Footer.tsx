import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Banda blanca de patrocinadores/aliados */}
      <div className="bg-white text-slate-700 border-b border-slate-200">
        <Container className="py-8 sm:py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
            <div className="leading-snug">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-slate-500">
                Con la participación y apoyo
              </p>
              <p className="mt-2 font-display text-sm sm:text-base font-bold text-brand-navy tracking-tight">
                Centros médicos y Clínica Infantil Colsubsidio
              </p>
            </div>
            <div className="relative w-full max-w-[420px] h-20 sm:h-24 sm:shrink-0">
              <Image
                src="/logos/colsubsidio.png"
                alt="Centros médicos y Clínica Infantil Colsubsidio · Grupo de investigación Colsubsidio Investiga"
                fill
                sizes="(min-width: 640px) 420px, 100vw"
                className="object-contain object-left sm:object-right"
                priority={false}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Pie legal navy */}
      <Container className="py-14">
        <p className="max-w-2xl text-sm leading-relaxed text-white/70">
          Esta página tiene fines informativos y de captación científica.{" "}
          <strong className="text-white/90">
            No reemplaza el juicio clínico del médico tratante.
          </strong>{" "}
          El tratamiento de datos personales se realiza conforme a la Ley 1581 de 2012 de la República de Colombia.
        </p>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <div>© 2026 — Todos los derechos reservados.</div>
          <div className="font-mono uppercase tracking-[0.18em]">
            Estudio EMPB · Colombia · 2025–2026
          </div>
        </div>
      </Container>
    </footer>
  );
}
