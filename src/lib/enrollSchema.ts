import { z } from "zod";

export const enrollSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Por favor ingresa tu nombre completo.")
    .max(120, "Máximo 120 caracteres."),
  especialidad: z
    .string()
    .trim()
    .min(2, "Indica tu especialidad o rol.")
    .max(120, "Máximo 120 caracteres."),
  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio.")
    .email("Ingresa un correo electrónico válido."),
  telefono: z
    .string()
    .trim()
    .min(7, "Ingresa un teléfono de contacto válido.")
    .max(30, "Máximo 30 caracteres."),
  institucion: z
    .string()
    .trim()
    .min(2, "Indica tu institución.")
    .max(160, "Máximo 160 caracteres."),
  ciudad: z
    .string()
    .trim()
    .min(2, "Indica tu ciudad.")
    .max(80, "Máximo 80 caracteres."),
  mensaje: z
    .string()
    .trim()
    .max(2000, "Máximo 2000 caracteres.")
    .optional()
    .or(z.literal("")),
  autorizacion_datos: z
    .boolean()
    .refine((v) => v === true, {
      message: "Debes autorizar el tratamiento de datos para continuar.",
    }),
});

export type EnrollInput = z.infer<typeof enrollSchema>;
