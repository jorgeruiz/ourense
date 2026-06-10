"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────── */
const SERVICES = [
  { num: "01", slug: "construccion",        name: "Construcción Integral",    desc: "De la cimentación al acabado final. Gestión completa del proyecto." },
  { num: "02", slug: "movimiento-de-tierras", name: "Movimiento de Tierras",  desc: "Excavación, nivelación y compactación con maquinaria especializada." },
  { num: "03", slug: "colados-y-precolados", name: "Colados y Precolados",    desc: "Alta resistencia estructural, in situ o prefabricados en planta controlada." },
  { num: "04", slug: "ingenierias",          name: "Ingenierías",             desc: "Diseño estructural y supervisión técnica continua en cada etapa." },
  { num: "05", slug: "interiorismo",         name: "Interiorismo",            desc: "Espacios corporativos y comerciales listos para uso inmediato." },
  { num: "06", slug: "renta-de-maquinaria",  name: "Renta de Maquinaria",    desc: "Equipos de última generación para cada fase de la obra." },
];

const HERO_LINES = ["CONSTRUIMOS", "LO QUE OTROS", "NO PUEDEN."];

const MARQUEE_TEXT =
  "CONSTRUCCIÓN  ×  INGENIERÍAS  ×  MOVIMIENTO DE TIERRAS  ×  COLADOS  ×  INTERIORISMO  ×  MAQUINARIA  ×  ";

const MANIFESTO_WORDS =
  "Somos la constructora que otros contratan cuando el proyecto es demasiado importante para dejarlo al azar. Más de diez años construyendo en Ciudad de México y a nivel nacional, con supervisión técnica continua en cada etapa.".split(
    " "
  );

/* ─── Component ──────────────────────────────────────────── */
export function ProposalPage() {
  const rootRef        = useRef<HTMLDivElement>(null);
  const marqueeRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {

      /* Hero words — fade + subtle rise (sin overflow-hidden clip para evitar
         el estado invisible en producción/mobile si GSAP no completa) */
      gsap.from(".hw", {
        opacity: 0,
        y: 28,
        stagger: 0.06,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.15,
      });

      /* Hero rule — draw from left */
      gsap.from(".hero-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "power4.out",
        delay: 0.75,
      });

      /* Hero sub items — fade up */
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 18,
        stagger: 0.07,
        duration: 0.9,
        ease: "power3.out",
        delay: 1.1,
      });

      /* Marquee — horizontal scrub on scroll */
      if (marqueeRef.current) {
        const track  = marqueeRef.current;
        const offset = track.scrollWidth / 4; // one full copy width
        gsap.to(track, {
          x: -offset,
          ease: "none",
          scrollTrigger: {
            trigger: ".marquee-wrap",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      /* Stats — stagger entrance */
      gsap.from(".stat-item", {
        opacity: 0,
        y: 56,
        stagger: 0.14,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 78%",
          once: true,
        },
      });

      /* Manifesto — word-by-word opacity scrub */
      gsap.from(".mw", {
        opacity: 0.08,
        stagger: 0.03,
        duration: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".manifesto-section",
          start: "top 55%",
          end: "bottom 45%",
          scrub: 1,
        },
      });

      /* Services — slide in from left */
      gsap.from(".service-row", {
        opacity: 0,
        x: -24,
        stagger: 0.055,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 82%",
          once: true,
        },
      });

      /* CTA headline */
      gsap.from(".cta-hw", {
        opacity: 0,
        y: 28,
        stagger: 0.065,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 78%",
          once: true,
        },
      });

    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="bg-[#F8F8F6] text-[#0A0A0A] overflow-x-hidden"
      style={{ fontFamily: "var(--font-sans-base, system-ui, sans-serif)" }}
    >

      {/* ══ LIGHT NAV ══════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 xl:px-16 bg-[#F8F8F6]/90"
        style={{ height: "64px", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,10,10,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-display-base, serif)" }} className="text-[#A80110] text-xl leading-none select-none">O</span>
          <span className="font-bold text-xs uppercase tracking-[0.22em]">Ourense</span>
        </div>

        <div className="flex items-center gap-6">
          <span className="hidden md:block text-[11px] uppercase tracking-[0.18em] text-[#888]">
            Propuesta 02 · Editorial
          </span>
          <Link
            href="/contacto"
            className="text-[11px] font-bold uppercase tracking-[0.18em] border border-[#0A0A0A] px-5 py-2.5 transition-colors duration-150 hover:bg-[#0A0A0A] hover:text-[#F8F8F6]"
          >
            Solicitar cotización
          </Link>
        </div>
      </nav>

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section className="min-h-[100dvh] pt-[64px] flex flex-col justify-between px-6 xl:px-16 pb-12">

        {/* Top micro-labels */}
        <div className="flex justify-between items-start pt-10 xl:pt-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Ourense · Cdmx</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Est. 2014</p>
        </div>

        {/* Massive kinetic title */}
        <div className="flex-1 flex items-center">
          <h1 className="font-bold tracking-[-0.035em] leading-none w-full" style={{ fontSize: "clamp(3rem, 9.6vw, 155px)" }}>
            {HERO_LINES.map((line, i) => (
              <div key={i} className="hw block leading-[0.9]">
                {i === 2 ? (
                  <>NO PUEDEN<span className="text-[#A80110]">.</span></>
                ) : line}
              </div>
            ))}
          </h1>
        </div>

        {/* Bottom info strip */}
        <div>
          <div className="hero-rule h-px bg-[#0A0A0A] mb-7" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex gap-8 sm:gap-14 flex-wrap">
              {[
                { label: "Sede",        val: "Ciudad de México" },
                { label: "Experiencia", val: "+10 Años"          },
                { label: "Cobertura",   val: "Nacional"          },
              ].map(({ label, val }) => (
                <div key={label} className="hero-sub">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#888] mb-1">{label}</p>
                  <p className="text-sm font-bold">{val}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contacto"
              className="hero-sub inline-flex items-center gap-3 bg-[#A80110] text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.18em] px-8 py-4 transition-colors duration-200 hover:bg-[#8a010d] active:scale-[0.98] shrink-0 w-max"
            >
              Iniciar proyecto <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ════════════════════════════════════════════════ */}
      <section className="marquee-wrap border-y border-[#0A0A0A] py-[14px] overflow-hidden">
        <div
          ref={marqueeRef}
          style={{ display: "flex", width: "max-content" }}
        >
          {[0, 1, 2, 3].map((k) => (
            <span
              key={k}
              className="font-bold text-[12px] uppercase tracking-[0.22em] whitespace-nowrap"
              style={{ paddingRight: 0 }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════ */}
      <section className="stats-section px-6 xl:px-16 py-24 xl:py-44">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6">
          {[
            { num: "+10",  label: "Años de experiencia en México" },
            { num: "100%", label: "Proyectos con supervisión continua" },
            { num: "6",    label: "Líneas de servicio en una sola empresa" },
          ].map(({ num, label }, i) => (
            <div
              key={num}
              className="stat-item"
              style={{ marginTop: i === 1 ? "clamp(0px, 5vw, 72px)" : 0 }}
            >
              <div
                className="font-bold leading-none tracking-[-0.045em]"
                style={{ fontSize: "clamp(5.5rem, 13vw, 190px)" }}
              >
                {num}
              </div>
              <div className="h-px bg-[#0A0A0A] mt-4 mb-3" />
              <p className="text-sm text-[#555] leading-snug max-w-[220px]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MANIFESTO ══════════════════════════════════════════════ */}
      <section className="manifesto-section px-6 xl:px-16 py-20 xl:py-36 border-t border-[#0A0A0A]">
        <div className="max-w-[1000px]">
          <p
            className="font-bold leading-[1.28] tracking-[-0.015em]"
            style={{ fontSize: "clamp(1.6rem, 3.8vw, 58px)" }}
          >
            {MANIFESTO_WORDS.map((word, i) => (
              <span key={i} className="mw inline-block" style={{ marginRight: "0.28em" }}>
                {word}
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* ══ SERVICES ═══════════════════════════════════════════════ */}
      <section className="services-section border-t border-[#0A0A0A]">
        <div className="px-6 xl:px-16 py-10 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Servicios</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">06 líneas</p>
        </div>

        {SERVICES.map((s) => (
          <Link
            key={s.num}
            href={`/servicios/${s.slug}`}
            className="service-row group block border-t border-[#0A0A0A] transition-colors duration-[180ms] hover:bg-[#0A0A0A]"
          >
            <div className="px-6 xl:px-16 py-6 xl:py-8 flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-5 xl:gap-10">
                <span className="text-[11px] tracking-[0.22em] text-[#888] group-hover:text-[#A80110] transition-colors duration-[180ms] shrink-0 font-bold">
                  {s.num}
                </span>
                <div>
                  <span
                    className="font-bold text-[#0A0A0A] group-hover:text-[#F8F8F6] transition-colors duration-[180ms] leading-tight block"
                    style={{ fontSize: "clamp(1.1rem, 2.8vw, 44px)" }}
                  >
                    {s.name}
                  </span>
                  <span className="text-sm text-[#888] group-hover:text-[#666] transition-colors duration-[180ms] mt-1 block">
                    {s.desc}
                  </span>
                </div>
              </div>
              <span
                className="text-xl xl:text-3xl text-[#0A0A0A] group-hover:text-[#F8F8F6] transition-colors duration-[180ms] shrink-0"
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
          </Link>
        ))}

        <div className="border-t border-[#0A0A0A]" />
      </section>

      {/* ══ PORTFOLIO ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: "clamp(420px, 65vh, 860px)" }}>
        <Image
          src="/images/portfolio-preview.webp"
          alt="Vista aérea de proyecto de infraestructura terminado — Constructora Ourense"
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Left-to-center gradient so text is readable, right side shows image */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.55) 55%, rgba(10,10,10,0.12) 100%)" }}
        />
        <div className="relative z-10 flex flex-col justify-end px-6 xl:px-16 pb-14 xl:pb-24 text-[#F8F8F6]" style={{ minHeight: "clamp(420px, 65vh, 860px)" }}>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#F8F8F6]/50 mb-5">Portafolio</p>
          <h2
            className="font-bold tracking-[-0.025em] leading-[0.92] mb-10"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 104px)" }}
          >
            Proyectos que<br />definen ciudades.
          </h2>
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-3 border border-[#F8F8F6]/50 text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 transition-colors duration-200 hover:bg-[#F8F8F6] hover:text-[#0A0A0A] hover:border-[#F8F8F6] w-max"
          >
            Ver portafolio <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <section className="cta-section px-6 xl:px-16 py-24 xl:py-44 border-t border-[#0A0A0A]">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-16 xl:gap-8">

          {/* Big question */}
          <div>
            {["¿LISTO PARA", "CONSTRUIR?"].map((line, i) => (
              <div
                key={i}
                className="cta-hw font-bold leading-[0.9] tracking-[-0.035em]"
                style={{ fontSize: "clamp(3.2rem, 9vw, 145px)" }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Contact block */}
          <div className="flex flex-col gap-5 xl:items-end shrink-0">
            <p className="text-sm text-[#555] max-w-[280px] xl:text-right leading-relaxed">
              Contáctanos y recibe una propuesta personalizada para tu proyecto.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-4 bg-[#0A0A0A] text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.18em] px-10 py-5 transition-colors duration-200 hover:bg-[#A80110] active:scale-[0.98] w-max"
            >
              Solicitar cotización <span aria-hidden="true">→</span>
            </Link>
            <div className="flex gap-8 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#888] mb-1">Teléfono</p>
                <a href="tel:+525593542263" className="text-sm font-bold hover:text-[#A80110] transition-colors duration-150">
                  +52 (55) 9354 2263
                </a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#888] mb-1">Email</p>
                <a href="mailto:infoorg@oocsourense.com.mx" className="text-sm font-bold hover:text-[#A80110] transition-colors duration-150">
                  infoorg@oocsourense.com.mx
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MINI FOOTER ════════════════════════════════════════════ */}
      <footer className="px-6 xl:px-16 py-8 border-t border-[#0A0A0A] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-display-base, serif)" }} className="text-[#A80110] text-lg leading-none">O</span>
          <span className="font-bold text-[11px] uppercase tracking-[0.22em]">Ourense</span>
        </div>
        <p className="text-[11px] text-[#888]">
          Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, CDMX, C.P. 01030
        </p>
        <Link
          href="/"
          className="text-[11px] text-[#555] hover:text-[#0A0A0A] transition-colors uppercase tracking-[0.18em]"
        >
          ← Ver propuesta principal
        </Link>
      </footer>

    </div>
  );
}
