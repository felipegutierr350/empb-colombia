"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, Send, AlertCircle, Loader2 } from "lucide-react";
import { enrollSchema, type EnrollInput } from "@/lib/enrollSchema";

const especialidades = [
  "Pediatría",
  "Infectología pediátrica",
  "Infectología",
  "Medicina familiar",
  "Medicina general",
  "Urgenciología",
  "Dermatología",
  "Epidemiología",
  "Salud pública",
  "Otra",
];

export function Formulario() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnrollInput>({
    resolver: zodResolver(enrollSchema),
    defaultValues: {
      nombre: "",
      especialidad: "",
      email: "",
      telefono: "",
      institucion: "",
      ciudad: "",
      mensaje: "",
      autorizacion_datos: false,
    },
  });

  async function onSubmit(values: EnrollInput) {
    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setServerError(data?.error || "No fue posible enviar tu información.");
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch (e) {
      console.error(e);
      setServerError("Error de red. Inténtalo nuevamente.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="formulario" className="bg-brand-surface py-24">
        <Container>
          <div className="mx-auto max-w-2xl rounded-2xl border border-brand-green/30 bg-white p-10 text-center shadow-card">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h2 className="mt-6 font-display text-3xl font-bold text-brand-navy tracking-tight">
              ¡Gracias por tu interés!
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-600">
              Hemos recibido tus datos. El equipo investigador te contactará a la brevedad para coordinar tu participación en el estudio.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-8 inline-flex items-center rounded-xl border-2 border-brand-navy px-5 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-navy hover:text-white transition"
            >
              Enviar otro registro
            </button>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="formulario" className="bg-brand-surface py-24">
      <Container>
        <SectionHeading
          eyebrow="08 · Únete al estudio"
          title="Quiero colaborar con el estudio"
          description="Déjanos tus datos y el equipo investigador te contactará para coordinar tu participación."
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-12 grid gap-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-card sm:p-10 sm:grid-cols-2"
        >
          <Field
            label="Nombre completo"
            required
            error={errors.nombre?.message}
            id="nombre"
          >
            <input
              id="nombre"
              autoComplete="name"
              {...register("nombre")}
              className={inputCls(!!errors.nombre)}
              placeholder="Ej. Dra. María Pérez"
            />
          </Field>

          <Field
            label="Especialidad / rol"
            required
            error={errors.especialidad?.message}
            id="especialidad"
          >
            <input
              id="especialidad"
              list="especialidades-list"
              {...register("especialidad")}
              className={inputCls(!!errors.especialidad)}
              placeholder="Ej. Pediatría, Infectología, etc."
            />
            <datalist id="especialidades-list">
              {especialidades.map((e) => (
                <option key={e} value={e} />
              ))}
            </datalist>
          </Field>

          <Field
            label="Correo electrónico"
            required
            error={errors.email?.message}
            id="email"
          >
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email")}
              className={inputCls(!!errors.email)}
              placeholder="tucorreo@institucion.org"
            />
          </Field>

          <Field
            label="Teléfono"
            required
            error={errors.telefono?.message}
            id="telefono"
          >
            <input
              id="telefono"
              type="tel"
              autoComplete="tel"
              {...register("telefono")}
              className={inputCls(!!errors.telefono)}
              placeholder="+57 300 000 0000"
            />
          </Field>

          <Field
            label="Institución"
            required
            error={errors.institucion?.message}
            id="institucion"
          >
            <input
              id="institucion"
              autoComplete="organization"
              {...register("institucion")}
              className={inputCls(!!errors.institucion)}
              placeholder="Hospital / clínica / EPS / universidad"
            />
          </Field>

          <Field
            label="Ciudad"
            required
            error={errors.ciudad?.message}
            id="ciudad"
          >
            <input
              id="ciudad"
              autoComplete="address-level2"
              {...register("ciudad")}
              className={inputCls(!!errors.ciudad)}
              placeholder="Ej. Bogotá, Medellín, Cali..."
            />
          </Field>

          <div className="sm:col-span-2">
            <Field
              label="Mensaje (opcional)"
              error={errors.mensaje?.message}
              id="mensaje"
            >
              <textarea
                id="mensaje"
                rows={4}
                {...register("mensaje")}
                className={inputCls(!!errors.mensaje) + " resize-y"}
                placeholder="Comenta brevemente cómo te gustaría colaborar o consultas específicas."
              />
            </Field>
          </div>

          <div className="sm:col-span-2 rounded-xl bg-brand-surface border border-slate-200 p-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                {...register("autorizacion_datos")}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-brand-navy focus:ring-brand-teal accent-brand-navy"
              />
              <span className="text-sm leading-relaxed text-slate-700">
                <strong className="text-brand-navy">Autorizo</strong> el tratamiento de mis datos personales para ser contactado por el equipo investigador, conforme a la <strong>Ley 1581 de 2012</strong> de la República de Colombia.
                <span className="text-rose-600"> *</span>
              </span>
            </label>
            {errors.autorizacion_datos?.message && (
              <p className="mt-2 text-xs font-medium text-rose-600">
                {errors.autorizacion_datos.message}
              </p>
            )}
          </div>

          {status === "error" && (
            <div className="sm:col-span-2 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" />
              <div>{serverError}</div>
            </div>
          )}

          <div className="sm:col-span-2 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
            <p className="text-xs text-slate-500 leading-relaxed">
              Los datos serán usados únicamente para fines del estudio y contacto científico. No se compartirán con terceros.
            </p>
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy-deep transition shadow-sm hover:shadow disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Enviar mis datos
                </>
              )}
            </button>
          </div>
        </form>
      </Container>
    </section>
  );
}

function Field({
  label,
  required,
  error,
  id,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-brand-navy mb-1.5"
      >
        {label}
        {required && <span className="text-rose-600"> *</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      )}
    </div>
  );
}

function inputCls(hasError: boolean) {
  return [
    "block w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800",
    "placeholder:text-slate-400",
    "focus:outline-none focus:ring-2",
    hasError
      ? "border-rose-300 focus:ring-rose-300 focus:border-rose-400"
      : "border-slate-300 focus:ring-brand-teal/40 focus:border-brand-teal",
    "transition",
  ].join(" ");
}
