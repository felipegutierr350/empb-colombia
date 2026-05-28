"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  LabelList,
} from "recharts";
import {
  FileText,
  Globe,
  ExternalLink,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  AlertTriangle,
  Map,
  School,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const BRAND = {
  navy: "#1F4E79",
  teal: "#2E75B6",
  accent: "#00B0A6",
  amber: "#D97706",
};

type HistoricoBar = {
  periodo: string;
  casos: number;
  tone: "navy" | "accent" | "muted";
  asterisk?: boolean;
  notaTooltip: string;
};

const historico: HistoricoBar[] = [
  { periodo: "2019", casos: 20, tone: "navy", notaTooltip: "INS · RENS 2022" },
  { periodo: "2020", casos: 20, tone: "navy", notaTooltip: "INS · RENS 2022" },
  { periodo: "2021", casos: 10, tone: "navy", notaTooltip: "INS · RENS 2022" },
  { periodo: "Q1 2022", casos: 204, tone: "accent", notaTooltip: "INS · RENS 2022 · pico SE 13" },
  { periodo: "2022*", casos: 0, tone: "muted", notaTooltip: "Sin reporte INS anual consolidado posterior a Q1 2022" },
  { periodo: "2023", casos: 0, tone: "muted", notaTooltip: "Sin reporte INS anual consolidado" },
  { periodo: "2024", casos: 0, tone: "muted", notaTooltip: "Sin reporte INS anual consolidado" },
  { periodo: "2025†", casos: 642, tone: "accent", asterisk: true, notaTooltip: "Suma territorial: Caldas 390 + Valle 170 + Cartagena 50 + Cali 32" },
];

const porDepartamento = [
  { dep: "Norte de Santander", tasa: 104.7, casos: 173 },
  { dep: "Santander", tasa: 20.6, casos: 48 },
  { dep: "Caldas", tasa: 9.6, casos: 10 },
  { dep: "Cundinamarca", tasa: 2.2, casos: 8 },
  { dep: "Risaralda", tasa: 1.2, casos: 12 },
  { dep: "San Andrés", tasa: 0.4, casos: 3 },
];

// Brotes y casos reportados en Colombia durante 2025 (territoriales/INS)
const colombia2025 = [
  {
    ubicacion: "Caldas",
    casos: 390,
    fecha: "Mayo 2025 · SE 20",
    detalle:
      "Manizales (226), Viterbo (65), San José (32), Villamaría (27), otros (40)",
    fuente: "DTS Caldas / INS",
  },
  {
    ubicacion: "Valle del Cauca (Yumbo, Tuluá)",
    casos: 170,
    fecha: "Mayo–Junio 2025",
    detalle:
      ">170 casos confirmados en instituciones educativas · cierre temporal de aulas",
    fuente: "INS / Consultor Salud (9 jun 2025)",
  },
  {
    ubicacion: "Cartagena (Bolívar)",
    casos: 50,
    fecha: "Jul–Sep 2025",
    detalle:
      "34 casos en CDI aeioTU Manzanillo (jul, cerrado 24-ago) + 16 casos en 2 instituciones (sep)",
    fuente: "INS Colombia",
  },
  {
    ubicacion: "Cali",
    casos: 32,
    fecha: "2025",
    detalle: "32 casos en menores · Valle del Cauca",
    fuente: "Consultor Salud (cita INS)",
  },
];

// Brotes Américas 2025 — exclusivamente lo confirmado en el PDF oficial PAHO/OPS
const americas2025 = [
  {
    pais: "Islas Vírgenes EE.UU.",
    flag: "🇻🇮",
    casos: "189",
    fecha: "Al 7 mar 2025",
    nota: "1 fallecido bajo investigación (11 mar)",
    tone: "amber" as const,
  },
  {
    pais: "Trinidad y Tobago",
    flag: "🇹🇹",
    casos: "41",
    fecha: "9–22 feb 2025",
    nota: "Tobago County · sin agente identificado",
    tone: "navy" as const,
  },
  {
    pais: "Perú · Tacna",
    flag: "🇵🇪",
    casos: "9",
    fecha: "Enero 2025",
    nota: "6 definitivos · 3 presuntivos",
    tone: "navy" as const,
  },
  {
    pais: "México · Puebla",
    flag: "🇲🇽",
    casos: "7",
    fecha: "Marzo 2025",
    nota: "San Martín Texmelucan · sin Dx de laboratorio",
    tone: "navy" as const,
  },
  {
    pais: "Guyana · Demerara-Mahaica",
    flag: "🇬🇾",
    casos: "—",
    fecha: "Marzo 2025",
    nota: "Brote sospechoso sin cifra publicada",
    tone: "teal" as const,
  },
];

const demograficos = [
  {
    big: "95%",
    label: "Grupo de edad 0–9 años",
    sub: "Edad mediana: 3 años",
  },
  {
    big: "57,9%",
    label: "Sexo masculino",
    sub: "42,1% femenino",
  },
  {
    big: "93,6%",
    label: "Estratos 1 y 2",
    sub: "45,6% estrato 1 · 48% estrato 2",
  },
  {
    big: "73%",
    label: "Cabecera municipal",
    sub: "27% rural disperso o centro poblado",
  },
];

const fuentes = [
  {
    icon: FileText,
    title: "Reporte INS 2022 — EMPB Colombia",
    desc: "Análisis geoespacial 2019–Q1 2022 · 254 casos notificados",
    href: "https://www.ins.gov.co/buscador-eventos/REN/Art%C3%ADculo%204-4.3.pdf",
  },
  {
    icon: Globe,
    title: "Alerta PAHO/OPS · 26 marzo 2025",
    desc: "Brotes activos en la Región de las Américas · EV-A71",
    href: "https://www.paho.org/sites/default/files/2025-03/2025-mar-26-phe-epidemiological-alert-hand-foot-mouth-disease.pdf",
  },
  {
    icon: FileText,
    title: "INS · Comunicado Cartagena (sept 2025)",
    desc: "16 casos confirmados + brote previo en julio (34 casos)",
    href: "https://www.ins.gov.co/Noticias/Paginas/El-INS-informa-sobre-la-situaci%C3%B3n-actual-de-la-enfermedad-de-manos-pies-y-boca-en-Cartagena.aspx",
  },
  {
    icon: FileText,
    title: "Gobernación de Boyacá — 18 brotes (2025–2026)",
    desc: "16 brotes en 2025 + 2 brotes en 2026 · 13 municipios",
    href: "https://www.boyaca.gov.co/secretaria-de-salud-de-boyaca-emite-recomendaciones-frente-a-la-enfermedad-de-mano-pie-y-boca-en-la-poblacion-infantil-y-reporta-su-comportamiento-en-el-departamento/",
  },
  {
    icon: FileText,
    title: "DADIS Cartagena · Boletines Evento 900",
    desc: "Vigilancia semanal eventos sin establecer · 2025",
    href: "https://www.dadiscartagena.gov.co/wp-content/uploads/2026/03/B2025_44_BOLETIN_EVENTO_SIN_ESTABLECER.pdf",
  },
  {
    icon: ExternalLink,
    title: "Boletín Epidemiológico INS Colombia",
    desc: "Vigilancia semanal oficial · SIVIGILA",
    href: "https://www.ins.gov.co/buscador-eventos/Paginas/Vista-Boletin-Epidemilogico.aspx",
  },
];

const boyacaMunicipios = [
  "Buenavista",
  "Duitama",
  "Tibaná",
  "Samacá",
  "Soracá",
  "Soatá",
  "Villa de Leyva",
  "Sogamoso",
  "Togüí",
  "Chíquiza",
  "Paipa",
  "Pauna",
  "Santa María",
];

export function Epidemiologia() {
  return (
    <section id="epidemiologia" className="bg-white py-24">
      <Container>
        <SectionHeading
          eyebrow="05 · Situación epidemiológica"
          title="Lo que dicen los datos oficiales"
          description="Casos notificados al SIVIGILA, brotes territoriales 2025–2026 y la región de las Américas, según el INS, las secretarías de salud territoriales y la OPS/OMS."
        />

        {/* GRÁFICO 1 — Histórico Colombia + gap + 2025 agregado */}
        <ChartCard
          icon={<TrendingUp className="h-5 w-5" />}
          kicker="Gráfico 1 · Colombia"
          title="Casos notificados · 2019 – 2025"
          source="Fuentes: INS RENS 2022;4(4):4-19 (2019–Q1 2022) · DTS Caldas · INS comunicado Cartagena · Sec. Salud Valle · Consultor Salud (2025)"
          height={320}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={historico}
              margin={{ top: 32, right: 12, left: 0, bottom: 0 }}
              barCategoryGap="22%"
            >
              <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="periodo" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip
                cursor={{ fill: "rgba(46,117,182,0.06)" }}
                contentStyle={tooltipStyle}
                labelStyle={{ color: BRAND.navy, fontWeight: 700 }}
                formatter={(value, _name, item) => {
                  const it = item.payload as HistoricoBar;
                  if (it.tone === "muted") return ["Sin reporte INS consolidado", it.notaTooltip];
                  return [`${Number(value)} casos`, it.notaTooltip];
                }}
              />
              <Bar dataKey="casos" radius={[8, 8, 0, 0]}>
                {historico.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.tone === "accent" ? BRAND.accent : d.tone === "muted" ? "#e2e8f0" : BRAND.navy
                    }
                  />
                ))}
                <LabelList
                  dataKey="casos"
                  position="top"
                  fill={BRAND.navy}
                  fontSize={12}
                  fontWeight={700}
                  formatter={(value) => {
                    const n = Number(value);
                    return n > 0 ? `${n}` : "—";
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="mt-4 grid gap-3 sm:grid-cols-3 text-xs">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <span className="h-3 w-3 rounded-sm bg-brand-navy" />
            <span className="text-slate-700">INS · RENS 2022 (consolidado)</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <span className="h-3 w-3 rounded-sm bg-brand-accent" />
            <span className="text-slate-700">Pico · agregado territorial</span>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
            <span className="h-3 w-3 rounded-sm bg-slate-200" />
            <span className="text-slate-700">Sin reporte INS consolidado</span>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-amber-200/70 bg-amber-50/60 p-5 text-sm leading-relaxed text-slate-700">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-700 mb-2">
            ⓘ Brecha de vigilancia 2022–2024
          </p>
          <p>
            El INS <strong className="text-brand-navy">no publica</strong> una cifra anual consolidada de EMPB para 2022 completo, 2023 ni 2024 porque el evento se reporta bajo <strong className="text-brand-navy">Código 900 — Evento sin establecer</strong>. Los datos previos a Q1 2022 provienen del análisis geoespacial de Velásquez et al. (RENS 2022;4(4):4-19).
          </p>
          <p className="mt-2">
            <strong>† La cifra 2025 (642+)</strong> es la <em>suma de comunicados territoriales</em> verificables (Caldas 390 a SE 20 · Valle del Cauca &gt;170 · Cartagena 50 · Cali 32) y <strong>NO representa un total nacional consolidado</strong>. Cifras adicionales reportadas en Pereira, Boyacá (18 brotes), Bogotá (Circular 008/2024) y otros departamentos quedan fuera por no tener un denominador comparable.
          </p>
        </div>

        <p className="mt-4 text-sm text-slate-600 max-w-3xl">
          El primer trimestre de 2022 ya superaba <strong className="text-brand-navy">10× los casos anuales</strong> de los 3 años previos combinados, con pico en la semana epidemiológica 13/2022. La caracterización molecular nacional sistemática es el objetivo del estudio EMPB Colombia en curso.
        </p>

        {/* STAT CARDS DEMOGRÁFICAS */}
        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 mb-5">
            Perfil demográfico · n = 254 (2019 – Q1 2022)
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {demograficos.map((d) => (
              <div
                key={d.label}
                className="rounded-2xl border border-slate-200 bg-brand-surface p-6 hover:border-brand-teal/40 hover:shadow-card-hover transition"
              >
                <p className="font-display text-5xl sm:text-6xl font-extrabold tracking-tighter text-brand-navy leading-none">
                  {d.big}
                </p>
                <p className="mt-4 text-sm font-bold text-brand-navy">{d.label}</p>
                <p className="mt-1 text-xs text-slate-500 leading-snug">{d.sub}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Fuente: INS Colombia · RENS 2022;4(4):4-19 — caracterización 2019 a Q1 2022.
          </p>
        </div>

        {/* GRÁFICO 2 — Por departamento histórico */}
        <div className="mt-16">
          <ChartCard
            icon={<MapPin className="h-5 w-5" />}
            kicker="Gráfico 2 · Colombia · histórico"
            title="Tasa por departamento · casos por millón de habitantes (2019 – Q1 2022)"
            source="Fuente: INS Colombia · RENS 2022;4(4):4-19 · Tasa nacional = 4,9 por millón"
            height={Math.max(60 * porDepartamento.length, 320)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={porDepartamento}
                layout="vertical"
                margin={{ top: 8, right: 60, left: 0, bottom: 0 }}
                barCategoryGap="18%"
              >
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="dep"
                  tick={{ fill: "#1F4E79", fontSize: 12, fontWeight: 600 }}
                  width={150}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(46,117,182,0.06)" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: BRAND.navy, fontWeight: 700 }}
                  formatter={(value, _name, item) => [
                    `${Number(value).toLocaleString("es-CO")} por millón · ${(item.payload as { casos: number }).casos} casos`,
                    "Tasa",
                  ]}
                />
                <Bar dataKey="tasa" radius={[0, 8, 8, 0]} fill={BRAND.teal}>
                  {porDepartamento.map((d, i) => (
                    <Cell key={i} fill={i === 0 ? BRAND.navy : BRAND.teal} />
                  ))}
                  <LabelList
                    dataKey="tasa"
                    position="right"
                    formatter={(value) => `${Number(value).toLocaleString("es-CO")}`}
                    fill={BRAND.navy}
                    fontSize={12}
                    fontWeight={700}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <p className="mt-3 text-sm text-slate-600 max-w-3xl">
            <strong className="text-brand-navy">Norte de Santander</strong> concentró el 68,1% de los casos (104,7 por millón), una tasa 21 veces superior al promedio nacional.
          </p>
        </div>

        {/* GRÁFICO 3 — Brotes Colombia 2025 (datos territoriales) */}
        <div className="mt-16">
          <ChartCard
            icon={<AlertTriangle className="h-5 w-5 text-amber-600" />}
            kicker="Gráfico 3 · Colombia · brotes 2025"
            title="Casos reportados por territorio durante 2025"
            source="Fuentes: INS Colombia · Direcciones Territoriales de Salud · Consultor Salud (jun 2025)"
            height={Math.max(70 * colombia2025.length, 360)}
            accent="amber"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={colombia2025}
                layout="vertical"
                margin={{ top: 8, right: 60, left: 0, bottom: 0 }}
                barCategoryGap="22%"
              >
                <CartesianGrid stroke="#fde68a" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#475569", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="ubicacion"
                  tick={{ fill: "#1F4E79", fontSize: 12, fontWeight: 600 }}
                  width={210}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(217,119,6,0.08)" }}
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: BRAND.navy, fontWeight: 700 }}
                  formatter={(value, _name, item) => {
                    const it = item.payload as { fecha: string; detalle: string };
                    return [`${Number(value)}+ casos · ${it.fecha}`, it.detalle];
                  }}
                />
                <Bar dataKey="casos" radius={[0, 8, 8, 0]}>
                  {colombia2025.map((d, i) => (
                    <Cell key={i} fill={i === 0 ? BRAND.amber : BRAND.navy} />
                  ))}
                  <LabelList
                    dataKey="casos"
                    position="right"
                    formatter={(value) => `${Number(value)}+`}
                    fill={BRAND.navy}
                    fontSize={12}
                    fontWeight={700}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
          <p className="mt-3 text-sm text-slate-600 max-w-3xl">
            <strong className="text-brand-navy">Más de 640 casos documentados</strong> en cuatro territorios durante 2025 (Caldas, Valle del Cauca, Cartagena y Cali). Los valores corresponden a comunicados territoriales con corte distinto; <em>no</em> representan un total nacional consolidado.
          </p>

          {/* Detalle visible debajo del gráfico — cada territorio expandido */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {colombia2025.map((c, i) => (
              <div
                key={c.ubicacion}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-display text-sm font-bold text-brand-navy tracking-tight">
                    {c.ubicacion}
                  </p>
                  <span
                    className={[
                      "font-display font-extrabold tracking-tight leading-none",
                      i === 0 ? "text-amber-600 text-2xl" : "text-brand-navy text-2xl",
                    ].join(" ")}
                  >
                    {c.casos}+
                  </span>
                </div>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-wide text-slate-500">
                  {c.fecha}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {c.detalle}
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                  {c.fuente}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Card narrativo Boyacá — brotes (no equivalentes a casos puntuales) */}
        <div className="mt-10 rounded-2xl border border-brand-teal/30 bg-brand-surface p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-8 gap-4">
            <div className="sm:shrink-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                Boyacá · 2025–2026
              </p>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="font-display font-extrabold tracking-tighter text-brand-navy text-6xl leading-none">
                  18
                </span>
                <span className="text-sm text-slate-600 leading-snug">
                  brotes territoriales<br />
                  <strong className="text-brand-navy">16</strong> en 2025 · <strong className="text-brand-navy">2</strong> en 2026
                </span>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 leading-relaxed">
                <School className="inline h-4 w-4 mr-1 text-brand-teal" aria-hidden />
                Brotes principalmente en instituciones de primera infancia, educación primaria y grupos familiares. Municipios afectados:
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {boyacaMunicipios.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center rounded-md bg-white border border-slate-200 px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {m}
                  </span>
                ))}
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                Fuente: Gobernación de Boyacá · Secretaría de Salud — Candy Samanta Rodríguez Castillo, Dirección de Promoción y Prevención
              </p>
            </div>
          </div>
        </div>

        {/* TABLA 4 — Brotes Américas 2025 (PAHO) */}
        <div className="mt-16">
          <ChartCard
            icon={<Map className="h-5 w-5" />}
            kicker="Tabla · Región de las Américas"
            title="Brotes notificados a PAHO/OPS · enero – marzo 2025"
            source="Fuente: OPS/OMS · Alerta Epidemiológica EMPB, 26 marzo 2025 (PAHO/WHO)"
            noPadding
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {americas2025.map((row) => (
                <div
                  key={row.pais}
                  className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 hover:border-brand-teal/40 transition"
                >
                  <span className="text-3xl leading-none mt-0.5" aria-hidden>
                    {row.flag}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-brand-navy leading-snug">
                      {row.pais}
                    </p>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span
                        className={[
                          "font-display font-extrabold tracking-tight leading-none text-3xl",
                          row.tone === "amber"
                            ? "text-amber-600"
                            : row.tone === "teal"
                            ? "text-brand-teal"
                            : "text-brand-navy",
                        ].join(" ")}
                      >
                        {row.casos}
                      </span>
                      <span className="text-xs text-slate-500">{row.fecha}</span>
                    </div>
                    {row.nota && (
                      <p className="mt-1 text-xs text-amber-700 font-medium leading-snug">
                        ⚠︎ {row.nota}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
          <p className="mt-3 text-sm text-slate-600 max-w-3xl">
            PAHO emitió la alerta regional ante actividad inusual de EMPB en varios países durante el primer trimestre de 2025, con énfasis en la circulación de <strong className="text-brand-navy">EV-A71</strong> y sus complicaciones neurológicas.
          </p>
        </div>

        {/* Nota metodológica */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-brand-surface p-6 text-sm leading-relaxed text-slate-600 italic">
          En Colombia, la enfermedad mano-pie-boca se notifica al SIVIGILA bajo el código <strong className="not-italic text-brand-navy">900 (evento sin establecer)</strong>, por lo que no cuenta con vigilancia centinela ni boletín dedicado. Los datos 2025–2026 corresponden a comunicados oficiales del INS, secretarías territoriales y boletines del DADIS. El estudio observacional liderado por el Dr. Iván Felipe Gutiérrez Tobar busca generar evidencia virológica nacional sobre los enterovirus circulantes.
        </div>

        {/* Fuentes oficiales */}
        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500 mb-5">
            Fuentes oficiales · documentos completos
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {fuentes.map(({ icon: Icon, title, desc, href }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-brand-teal/50 hover:shadow-card-hover transition"
              >
                <ArrowUpRight
                  className="absolute right-5 top-5 h-4 w-4 text-slate-300 group-hover:text-brand-teal group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  aria-hidden
                />
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-bold text-brand-navy tracking-tight pr-6 leading-snug">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

const tooltipStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  fontFamily: "var(--font-sans)",
  fontSize: "12px",
  boxShadow: "0 4px 6px -1px rgba(15,23,42,0.08)",
};

function ChartCard({
  icon,
  kicker,
  title,
  source,
  height = 320,
  noPadding,
  accent = "navy",
  children,
}: {
  icon: React.ReactNode;
  kicker: string;
  title: string;
  source: string;
  height?: number;
  noPadding?: boolean;
  accent?: "navy" | "amber";
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        "rounded-2xl border bg-white shadow-card",
        accent === "amber" ? "border-amber-200/70" : "border-slate-200",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4 p-6 pb-3">
        <div className="flex items-start gap-3">
          <span
            className={[
              "mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl",
              accent === "amber"
                ? "bg-amber-50 text-amber-700"
                : "bg-brand-navy/5 text-brand-navy",
            ].join(" ")}
          >
            {icon}
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
              {kicker}
            </p>
            <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-brand-navy tracking-tight">
              {title}
            </h3>
          </div>
        </div>
      </div>
      <div
        className={noPadding ? "px-6 pb-6" : "px-6 pb-2"}
        style={noPadding ? undefined : { height }}
      >
        {children}
      </div>
      <p className="px-6 pb-5 pt-3 font-mono text-[10px] uppercase tracking-wide text-slate-400 border-t border-slate-100">
        {source}
      </p>
    </div>
  );
}
