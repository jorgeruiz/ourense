"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    slug: "construccion",
    title: "Construcción",
    description:
      "Edificación integral desde la cimentación hasta los acabados. Planeación estratégica, ejecución técnica y supervisión continua en cada etapa del proyecto.",
    image: "/images/service-construccion.webp",
    width: 800,
    height: 1000,
    href: "/servicios/construccion",
  },
  {
    slug: "ingenieria",
    title: "Ingenierías",
    description:
      "Diseño estructural, cálculo y supervisión técnica de obra. Nuestros ingenieros garantizan que cada proyecto cumpla con las normas de seguridad vigentes.",
    image: "/images/service-ingenieria.webp",
    width: 800,
    height: 1000,
    href: "/servicios/ingenierias",
  },
  {
    slug: "movimiento",
    title: "Movimiento de Tierras",
    description:
      "Excavación, nivelación, corte y compactación con maquinaria especializada propia. La etapa previa más crítica de cualquier proyecto de infraestructura.",
    image: "/images/service-movimiento-tierras.webp",
    width: 800,
    height: 1000,
    href: "/servicios/movimiento-de-tierras",
  },
];

const EXTRA_SERVICES = [
  {
    title: "Colados y Precolados",
    description:
      "Estructuras de concreto vaciadas en sitio y elementos prefabricados en planta con estándares de alta resistencia.",
    href: "/servicios/colados-y-precolados",
  },
  {
    title: "Interiorismo",
    description:
      "Diseño y ejecución de espacios interiores corporativos. Del plano al espacio terminado sin coordinación adicional.",
    href: "/servicios/interiorismo",
  },
  {
    title: "Renta de Maquinaria",
    description:
      "Equipos de última generación para movimiento de tierras, excavación y compactación. Con o sin operador.",
    href: "/servicios/renta-de-maquinaria",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Entrada de la cabecera
      gsap.from(".services-heading", {
        opacity: 0,
        yPercent: 6,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });

      // Stagger en las tarjetas
      gsap.from(".service-card", {
        opacity: 0,
        yPercent: 8,
        stagger: 0.09,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
      });

      // Hover scale solo desktop
      if (window.matchMedia("(min-width: 1024px)").matches) {
        document.querySelectorAll<HTMLElement>(".service-card").forEach((card) => {
          card.addEventListener("mouseenter", () =>
            gsap.to(card, { scale: 1.02, duration: 0.25, ease: "power1.out" })
          );
          card.addEventListener("mouseleave", () =>
            gsap.to(card, { scale: 1, duration: 0.2, ease: "power1.in" })
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-40 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-20">
        {/* Cabecera */}
        <div className="services-heading mb-16 lg:mb-20">
          <h2
            className="text-white font-sans font-bold leading-none tracking-[-0.02em] mb-6"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Servicios de construcción
            <br />
            <span className="text-[#999999]">integral en México</span>
          </h2>
          <p className="text-[#999999] text-base leading-relaxed max-w-[520px]">
            Una sola empresa responsable desde la excavación hasta los acabados. Sin intermediarios,
            sin pérdida de información entre etapas.
          </p>
        </div>

        {/* Grid servicios principales — 3 col */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
        >
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="service-card group block relative overflow-hidden bg-[#111111] border border-white/8 transition-colors duration-300 hover:border-[#A80110]/40"
              aria-label={s.title}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={s.image}
                  alt={`Servicio de ${s.title} — Ourense`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-white font-sans font-bold text-xl mb-3">{s.title}</h3>
                <p className="text-[#999999] text-sm leading-relaxed">{s.description}</p>
                <span className="inline-block mt-4 text-[#A80110] text-xs uppercase tracking-[0.12em] font-medium">
                  Ver más →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Servicios adicionales — fila horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8">
          {EXTRA_SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group bg-[#0A0A0A] p-8 transition-colors duration-300 hover:bg-[#111111]"
            >
              <h3 className="text-white font-sans font-bold text-base mb-3 group-hover:text-[#A80110] transition-colors duration-200">
                {s.title}
              </h3>
              <p className="text-[#999999] text-sm leading-relaxed">{s.description}</p>
              <span className="block mt-4 text-[#A80110] text-xs uppercase tracking-[0.12em] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Ver servicio →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
