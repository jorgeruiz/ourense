"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (reducedMotion || !heroRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      if (isDesktop) {
        // Pin el hero y parallax del texto
        ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "+=150%",
          pin: true,
          scrub: 1,
        });

        gsap.fromTo(
          textRef.current,
          { yPercent: 0, opacity: 1 },
          {
            yPercent: -40,
            opacity: 0,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "30% top",
              scrub: 1,
            },
          }
        );

        // Overlay se hace más oscuro al hacer scroll
        if (overlayRef.current) {
          gsap.fromTo(
            overlayRef.current,
            { opacity: 0.55 },
            {
              opacity: 0.85,
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "50% top",
                scrub: 1,
              },
            }
          );
        }
      }

      // Entrada inicial del texto
      gsap.from(textRef.current, {
        opacity: 0,
        yPercent: 3,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.3,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      aria-label="Hero principal"
    >
      {/* Imagen de fondo */}
      <Image
        src="/images/hero-home.webp"
        alt="Proyecto de construcción en gran escala al atardecer, estructura de acero y concreto"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black"
        style={{ opacity: 0.55 }}
        aria-hidden="true"
      />

      {/* Gradiente inferior */}
      <div
        className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#0A0A0A] to-transparent"
        aria-hidden="true"
      />

      {/* Contenido */}
      <div ref={textRef} className="relative z-10 text-center max-w-[1400px] mx-auto px-6 xl:px-20">
        <h1
          className="text-white font-sans font-bold leading-none tracking-[-0.03em] mb-6"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          Constructora en
          <br />
          <span className="text-[#A80110]">Ciudad de México</span>
        </h1>

        <p className="text-[#FAFAFA]/80 text-lg md:text-xl max-w-[560px] mx-auto leading-relaxed mb-10">
          Más de 10 años ejecutando proyectos de construcción integral con planeación estratégica y
          supervisión técnica continua.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-3 bg-[#A80110] text-white text-sm font-medium uppercase tracking-[0.12em] px-8 py-4 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#8a010d] active:scale-[0.98]"
          >
            Solicitar cotización
            <span className="w-5 h-5 flex items-center justify-center bg-white/10 text-xs">
              →
            </span>
          </Link>
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-3 border border-white/25 text-white text-sm font-medium uppercase tracking-[0.12em] px-8 py-4 transition-all duration-300 hover:border-[#A80110] hover:text-[#A80110] active:scale-[0.98]"
          >
            Ver portafolio
          </Link>
        </div>
      </div>

      {/* Datos verificables visibles — AEO */}
      <div className="absolute bottom-8 left-6 xl:left-20 right-6 xl:right-20 z-10 flex flex-wrap gap-6 justify-center lg:justify-start">
        {[
          { value: "+10", label: "Años de experiencia" },
          { value: "CDMX", label: "Sede principal" },
          { value: "Nacional", label: "Cobertura" },
        ].map((stat) => (
          <div key={stat.label} className="text-center lg:text-left">
            <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
            <p className="text-[#999999] text-xs uppercase tracking-[0.1em] mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
