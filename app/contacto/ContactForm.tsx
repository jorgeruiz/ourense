"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const schema = z.object({
  nombre: z.string().min(2, "Ingresa tu nombre completo"),
  empresa: z.string().optional(),
  email: z.string().email("Ingresa un email válido"),
  telefono: z.string().optional(),
  mensaje: z.string().min(20, "Describe brevemente tu proyecto (mínimo 20 caracteres)"),
});

type FormData = z.infer<typeof schema>;

const INPUT_CLASS =
  "w-full bg-[#111111] border border-white/12 text-white text-sm px-4 py-3 placeholder:text-[#555555] focus:outline-none focus:border-[#A80110] transition-colors duration-200";
const LABEL_CLASS = "block text-[#555555] text-xs uppercase tracking-[0.12em] mb-2";
const ERROR_CLASS = "mt-1 text-[#A80110] text-xs";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
      {/* Nombre */}
      <div>
        <label htmlFor="nombre" className={LABEL_CLASS}>Nombre *</label>
        <input
          id="nombre"
          type="text"
          autoComplete="name"
          placeholder="Tu nombre completo"
          className={INPUT_CLASS}
          aria-describedby={errors.nombre ? "error-nombre" : undefined}
          {...register("nombre")}
        />
        {errors.nombre && (
          <p id="error-nombre" className={ERROR_CLASS} role="alert">{errors.nombre.message}</p>
        )}
      </div>

      {/* Empresa */}
      <div>
        <label htmlFor="empresa" className={LABEL_CLASS}>Empresa (opcional)</label>
        <input
          id="empresa"
          type="text"
          autoComplete="organization"
          placeholder="Nombre de tu empresa"
          className={INPUT_CLASS}
          {...register("empresa")}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={LABEL_CLASS}>Email *</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="tu@empresa.com"
          className={INPUT_CLASS}
          aria-describedby={errors.email ? "error-email" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id="error-email" className={ERROR_CLASS} role="alert">{errors.email.message}</p>
        )}
      </div>

      {/* Teléfono */}
      <div>
        <label htmlFor="telefono" className={LABEL_CLASS}>Teléfono (opcional)</label>
        <input
          id="telefono"
          type="tel"
          autoComplete="tel"
          placeholder="+52 55 0000 0000"
          className={INPUT_CLASS}
          {...register("telefono")}
        />
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="mensaje" className={LABEL_CLASS}>Descripción del proyecto *</label>
        <textarea
          id="mensaje"
          rows={5}
          placeholder="Cuéntanos qué quieres construir, el tipo de servicio que necesitas y la ubicación aproximada."
          className={`${INPUT_CLASS} resize-none`}
          aria-describedby={errors.mensaje ? "error-mensaje" : undefined}
          {...register("mensaje")}
        />
        {errors.mensaje && (
          <p id="error-mensaje" className={ERROR_CLASS} role="alert">{errors.mensaje.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-[#A80110] text-white text-sm font-medium uppercase tracking-[0.12em] px-8 py-4 w-full transition-all duration-300 hover:bg-[#8a010d] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "Enviando..." : "Enviar solicitud"}
      </button>

      {/* Estados de feedback */}
      <div aria-live="polite">
        {status === "success" && (
          <p className="text-[#4CAF50] text-sm text-center">
            Mensaje enviado. Te respondemos en menos de 24 horas.
          </p>
        )}
        {status === "error" && (
          <p className="text-[#A80110] text-sm text-center">
            Hubo un problema al enviar. Escríbenos directamente a infoorg@oocsourense.com.mx
          </p>
        )}
      </div>
    </form>
  );
}
