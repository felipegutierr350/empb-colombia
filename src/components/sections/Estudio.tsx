import { Container } from "@/components/ui/Container";
import { ArrowRight, ShieldCheck, Microscope, MapPin } from "lucide-react";

export function Estudio() {
  return (
    <section
      id="estudio"
      className="relative isolate overflow-hidden bg-brand-navy text-white"
    >
      {/* glows decorativos */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(0,176,166,0.22),transparent_60%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(46,117,182,0.30),transparent_60%)] blur-2xl"
      />
      {/* grid pattern */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      <Container className="py-28 sm:py-36">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-accent" />
          </span>
          07 · Estudio multicéntrico activo
        </div>

        {/* Título masivo */}
        <h2 className="mt-8 font-display font-extrabold leading-[0.92] tracking-[-0.035em] text-white text-balance text-[clamp(2.75rem,9.5vw,8.5rem)]">
          ¿Estás frente a un caso{" "}
          <span className="text-brand-accent">de boca-mano-pie?</span>
        </h2>

        {/* Subtítulo de impacto */}
        <p className="mt-10 max-w-3xl text-xl sm:text-2xl leading-snug text-white/85 text-pretty">
          En Colombia <strong className="text-white">estamos trabajando en comprender mejor esta enfermedad</strong>. Tu caso suma a la primera caracterización molecular, clínica y epidemiológica del brote.
        </p>

        {/* Stats gigantes */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <StatBlock
            label="Tamaño muestral"
            big="n=170"
            sub="casos pediátricos proyectados"
            tone="white"
          />
          <StatBlock
            label="Cobertura nacional"
            big="3"
            sub="sedes participantes · Cali y Bogotá"
            tone="accent"
          />
        </div>

        {/* CTA gigante */}
        <div className="mt-16 flex flex-col items-start gap-6">
          <a
            href="#formulario"
            className="group inline-flex items-center gap-4 rounded-2xl bg-white px-8 py-5 text-base sm:text-lg font-bold text-brand-navy hover:bg-brand-accent hover:text-white transition shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200"
          >
            Notificar caso / Colaborar
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-sm text-white/60 max-w-xl">
            Comparte tus datos: el equipo investigador te contactará para coordinar la notificación del caso y tu participación en el estudio.
          </p>
        </div>

        {/* Línea inferior con design + ética */}
        <div className="mt-24 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
          <DesignBadge
            icon={<Microscope className="h-4 w-4" />}
            label="Diseño"
            value="Observacional prospectivo multicéntrico"
          />
          <DesignBadge
            icon={<MapPin className="h-4 w-4" />}
            label="Sedes"
            value="Cali y Bogotá"
          />
          <DesignBadge
            icon={<ShieldCheck className="h-4 w-4" />}
            label="Aprobación ética"
            value="Resolución 8430/1993 · riesgo mínimo"
          />
        </div>
      </Container>
    </section>
  );
}

function StatBlock({
  label,
  big,
  sub,
  tone,
}: {
  label: string;
  big: string;
  sub: string;
  tone: "white" | "accent";
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-10">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
        {label}
      </p>
      <p
        className={[
          "mt-3 font-display font-extrabold tracking-[-0.045em] leading-none",
          "text-[clamp(4rem,12vw,8.5rem)]",
          tone === "accent" ? "text-brand-accent" : "text-white",
        ].join(" ")}
      >
        {big}
      </p>
      <p className="mt-4 text-sm text-white/70 leading-snug max-w-xs">{sub}</p>
    </div>
  );
}

function DesignBadge({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-brand-accent border border-white/10">
        {icon}
      </span>
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-white/90 leading-snug">
          {value}
        </p>
      </div>
    </div>
  );
}
