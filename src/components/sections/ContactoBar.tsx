import { Container } from "@/components/ui/Container";
import { MapPin, MessageCircle, ArrowUpRight } from "lucide-react";

const DIRECCION = "Cra. 8h #164b-19, Bogotá";
const LUGAR = "Policlínico Social del Norte";
const TELEFONO_DISPLAY = "310 248 7709";
const TELEFONO_INTL = "573102487709";
const WHATSAPP_MSG = encodeURIComponent(
  "Hola, tengo un caso de boca-mano-pie y quisiera más información sobre el estudio."
);
const WHATSAPP_URL = `https://wa.me/${TELEFONO_INTL}?text=${WHATSAPP_MSG}`;

export function ContactoBar() {
  return (
    <section
      id="contacto-directo"
      aria-label="Contacto directo del estudio"
      className="bg-brand-navy-deep text-white border-t border-white/10"
    >
      <Container className="py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 items-center">
          {/* Lugar (no clickable, info estática) */}
          <div className="lg:col-span-4 flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60">
              <MapPin className="h-4 w-4" />
            </span>
            <div className="leading-snug">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                Centro de referencia
              </p>
              <p className="mt-1 font-display text-base font-bold text-white">
                {LUGAR}
              </p>
              <p className="mt-0.5 text-sm text-white/70">{DIRECCION}</p>
            </div>
          </div>

          {/* WhatsApp gigante */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Escribir por WhatsApp al ${TELEFONO_DISPLAY}`}
            className="group lg:col-span-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-2xl bg-white text-brand-navy px-6 sm:px-8 py-6 sm:py-7 hover:bg-brand-accent hover:text-white transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-0.5 duration-200"
          >
            <div className="flex items-center gap-5">
              <span className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-white group-hover:bg-white group-hover:text-brand-accent transition-colors">
                <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
              </span>
              <div className="leading-tight">
                <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-brand-navy/60 group-hover:text-white/80 transition-colors">
                  Escríbenos · WhatsApp
                </p>
                <p className="mt-1 font-display font-extrabold tracking-tight tabular-nums text-[clamp(1.75rem,4vw,2.75rem)] leading-none">
                  {TELEFONO_DISPLAY}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="hidden sm:inline-block text-sm font-bold">
                Toca para escribir
              </span>
              <ArrowUpRight className="h-5 w-5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </Container>
    </section>
  );
}
