"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────── */
const SERVICES = [
  { num: "01", slug: "construccion",          name: "Construcción Integral",    desc: "De la cimentación al acabado final. Gestión completa del proyecto." },
  { num: "02", slug: "movimiento-de-tierras", name: "Movimiento de Tierras",    desc: "Excavación, nivelación y compactación con maquinaria especializada." },
  { num: "03", slug: "colados-y-precolados",  name: "Colados y Precolados",     desc: "Alta resistencia estructural, in situ o prefabricados en planta controlada." },
  { num: "04", slug: "ingenierias",           name: "Ingenierías",              desc: "Diseño estructural y supervisión técnica continua en cada etapa." },
  { num: "05", slug: "interiorismo",          name: "Interiorismo",             desc: "Espacios corporativos y comerciales listos para uso inmediato." },
  { num: "06", slug: "renta-de-maquinaria",   name: "Renta de Maquinaria",     desc: "Equipos de última generación para cada fase de la obra." },
];

const HERO_LINES = ["CONSTRUIMOS", "LO QUE OTROS", "NO PUEDEN."];

const MARQUEE_TEXT =
  "CONSTRUCCIÓN  ×  INGENIERÍAS  ×  MOVIMIENTO DE TIERRAS  ×  COLADOS  ×  INTERIORISMO  ×  MAQUINARIA  ×  ";

const MANIFESTO_WORDS =
  "Somos la constructora que otros contratan cuando el proyecto es demasiado importante para dejarlo al azar. Más de diez años construyendo en Ciudad de México y a nivel nacional, con supervisión técnica continua en cada etapa.".split(" ");

const PROJECTS = [
  {
    id: "01",
    name: "Torre Corporativa Insurgentes",
    category: "Construcción Integral",
    location: "Col. Florida · CDMX",
    year: "2024",
    image: "/images/hero-home.webp",
    area: "24,800 m²",
  },
  {
    id: "02",
    name: "Plataforma Industrial Vallejo",
    category: "Movimiento de Tierras",
    location: "Azcapotzalco · CDMX",
    year: "2023",
    image: "/images/service-movimiento-tierras.webp",
    area: "40,000 m²",
  },
  {
    id: "03",
    name: "Oficinas Corporativas Polanco",
    category: "Ingeniería y Acabados",
    location: "Miguel Hidalgo · CDMX",
    year: "2023",
    image: "/images/service-ingenieria.webp",
    area: "8,200 m²",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Diagnóstico técnico",
    body: "Analizamos el sitio, el suelo y las necesidades del proyecto antes de comprometer un solo peso. Sin supuestos.",
  },
  {
    num: "02",
    title: "Proyecto ejecutivo",
    body: "Desarrollamos la ingeniería completa: estructura, MEP, acabados y cronograma con holgura técnica real.",
  },
  {
    num: "03",
    title: "Ejecución con supervisión",
    body: "Residentes de obra propios en sitio todos los días. Nunca delegamos la supervisión a terceros.",
  },
  {
    num: "04",
    title: "Entrega sin sorpresas",
    body: "Documentamos cada etapa y entregamos con garantía. El cliente recibe lo que firmó, en el plazo acordado.",
  },
];

/* ─── Component ──────────────────────────────────────────── */
export function ProposalPage() {
  const rootRef    = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {

      /* Hero words */
      gsap.from(".hw", {
        opacity: 0,
        y: 28,
        stagger: 0.06,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.15,
      });

      /* Hero rule */
      gsap.from(".hero-rule", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.4,
        ease: "power4.out",
        delay: 0.75,
      });

      /* Hero sub */
      gsap.from(".hero-sub", {
        opacity: 0,
        y: 18,
        stagger: 0.07,
        duration: 0.9,
        ease: "power3.out",
        delay: 1.1,
      });

      /* Marquee scroll scrub */
      if (marqueeRef.current) {
        const track  = marqueeRef.current;
        const offset = track.scrollWidth / 4;
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

      /* Stats */
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

      /* About image + text */
      gsap.from(".about-img", {
        opacity: 0,
        scale: 1.04,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-section", start: "top 75%", once: true },
      });
      gsap.from(".about-text", {
        opacity: 0,
        x: 32,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-section", start: "top 72%", once: true },
      });

      /* Manifesto word scrub */
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

      /* Process steps */
      gsap.from(".process-step", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 78%",
          once: true,
        },
      });

      /* Services */
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

      /* Project cards */
      gsap.from(".proj-card", {
        opacity: 0,
        y: 48,
        stagger: 0.13,
        duration: 1.0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
          once: true,
        },
      });

      /* Testimonial */
      gsap.from(".testimonial-quote", {
        opacity: 0,
        y: 36,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonial-section",
          start: "top 72%",
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

      {/* ══ NAV ════════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 xl:px-16 bg-[#F8F8F6]/90"
        style={{ height: "64px", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(10,10,10,0.1)" }}
      >
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-display-base, serif)" }} className="text-[#A80110] text-xl leading-none select-none">O</span>
          <span className="font-bold text-xs uppercase tracking-[0.22em]">Ourense</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {["Nosotros", "Servicios", "Portafolio", "Contacto"].map(item => (
            <Link key={item} href={`/${item.toLowerCase()}`}
              className="text-[11px] uppercase tracking-[0.18em] text-[#555] hover:text-[#0A0A0A] transition-colors duration-150">
              {item}
            </Link>
          ))}
        </div>

        <Link
          href="/contacto"
          className="text-[11px] font-bold uppercase tracking-[0.18em] border border-[#0A0A0A] px-5 py-2.5 transition-colors duration-150 hover:bg-[#0A0A0A] hover:text-[#F8F8F6]"
        >
          Cotizar
        </Link>
      </nav>

      {/* ══ HERO — split: tipo izq, imagen der ══════════════════════ */}
      <section className="min-h-[100dvh] pt-[64px] grid grid-cols-1 lg:grid-cols-2">

        {/* Left: type + info */}
        <div className="flex flex-col justify-between px-6 xl:px-16 py-12 xl:py-16">
          <div className="flex justify-between items-start pt-6 xl:pt-10">
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Ourense · CDMX</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Est. 2014</p>
          </div>

          <div className="py-10">
            <h1 className="font-bold tracking-[-0.035em] leading-none" style={{ fontSize: "clamp(3rem, 8vw, 120px)" }}>
              {HERO_LINES.map((line, i) => (
                <div key={i} className="hw block leading-[0.9]">
                  {i === 2 ? (
                    <>NO PUEDEN<span className="text-[#A80110]">.</span></>
                  ) : line}
                </div>
              ))}
            </h1>
          </div>

          <div>
            <div className="hero-rule h-px bg-[#0A0A0A] mb-7" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex gap-8 flex-wrap">
                {[
                  { label: "Sede",        val: "Ciudad de México" },
                  { label: "Experiencia", val: "+10 Años" },
                  { label: "Cobertura",   val: "Nacional" },
                ].map(({ label, val }) => (
                  <div key={label} className="hero-sub">
                    <p className="text-[10px] uppercase tracking-[0.24em] text-[#888] mb-1">{label}</p>
                    <p className="text-sm font-bold">{val}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/contacto"
                className="hero-sub inline-flex items-center gap-3 bg-[#A80110] text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.18em] px-7 py-4 hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200 shrink-0 w-max"
              >
                Iniciar proyecto →
              </Link>
            </div>
          </div>
        </div>

        {/* Right: hero image */}
        <div className="relative hidden lg:block overflow-hidden" style={{ minHeight: "600px" }}>
          <Image
            src="/images/hero-home.webp"
            alt="Proyecto de construcción — Constructora Ourense Ciudad de México"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(248,248,246,0.18) 0%, rgba(248,248,246,0) 40%)" }}
          />
          {/* Year badge */}
          <div
            className="absolute bottom-10 right-8 text-right"
          >
            <p className="text-white/50 font-bold uppercase text-[10px] tracking-[0.22em] mb-1">Último proyecto</p>
            <p className="text-white font-bold text-sm">Torre Insurgentes · 2024</p>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ════════════════════════════════════════════════ */}
      <section className="marquee-wrap border-y border-[#0A0A0A] py-[14px] overflow-hidden">
        <div ref={marqueeRef} style={{ display: "flex", width: "max-content" }}>
          {[0, 1, 2, 3].map((k) => (
            <span key={k} className="font-bold text-[12px] uppercase tracking-[0.22em] whitespace-nowrap">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </section>

      {/* ══ STATS ══════════════════════════════════════════════════ */}
      <section className="stats-section px-6 xl:px-16 py-24 xl:py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6">
          {[
            { num: "+10",  label: "Años de experiencia en México" },
            { num: "100%", label: "Proyectos con supervisión continua" },
            { num: "6",    label: "Líneas de servicio en una sola empresa" },
          ].map(({ num, label }, i) => (
            <div key={num} className="stat-item" style={{ marginTop: i === 1 ? "clamp(0px, 5vw, 64px)" : 0 }}>
              <div className="font-bold leading-none tracking-[-0.045em]" style={{ fontSize: "clamp(5.5rem, 13vw, 180px)" }}>
                {num}
              </div>
              <div className="h-px bg-[#0A0A0A] mt-4 mb-3" />
              <p className="text-sm text-[#555] leading-snug max-w-[220px]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ ABOUT / NOSOTROS ═══════════════════════════════════════ */}
      <section className="about-section border-t border-[#0A0A0A] grid grid-cols-1 lg:grid-cols-2">

        {/* Image */}
        <div className="about-img relative overflow-hidden" style={{ minHeight: "clamp(300px, 55vh, 680px)" }}>
          <Image
            src="/images/about-section.webp"
            alt="Equipo Ourense en obra — supervisión técnica en Ciudad de México"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.12)" }} />
        </div>

        {/* Text */}
        <div className="px-6 xl:px-16 py-16 xl:py-24 flex flex-col justify-center gap-8">
          <p className="about-text text-[11px] uppercase tracking-[0.22em] text-[#888]">Nosotros</p>
          <h2
            className="about-text font-bold leading-[1.0] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 52px)" }}
          >
            Más de diez años construyendo lo que importa.
          </h2>
          <div className="about-text space-y-4">
            <p className="text-[#555] leading-relaxed" style={{ fontSize: "15px" }}>
              Ourense nació para resolver lo que otros no pueden: proyectos complejos, cronogramas exigentes, suelos difíciles. Nuestro equipo combina ingeniería de alto nivel con presencia constante en obra.
            </p>
            <p className="text-[#555] leading-relaxed" style={{ fontSize: "15px" }}>
              Operamos con maquinaria propia, sin subcontratistas de tercero nivel. Esto nos da control total sobre calidad, tiempos y costos.
            </p>
          </div>
          <div className="about-text grid grid-cols-2 gap-6 pt-4">
            {[
              { val: "CDMX",     label: "Sede principal" },
              { val: "Nacional", label: "Cobertura" },
              { val: "14",       label: "Unidades de maquinaria propia" },
              { val: "±5 cm",    label: "Tolerancia de nivelación" },
            ].map(({ val, label }) => (
              <div key={label} className="border-t border-[#0A0A0A]/10 pt-4">
                <p className="font-bold text-lg">{val}</p>
                <p className="text-[11px] text-[#888] uppercase tracking-[0.18em] mt-0.5">{label}</p>
              </div>
            ))}
          </div>
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

      {/* ══ PROCESS ════════════════════════════════════════════════ */}
      <section className="process-section border-t border-[#0A0A0A] bg-[#0A0A0A] text-[#F8F8F6]">
        <div className="px-6 xl:px-16 py-12 flex items-center justify-between border-b border-[#F8F8F6]/10">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#F8F8F6]/40">Nuestro proceso</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#F8F8F6]/40">04 etapas</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#F8F8F6]/10">
          {PROCESS.map((step) => (
            <div key={step.num} className="process-step px-6 xl:px-10 py-10 xl:py-14 flex flex-col gap-6">
              <span className="font-bold text-[#A80110]" style={{ fontSize: "11px", letterSpacing: "0.22em" }}>
                {step.num}
              </span>
              <h3 className="font-bold leading-tight" style={{ fontSize: "clamp(1rem, 1.8vw, 22px)" }}>
                {step.title}
              </h3>
              <p className="text-[#F8F8F6]/50 leading-relaxed text-sm">{step.body}</p>
            </div>
          ))}
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
            className="service-row group block border-t border-[#0A0A0A] hover:bg-[#0A0A0A] transition-colors duration-[180ms]"
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
              <span className="text-xl xl:text-3xl text-[#0A0A0A] group-hover:text-[#F8F8F6] transition-colors duration-[180ms] shrink-0" aria-hidden="true">
                ↗
              </span>
            </div>
          </Link>
        ))}
        <div className="border-t border-[#0A0A0A]" />
      </section>

      {/* ══ FEATURED PROJECTS ══════════════════════════════════════ */}
      <section className="projects-section border-t border-[#0A0A0A]">
        <div className="px-6 xl:px-16 py-10 flex items-center justify-between">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Proyectos destacados</p>
          <Link
            href="/portafolio"
            className="text-[11px] uppercase tracking-[0.18em] text-[#555] hover:text-[#0A0A0A] transition-colors duration-150"
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#0A0A0A]">
          {PROJECTS.map((p, i) => (
            <div
              key={p.id}
              className="proj-card group relative overflow-hidden bg-[#F8F8F6]"
              style={{ aspectRatio: i === 0 ? "4/5" : "4/5" }}
            >
              <Image
                src={p.image}
                alt={`${p.name} — Constructora Ourense`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              {/* Gradient */}
              <div
                className="absolute inset-0 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.1) 55%)" }}
              />
              {/* Info */}
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#F8F8F6]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-2">
                  {p.category} · {p.year}
                </p>
                <h3 className="font-bold leading-tight mb-1" style={{ fontSize: "clamp(1rem, 2vw, 26px)" }}>
                  {p.name}
                </h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-white/50 text-[11px]">{p.location}</span>
                  <span className="font-bold text-[11px] tracking-[0.12em] bg-[#A80110] px-3 py-1">
                    {p.area}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIAL ════════════════════════════════════════════ */}
      <section className="testimonial-section relative overflow-hidden border-t border-[#0A0A0A]"
        style={{ minHeight: "clamp(380px, 55vh, 640px)" }}>
        <Image
          src="/images/testimonials-bg.webp"
          alt="Obra terminada — Constructora Ourense"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(10,10,10,0.74)" }}
        />
        <div
          className="relative z-10 flex flex-col justify-center px-6 xl:px-16 py-24 xl:py-32 text-[#F8F8F6]"
          style={{ minHeight: "clamp(380px, 55vh, 640px)" }}
        >
          <div
            className="testimonial-quote max-w-[800px]"
          >
            <div className="w-8 h-[2px] bg-[#A80110] mb-10" />
            <blockquote
              className="font-bold leading-[1.2] tracking-[-0.02em] mb-10"
              style={{ fontSize: "clamp(1.4rem, 3vw, 44px)" }}
            >
              &ldquo;Ourense transformó un proyecto complejo en una entrega sin sorpresas. Su presencia técnica en obra todos los días hizo la diferencia.&rdquo;
            </blockquote>
            <div>
              <p className="font-bold text-sm">Arq. Luis Herrera</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#F8F8F6]/40 mt-1">
                Director de Desarrollos · Grupo Inversionista del Centro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PORTFOLIO FULL IMAGE ════════════════════════════════════ */}
      <section className="relative overflow-hidden border-t border-[#0A0A0A]" style={{ minHeight: "clamp(420px, 60vh, 760px)" }}>
        <Image
          src="/images/portfolio-preview.webp"
          alt="Vista de proyecto de infraestructura terminado — Constructora Ourense"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.5) 55%, rgba(10,10,10,0.1) 100%)" }}
        />
        <div
          className="relative z-10 flex flex-col justify-end px-6 xl:px-16 pb-14 xl:pb-24 text-[#F8F8F6]"
          style={{ minHeight: "clamp(420px, 60vh, 760px)" }}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#F8F8F6]/40 mb-5">Portafolio</p>
          <h2
            className="font-bold tracking-[-0.025em] leading-[0.92] mb-10"
            style={{ fontSize: "clamp(2.2rem, 6.5vw, 104px)" }}
          >
            Proyectos que<br />definen ciudades.
          </h2>
          <Link
            href="/portafolio"
            className="inline-flex items-center gap-3 border border-[#F8F8F6]/50 text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-4 hover:bg-[#F8F8F6] hover:text-[#0A0A0A] hover:border-[#F8F8F6] transition-colors duration-200 w-max"
          >
            Ver portafolio →
          </Link>
        </div>
      </section>

      {/* ══ CTA ════════════════════════════════════════════════════ */}
      <section className="cta-section px-6 xl:px-16 py-24 xl:py-40 border-t border-[#0A0A0A]">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-16 xl:gap-8">

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

          <div className="flex flex-col gap-5 xl:items-end shrink-0">
            <p className="text-sm text-[#555] max-w-[280px] xl:text-right leading-relaxed">
              Contáctanos y recibe una propuesta personalizada para tu proyecto en 48 horas.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-4 bg-[#0A0A0A] text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.18em] px-10 py-5 hover:bg-[#A80110] active:scale-[0.98] transition-all duration-200 w-max"
            >
              Solicitar cotización →
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

      {/* ══ FOOTER ═════════════════════════════════════════════════ */}
      <footer className="px-6 xl:px-16 py-8 border-t border-[#0A0A0A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "var(--font-display-base, serif)" }} className="text-[#A80110] text-lg leading-none">O</span>
            <span className="font-bold text-[11px] uppercase tracking-[0.22em]">Ourense</span>
          </div>
          <p className="text-[11px] text-[#888]">
            Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, CDMX
          </p>
          <div className="flex items-center gap-6">
            <Link href="/propuesta-3" className="text-[11px] text-[#555] hover:text-[#0A0A0A] transition-colors uppercase tracking-[0.18em]">
              Ver propuesta 3
            </Link>
            <Link href="/" className="text-[11px] text-[#555] hover:text-[#0A0A0A] transition-colors uppercase tracking-[0.18em]">
              ← Inicio
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
