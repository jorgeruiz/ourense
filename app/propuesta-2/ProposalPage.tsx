"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ──────────────────────────────────────────────────────────── */

const HERO_IMAGES = [
  "/images/hero-home.webp",
  "/images/about-section.webp",
  "/images/portfolio-preview.webp",
];

const MARQUEE_TEXT =
  "CONSTRUCCIÓN  ×  INGENIERÍAS  ×  MOVIMIENTO DE TIERRAS  ×  COLADOS  ×  INTERIORISMO  ×  MAQUINARIA  ×  ";

const MANIFESTO_WORDS =
  "Somos la constructora que otros contratan cuando el proyecto es demasiado importante para dejarlo al azar. Más de diez años construyendo en Ciudad de México y a nivel nacional, con supervisión técnica continua en cada etapa.".split(
    " "
  );

const SERVICES = [
  { num: "01", slug: "construccion",          name: "Construcción Integral",  desc: "De la cimentación al acabado final. Gestión completa del proyecto.",          image: "/images/service-construccion.webp" },
  { num: "02", slug: "movimiento-de-tierras", name: "Movimiento de Tierras",  desc: "Excavación, nivelación y compactación con maquinaria especializada.",         image: "/images/service-movimiento-tierras.webp" },
  { num: "03", slug: "colados-y-precolados",  name: "Colados y Precolados",   desc: "Alta resistencia estructural, in situ o prefabricados en planta controlada.", image: "/images/hero-home.webp" },
  { num: "04", slug: "ingenierias",           name: "Ingenierías",            desc: "Diseño estructural y supervisión técnica continua en cada etapa.",             image: "/images/service-ingenieria.webp" },
  { num: "05", slug: "interiorismo",          name: "Interiorismo",           desc: "Espacios corporativos y comerciales listos para uso inmediato.",               image: "/images/about-section.webp" },
  { num: "06", slug: "renta-de-maquinaria",   name: "Renta de Maquinaria",   desc: "Equipos de última generación para cada fase de la obra.",                     image: "/images/service-movimiento-tierras.webp" },
];

const PROCESS = [
  {
    num: "01",
    title: ["DIAGNÓSTICO", "TÉCNICO."],
    body: "Analizamos el sitio, el suelo y las necesidades antes de comprometer un solo peso. Sin supuestos ni estimaciones genéricas.",
    image: "/images/service-ingenieria.webp",
  },
  {
    num: "02",
    title: ["PROYECTO", "EJECUTIVO."],
    body: "Desarrollamos la ingeniería completa: estructura, MEP, acabados y cronograma con holgura técnica real. Todo documentado y firmado.",
    image: "/images/about-section.webp",
  },
  {
    num: "03",
    title: ["EJECUCIÓN", "CONTINUA."],
    body: "Residentes de obra propios en sitio todos los días. Nunca delegamos la supervisión. Control total sobre calidad y avance.",
    image: "/images/service-construccion.webp",
  },
  {
    num: "04",
    title: ["ENTREGA SIN", "SORPRESAS."],
    body: "Documentamos cada etapa y entregamos con garantía. El cliente recibe lo que firmó, en el plazo acordado, sin cargos extras.",
    image: "/images/portfolio-preview.webp",
  },
];

const TESTIMONIALS = [
  {
    quote: "Ourense transformó un proyecto complejo en una entrega sin sorpresas. Su presencia técnica en obra todos los días hizo la diferencia.",
    author: "Arq. Luis Herrera",
    role: "Director de Desarrollos · Grupo Inversionista del Centro",
    image: "/images/testimonials-bg.webp",
  },
  {
    quote: "Tienen la maquinaria, el equipo y, sobre todo, la disciplina para cumplir. En ocho meses no hubo un solo ajuste al programa de obra.",
    author: "Ing. Carmen Villanueva",
    role: "Directora de Proyectos · Parque Industrial Vallejo Norte",
    image: "/images/portfolio-preview.webp",
  },
  {
    quote: "El nivel de detalle que Ourense mantiene en obra, desde la estructura hasta los acabados finales, es lo que distingue a una constructora seria.",
    author: "Dir. de Infraestructura",
    role: "Cliente confidencial, sector financiero",
    image: "/images/about-section.webp",
  },
];

const PROJECTS = [
  { id: "01", name: "Torre Corporativa Insurgentes", category: "Construcción Integral",  location: "Col. Florida · CDMX",    year: "2024", image: "/images/hero-home.webp",                   area: "24,800 m²" },
  { id: "02", name: "Plataforma Industrial Vallejo",  category: "Movimiento de Tierras", location: "Azcapotzalco · CDMX",    year: "2023", image: "/images/service-movimiento-tierras.webp",  area: "40,000 m²" },
  { id: "03", name: "Oficinas Corporativas Polanco",  category: "Ingeniería y Acabados", location: "Miguel Hidalgo · CDMX",  year: "2023", image: "/images/service-ingenieria.webp",          area: "8,200 m²" },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function ProposalPage() {
  const rootRef    = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  /* Hero slider */
  const heroImgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const heroCurrentRef = useRef(0);
  const heroTimer      = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Process sticky */
  const processWrapRef    = useRef<HTMLDivElement>(null);
  const stepContentRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const stepDotRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const processProgressRef = useRef<HTMLDivElement>(null);
  const processCounterRef  = useRef<HTMLSpanElement>(null);

  /* Services */
  const serviceRowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const serviceImgRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Testimonials */
  const testimonialSlideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialDotRefs   = useRef<(HTMLButtonElement | null)[]>([]);
  const testimonialCurrentRef = useRef(0);
  const testimonialTimer      = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Helper: switch testimonial ────────────────────────────────── */
  const switchTestimonial = (next: number) => {
    const cur   = testimonialCurrentRef.current;
    if (next === cur) return;
    const curEl = testimonialSlideRefs.current[cur];
    const nxtEl = testimonialSlideRefs.current[next];
    if (curEl) gsap.to(curEl, { opacity: 0, duration: 1.0, ease: "power2.inOut" });
    if (nxtEl) gsap.to(nxtEl, { opacity: 1, duration: 1.0, ease: "power2.inOut" });
    testimonialDotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, {
        width: i === next ? "28px" : "8px",
        backgroundColor: i === next ? "#A80110" : "rgba(255,255,255,0.3)",
        duration: 0.35, ease: "power2.out",
      });
    });
    testimonialCurrentRef.current = next;
  };

  const startTestimonialTimer = () => {
    if (testimonialTimer.current) clearInterval(testimonialTimer.current);
    testimonialTimer.current = setInterval(() => {
      const next = (testimonialCurrentRef.current + 1) % TESTIMONIALS.length;
      switchTestimonial(next);
    }, 6000);
  };

  const goToTestimonial = (i: number) => {
    switchTestimonial(i);
    startTestimonialTimer(); // reset timer on manual nav
  };

  /* ── Main effect ───────────────────────────────────────────────── */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ── Hero images init ──────────────────────────────────────── */
    heroImgRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });
    if (!reduce) {
      heroTimer.current = setInterval(() => {
        const cur = heroCurrentRef.current;
        const nxt = (cur + 1) % HERO_IMAGES.length;
        if (heroImgRefs.current[cur]) gsap.to(heroImgRefs.current[cur]!, { opacity: 0, duration: 1.6, ease: "power2.inOut" });
        if (heroImgRefs.current[nxt]) gsap.to(heroImgRefs.current[nxt]!, { opacity: 1, duration: 1.6, ease: "power2.inOut" });
        heroCurrentRef.current = nxt;
      }, 5000);
    }

    /* ── Testimonials init ─────────────────────────────────────── */
    testimonialSlideRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });
    testimonialDotRefs.current.forEach((dot, i) => {
      if (dot) gsap.set(dot, { width: i === 0 ? "28px" : "8px", backgroundColor: i === 0 ? "#A80110" : "rgba(255,255,255,0.3)" });
    });
    startTestimonialTimer();

    /* ── Services: circle clip-path on hover ───────────────────── */
    const svcCleanups: (() => void)[] = [];
    serviceRowRefs.current.forEach((row, i) => {
      const imgWrap = serviceImgRefs.current[i];
      if (!row || !imgWrap) return;
      gsap.set(imgWrap, { clipPath: "circle(0% at 25% 50%)" });

      const onEnter = () => {
        gsap.to(imgWrap, { clipPath: "circle(150% at 25% 50%)", duration: 0.65, ease: "power3.out" });
        row.querySelectorAll<HTMLElement>(".svc-num,.svc-name,.svc-desc,.svc-arrow").forEach(el => {
          gsap.to(el, { color: "#F8F8F6", duration: 0.2 });
        });
      };
      const onLeave = () => {
        gsap.to(imgWrap, { clipPath: "circle(0% at 25% 50%)", duration: 0.5, ease: "power3.in" });
        const num   = row.querySelector<HTMLElement>(".svc-num");
        const name  = row.querySelector<HTMLElement>(".svc-name");
        const desc  = row.querySelector<HTMLElement>(".svc-desc");
        const arrow = row.querySelector<HTMLElement>(".svc-arrow");
        if (num)   gsap.to(num,   { color: "#888888", duration: 0.3 });
        if (name)  gsap.to(name,  { color: "#0A0A0A", duration: 0.3 });
        if (desc)  gsap.to(desc,  { color: "#888888", duration: 0.3 });
        if (arrow) gsap.to(arrow, { color: "#0A0A0A", duration: 0.3 });
      };
      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      svcCleanups.push(() => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      });
    });

    /* ── GSAP context (ScrollTriggers + entrance animations) ───── */
    const ctx = gsap.context(() => {

      if (!reduce) {
        /* Hero entrance */
        gsap.from(".hw",        { opacity: 0, y: 28,  stagger: 0.06, duration: 1.1, ease: "power3.out", delay: 0.2 });
        gsap.from(".hero-rule", { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "power4.out", delay: 0.8 });
        gsap.from(".hero-sub",  { opacity: 0, y: 18,  stagger: 0.07, duration: 0.9, ease: "power3.out", delay: 1.2 });

        /* Marquee scrub */
        if (marqueeRef.current) {
          const offset = marqueeRef.current.scrollWidth / 4;
          gsap.to(marqueeRef.current, {
            x: -offset, ease: "none",
            scrollTrigger: { trigger: ".marquee-wrap", start: "top bottom", end: "bottom top", scrub: 2 },
          });
        }

        /* Stats stagger */
        gsap.from(".stat-item", {
          opacity: 0, y: 56, stagger: 0.14, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: ".stats-section", start: "top 78%", once: true },
        });

        /* Manifesto word scrub */
        gsap.from(".mw", {
          opacity: 0.08, stagger: 0.03, duration: 0.25, ease: "none",
          scrollTrigger: { trigger: ".manifesto-section", start: "top 55%", end: "bottom 45%", scrub: 1 },
        });

        /* Nosotros */
        gsap.from(".about-img", {
          opacity: 0, scale: 1.04, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: ".about-section", start: "top 75%", once: true },
        });
        gsap.from(".about-text", {
          opacity: 0, x: 28, stagger: 0.08, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".about-section", start: "top 72%", once: true },
        });

        /* Projects */
        gsap.from(".proj-card", {
          opacity: 0, y: 48, stagger: 0.13, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-section", start: "top 80%", once: true },
        });

        /* CTA */
        gsap.from(".cta-hw", {
          opacity: 0, y: 28, stagger: 0.065, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 78%", once: true },
        });
      }

      /* ── Sticky process ──────────────────────────────────────── */
      if (processWrapRef.current) {
        /* Init content layers */
        stepContentRefs.current.forEach((el, i) => {
          if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 40 });
        });
        /* Init dots */
        stepDotRefs.current.forEach((dot, i) => {
          if (dot) gsap.set(dot, {
            backgroundColor: i === 0 ? "#A80110" : "rgba(10,10,10,0.15)",
            width: i === 0 ? "24px" : "6px",
          });
        });

        let curStep = 0;

        ScrollTrigger.create({
          trigger: processWrapRef.current,
          start: "top top",
          end: "bottom bottom",
          snap: {
            snapTo: [0, 1 / 3, 2 / 3, 1],
            duration: { min: 0.3, max: 0.65 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          onUpdate(self) {
            /* Progress bar */
            if (processProgressRef.current) {
              gsap.set(processProgressRef.current, { scaleX: self.progress, transformOrigin: "left center" });
            }

            const newStep = Math.min(PROCESS.length - 1, Math.floor(self.progress * PROCESS.length + 0.02));
            if (newStep === curStep) return;

            const dir = newStep > curStep ? 1 : -1;

            /* Fade out old */
            const oldEl = stepContentRefs.current[curStep];
            if (oldEl) gsap.to(oldEl, { opacity: 0, y: -30 * dir, duration: 0.3, ease: "power2.in" });

            /* Fade in new */
            const newEl = stepContentRefs.current[newStep];
            if (newEl) gsap.fromTo(newEl,
              { opacity: 0, y: 30 * dir },
              { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.15 }
            );

            /* Dots */
            stepDotRefs.current.forEach((dot, i) => {
              if (!dot) return;
              gsap.to(dot, {
                backgroundColor: i <= newStep ? "#A80110" : "rgba(10,10,10,0.15)",
                width: i === newStep ? "24px" : "6px",
                duration: 0.35, ease: "power2.out",
              });
            });

            /* Counter */
            if (processCounterRef.current) {
              processCounterRef.current.textContent = `0${newStep + 1}`;
            }

            curStep = newStep;
          },
        });
      }

    }, rootRef);

    return () => {
      ctx.revert();
      if (heroTimer.current) clearInterval(heroTimer.current);
      if (testimonialTimer.current) clearInterval(testimonialTimer.current);
      svcCleanups.forEach(fn => fn());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    <div
      ref={rootRef}
      className="bg-[#F8F8F6] text-[#0A0A0A] overflow-x-hidden"
      style={{ fontFamily: "var(--font-sans-base, system-ui, sans-serif)" }}
    >

      {/* ══ NAV ═══════════════════════════════════════════════════════ */}
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
          className="text-[11px] font-bold uppercase tracking-[0.18em] border border-[#0A0A0A] px-5 py-2.5 hover:bg-[#0A0A0A] hover:text-[#F8F8F6] transition-colors duration-150"
        >
          Cotizar
        </Link>
      </nav>

      {/* ══ HERO — full-bleed image slider + text overlay ═════════════ */}
      <section className="relative overflow-hidden" style={{ height: "100dvh" }}>
        {/* Crossfading images */}
        {HERO_IMAGES.map((src, i) => (
          <div
            key={i}
            ref={el => { heroImgRefs.current[i] = el; }}
            className="absolute inset-0 will-change-[opacity]"
          >
            <Image
              src={src}
              alt="Constructora Ourense — proyecto en Ciudad de México"
              fill
              className="object-cover"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}

        {/* Persistent dark overlay — always above images */}
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.38) 55%, rgba(10,10,10,0.55) 100%)" }}
        />

        {/* Top meta */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between px-6 xl:px-16 pt-[80px]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Ourense · CDMX</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/45">Est. 2014</p>
        </div>

        {/* Headline */}
        <div className="absolute inset-0 z-20 flex items-center px-6 xl:px-16">
          <h1
            className="font-bold tracking-[-0.035em] leading-none text-[#F8F8F6]"
            style={{ fontSize: "clamp(2.8rem, 8.5vw, 140px)" }}
          >
            {(["CONSTRUIMOS", "LO QUE OTROS", null] as (string | null)[]).map((line, i) => (
              <div key={i} className="hw block leading-[0.9]">
                {i === 2
                  ? <>NO PUEDEN<span className="text-[#A80110]">.</span></>
                  : line}
              </div>
            ))}
          </h1>
        </div>

        {/* Bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 xl:px-16 pb-10">
          <div className="hero-rule h-px bg-white/20 mb-7" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex gap-8 sm:gap-14 flex-wrap">
              {[
                { label: "Sede",        val: "Ciudad de México" },
                { label: "Experiencia", val: "+10 Años" },
                { label: "Cobertura",   val: "Nacional" },
              ].map(({ label, val }) => (
                <div key={label} className="hero-sub">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/38 mb-1">{label}</p>
                  <p className="text-sm font-bold text-white">{val}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contacto"
              className="hero-sub inline-flex items-center gap-3 bg-[#A80110] text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.18em] px-8 py-4 hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200 shrink-0 w-max"
            >
              Iniciar proyecto →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ═══════════════════════════════════════════════════ */}
      <section className="marquee-wrap border-y border-[#0A0A0A] py-[14px] overflow-hidden">
        <div ref={marqueeRef} style={{ display: "flex", width: "max-content" }}>
          {[0, 1, 2, 3].map(k => (
            <span key={k} className="font-bold text-[12px] uppercase tracking-[0.22em] whitespace-nowrap">
              {MARQUEE_TEXT}
            </span>
          ))}
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════════════ */}
      <section className="stats-section px-6 xl:px-16 py-24 xl:py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-6">
          {[
            { num: "+10",  label: "Años de experiencia en México" },
            { num: "100%", label: "Proyectos con supervisión continua" },
            { num: "6",    label: "Líneas de servicio en una sola empresa" },
          ].map(({ num, label }, i) => (
            <div key={num} className="stat-item" style={{ marginTop: i === 1 ? "clamp(0px, 5vw, 64px)" : 0 }}>
              <div className="font-bold leading-none tracking-[-0.045em]" style={{ fontSize: "clamp(5rem, 12vw, 176px)" }}>
                {num}
              </div>
              <div className="h-px bg-[#0A0A0A] mt-4 mb-3" />
              <p className="text-sm text-[#555] leading-snug max-w-[220px]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MANIFESTO ═════════════════════════════════════════════════ */}
      <section className="manifesto-section px-6 xl:px-16 py-20 xl:py-36 border-t border-[#0A0A0A]">
        <div className="max-w-[1000px]">
          <p className="font-bold leading-[1.28] tracking-[-0.015em]" style={{ fontSize: "clamp(1.6rem, 3.8vw, 58px)" }}>
            {MANIFESTO_WORDS.map((word, i) => (
              <span key={i} className="mw inline-block" style={{ marginRight: "0.28em" }}>{word}</span>
            ))}
          </p>
        </div>
      </section>

      {/* ══ PROCESS — sticky scroll (4 × 100dvh) ══════════════════════
          Wrapper scrolls 400dvh. Sticky inner stays at viewport top.
          ScrollTrigger snaps between 4 steps as user scrolls through. */}
      <div
        ref={processWrapRef}
        className="border-t border-[#0A0A0A]"
        style={{ height: `calc(${PROCESS.length} * 100dvh)`, position: "relative" }}
      >
        <div
          className="sticky top-0 overflow-hidden bg-[#F8F8F6]"
          style={{ height: "100dvh" }}
        >
          {/* Stacked step panels — GSAP fades between them */}
          {PROCESS.map((step, i) => (
            <div
              key={i}
              ref={el => { stepContentRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{ paddingTop: "64px" /* nav */ }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

                {/* Left: number + title + body */}
                <div className="flex flex-col justify-center px-6 xl:px-16 py-12 xl:py-0">
                  <span
                    className="font-bold text-[#A80110] mb-5 block"
                    style={{ fontSize: "11px", letterSpacing: "0.26em" }}
                  >
                    {step.num}
                  </span>
                  <h2
                    className="font-bold leading-[0.88] tracking-[-0.045em] mb-8"
                    style={{ fontSize: "clamp(2.8rem, 7vw, 104px)" }}
                  >
                    {step.title.map((line, li) => <div key={li}>{line}</div>)}
                  </h2>
                  <div className="h-px max-w-[320px] bg-[#0A0A0A]/12 mb-8" />
                  <p
                    className="text-[#555] leading-relaxed max-w-[340px]"
                    style={{ fontSize: "clamp(0.9rem, 1.2vw, 16px)" }}
                  >
                    {step.body}
                  </p>
                </div>

                {/* Right: full image */}
                <div className="hidden lg:block relative overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.title.join(" ")}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  {/* Left-edge gradient to blend with light bg */}
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(to right, rgba(248,248,246,0.4) 0%, rgba(248,248,246,0) 28%)" }}
                  />
                </div>

              </div>
            </div>
          ))}

          {/* HUD: dots + counter + progress bar */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="px-6 xl:px-16 pb-8 flex items-center justify-between">
              {/* Step dots */}
              <div className="flex items-center gap-2">
                {PROCESS.map((_, i) => (
                  <span
                    key={i}
                    ref={el => { stepDotRefs.current[i] = el; }}
                    style={{
                      display: "inline-block",
                      height: "2px",
                      borderRadius: "1px",
                      backgroundColor: "rgba(10,10,10,0.15)",
                    }}
                  />
                ))}
              </div>
              {/* Counter */}
              <p className="font-bold text-[#888]" style={{ fontSize: "11px", letterSpacing: "0.22em" }}>
                <span ref={processCounterRef}>01</span>
                <span> / 0{PROCESS.length}</span>
              </p>
            </div>
            {/* Progress bar */}
            <div className="relative h-px bg-[#0A0A0A]/10">
              <div
                ref={processProgressRef}
                className="absolute inset-y-0 left-0 w-full bg-[#A80110]"
                style={{ transformOrigin: "left center", transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ══ SERVICES — circle clip-path image reveal on hover ═════════ */}
      <section className="services-section border-t border-[#0A0A0A]">
        <div className="px-6 xl:px-16 py-10 flex items-center justify-between border-b border-[#0A0A0A]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Servicios</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">06 líneas</p>
        </div>

        {SERVICES.map((s, i) => (
          <Link
            key={s.num}
            href={`/servicios/${s.slug}`}
            ref={el => { serviceRowRefs.current[i] = el; }}
            className="block relative overflow-hidden border-b border-[#0A0A0A]"
          >
            {/* Image layer — GSAP animates clip-path on hover */}
            <div
              ref={el => { serviceImgRefs.current[i] = el; }}
              className="absolute inset-0"
              style={{ zIndex: 0 }}
            >
              <Image src={s.image} alt={s.name} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.52)" }} />
            </div>

            {/* Text — relative, z above image */}
            <div className="relative z-10 px-6 xl:px-16 py-7 xl:py-9 flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-5 xl:gap-10">
                <span className="svc-num font-bold shrink-0" style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#888888" }}>
                  {s.num}
                </span>
                <div>
                  <span className="svc-name font-bold block leading-tight" style={{ fontSize: "clamp(1.1rem, 2.8vw, 44px)", color: "#0A0A0A" }}>
                    {s.name}
                  </span>
                  <span className="svc-desc block mt-1" style={{ fontSize: "14px", color: "#888888" }}>
                    {s.desc}
                  </span>
                </div>
              </div>
              <span className="svc-arrow shrink-0" style={{ fontSize: "clamp(1.2rem, 2.5vw, 32px)", color: "#0A0A0A" }} aria-hidden="true">
                ↗
              </span>
            </div>
          </Link>
        ))}
      </section>

      {/* ══ NOSOTROS ══════════════════════════════════════════════════ */}
      <section className="about-section border-t border-[#0A0A0A] grid grid-cols-1 lg:grid-cols-2">
        <div className="about-img relative overflow-hidden" style={{ minHeight: "clamp(300px, 55vh, 680px)" }}>
          <Image
            src="/images/about-section.webp"
            alt="Equipo Ourense en obra — supervisión técnica en Ciudad de México"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.1)" }} />
        </div>
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
              Operamos con maquinaria propia, sin subcontratistas de tercero nivel. Control total sobre calidad, tiempos y costos.
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

      {/* ══ TESTIMONIALS — crossfade image slider ═════════════════════ */}
      <section
        className="relative border-t border-[#0A0A0A] overflow-hidden"
        style={{ minHeight: "clamp(480px, 65vh, 760px)" }}
      >
        {/* Stacked slides: image + content per slide */}
        {TESTIMONIALS.map((t, i) => (
          <div
            key={i}
            ref={el => { testimonialSlideRefs.current[i] = el; }}
            className="absolute inset-0 will-change-[opacity]"
          >
            <Image
              src={t.image}
              alt="Testimonio de cliente — Constructora Ourense"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.72)" }} />

            {/* Quote content inside each slide */}
            <div
              className="relative z-10 flex flex-col justify-center px-6 xl:px-24 h-full text-[#F8F8F6]"
              style={{ minHeight: "clamp(480px, 65vh, 760px)" }}
            >
              <div className="max-w-[780px]">
                <div className="w-8 h-[2px] bg-[#A80110] mb-10" />
                <blockquote
                  className="font-bold leading-[1.22] tracking-[-0.02em] mb-10"
                  style={{ fontSize: "clamp(1.25rem, 2.8vw, 40px)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-bold text-sm">{t.author}</p>
                  <p
                    className="text-[#F8F8F6]/40 mt-1 uppercase font-bold"
                    style={{ fontSize: "11px", letterSpacing: "0.18em" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dot navigation — always on top */}
        <div
          className="absolute z-20 flex items-center gap-3"
          style={{ left: "clamp(1.5rem, 6vw, 6rem)", bottom: "2.5rem" }}
        >
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              ref={el => { testimonialDotRefs.current[i] = el; }}
              onClick={() => goToTestimonial(i)}
              aria-label={`Testimonio ${i + 1}`}
              style={{
                height: "2px",
                width: "8px",
                border: "none",
                cursor: "pointer",
                padding: 0,
                borderRadius: "1px",
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════════════════════ */}
      <section className="projects-section border-t border-[#0A0A0A]">
        <div className="px-6 xl:px-16 py-10 flex items-center justify-between border-b border-[#0A0A0A]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Proyectos destacados</p>
          <Link
            href="/portafolio"
            className="text-[11px] uppercase tracking-[0.18em] text-[#555] hover:text-[#0A0A0A] transition-colors duration-150"
          >
            Ver portafolio →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#0A0A0A]">
          {PROJECTS.map(p => (
            <div
              key={p.id}
              className="proj-card group relative overflow-hidden bg-[#F8F8F6]"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src={p.image}
                alt={`${p.name} — Constructora Ourense`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="33vw"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.06) 55%)" }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#F8F8F6]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-2">
                  {p.category} · {p.year}
                </p>
                <h3 className="font-bold leading-tight mb-3" style={{ fontSize: "clamp(1rem, 2vw, 26px)" }}>
                  {p.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-white/45">{p.location}</span>
                  <span className="font-bold text-[11px] tracking-[0.12em] bg-[#A80110] px-3 py-1">{p.area}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════ */}
      <section className="cta-section px-6 xl:px-16 py-24 xl:py-40 border-t border-[#0A0A0A]">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-16 xl:gap-8">
          <div>
            {["¿LISTO PARA", "CONSTRUIR?"].map((line, i) => (
              <div
                key={i}
                className="cta-hw font-bold leading-[0.9] tracking-[-0.035em]"
                style={{ fontSize: "clamp(3rem, 9vw, 140px)" }}
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

      {/* ══ FOOTER ════════════════════════════════════════════════════ */}
      <footer className="px-6 xl:px-16 py-8 border-t border-[#0A0A0A]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "var(--font-display-base, serif)" }} className="text-[#A80110] text-lg leading-none">O</span>
            <span className="font-bold text-[11px] uppercase tracking-[0.22em]">Ourense</span>
          </div>
          <p className="text-[11px] text-[#888]">
            Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, CDMX
          </p>
          <div className="flex gap-6">
            <Link href="/propuesta-3" className="text-[11px] text-[#555] hover:text-[#0A0A0A] transition-colors uppercase tracking-[0.18em]">
              Ver propuesta 3
            </Link>
            <Link href="/" className="text-[11px] text-[#555] hover:text-[#0A0A0A] transition-colors uppercase tracking-[0.18em]">
              Inicio
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
