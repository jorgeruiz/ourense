import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Testimonios",
  description:
    "Lo que dicen los clientes sobre Ourense, constructora en Ciudad de México con más de 10 años de experiencia en construcción integral, ingenierías y movimiento de tierras.",
  alternates: {
    canonical: "https://www.ourense.mx/testimonios",
    languages: { es: "https://www.ourense.mx/testimonios", en: "https://www.ourense.mx/en/testimonials" },
  },
};

// Testimoniales de ejemplo — el cliente proveerá los reales
const TESTIMONIALS = [
  {
    quote: "Ourense cumplió con todos los plazos del proyecto. Su supervisión continua fue clave para detectar y resolver problemas antes de que se convirtieran en retrasos.",
    name: "Director de Operaciones",
    company: "Empresa constructora nacional",
    service: "Construcción integral",
  },
  {
    quote: "El equipo de movimiento de tierras de Ourense trabajó con maquinaria propia y personal calificado. El terreno quedó listo antes del tiempo estimado.",
    name: "Gerente de Proyecto",
    company: "Desarrolladora inmobiliaria",
    service: "Movimiento de Tierras",
  },
  {
    quote: "Lo que más valoramos es tener un solo interlocutor para todo el proyecto. Desde la excavación hasta los acabados, Ourense se hizo cargo de todo.",
    name: "Director General",
    company: "Empresa de infraestructura",
    service: "Proyecto integral",
  },
];

export default function TestimoniosPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero con imagen de fondo */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/images/testimonials-bg.webp"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-[#0A0A0A]/50" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 xl:px-20">
          <h1
            className="text-white font-sans font-bold leading-none tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            Testimonios
          </h1>
          <p className="text-[#999999] text-xl leading-relaxed max-w-[560px]">
            La confianza de nuestros clientes está construida proyecto a proyecto.
          </p>
        </div>
      </section>

      {/* Testimonios en texto plano */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 pb-24">
        <div className="flex flex-col divide-y divide-white/8">
          {TESTIMONIALS.map((t, i) => (
            <blockquote key={i} className="py-12">
              <p className="text-white text-xl leading-relaxed font-sans mb-6 max-w-[720px]">
                "{t.quote}"
              </p>
              <footer>
                <p className="text-[#999999] text-sm font-medium">{t.name}</p>
                <p className="text-[#555555] text-xs mt-1">{t.company}</p>
                <p className="text-[#A80110] text-xs uppercase tracking-[0.1em] mt-1">{t.service}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <p className="text-white font-sans font-bold text-2xl max-w-[400px]">
          Sé el próximo proyecto de referencia.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-3 bg-[#A80110] text-white text-sm font-medium uppercase tracking-[0.12em] px-8 py-4 shrink-0 transition-all duration-300 hover:bg-[#8a010d] active:scale-[0.98]"
        >
          Solicitar cotización
        </Link>
      </section>
    </div>
  );
}
