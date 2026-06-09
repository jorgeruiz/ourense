import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Ourense es una empresa constructora con más de 10 años de experiencia en Ciudad de México. Planeación estratégica, supervisión técnica continua y servicios integrales de construcción a nivel nacional.",
  alternates: {
    canonical: "https://www.ourense.mx/nosotros",
    languages: { es: "https://www.ourense.mx/nosotros", en: "https://www.ourense.mx/en/about" },
  },
};

export default function NosotrosPage() {
  return (
    <div className="bg-[#0A0A0A]">
      {/* Hero */}
      <section className="pt-32 pb-16 max-w-[1400px] mx-auto px-6 xl:px-20">
        <h1
          className="text-white font-montserrat font-700 leading-none tracking-[-0.03em] mb-8"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Sobre Ourense
        </h1>
        <p className="text-[#999999] text-xl leading-relaxed max-w-[640px]">
          Empresa constructora con sede en Ciudad de México y cobertura nacional. Más de 10 años
          transformando proyectos de construcción con planeación estratégica y supervisión técnica
          en cada etapa.
        </p>
      </section>

      {/* Imagen */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 mb-24">
        <div className="relative w-full aspect-video overflow-hidden">
          <Image
            src="/images/about-section.webp"
            alt="Fachada de edificio terminado con acabado de concreto aparente, obra de Constructora Ourense"
            fill
            className="object-cover"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
        </div>
      </section>

      {/* Historia y misión */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-white/8">
        <div>
          <h2 className="text-white font-montserrat font-700 text-3xl mb-6">Quiénes somos</h2>
          <p className="text-[#999999] text-base leading-relaxed mb-4">
            Ourense es una empresa constructora con más de 10 años de operación en el mercado
            mexicano. Desde nuestra sede en Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro
            Obregón, Ciudad de México, atendemos proyectos en toda la república.
          </p>
          <p className="text-[#999999] text-base leading-relaxed mb-4">
            Nuestro modelo de trabajo integra diseño, ejecución y control técnico en una sola
            empresa, desde la cimentación hasta los acabados finales. Trabajamos con empresas
            constructoras, firmas de ingeniería, desarrolladores y clientes directos que requieren
            un contratista general confiable.
          </p>
          <p className="text-[#999999] text-base leading-relaxed">
            Meta declarada: posicionarnos como líderes en gestión de proyectos de construcción en
            México para 2027.
          </p>
        </div>

        {/* Datos verificables */}
        <div>
          <h2 className="text-white font-montserrat font-700 text-3xl mb-6">
            Datos verificables
          </h2>
          <dl className="divide-y divide-white/8">
            {[
              { label: "Antigüedad", value: "Más de 10 años de experiencia" },
              { label: "Sede", value: "Ciudad de México, Col. Florida, Álvaro Obregón" },
              { label: "Cobertura", value: "Nacional — proyectos en todo México" },
              { label: "Dirección", value: "Av. Insurgentes Sur 1748-501, C.P. 01030" },
              { label: "Teléfono", value: "+52 (55) 9354 2263" },
              { label: "Email", value: "infoorg@oocsourense.com.mx" },
              { label: "LinkedIn", value: "linkedin.com/company/organización-ourense" },
            ].map((item) => (
              <div key={item.label} className="py-4 grid grid-cols-2 gap-4">
                <dt className="text-[#555555] text-sm uppercase tracking-[0.1em]">{item.label}</dt>
                <dd className="text-[#999999] text-sm">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Servicios */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16 border-t border-white/8">
        <h2 className="text-white font-montserrat font-700 text-3xl mb-10">Nuestros servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "Construcción integral", desc: "Edificación desde la cimentación hasta los acabados.", href: "/servicios/construccion" },
            { title: "Movimiento de tierras", desc: "Excavación, nivelación, corte y compactación.", href: "/servicios/movimiento-de-tierras" },
            { title: "Colados y precolados", desc: "Estructuras de concreto en sitio y prefabricadas.", href: "/servicios/colados-y-precolados" },
            { title: "Ingenierías", desc: "Diseño estructural y supervisión técnica de obra.", href: "/servicios/ingenierias" },
            { title: "Interiorismo", desc: "Diseño y ejecución de espacios corporativos.", href: "/servicios/interiorismo" },
            { title: "Renta de maquinaria", desc: "Equipos especializados con o sin operador.", href: "/servicios/renta-de-maquinaria" },
          ].map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group border border-white/8 p-6 transition-colors duration-300 hover:border-[#A80110]/40"
            >
              <h3 className="text-white font-700 text-base mb-2 group-hover:text-[#A80110] transition-colors duration-200">
                {s.title}
              </h3>
              <p className="text-[#999999] text-sm">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16 border-t border-white/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <p className="text-white font-montserrat font-700 text-2xl max-w-[400px] leading-snug">
          ¿Listo para comenzar tu proyecto?
        </p>
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
