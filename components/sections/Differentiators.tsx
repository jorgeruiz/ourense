"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DIFFS = [
  {
    number: "01",
    title: "Planeación estratégica de proyectos",
    description:
      "Cada proyecto arranca con un plan detallado: cronograma, presupuesto, asignación de recursos y criterios de calidad definidos antes de clavar el primer clavo.",
  },
  {
    number: "02",
    title: "Supervisión técnica continua",
    description:
      "Nuestro equipo permanece activo en obra durante todo el ciclo del proyecto. No solo en puntos de entrega parcial, sino en cada etapa crítica.",
  },
  {
    number: "03",
    title: "Un solo interlocutor para todo",
    description:
      "Desde el movimiento de tierras hasta los acabados de interiorismo. Una empresa, una responsabilidad, sin costos de coordinación entre proveedores.",
  },
  {
    number: "04",
    title: "Más de 10 años de trayectoria",
    description:
      "Experiencia comprobada en edificaciones corporativas, infraestructura urbana y espacios mixtos en Ciudad de México y a nivel nacional.",
  },
];

export function Differentiators() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".diff-heading", {
        opacity: 0,
        yPercent: 6,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });

      gsap.from(".diff-item", {
        opacity: 0,
        yPercent: 8,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: ".diff-grid", start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-40 bg-[#111111]">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-20">
        {/* Layout asimétrico: 40% texto / 60% grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Columna izquierda — cabecera fija */}
          <div className="diff-heading lg:col-span-2 lg:sticky lg:top-28">
            <p className="text-[#A80110] text-xs uppercase tracking-[0.18em] font-500 mb-6">
              Por qué elegirnos
            </p>
            <h2
              className="text-white font-montserrat font-700 leading-none tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Constructora con
              <br />
              planeación
              <br />
              estratégica
            </h2>
            <p className="text-[#999999] text-sm leading-relaxed">
              En Ourense la construcción empieza antes de llegar a la obra. Cada decisión tiene
              propósito, cada etapa tiene responsable.
            </p>
          </div>

          {/* Columna derecha — diferenciadores */}
          <div className="diff-grid lg:col-span-3 flex flex-col divide-y divide-white/8">
            {DIFFS.map((d) => (
              <div key={d.number} className="diff-item py-8 first:pt-0 last:pb-0">
                <div className="flex items-start gap-6">
                  <span className="text-[#3A3A3A] font-700 text-4xl font-montserrat leading-none mt-1 w-12 shrink-0">
                    {d.number}
                  </span>
                  <div>
                    <h3 className="text-white font-montserrat font-700 text-lg mb-3">{d.title}</h3>
                    <p className="text-[#999999] text-sm leading-relaxed">{d.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
