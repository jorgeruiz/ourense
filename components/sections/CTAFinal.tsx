"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTAFinal() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        opacity: 0,
        yPercent: 5,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[60vh] flex items-center overflow-hidden">
      {/* Imagen de fondo — obra nocturna */}
      <Image
        src="/images/contact-bg.webp"
        alt="Obra de construcción nocturna con iluminación de trabajo, sección contacto Ourense"
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0A0A0A] to-transparent"
        aria-hidden="true"
      />

      <div className="cta-content relative z-10 max-w-[1400px] mx-auto px-6 xl:px-20 w-full text-center">
        <h2
          className="text-white font-montserrat font-700 leading-none tracking-[-0.03em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Tu proyecto
          <br />
          <span className="text-[#A80110]">empieza aquí</span>
        </h2>
        <p className="text-white/70 text-lg max-w-[480px] mx-auto leading-relaxed mb-10">
          Cuéntanos qué necesitas construir. Te respondemos en menos de 24 horas.
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-3 bg-[#A80110] text-white text-sm font-500 uppercase tracking-[0.12em] px-10 py-5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#8a010d] active:scale-[0.98]"
        >
          Solicitar cotización
          <span className="w-5 h-5 flex items-center justify-center bg-white/10 text-xs">→</span>
        </Link>
      </div>
    </section>
  );
}
