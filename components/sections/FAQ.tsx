"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqPageSchema } from "@/lib/schemas";

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: "¿Qué servicios ofrece Ourense como constructora?",
    a: "Ourense ofrece construcción integral, movimiento de tierras, colados y precolados de alta resistencia, ingenierías, interiorismo y renta de maquinaria especializada. Todos los servicios están disponibles de forma independiente o como parte de un proyecto completo gestionado desde una sola empresa, con planeación estratégica y supervisión técnica continua en cada etapa.",
  },
  {
    q: "¿En qué ciudades o estados opera Ourense?",
    a: "Ourense tiene su sede en Ciudad de México, con oficinas en Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, y opera a nivel nacional. Los proyectos fuera de CDMX se atienden bajo coordinación directa del equipo de la empresa.",
  },
  {
    q: "¿Cuántos años de experiencia tiene Ourense en construcción?",
    a: "Ourense tiene más de 10 años de experiencia en el sector de la construcción en México. Durante ese tiempo ha desarrollado proyectos de edificaciones emblemáticas, infraestructura urbana y espacios corporativos en Ciudad de México y otras regiones del país.",
  },
  {
    q: "¿Ourense trabaja con empresas constructoras o solo con clientes finales?",
    a: "Ourense trabaja tanto con empresas constructoras, firmas de ingeniería y desarrolladores, como con clientes directos que requieren gestión integral de su proyecto. Su modelo de colaboración está diseñado para adaptarse a distintos tipos de cliente, ya sea como contratista general, subcontratista especializado o proveedor de maquinaria.",
  },
  {
    q: "¿Cómo funciona el proceso de planeación estratégica de un proyecto con Ourense?",
    a: "Ourense diseña un plan detallado para cada proyecto antes de iniciar la ejecución, que incluye cronograma, presupuesto, asignación de recursos y criterios de calidad. Este plan se revisa de forma continua durante la obra mediante supervisión técnica activa, lo que permite detectar y resolver desviaciones antes de que afecten el tiempo o el costo final.",
  },
  {
    q: "¿Cómo puedo contactar a Ourense para solicitar un proyecto?",
    a: "Ourense puede ser contactada por teléfono al +52 (55) 9354 2263, por correo electrónico a infoorg@oocsourense.com.mx, o presencialmente en Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, Ciudad de México, C.P. 01030.",
  },
  {
    q: "¿Qué tipos de proyectos de construcción maneja Ourense?",
    a: "Ourense gestiona proyectos de construcción integral, ingeniería estructural, movimiento de tierras y diseño de interiores. Trabajamos con clientes del sector privado y público a nivel nacional, desde proyectos residenciales hasta desarrollos de infraestructura de gran escala.",
  },
  {
    q: "¿Cómo garantizan la calidad y seguridad en cada proyecto?",
    a: "Contamos con un equipo de expertos que realiza supervisión continua en cada etapa del proyecto, asegurándonos de que todo avance conforme a los más altos estándares de calidad y seguridad vigentes en la industria de la construcción.",
  },
];

// Los primeros 3 abiertos por defecto — requisito AEO
const DEFAULT_OPEN = new Set([0, 1, 2]);

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerId = `faq-answer-${index}`;
  const buttonId = `faq-btn-${index}`;

  return (
    <div className="border-b border-white/8">
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
      >
        <span className="text-white font-sans font-medium text-base leading-snug group-hover:text-[#FAFAFA] transition-colors duration-200">
          {faq.q}
        </span>
        <span
          className="shrink-0 w-6 h-6 flex items-center justify-center border border-white/25 text-white text-sm transition-all duration-300 group-hover:border-[#A80110] group-hover:text-[#A80110]"
          aria-hidden="true"
          style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        id={answerId}
        role="region"
        aria-labelledby={buttonId}
        style={{
          maxHeight: isOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.23,1,0.32,1)",
        }}
      >
        <p className="text-[#999999] text-sm leading-relaxed pb-6">{faq.a}</p>
      </div>
    </div>
  );
}

export function FAQ() {
  const [openItems, setOpenItems] = useState<Set<number>>(DEFAULT_OPEN);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggle = (i: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".faq-heading", {
        opacity: 0,
        yPercent: 6,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-40 bg-[#111111]">
      {/* JSON-LD FAQPage */}
      <JsonLd data={faqPageSchema} />

      <div className="max-w-[1400px] mx-auto px-6 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
          {/* Cabecera sticky */}
          <div className="faq-heading lg:col-span-2 lg:sticky lg:top-28 self-start">
            <h2
              className="text-white font-sans font-bold leading-none tracking-[-0.02em] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Preguntas
              <br />
              frecuentes
            </h2>
            <p className="text-[#999999] text-sm leading-relaxed mb-8">
              Respuestas directas a las dudas más comunes de nuestros clientes sobre procesos,
              servicios y cobertura.
            </p>
            <a
              href="/preguntas-frecuentes"
              className="text-[#A80110] text-sm uppercase tracking-[0.12em] font-medium hover:text-white transition-colors duration-200"
            >
              Ver todas las FAQs →
            </a>
          </div>

          {/* Lista FAQs — todas visibles en texto plano (AEO) */}
          <div className="lg:col-span-3">
            {FAQS.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openItems.has(i)}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
