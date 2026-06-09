import type { Metadata } from "next";
import { FAQ } from "@/components/sections/FAQ";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respuestas a las preguntas más comunes sobre los servicios de Ourense: construcción, movimiento de tierras, ingenierías, interiorismo y renta de maquinaria en Ciudad de México.",
  alternates: {
    canonical: "https://www.ourense.mx/preguntas-frecuentes",
    languages: {
      es: "https://www.ourense.mx/preguntas-frecuentes",
      en: "https://www.ourense.mx/en/faq",
    },
  },
};

export default function FAQsPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <section className="pt-32 pb-0 max-w-[1400px] mx-auto px-6 xl:px-20">
        <h1
          className="text-white font-sans font-bold leading-none tracking-[-0.03em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Preguntas frecuentes
        </h1>
        <p className="text-[#999999] text-xl leading-relaxed max-w-[560px] mb-4">
          Todo lo que necesitas saber antes de contratar a Ourense para tu proyecto de
          construcción.
        </p>
      </section>
      <FAQ />
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <p className="text-white font-sans font-bold text-2xl max-w-[400px]">
          ¿No encontraste tu respuesta?
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-3 bg-[#A80110] text-white text-sm font-medium uppercase tracking-[0.12em] px-8 py-4 shrink-0 transition-all duration-300 hover:bg-[#8a010d] active:scale-[0.98]"
        >
          Escríbenos
        </Link>
      </section>
    </div>
  );
}
