import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/ui/JsonLd";
import { serviceSchemas } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Servicios de Construcción Integral",
  description:
    "Ourense ofrece servicios integrales de construcción en México: edificaciones, movimiento de tierras, colados y precolados, ingenierías, interiorismo y renta de maquinaria.",
  alternates: {
    canonical: "https://www.ourense.mx/servicios",
    languages: { es: "https://www.ourense.mx/servicios", en: "https://www.ourense.mx/en/services" },
  },
};

const SERVICES = [
  {
    title: "Construcción",
    description: "Edificación integral desde cimentación hasta acabados. Planeación estratégica y supervisión continua.",
    image: "/images/service-construccion.webp",
    href: "/servicios/construccion",
    keyword: "servicios de construcción integral",
  },
  {
    title: "Movimiento de Tierras",
    description: "Excavación, nivelación, corte y compactación de terreno con maquinaria especializada propia.",
    image: "/images/service-movimiento-tierras.webp",
    href: "/servicios/movimiento-de-tierras",
    keyword: "movimiento de tierras excavaciones México",
  },
  {
    title: "Ingenierías",
    description: "Diseño estructural, cálculo y supervisión técnica de obra por ingenieros certificados.",
    image: "/images/service-ingenieria.webp",
    href: "/servicios/ingenierias",
    keyword: "ingeniería estructural constructora CDMX",
  },
  {
    title: "Colados y Precolados",
    description: "Estructuras de concreto en sitio y elementos prefabricados de alta resistencia.",
    image: null,
    href: "/servicios/colados-y-precolados",
    keyword: "colados en sitio Ciudad de México",
  },
  {
    title: "Interiorismo",
    description: "Diseño y ejecución de espacios interiores corporativos. Del plano al espacio terminado.",
    image: null,
    href: "/servicios/interiorismo",
    keyword: "interiorismo y acabados para proyectos corporativos",
  },
  {
    title: "Renta de Maquinaria",
    description: "Equipos de última generación para movimiento de tierras y excavación, con o sin operador.",
    image: null,
    href: "/servicios/renta-de-maquinaria",
    keyword: "renta de maquinaria construcción CDMX",
  },
];

export default function ServiciosPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <JsonLd data={serviceSchemas.construccion} />
      <JsonLd data={serviceSchemas.movimientoDeTierras} />
      <JsonLd data={serviceSchemas.disenioInteriores} />

      {/* Hero */}
      <section className="pt-32 pb-16 max-w-[1400px] mx-auto px-6 xl:px-20">
        <h1
          className="text-white font-montserrat font-700 leading-none tracking-[-0.03em] mb-8"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Servicios de construcción
          <br />
          <span className="text-[#999999]">integral en México</span>
        </h1>
        <p className="text-[#999999] text-xl leading-relaxed max-w-[640px]">
          Una sola empresa para todas las etapas de tu proyecto. Desde la excavación del terreno
          hasta los acabados finales, con supervisión técnica en cada paso.
        </p>
      </section>

      {/* Grid servicios */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group block border border-white/8 overflow-hidden bg-[#111111] transition-colors duration-300 hover:border-[#A80110]/40"
              aria-label={`Servicio de ${s.title}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {s.image ? (
                  <Image
                    src={s.image}
                    alt={`Servicio de ${s.title} — Ourense`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center">
                    <span className="text-[#3A3A3A] text-xs">Imagen próximamente</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="text-white font-montserrat font-700 text-xl mb-3 group-hover:text-[#A80110] transition-colors duration-200">
                  {s.title}
                </h2>
                <p className="text-[#999999] text-sm leading-relaxed">{s.description}</p>
                <span className="inline-block mt-4 text-[#A80110] text-xs uppercase tracking-[0.12em] font-500">
                  Ver servicio →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <p className="text-white font-montserrat font-700 text-2xl mb-2">
            ¿Necesitas más de un servicio?
          </p>
          <p className="text-[#999999] text-sm">
            Ourense los gestiona todos bajo una sola responsabilidad.
          </p>
        </div>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-3 bg-[#A80110] text-white text-sm font-500 uppercase tracking-[0.12em] px-8 py-4 shrink-0 transition-all duration-300 hover:bg-[#8a010d] active:scale-[0.98]"
        >
          Solicitar cotización
        </Link>
      </section>
    </div>
  );
}
