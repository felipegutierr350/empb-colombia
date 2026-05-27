import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-white">
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
