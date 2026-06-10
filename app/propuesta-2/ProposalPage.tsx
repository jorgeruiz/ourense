"use client";

import { useEffect, useRef } from "react";
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
  "Somos la constructora que otros contratan cuando el proyecto es demasiado importante para dejarlo al azar. Más de diez años construyendo en Ciudad de México y a nivel nacional, con supervisión técnica continua en cada etapa.".split(" ");

const SERVICES = [
  { num: "01", slug: "construccion",          name: "Construcción Integral",  desc: "De la cimentación al acabado final. Gestión completa del proyecto.",          image: "/images/service-construccion.webp" },
  { num: "02", slug: "movimiento-de-tierras", name: "Movimiento de Tierras",  desc: "Excavación, nivelación y compactación con maquinaria especializada.",         image: "/images/service-movimiento-tierras.webp" },
  { num: "03", slug: "colados-y-precolados",  name: "Colados y Precolados",   desc: "Alta resistencia estructural, in situ o prefabricados en planta controlada.", image: "/images/hero-home.webp" },
  { num: "04", slug: "ingenierias",           name: "Ingenierías",            desc: "Diseño estructural y supervisión técnica continua en cada etapa.",             image: "/images/service-ingenieria.webp" },
  { num: "05", slug: "interiorismo",          name: "Interiorismo",           desc: "Espacios corporativos y comerciales listos para uso inmediato.",               image: "/images/about-section.webp" },
  { num: "06", slug: "renta-de-maquinaria",   name: "Renta de Maquinaria",   desc: "Equipos de última generación para cada fase de la obra.",                     image: "/images/service-movimiento-tierras.webp" },
];

const PROCESS = [
  { num: "01", title: ["DIAGNÓSTICO", "TÉCNICO."],   body: "Analizamos el sitio, el suelo y las necesidades antes de comprometer un solo peso. Sin supuestos ni estimaciones genéricas.", image: "/images/service-ingenieria.webp" },
  { num: "02", title: ["PROYECTO",    "EJECUTIVO."], body: "Desarrollamos la ingeniería completa: estructura, MEP, acabados y cronograma con holgura técnica real. Todo documentado.", image: "/images/about-section.webp" },
  { num: "03", title: ["EJECUCIÓN",   "CONTINUA."],  body: "Residentes de obra propios en sitio todos los días. Nunca delegamos la supervisión. Control total sobre calidad y avance.", image: "/images/service-construccion.webp" },
  { num: "04", title: ["ENTREGA SIN", "SORPRESAS."], body: "Documentamos cada etapa y entregamos con garantía. El cliente recibe lo que firmó, en el plazo acordado, sin cargos extras.", image: "/images/portfolio-preview.webp" },
];

const TESTIMONIALS = [
  { quote: "Ourense transformó un proyecto complejo en una entrega sin sorpresas. Su presencia técnica en obra todos los días hizo la diferencia.", author: "Arq. Luis Herrera", role: "Director de Desarrollos · Grupo Inversionista del Centro", image: "/images/testimonials-bg.webp" },
  { quote: "Tienen la maquinaria, el equipo y, sobre todo, la disciplina para cumplir. En ocho meses no hubo un solo ajuste al programa de obra.", author: "Ing. Carmen Villanueva", role: "Directora de Proyectos · Parque Industrial Vallejo Norte", image: "/images/portfolio-preview.webp" },
  { quote: "El nivel de detalle que Ourense mantiene en obra, desde la estructura hasta los acabados finales, es lo que distingue a una constructora seria.", author: "Dir. de Infraestructura", role: "Cliente confidencial, sector financiero", image: "/images/about-section.webp" },
];

const PROJECTS = [
  { id: "01", name: "Torre Corporativa Insurgentes", category: "Construcción Integral",  location: "Col. Florida · CDMX",   year: "2024", image: "/images/hero-home.webp",                  area: "24,800 m²" },
  { id: "02", name: "Plataforma Industrial Vallejo",  category: "Movimiento de Tierras", location: "Azcapotzalco · CDMX",   year: "2023", image: "/images/service-movimiento-tierras.webp", area: "40,000 m²" },
  { id: "03", name: "Oficinas Corporativas Polanco",  category: "Ingeniería y Acabados", location: "Miguel Hidalgo · CDMX", year: "2023", image: "/images/service-ingenieria.webp",         area: "8,200 m²" },
];

/* ── Component ─────────────────────────────────────────────────────── */

export function ProposalPage() {
  const rootRef    = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  /* Hero slider */
  const heroImgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const heroCurrentRef = useRef(0);
  const heroTimer      = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Process — GSAP pin */
  const processRef        = useRef<HTMLDivElement>(null);
  const stepContentRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const stepDotRefs       = useRef<(HTMLSpanElement | null)[]>([]);
  const processProgressRef = useRef<HTMLDivElement>(null);
  const processCounterRef  = useRef<HTMLSpanElement>(null);

  /* Services */
  const serviceRowRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const serviceImgRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Testimonials */
  const testimonialSlideRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const testimonialDotRefs    = useRef<(HTMLButtonElement | null)[]>([]);
  const testimonialCurrentRef = useRef(0);
  const testimonialTimer      = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── switch testimonial (called by auto-timer + dots) ─────────── */
  const switchTestimonial = (next: number) => {
    const cur = testimonialCurrentRef.current;
    if (next === cur) return;
    if (testimonialSlideRefs.current[cur]) gsap.to(testimonialSlideRefs.current[cur]!, { opacity: 0, duration: 1.1, ease: "power2.inOut" });
    if (testimonialSlideRefs.current[next]) gsap.to(testimonialSlideRefs.current[next]!, { opacity: 1, duration: 1.1, ease: "power2.inOut" });
    testimonialDotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      gsap.to(dot, { width: i === next ? "28px" : "8px", backgroundColor: i === next ? "#A80110" : "rgba(255,255,255,0.3)", duration: 0.35 });
    });
    testimonialCurrentRef.current = next;
  };

  const restartTestimonialTimer = () => {
    if (testimonialTimer.current) clearInterval(testimonialTimer.current);
    testimonialTimer.current = setInterval(() => {
      switchTestimonial((testimonialCurrentRef.current + 1) % TESTIMONIALS.length);
    }, 6500);
  };

  /* ── Main effect ───────────────────────────────────────────────── */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Hero init */
    heroImgRefs.current.forEach((el, i) => { if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 }); });
    if (!reduce) {
      heroTimer.current = setInterval(() => {
        const cur = heroCurrentRef.current;
        const nxt = (cur + 1) % HERO_IMAGES.length;
        if (heroImgRefs.current[cur]) gsap.to(heroImgRefs.current[cur]!, { opacity: 0, duration: 1.8, ease: "power2.inOut" });
        if (heroImgRefs.current[nxt]) gsap.to(heroImgRefs.current[nxt]!, { opacity: 1, duration: 1.8, ease: "power2.inOut" });
        heroCurrentRef.current = nxt;
      }, 5500);
    }

    /* Testimonials init */
    testimonialSlideRefs.current.forEach((el, i) => { if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 }); });
    testimonialDotRefs.current.forEach((dot, i) => {
      if (dot) gsap.set(dot, { width: i === 0 ? "28px" : "8px", backgroundColor: i === 0 ? "#A80110" : "rgba(255,255,255,0.3)" });
    });
    restartTestimonialTimer();

    /* Services: circle clip-path + padding expand on hover */
    const svcCleanups: (() => void)[] = [];
    serviceRowRefs.current.forEach((row, i) => {
      const imgWrap = serviceImgRefs.current[i];
      if (!row || !imgWrap) return;
      gsap.set(imgWrap, { clipPath: "circle(0% at 22% 50%)" });

      const onEnter = () => {
        /* Circle expands slowly — dramatic, brand-circle feel */
        gsap.to(imgWrap, { clipPath: "circle(150% at 22% 50%)", duration: 1.6, ease: "power2.out" });
        /* Row grows taller */
        gsap.to(row, { paddingTop: "52px", paddingBottom: "52px", duration: 0.5, ease: "power2.out" });
        /* Text turns white */
        row.querySelectorAll<HTMLElement>(".svc-num,.svc-name,.svc-desc,.svc-arrow").forEach(el => {
          gsap.to(el, { color: "#F8F8F6", duration: 0.25 });
        });
      };
      const onLeave = () => {
        gsap.to(imgWrap, { clipPath: "circle(0% at 22% 50%)", duration: 1.0, ease: "power3.in" });
        gsap.to(row, { paddingTop: "28px", paddingBottom: "28px", duration: 0.4, ease: "power2.in" });
        gsap.to(row.querySelector<HTMLElement>(".svc-num"),   { color: "#888888", duration: 0.3 });
        gsap.to(row.querySelector<HTMLElement>(".svc-name"),  { color: "#0A0A0A", duration: 0.3 });
        gsap.to(row.querySelector<HTMLElement>(".svc-desc"),  { color: "#888888", duration: 0.3 });
        gsap.to(row.querySelector<HTMLElement>(".svc-arrow"), { color: "#0A0A0A", duration: 0.3 });
      };
      row.addEventListener("mouseenter", onEnter);
      row.addEventListener("mouseleave", onLeave);
      svcCleanups.push(() => {
        row.removeEventListener("mouseenter", onEnter);
        row.removeEventListener("mouseleave", onLeave);
      });
    });

    /* GSAP context for ScrollTrigger-based animations */
    const ctx = gsap.context(() => {

      if (!reduce) {
        gsap.from(".hw",        { opacity: 0, y: 28,  stagger: 0.06, duration: 1.1, ease: "power3.out", delay: 0.2 });
        gsap.from(".hero-rule", { scaleX: 0, transformOrigin: "left center", duration: 1.4, ease: "power4.out", delay: 0.8 });
        gsap.from(".hero-sub",  { opacity: 0, y: 18,  stagger: 0.07, duration: 0.9, ease: "power3.out", delay: 1.2 });

        if (marqueeRef.current) {
          const offset = marqueeRef.current.scrollWidth / 4;
          gsap.to(marqueeRef.current, { x: -offset, ease: "none",
            scrollTrigger: { trigger: ".marquee-wrap", start: "top bottom", end: "bottom top", scrub: 2 } });
        }

        gsap.from(".stat-item", { opacity: 0, y: 56, stagger: 0.14, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: ".stats-section", start: "top 78%", once: true } });

        gsap.from(".mw", { opacity: 0.08, stagger: 0.03, duration: 0.25, ease: "none",
          scrollTrigger: { trigger: ".manifesto-section", start: "top 55%", end: "bottom 45%", scrub: 1 } });

        gsap.from(".svc-intro", { opacity: 0, y: 24, stagger: 0.1, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".services-section", start: "top 80%", once: true } });

        gsap.from(".about-text", { opacity: 0, y: 28, stagger: 0.08, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: ".about-section", start: "top 75%", once: true } });

        gsap.from(".proj-card", { opacity: 0, y: 48, stagger: 0.13, duration: 1.0, ease: "power3.out",
          scrollTrigger: { trigger: ".projects-section", start: "top 80%", once: true } });

        gsap.from(".cta-hw", { opacity: 0, y: 28, stagger: 0.065, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: ".cta-section", start: "top 78%", once: true } });
      }

      /* ── Process: GSAP pin ─────────────────────────────────────── */
      if (processRef.current) {
        stepContentRefs.current.forEach((el, i) => {
          if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 45 });
        });
        stepDotRefs.current.forEach((dot, i) => {
          if (dot) gsap.set(dot, { backgroundColor: i === 0 ? "#A80110" : "rgba(10,10,10,0.15)", width: i === 0 ? "24px" : "6px" });
        });

        let curStep = 0;

        ScrollTrigger.create({
          trigger: processRef.current,
          pin: true,           /* GSAP handles the pin — no CSS sticky needed */
          start: "top top",
          end: `+=${(PROCESS.length - 1) * window.innerHeight}`,
          snap: {
            snapTo: 1 / (PROCESS.length - 1),
            duration: { min: 0.3, max: 0.65 },
            delay: 0.05,
            ease: "power2.inOut",
          },
          onUpdate(self) {
            if (processProgressRef.current) {
              gsap.set(processProgressRef.current, { scaleX: self.progress, transformOrigin: "left center" });
            }
            const newStep = Math.min(PROCESS.length - 1, Math.round(self.progress * (PROCESS.length - 1)));
            if (newStep === curStep) return;

            const dir    = newStep > curStep ? 1 : -1;
            const oldEl  = stepContentRefs.current[curStep];
            const newEl  = stepContentRefs.current[newStep];

            if (oldEl) gsap.to(oldEl, { opacity: 0, y: -35 * dir, duration: 0.3, ease: "power2.in" });
            if (newEl) gsap.fromTo(newEl, { opacity: 0, y: 35 * dir }, { opacity: 1, y: 0, duration: 0.55, ease: "power3.out", delay: 0.12 });

            stepDotRefs.current.forEach((dot, i) => {
              if (!dot) return;
              gsap.to(dot, { backgroundColor: i <= newStep ? "#A80110" : "rgba(10,10,10,0.15)", width: i === newStep ? "24px" : "6px", duration: 0.35 });
            });
            if (processCounterRef.current) processCounterRef.current.textContent = `0${newStep + 1}`;
            curStep = newStep;
          },
        });
      }

    }, rootRef);

    return () => {
      ctx.revert();
      if (heroTimer.current)        clearInterval(heroTimer.current);
      if (testimonialTimer.current) clearInterval(testimonialTimer.current);
      svcCleanups.forEach(fn => fn());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Render ────────────────────────────────────────────────────── */
  return (
    /* NOTE: no overflow-x-hidden on root — breaks ScrollTrigger scroll detection.
       Horizontal overflow is controlled per-section instead.               */
    <div
      ref={rootRef}
      className="bg-[#F8F8F6] text-[#0A0A0A]"
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
        <Link href="/contacto"
          className="text-[11px] font-bold uppercase tracking-[0.18em] border border-[#0A0A0A] px-5 py-2.5 hover:bg-[#0A0A0A] hover:text-[#F8F8F6] transition-colors duration-150">
          Cotizar
        </Link>
      </nav>

      {/* ══ HERO — full-bleed crossfade slider ════════════════════════ */}
      <section className="relative overflow-hidden" style={{ height: "100dvh" }}>
        {HERO_IMAGES.map((src, i) => (
          <div key={i} ref={el => { heroImgRefs.current[i] = el; }} className="absolute inset-0 will-change-[opacity]">
            <Image src={src} alt="Constructora Ourense — proyecto en Ciudad de México" fill className="object-cover" priority={i === 0} sizes="100vw" />
          </div>
        ))}
        <div className="absolute inset-0 z-10" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.86) 0%, rgba(10,10,10,0.35) 55%, rgba(10,10,10,0.55) 100%)" }} />

        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between px-6 xl:px-16 pt-[80px]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Ourense · CDMX</p>
          <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">Est. 2014</p>
        </div>

        <div className="absolute inset-0 z-20 flex items-center px-6 xl:px-16">
          <h1 className="font-bold tracking-[-0.035em] leading-none text-[#F8F8F6]" style={{ fontSize: "clamp(2.8rem, 8.5vw, 140px)" }}>
            <div className="hw block leading-[0.9]">CONSTRUIMOS</div>
            <div className="hw block leading-[0.9]">LO QUE OTROS</div>
            <div className="hw block leading-[0.9]">NO PUEDEN<span className="text-[#A80110]">.</span></div>
          </h1>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 px-6 xl:px-16 pb-10">
          <div className="hero-rule h-px bg-white/20 mb-7" />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex gap-8 sm:gap-14 flex-wrap">
              {[{ label: "Sede", val: "Ciudad de México" }, { label: "Experiencia", val: "+10 Años" }, { label: "Cobertura", val: "Nacional" }].map(({ label, val }) => (
                <div key={label} className="hero-sub">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/35 mb-1">{label}</p>
                  <p className="text-sm font-bold text-white">{val}</p>
                </div>
              ))}
            </div>
            <Link href="/contacto"
              className="hero-sub inline-flex items-center gap-3 bg-[#A80110] text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.18em] px-8 py-4 hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200 shrink-0 w-max">
              Iniciar proyecto →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ MARQUEE ═══════════════════════════════════════════════════ */}
      <section className="marquee-wrap border-y border-[#0A0A0A] py-[14px] overflow-hidden">
        <div ref={marqueeRef} style={{ display: "flex", width: "max-content" }}>
          {[0, 1, 2, 3].map(k => (
            <span key={k} className="font-bold text-[12px] uppercase tracking-[0.22em] whitespace-nowrap">{MARQUEE_TEXT}</span>
          ))}
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════════════ */}
      <section className="stats-section px-6 xl:px-16 py-24 xl:py-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-4">
          {[
            { num: "+10",  label: "Años de experiencia en México" },
            { num: "100%", label: "Proyectos con supervisión continua" },
            { num: "6",    label: "Líneas de servicio en una sola empresa" },
          ].map(({ num, label }, i) => (
            <div key={num} className="stat-item" style={{ marginTop: i === 1 ? "clamp(48px, 11vw, 130px)" : 0 }}>
              <div className="font-bold leading-none tracking-[-0.05em]" style={{ fontSize: "clamp(5rem, 14vw, 200px)" }}>
                {num}
              </div>
              <div className="h-px bg-[#0A0A0A] mt-5 mb-4" />
              <p className="text-sm text-[#555] leading-snug max-w-[200px]">{label}</p>
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

      {/* ══ PROCESS — GSAP pinned, 4 steps ════════════════════════════
          processRef is the pinned element. GSAP adds a spacer div below
          it automatically (pinSpacing: true by default).               */}
      <div ref={processRef} className="border-t border-[#0A0A0A] bg-[#F8F8F6] relative overflow-hidden" style={{ height: "100dvh" }}>

        {/* Stacked step panels */}
        {PROCESS.map((step, i) => (
          <div
            key={i}
            ref={el => { stepContentRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ paddingTop: "64px" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

              {/* Left: content */}
              <div className="flex flex-col justify-center px-6 xl:px-16 py-12">
                <span className="font-bold text-[#A80110] mb-6 block" style={{ fontSize: "11px", letterSpacing: "0.26em" }}>
                  {step.num}
                </span>
                <h2 className="font-bold leading-[0.88] tracking-[-0.045em] mb-8" style={{ fontSize: "clamp(2.8rem, 7vw, 104px)" }}>
                  {step.title.map((line, li) => <div key={li}>{line}</div>)}
                </h2>
                <div className="h-px bg-[#0A0A0A]/12 mb-8 max-w-[300px]" />
                <p className="text-[#555] leading-relaxed max-w-[320px]" style={{ fontSize: "clamp(0.9rem, 1.2vw, 16px)" }}>
                  {step.body}
                </p>
              </div>

              {/* Right: image */}
              <div className="hidden lg:block relative overflow-hidden">
                <Image src={step.image} alt={step.title.join(" ")} fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(248,248,246,0.5) 0%, rgba(248,248,246,0) 32%)" }} />
              </div>
            </div>
          </div>
        ))}

        {/* HUD */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="px-6 xl:px-16 pb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {PROCESS.map((_, i) => (
                <span key={i} ref={el => { stepDotRefs.current[i] = el; }}
                  style={{ display: "inline-block", height: "2px", borderRadius: "1px", backgroundColor: "rgba(10,10,10,0.15)" }} />
              ))}
            </div>
            <p className="font-bold text-[#888]" style={{ fontSize: "11px", letterSpacing: "0.22em" }}>
              <span ref={processCounterRef}>01</span>
              <span> / 0{PROCESS.length}</span>
            </p>
          </div>
          <div className="relative h-px bg-[#0A0A0A]/10">
            <div ref={processProgressRef} className="absolute inset-y-0 left-0 w-full bg-[#A80110]"
              style={{ transformOrigin: "left center", transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>

      {/* ══ SERVICES — circle image reveal + row expand on hover ══════ */}
      <section className="services-section border-t border-[#0A0A0A]">

        {/* Header — taller, with intro */}
        <div className="px-6 xl:px-16 pt-16 xl:pt-24 pb-14 xl:pb-20 border-b border-[#0A0A0A]">
          <div className="flex items-start justify-between mb-10 xl:mb-14">
            <p className="svc-intro text-[11px] uppercase tracking-[0.22em] text-[#888]">Servicios</p>
            <p className="svc-intro text-[11px] uppercase tracking-[0.22em] text-[#888]">06 líneas</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-20 items-end">
            <h2 className="svc-intro font-bold leading-[0.92] tracking-[-0.035em]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 66px)" }}>
              Seis disciplinas.<br />Una sola empresa.
            </h2>
            <p className="svc-intro text-[#555] leading-relaxed max-w-[440px]" style={{ fontSize: "15px" }}>
              Ourense ofrece la cadena completa de servicios constructivos bajo un mismo equipo y una misma responsabilidad. Sin intermediarios entre etapas, sin pérdida de información entre subcontratistas.
            </p>
          </div>
        </div>

        {/* Service rows */}
        {SERVICES.map((s, i) => (
          <Link
            key={s.num}
            href={`/servicios/${s.slug}`}
            ref={el => { serviceRowRefs.current[i] = el; }}
            className="block relative overflow-hidden border-b border-[#0A0A0A]"
            style={{ paddingTop: "28px", paddingBottom: "28px" }}
          >
            {/* Image — circle clip-path via GSAP */}
            <div ref={el => { serviceImgRefs.current[i] = el; }} className="absolute inset-0" style={{ zIndex: 0 }}>
              <Image src={s.image} alt={s.name} fill className="object-cover" sizes="100vw" />
              <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.52)" }} />
            </div>

            <div className="relative z-10 px-6 xl:px-16 flex items-center justify-between gap-4">
              <div className="flex items-baseline gap-5 xl:gap-10">
                <span className="svc-num font-bold shrink-0" style={{ fontSize: "11px", letterSpacing: "0.22em", color: "#888888" }}>{s.num}</span>
                <div>
                  <span className="svc-name font-bold block leading-tight" style={{ fontSize: "clamp(1.1rem, 2.8vw, 44px)", color: "#0A0A0A" }}>{s.name}</span>
                  <span className="svc-desc block mt-1" style={{ fontSize: "14px", color: "#888888" }}>{s.desc}</span>
                </div>
              </div>
              <span className="svc-arrow shrink-0" style={{ fontSize: "clamp(1.2rem, 2.5vw, 32px)", color: "#0A0A0A" }} aria-hidden="true">↗</span>
            </div>
          </Link>
        ))}
      </section>

      {/* ══ NOSOTROS — dark, typographic, no images ════════════════════ */}
      <section className="about-section border-t border-[#0A0A0A] bg-[#0A0A0A] text-[#F8F8F6]">
        <div className="px-6 xl:px-16 pt-16 xl:pt-24 pb-0">

          {/* Top label row */}
          <div className="about-text flex items-center justify-between mb-12 xl:mb-16">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#F8F8F6]/30">Nosotros</p>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#F8F8F6]/30">Est. 2014</p>
          </div>

          {/* Statement + text — 2 cols */}
          <div className="about-text grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 xl:gap-24 mb-16 xl:mb-24">
            <h2 className="font-bold leading-[0.9] tracking-[-0.04em]" style={{ fontSize: "clamp(2.6rem, 6.5vw, 96px)" }}>
              Fundados para resolver lo que otros no pueden.
            </h2>
            <div className="flex flex-col justify-end gap-5">
              <p className="text-[#F8F8F6]/50 leading-relaxed" style={{ fontSize: "15px" }}>
                Ourense nació en 2014 para atender proyectos que otros constructores no se atreven a tomar. Terrenos difíciles, programas exigentes, clientes que no aceptan incertidumbre.
              </p>
              <p className="text-[#F8F8F6]/50 leading-relaxed" style={{ fontSize: "15px" }}>
                Operamos con maquinaria propia, sin subcontratistas de tercero nivel. Control total sobre calidad, tiempos y costos desde el primer día de obra.
              </p>
            </div>
          </div>

          {/* Stats bar — flush to edge, divided */}
          <div className="about-text grid grid-cols-2 lg:grid-cols-4 border-t border-[#F8F8F6]/10">
            {[
              { val: "+10",      label: "Años en operación" },
              { val: "CDMX",     label: "Sede principal" },
              { val: "Nacional", label: "Cobertura" },
              { val: "14",       label: "Unidades de maquinaria propia" },
            ].map(({ val, label }, i) => (
              <div key={label}
                className="py-10 xl:py-12"
                style={{ paddingRight: "clamp(1rem, 3vw, 2.5rem)", borderLeft: i > 0 ? "1px solid rgba(250,250,250,0.1)" : "none", paddingLeft: i > 0 ? "clamp(1rem, 3vw, 2.5rem)" : "0" }}
              >
                <p className="font-bold text-white mb-2" style={{ fontSize: "clamp(1.6rem, 3.5vw, 48px)", letterSpacing: "-0.03em" }}>{val}</p>
                <p className="text-[#F8F8F6]/30 uppercase font-bold" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS — crossfade image slider ═════════════════════ */}
      <section className="relative border-t border-[#0A0A0A] overflow-hidden" style={{ minHeight: "clamp(480px, 65vh, 760px)" }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} ref={el => { testimonialSlideRefs.current[i] = el; }} className="absolute inset-0 will-change-[opacity]">
            <Image src={t.image} alt="Testimonio de cliente — Constructora Ourense" fill className="object-cover" sizes="100vw" />
            <div className="absolute inset-0" style={{ background: "rgba(10,10,10,0.72)" }} />
            <div className="relative z-10 flex flex-col justify-center px-6 xl:px-24 h-full text-[#F8F8F6]" style={{ minHeight: "clamp(480px, 65vh, 760px)" }}>
              <div className="max-w-[780px]">
                <div className="w-8 h-[2px] bg-[#A80110] mb-10" />
                <blockquote className="font-bold leading-[1.22] tracking-[-0.02em] mb-10" style={{ fontSize: "clamp(1.25rem, 2.8vw, 40px)" }}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div>
                  <p className="font-bold text-sm">{t.author}</p>
                  <p className="text-[#F8F8F6]/40 mt-1 uppercase font-bold" style={{ fontSize: "11px", letterSpacing: "0.18em" }}>{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute z-20 flex items-center gap-3" style={{ left: "clamp(1.5rem, 6vw, 6rem)", bottom: "2.5rem" }}>
          {TESTIMONIALS.map((_, i) => (
            <button key={i} ref={el => { testimonialDotRefs.current[i] = el; }}
              onClick={() => { switchTestimonial(i); restartTestimonialTimer(); }}
              aria-label={`Testimonio ${i + 1}`}
              style={{ height: "2px", width: "8px", border: "none", cursor: "pointer", padding: 0, borderRadius: "1px", backgroundColor: "rgba(255,255,255,0.3)" }}
            />
          ))}
        </div>
      </section>

      {/* ══ PROJECTS ══════════════════════════════════════════════════ */}
      <section className="projects-section border-t border-[#0A0A0A]">
        <div className="px-6 xl:px-16 py-10 flex items-center justify-between border-b border-[#0A0A0A]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#888]">Proyectos destacados</p>
          <Link href="/portafolio" className="text-[11px] uppercase tracking-[0.18em] text-[#555] hover:text-[#0A0A0A] transition-colors duration-150">
            Ver portafolio →
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[#0A0A0A]">
          {PROJECTS.map(p => (
            <div key={p.id} className="proj-card group relative overflow-hidden bg-[#F8F8F6]" style={{ aspectRatio: "4/5" }}>
              <Image src={p.image} alt={`${p.name} — Constructora Ourense`} fill
                className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.06) 55%)" }} />
              <div className="absolute inset-x-0 bottom-0 p-6 text-[#F8F8F6]">
                <p className="text-[10px] uppercase tracking-[0.22em] text-white/45 mb-2">{p.category} · {p.year}</p>
                <h3 className="font-bold leading-tight mb-3" style={{ fontSize: "clamp(1rem, 2vw, 26px)" }}>{p.name}</h3>
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
              <div key={i} className="cta-hw font-bold leading-[0.9] tracking-[-0.035em]" style={{ fontSize: "clamp(3rem, 9vw, 140px)" }}>
                {line}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-5 xl:items-end shrink-0">
            <p className="text-sm text-[#555] max-w-[280px] xl:text-right leading-relaxed">
              Contáctanos y recibe una propuesta personalizada para tu proyecto en 48 horas.
            </p>
            <Link href="/contacto"
              className="inline-flex items-center gap-4 bg-[#0A0A0A] text-[#F8F8F6] text-[11px] font-bold uppercase tracking-[0.18em] px-10 py-5 hover:bg-[#A80110] active:scale-[0.98] transition-all duration-200 w-max">
              Solicitar cotización →
            </Link>
            <div className="flex gap-8 pt-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#888] mb-1">Teléfono</p>
                <a href="tel:+525593542263" className="text-sm font-bold hover:text-[#A80110] transition-colors duration-150">+52 (55) 9354 2263</a>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#888] mb-1">Email</p>
                <a href="mailto:infoorg@oocsourense.com.mx" className="text-sm font-bold hover:text-[#A80110] transition-colors duration-150">infoorg@oocsourense.com.mx</a>
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
          <p className="text-[11px] text-[#888]">Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, CDMX</p>
          <div className="flex gap-6">
            <Link href="/propuesta-3" className="text-[11px] text-[#555] hover:text-[#0A0A0A] transition-colors uppercase tracking-[0.18em]">Ver propuesta 3</Link>
            <Link href="/" className="text-[11px] text-[#555] hover:text-[#0A0A0A] transition-colors uppercase tracking-[0.18em]">Inicio</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
