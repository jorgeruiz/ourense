"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ──────────────────────────────────────────────────── */

const SLIDES = [
  {
    id: "01",
    category: "Construcción Integral",
    headline: ["TORRE", "CORPORATIVA", "INSURGENTES."],
    location: "Col. Florida · CDMX",
    year: "2024",
    image: "/images/hero-home.webp",
  },
  {
    id: "02",
    category: "Movimiento de Tierras",
    headline: ["PLATAFORMA", "INDUSTRIAL", "VALLEJO."],
    location: "Azcapotzalco · CDMX",
    year: "2023",
    image: "/images/service-movimiento-tierras.webp",
  },
  {
    id: "03",
    category: "Ingeniería",
    headline: ["OFICINAS", "CORPORATIVAS", "POLANCO."],
    location: "Miguel Hidalgo · CDMX",
    year: "2023",
    image: "/images/service-ingenieria.webp",
  },
  {
    id: "04",
    category: "Infraestructura",
    headline: ["CENTRO", "LOGÍSTICO", "QUERÉTARO."],
    location: "Querétaro · Nacional",
    year: "2022",
    image: "/images/portfolio-preview.webp",
  },
];

const SERVICES = [
  { num: "01", name: "Construcción Integral",  slug: "construccion" },
  { num: "02", name: "Movimiento de Tierras",  slug: "movimiento-de-tierras" },
  { num: "03", name: "Colados y Precolados",   slug: "colados-y-precolados" },
  { num: "04", name: "Ingenierías",            slug: "ingenierias" },
  { num: "05", name: "Interiorismo",           slug: "interiorismo" },
  { num: "06", name: "Renta de Maquinaria",    slug: "renta-de-maquinaria" },
];

type MenuState = "closed" | "main" | "services";

/* ─── Component ─────────────────────────────────────────────── */

export function ProposalThreePage() {
  const [current,    setCurrent]    = useState(0);
  const [menuState,  setMenuState]  = useState<MenuState>("closed");
  const [cursorSide, setCursorSide] = useState<"left" | "right">("right");
  const [overSlider, setOverSlider] = useState(false);
  const [onNav,      setOnNav]      = useState(false);

  /* ── Refs ──────────────────────────────────────────────────── */
  const cursorRef     = useRef<HTMLDivElement>(null);
  const menuRef       = useRef<HTMLDivElement>(null);
  const mainPanelRef  = useRef<HTMLDivElement>(null);
  const svcPanelRef   = useRef<HTMLDivElement>(null);
  const slideRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef    = useRef(0);
  const canNav        = useRef(true);
  const prevMenuState = useRef<MenuState>("closed");

  /* ── Custom cursor ─────────────────────────────────────────── */
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    cursor.style.transform = "translate(-999px,-999px)";
    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      setCursorSide(e.clientX < window.innerWidth / 2 ? "left" : "right");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  /* ── Initialize slide positions ────────────────────────────── */
  useEffect(() => {
    SLIDES.forEach((_, i) => {
      const el  = slideRefs.current[i];
      const img = imgRefs.current[i];
      if (!el || !img) return;
      gsap.set(el,  { x: i === 0 ? "0%"  : "100%" });
      gsap.set(img, { x: i === 0 ? "0%"  : "20%"  });
    });
    // First slide text entrance
    const first = slideRefs.current[0];
    if (!first) return;
    gsap.fromTo(first.querySelectorAll(".sl-line"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.09, duration: 1.1, ease: "power3.out", delay: 0.35 }
    );
    gsap.fromTo(first.querySelector(".sl-sub"),
      { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.0 }
    );
  }, []);

  /* ── goTo (parallax slide transition) ──────────────────────── */
  const goTo = useCallback((newIndex: number, dir: 1 | -1 = 1) => {
    if (!canNav.current) return;
    const prev = currentRef.current;
    if (newIndex === prev) return;

    canNav.current = false;

    const prevEl  = slideRefs.current[prev];
    const newEl   = slideRefs.current[newIndex];
    const prevImg = imgRefs.current[prev];
    const newImg  = imgRefs.current[newIndex];

    if (!prevEl || !newEl) { canNav.current = true; return; }

    // Position incoming slide off-screen with parallax offset
    gsap.set(newEl,  { x: dir === 1 ? "100%"  : "-100%" });
    gsap.set(newImg, { x: dir === 1 ? "22%"   : "-22%"  });

    const tl = gsap.timeline({
      onComplete: () => {
        currentRef.current = newIndex;
        setCurrent(newIndex);
        canNav.current = true;
      },
    });

    // Slide containers — full-speed horizontal
    tl.to(prevEl, { x: dir === 1 ? "-100%" : "100%", duration: 1.3, ease: "power3.inOut" }, 0);
    tl.to(newEl,  { x: "0%",                          duration: 1.3, ease: "power3.inOut" }, 0);

    // Images — slower (parallax depth)
    tl.to(prevImg, { x: dir === 1 ? "-22%" : "22%", duration: 1.3, ease: "power3.inOut" }, 0);
    tl.to(newImg,  { x: "0%",                        duration: 1.3, ease: "power3.inOut" }, 0);

    // Incoming slide text
    const lines = newEl.querySelectorAll(".sl-line");
    const sub   = newEl.querySelector(".sl-sub");
    tl.fromTo(lines, { opacity: 0, y: 32 }, { opacity: 1, y: 0, stagger: 0.09, duration: 1.0, ease: "power3.out" }, 0.52);
    if (sub) tl.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.95);
  }, []);

  /* ── Auto-advance ──────────────────────────────────────────── */
  useEffect(() => {
    if (menuState !== "closed") return;
    const t = setTimeout(() => {
      goTo((currentRef.current + 1) % SLIDES.length, 1);
    }, 6000);
    return () => clearTimeout(t);
  }, [current, menuState, goTo]);

  /* ── Keyboard ──────────────────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = SLIDES.length;
      if (e.key === "ArrowRight") goTo((currentRef.current + 1) % n, 1);
      if (e.key === "ArrowLeft")  goTo((currentRef.current - 1 + n) % n, -1);
      if (e.key === "Escape")     setMenuState("closed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  /* ── Touch/swipe ───────────────────────────────────────────── */
  useEffect(() => {
    let sx = 0;
    const n = SLIDES.length;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) {
        dx < 0
          ? goTo((currentRef.current + 1) % n, 1)
          : goTo((currentRef.current - 1 + n) % n, -1);
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend",   onEnd);
    };
  }, [goTo]);

  /* ── Menu animation ────────────────────────────────────────── */
  useEffect(() => {
    const overlay   = menuRef.current;
    const mainPanel = mainPanelRef.current;
    const svcPanel  = svcPanelRef.current;
    if (!overlay || !mainPanel || !svcPanel) return;

    const prev = prevMenuState.current;
    prevMenuState.current = menuState;

    if (menuState === "closed") {
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.65,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(mainPanel, { x: "0%" });
          gsap.set(svcPanel,  { x: "100%" });
        },
      });

    } else if (menuState === "main") {
      if (prev === "closed") {
        // Opening fresh — reset and reveal
        gsap.set(mainPanel, { x: "0%" });
        gsap.set(svcPanel,  { x: "100%" });
        gsap.fromTo(overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.inOut" }
        );
        gsap.fromTo(".main-nav-item",
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 0.36 }
        );
      } else if (prev === "services") {
        // Coming back from services
        gsap.to(svcPanel,  { x: "100%", duration: 0.55, ease: "power3.inOut" });
        gsap.to(mainPanel, { x: "0%",   duration: 0.55, ease: "power3.inOut" });
        gsap.fromTo(".main-nav-item",
          { opacity: 0 }, { opacity: 1, stagger: 0.06, duration: 0.45, delay: 0.12 }
        );
      }

    } else if (menuState === "services") {
      if (prev === "closed") {
        // Desktop shortcut: open directly to services
        gsap.set(mainPanel, { x: "-100%" });
        gsap.set(svcPanel,  { x: "100%"  });
        gsap.fromTo(overlay,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.85, ease: "power4.inOut" }
        );
        gsap.fromTo(svcPanel,
          { x: "100%" },
          { x: "0%", duration: 0.7, ease: "power3.out", delay: 0.3 }
        );
        gsap.fromTo(".svc-item",
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, delay: 0.52 }
        );
      } else if (prev === "main") {
        // Step 2: slide main left, services in from right
        gsap.to(mainPanel, { x: "-100%", duration: 0.55, ease: "power3.inOut" });
        gsap.fromTo(svcPanel,
          { x: "100%" },
          { x: "0%", duration: 0.55, ease: "power3.inOut" }
        );
        gsap.fromTo(".svc-item",
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, delay: 0.12 }
        );
      }
    }
  }, [menuState]);

  /* ── Scroll entrance ──────────────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".scroll-reveal", {
        opacity: 0, y: 48, stagger: 0.1, duration: 1.0, ease: "power3.out",
        scrollTrigger: { trigger: ".below-fold", start: "top 82%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  /* ── Slider click ──────────────────────────────────────────── */
  const handleSliderClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("nav, button, a")) return;
    if (menuState !== "closed") { setMenuState("closed"); return; }
    const n = SLIDES.length;
    cursorSide === "right"
      ? goTo((currentRef.current + 1) % n, 1)
      : goTo((currentRef.current - 1 + n) % n, -1);
  }, [cursorSide, menuState, goTo]);

  /* ─── Render ───────────────────────────────────────────────── */
  return (
    <div className="bg-[#F5F5F2] text-[#0A0A0A] overflow-x-hidden">

      {/* ══ Custom cursor ═══════════════════════════════════════ */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[9999] pointer-events-none select-none"
        style={{
          transform: "translate(-999px,-999px)",
          marginLeft: "-20px",
          marginTop: "-8px",
          opacity: overSlider && !onNav && menuState === "closed" ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {cursorSide === "left" ? (
          <div className="flex items-center gap-2">
            <span className="text-white font-bold" style={{ fontSize: "14px" }}>←</span>
            <span className="text-white/65 font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.22em" }}>Proyecto anterior</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-white/65 font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.22em" }}>Siguiente proyecto</span>
            <span className="text-white font-bold" style={{ fontSize: "14px" }}>→</span>
          </div>
        )}
      </div>

      {/* ══ Nav ═════════════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 xl:px-16 bg-[#F5F5F2]/90"
        style={{ height: "68px", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(10,10,10,0.07)" }}
        onMouseEnter={() => setOnNav(true)}
        onMouseLeave={() => setOnNav(false)}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span style={{ fontFamily: "var(--font-display-base, serif)", color: "#A80110", fontSize: "1.5rem", lineHeight: 1 }}>O</span>
          <span className="font-bold uppercase text-[#0A0A0A]" style={{ fontSize: "10px", letterSpacing: "0.26em" }}>Ourense</span>
        </Link>

        {/* Desktop: 3 links */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="/nosotros" className="font-bold uppercase text-[#0A0A0A]/40 hover:text-[#0A0A0A] transition-colors duration-150" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
            Nosotros
          </Link>
          <button
            onClick={() => setMenuState(s => s !== "closed" ? "closed" : "services")}
            className="font-bold uppercase transition-colors duration-150"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: menuState !== "closed" ? "#A80110" : "rgba(10,10,10,0.4)" }}
          >
            {menuState !== "closed" ? "Cerrar ×" : "Servicios"}
          </button>
          <Link href="/contacto" className="font-bold uppercase text-[#0A0A0A]/40 hover:text-[#0A0A0A] transition-colors duration-150" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
            Contacto
          </Link>
        </div>

        {/* Mobile: MENÚ toggle */}
        <button
          onClick={() => setMenuState(s => s !== "closed" ? "closed" : "main")}
          className="lg:hidden font-bold uppercase transition-colors duration-150"
          style={{ fontSize: "10px", letterSpacing: "0.22em", color: menuState !== "closed" ? "#A80110" : "rgba(10,10,10,0.4)" }}
        >
          {menuState !== "closed" ? "Cerrar ×" : "Menú"}
        </button>
      </nav>

      {/* ══ Menu overlay (white, 2-step) ════════════════════════ */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#F5F5F2] overflow-hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <div style={{ height: "68px" }} />

        {/* Panel wrapper */}
        <div className="relative overflow-hidden" style={{ height: "calc(100dvh - 68px)" }}>

          {/* ── Step 1: Main nav (Nosotros / Servicios / Contacto) */}
          <div ref={mainPanelRef} className="absolute inset-0 flex flex-col justify-center px-8 xl:px-16">
            <p className="text-[#0A0A0A]/25 uppercase font-bold mb-12" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
              Navegación
            </p>

            {/* Nosotros */}
            <Link
              href="/nosotros"
              onClick={() => setMenuState("closed")}
              className="main-nav-item group flex items-center justify-between border-b border-[#0A0A0A]/[0.07] py-6 hover:border-[#A80110] transition-all duration-200"
            >
              <span className="font-bold text-[#0A0A0A] group-hover:text-[#A80110] transition-colors duration-200 leading-none" style={{ fontSize: "clamp(2rem, 7.5vw, 96px)" }}>
                Nosotros
              </span>
              <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors duration-200 text-2xl xl:text-5xl">↗</span>
            </Link>

            {/* Servicios — goes to step 2 */}
            <button
              onClick={() => setMenuState("services")}
              className="main-nav-item group flex items-center justify-between border-b border-[#0A0A0A]/[0.07] py-6 hover:border-[#A80110] transition-all duration-200 w-full text-left"
            >
              <span className="font-bold text-[#0A0A0A] group-hover:text-[#A80110] transition-colors duration-200 leading-none" style={{ fontSize: "clamp(2rem, 7.5vw, 96px)" }}>
                Servicios
              </span>
              <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors duration-200 text-2xl xl:text-5xl">→</span>
            </button>

            {/* Contacto */}
            <Link
              href="/contacto"
              onClick={() => setMenuState("closed")}
              className="main-nav-item group flex items-center justify-between border-b border-[#0A0A0A]/[0.07] py-6 hover:border-[#A80110] transition-all duration-200"
            >
              <span className="font-bold text-[#0A0A0A] group-hover:text-[#A80110] transition-colors duration-200 leading-none" style={{ fontSize: "clamp(2rem, 7.5vw, 96px)" }}>
                Contacto
              </span>
              <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors duration-200 text-2xl xl:text-5xl">↗</span>
            </Link>

            {/* Contact strip */}
            <div className="main-nav-item flex flex-wrap gap-10 mt-10">
              <div>
                <p className="text-[#0A0A0A]/25 uppercase font-bold mb-1" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>Teléfono</p>
                <a href="tel:+525593542263" className="font-bold text-sm text-[#0A0A0A] hover:text-[#A80110] transition-colors duration-150">
                  +52 (55) 9354 2263
                </a>
              </div>
              <div>
                <p className="text-[#0A0A0A]/25 uppercase font-bold mb-1" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>Ciudad de México</p>
                <p className="font-bold text-sm text-[#0A0A0A]">Nacional</p>
              </div>
            </div>
          </div>

          {/* ── Step 2: Services list */}
          <div
            ref={svcPanelRef}
            className="absolute inset-0 flex flex-col px-8 xl:px-16"
            style={{ transform: "translateX(100%)" }}
          >
            {/* Back button */}
            <div className="py-6 border-b border-[#0A0A0A]/[0.07] mb-2 flex items-center gap-3">
              <button
                onClick={() => setMenuState("main")}
                className="font-bold uppercase text-[#0A0A0A]/35 hover:text-[#0A0A0A] transition-colors duration-150"
                style={{ fontSize: "9px", letterSpacing: "0.26em" }}
              >
                ← Volver
              </button>
              <span className="text-[#0A0A0A]/15 font-bold" style={{ fontSize: "9px" }}>|</span>
              <span className="text-[#0A0A0A]/25 font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.26em" }}>Servicios</span>
            </div>

            <div className="flex-1 flex flex-col justify-center overflow-y-auto">
              {SERVICES.map((s) => (
                <Link
                  key={s.num}
                  href={`/servicios/${s.slug}`}
                  onClick={() => setMenuState("closed")}
                  className="svc-item group flex items-center justify-between border-b border-[#0A0A0A]/[0.07] py-5 xl:py-6 hover:border-[#A80110] transition-all duration-200"
                >
                  <div className="flex items-center gap-6 xl:gap-12">
                    <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors font-bold tabular-nums" style={{ fontSize: "9px", letterSpacing: "0.24em", width: "22px", flexShrink: 0 }}>
                      {s.num}
                    </span>
                    <span className="font-bold text-[#0A0A0A] group-hover:text-[#A80110] transition-colors duration-200 leading-none" style={{ fontSize: "clamp(1.4rem, 3.4vw, 52px)" }}>
                      {s.name}
                    </span>
                  </div>
                  <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors text-xl xl:text-3xl shrink-0" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ Fixed hero slider ═══════════════════════════════════ */}
      <section
        className="fixed inset-0 z-0 overflow-hidden"
        style={{ cursor: "none" }}
        onClick={handleSliderClick}
        onMouseEnter={() => setOverSlider(true)}
        onMouseLeave={() => setOverSlider(false)}
      >
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            ref={el => { slideRefs.current[i] = el; }}
            className="absolute inset-0 will-change-transform"
          >
            {/* Image — wider than container for parallax */}
            <div
              ref={el => { imgRefs.current[i] = el; }}
              className="absolute inset-y-0 will-change-transform"
              style={{ left: "-15%", width: "130%" }}
            >
              <Image src={s.image} alt="" fill className="object-cover" priority={i === 0} sizes="130vw" />
            </div>

            {/* Dark overlay (keeps text readable) */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(6,6,6,0.82) 0%, rgba(6,6,6,0.22) 55%, rgba(6,6,6,0.48) 100%)" }}
            />

            {/* Text */}
            <div className="absolute left-8 xl:left-16 right-8 xl:right-16" style={{ bottom: "clamp(4.5rem, 9vh, 7.5rem)" }}>
              <p className="sl-sub text-white/45 font-bold uppercase mb-4" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>
                {s.category} · {s.location} · {s.year}
              </p>
              <h1 className="font-bold text-white tracking-[-0.04em] leading-[0.88]" style={{ fontSize: "clamp(3rem, 9vw, 148px)" }}>
                {s.headline.map((line, li) => (
                  <div key={li} className="sl-line block">{line}</div>
                ))}
              </h1>
            </div>
          </div>
        ))}

        {/* Counter */}
        <div className="absolute right-8 xl:right-16 text-white/30 font-bold tabular-nums" style={{ top: "86px", fontSize: "10px", letterSpacing: "0.28em" }}>
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* Vertical progress bar — right edge */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.1]">
          <div className="w-full bg-[#A80110] transition-all duration-700" style={{ height: `${((current + 1) / SLIDES.length) * 100}%` }} />
        </div>

        {/* Dot nav — bottom left */}
        <div className="absolute left-8 xl:left-16 flex gap-3 items-center" style={{ bottom: "clamp(1.5rem, 3vh, 2.25rem)" }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); goTo(i, i > current ? 1 : -1); }}
              aria-label={`Proyecto ${i + 1}`}
              style={{
                height: "1px",
                width: i === current ? "28px" : "8px",
                backgroundColor: i === current ? "#A80110" : "rgba(255,255,255,0.2)",
                transition: "width 0.4s ease, background-color 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Watermark number */}
        <div
          className="absolute bottom-0 right-6 xl:right-12 text-white select-none pointer-events-none font-bold"
          style={{ fontSize: "clamp(8rem, 20vw, 300px)", opacity: 0.04, lineHeight: 1 }}
        >
          {SLIDES[current].id}
        </div>
      </section>

      {/* ══ Spacer — pushes content below fixed hero ════════════ */}
      <div style={{ height: "100dvh" }} aria-hidden="true" />

      {/* ══ Below-fold content (white, z-index 10) ══════════════ */}
      <div className="below-fold relative z-10 bg-[#F5F5F2]">

        {/* Manifesto */}
        <section className="px-8 xl:px-16 py-24 xl:py-40">
          <div className="max-w-[840px]">
            <p className="scroll-reveal text-[#0A0A0A]/25 uppercase font-bold mb-8" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
              Acerca de Ourense
            </p>
            <p className="scroll-reveal font-bold leading-[1.18] tracking-[-0.025em] text-[#0A0A0A]" style={{ fontSize: "clamp(1.7rem, 3.4vw, 52px)" }}>
              Somos la constructora que otros contratan cuando el proyecto es demasiado importante para dejarlo al azar.
            </p>
            <p className="scroll-reveal text-[#0A0A0A]/40 mt-7 leading-relaxed max-w-[460px]" style={{ fontSize: "14px" }}>
              Más de diez años en Ciudad de México y a nivel nacional, con supervisión técnica continua desde la cimentación hasta el acabado.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/nosotros" className="scroll-reveal font-bold uppercase text-[#0A0A0A]/40 border border-[#0A0A0A]/[0.13] px-8 py-4 hover:border-[#0A0A0A] hover:text-[#0A0A0A] transition-all duration-200" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
              Conocer más
            </Link>
            <Link href="/contacto" className="scroll-reveal font-bold uppercase text-white bg-[#A80110] px-8 py-4 hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
              Solicitar cotización →
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="border-t border-[#0A0A0A]/[0.06] px-8 xl:px-16 py-16 xl:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
            {[{ num: "+10", label: "Años de experiencia" }, { num: "6", label: "Líneas de servicio" }, { num: "100%", label: "Supervisión continua" }].map(({ num, label }) => (
              <div key={label} className="scroll-reveal">
                <div className="font-bold text-[#0A0A0A] leading-none tracking-[-0.04em]" style={{ fontSize: "clamp(3.5rem, 8vw, 110px)" }}>{num}</div>
                <div className="h-px bg-[#0A0A0A]/[0.07] my-4" />
                <p className="text-[#0A0A0A]/40 text-sm">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA strip */}
        <section className="border-t border-[#0A0A0A]/[0.06] px-8 xl:px-16 py-14 xl:py-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="scroll-reveal">
            <p className="text-[#0A0A0A]/25 uppercase font-bold mb-3" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>Hablemos</p>
            <a href="tel:+525593542263" className="font-bold text-[#0A0A0A] hover:text-[#A80110] transition-colors duration-150" style={{ fontSize: "clamp(1.1rem, 2.5vw, 36px)" }}>
              +52 (55) 9354 2263
            </a>
          </div>
          <Link href="/contacto" className="scroll-reveal font-bold uppercase text-[#0A0A0A] border border-[#0A0A0A]/[0.13] px-10 py-5 hover:border-[#A80110] hover:text-[#A80110] transition-all duration-200 w-max" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
            Iniciar proyecto →
          </Link>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#0A0A0A]/[0.06] px-8 xl:px-16 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span style={{ fontFamily: "var(--font-display-base, serif)", color: "#A80110", fontSize: "1.25rem", lineHeight: 1 }}>O</span>
            <span className="font-bold uppercase text-[#0A0A0A]" style={{ fontSize: "10px", letterSpacing: "0.26em" }}>Ourense</span>
          </div>
          <p className="text-[#0A0A0A]/25" style={{ fontSize: "11px" }}>Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, CDMX, C.P. 01030</p>
          <div className="flex gap-6">
            <Link href="/propuesta-2" className="text-[#0A0A0A]/30 hover:text-[#0A0A0A] transition-colors uppercase font-bold" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>Propuesta 02</Link>
            <Link href="/" className="text-[#0A0A0A]/30 hover:text-[#0A0A0A] transition-colors uppercase font-bold" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>Propuesta 01</Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
