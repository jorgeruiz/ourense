import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portafolio de Proyectos",
  description:
    "Proyectos de construcción, movimiento de tierras e ingeniería estructural realizados por Ourense en Ciudad de México y a nivel nacional.",
  alternates: {
    canonical: "https://www.ourense.mx/portafolio",
    languages: { es: "https://www.ourense.mx/portafolio", en: "https://www.ourense.mx/en/portfolio" },
  },
};

// Proyectos de ejemplo — el cliente llenará con los reales
const PROJECTS = [
  {
    slug: "proyecto-infraestructura-cdmx",
    title: "Proyecto de Infraestructura",
    service: "Movimiento de Tierras",
    location: "Ciudad de México",
    description: "Proyecto de gran escala con movimiento de tierras, nivelación y compactación para desarrollo de infraestructura urbana.",
  },
  {
    slug: "edificacion-corporativa",
    title: "Edificación Corporativa",
    service: "Construcción integral",
    location: "Ciudad de México",
    description: "Construcción integral de edificio corporativo desde cimentación hasta acabados de interiorismo.",
  },
  {
    slug: "obra-civil-colados",
    title: "Obra Civil",
    service: "Colados y Precolados",
    location: "Estado de México",
    description: "Ejecución de colados en sitio y elementos precolados de alta resistencia para proyecto de infraestructura.",
  },
];

export default function PortafolioPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/portfolio-preview.webp"
            alt=""
            fill
            className="object-cover"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 xl:px-20">
          <h1
            className="text-white font-montserrat font-700 leading-none tracking-[-0.03em] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
          >
            Portafolio
          </h1>
          <p className="text-[#999999] text-xl leading-relaxed max-w-[560px]">
            Proyectos de construcción integral, infraestructura, ingeniería y interiorismo
            ejecutados en Ciudad de México y a nivel nacional.
          </p>
        </div>
      </section>

      {/* Grid de proyectos */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.slug}
              className="group border border-white/8 overflow-hidden bg-[#111111] transition-colors duration-300 hover:border-[#A80110]/40"
            >
              {/* Placeholder imagen hasta que el cliente provea fotos reales */}
              <div className="aspect-video bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-950 flex items-center justify-center">
                <span className="text-[#555555] text-xs text-center px-4">
                  Foto del proyecto - pendiente del cliente
                </span>
              </div>
              <div className="p-6">
                <p className="text-[#A80110] text-xs uppercase tracking-[0.14em] font-500 mb-2">
                  {p.service}
                </p>
                <h2 className="text-white font-montserrat font-700 text-lg mb-2">{p.title}</h2>
                <p className="text-[#555555] text-xs uppercase tracking-[0.1em] mb-3">{p.location}</p>
                <p className="text-[#999999] text-sm leading-relaxed">{p.description}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="text-[#555555] text-sm text-center mt-12 border-t border-white/8 pt-12">
          Portafolio completo en actualización. Contacta a Ourense para ver proyectos de referencia
          específicos a tu tipo de obra.
        </p>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <p className="text-white font-montserrat font-700 text-2xl max-w-[400px]">
          ¿Quieres ver proyectos de tu industria?
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-3 bg-[#A80110] text-white text-sm font-500 uppercase tracking-[0.12em] px-8 py-4 shrink-0 transition-all duration-300 hover:bg-[#8a010d] active:scale-[0.98]"
        >
          Solicitar información
        </Link>
      </section>
    </div>
  );
}
