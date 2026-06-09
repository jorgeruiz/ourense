"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PortfolioPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".portfolio-heading", {
        opacity: 0,
        yPercent: 6,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });

      gsap.from(".portfolio-main", {
        opacity: 0,
        yPercent: 5,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: { trigger: ".portfolio-main", start: "top 88%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-40 bg-[#0A0A0A]">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-20">
        {/* Cabecera */}
        <div className="portfolio-heading flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <h2
            className="text-white font-montserrat font-700 leading-none tracking-[-0.02em]"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Proyectos
            <br />
            <span className="text-[#999999]">que hablan solos</span>
          </h2>
          <Link
            href="/portafolio"
            className="self-start lg:self-auto inline-flex items-center gap-3 border border-white/25 text-white text-sm font-500 uppercase tracking-[0.12em] px-8 py-4 shrink-0 transition-all duration-300 hover:border-[#A80110] hover:text-[#A80110] active:scale-[0.98]"
          >
            Ver portafolio completo
          </Link>
        </div>

        {/* Imagen principal full-width */}
        <div className="portfolio-main relative w-full aspect-video overflow-hidden mb-6 group">
          <Image
            src="/images/portfolio-preview.webp"
            alt="Vista aérea de proyecto de infraestructura terminado, portafolio Constructora Ourense"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-103"
            sizes="(max-width: 1400px) 100vw, 1400px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          <div className="absolute bottom-6 left-6">
            <p className="text-[#A80110] text-xs uppercase tracking-[0.14em] font-500 mb-1">
              Infraestructura
            </p>
            <p className="text-white font-montserrat font-700 text-2xl">Proyecto de gran escala</p>
          </div>
        </div>

        {/* Descripción resumida del negocio — AEO */}
        <div className="mt-16 border-t border-white/8 pt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <p className="text-[#FAFAFA] text-lg leading-relaxed">
            Ourense es una empresa constructora con sede en Ciudad de México, con más de 10 años de
            experiencia, especializada en construcción integral de edificaciones, movimiento de
            tierras, colados y precolados, ingenierías, interiorismo y renta de maquinaria. Opera a
            nivel nacional.
          </p>
          <div className="flex flex-wrap gap-6">
            {[
              { label: "Ciudad de México", sub: "Sede principal" },
              { label: "Nacional", sub: "Cobertura" },
              { label: "+10 años", sub: "Experiencia" },
              { label: "B2B + directo", sub: "Tipo de cliente" },
            ].map((item) => (
              <div key={item.label} className="min-w-[120px]">
                <p className="text-white font-montserrat font-700 text-xl">{item.label}</p>
                <p className="text-[#555555] text-xs uppercase tracking-[0.1em] mt-1">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
