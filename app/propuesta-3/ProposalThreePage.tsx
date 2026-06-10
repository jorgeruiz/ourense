"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { SLIDES, SERVICES } from "./data";
import { EdgeReveal } from "./components/EdgeReveal";
import { TransitionLink } from "./components/TransitionLink";

type MenuState = "closed" | "main" | "services";

/* ─── Logo SVG — 3 concentric arcs, all red gradients ──────────────── */
function OurenseMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="50" cy="50" r="42"
        stroke="#A80110" strokeWidth="7" strokeLinecap="round"
        strokeDasharray="198 66" strokeDashoffset="-8"
      />
      <circle cx="50" cy="50" r="28"
        stroke="#A80110" strokeWidth="6" strokeLinecap="round"
        strokeDasharray="132 44" strokeDashoffset="-5"
        style={{ opacity: 0.65 }}
      />
      <circle cx="50" cy="50" r="14"
        stroke="#A80110" strokeWidth="5" strokeLinecap="round"
        strokeDasharray="66 22" strokeDashoffset="-3"
        style={{ opacity: 0.35 }}
      />
    </svg>
  );
}

/* ─── Touch detection ───────────────────────────────────────────────── */
let _isTouch: boolean | null = null;
function getIsTouch() {
  if (_isTouch !== null) return _isTouch;
  if (typeof window === "undefined") return false;
  _isTouch = window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0;
  return _isTouch;
}

/* ─── Component ─────────────────────────────────────────────────────── */
export function ProposalThreePage() {
  const [current,   setCurrent]   = useState(0);
  const [menuState, setMenuState] = useState<MenuState>("closed");
  const [overSlider, setOverSlider] = useState(false);
  const [onNav,      setOnNav]    = useState(false);

  const cursorSide    = useRef<"left" | "right">("right");
  const cursorRef     = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const menuRef       = useRef<HTMLDivElement>(null);
  const mainPanelRef  = useRef<HTMLDivElement>(null);
  const svcPanelRef   = useRef<HTMLDivElement>(null);
  const sliderRef     = useRef<HTMLElement>(null);
  const slideRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const currentRef    = useRef(0);
  const canNav        = useRef(true);
  const prevMenuState = useRef<MenuState>("closed");

  /* ── Custom cursor ─────────────────────────────────────────────── */
  useEffect(() => {
    if (getIsTouch()) return;
    const cursor = cursorRef.current;
    const label  = cursorLabelRef.current;
    if (!cursor) return;
    const EDGE = 0.28;
    const onMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      const pct = e.clientX / window.innerWidth;
      cursorSide.current = pct < 0.5 ? "left" : "right";

      /* Show project name when near edge */
      if (label) {
        const n     = SLIDES.length;
        const prevI = (currentRef.current - 1 + n) % n;
        const nextI = (currentRef.current + 1) % n;
        if (pct < EDGE) {
          label.textContent = `← ${SLIDES[prevI].headline[0]}`;
          label.style.opacity = "1";
          label.style.left = "16px";
        } else if (pct > (1 - EDGE)) {
          label.textContent = `${SLIDES[nextI].headline[0]} →`;
          label.style.opacity = "1";
          label.style.left = "16px";
        } else {
          label.style.opacity = "0";
        }
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Init slides ────────────────────────────────────────────────── */
  useEffect(() => {
    SLIDES.forEach((_, i) => {
      const el  = slideRefs.current[i];
      const img = imgRefs.current[i];
      if (!el || !img) return;
      gsap.set(el,  { x: i === 0 ? "0%" : "100%" });
      gsap.set(img, { x: i === 0 ? "0%" : "20%"  });
    });
    const first = slideRefs.current[0];
    if (!first) return;
    gsap.fromTo(first.querySelectorAll(".sl-line"),
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, stagger: 0.09, duration: 1.1, ease: "power3.out", delay: 0.4 }
    );
    gsap.fromTo(first.querySelector(".sl-sub"), { opacity: 0 }, { opacity: 1, duration: 0.6, delay: 1.05 });
    gsap.fromTo(first.querySelector(".sl-cta"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 1.25 });
  }, []);

  /* ── goTo ───────────────────────────────────────────────────────── */
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

    gsap.set(newEl,  { x: dir === 1 ? "100%"  : "-100%" });
    gsap.set(newImg, { x: dir === 1 ? "22%"   : "-22%"  });

    const tl = gsap.timeline({
      onComplete: () => { currentRef.current = newIndex; setCurrent(newIndex); canNav.current = true; },
    });
    tl.to(prevEl,  { x: dir === 1 ? "-100%" : "100%", duration: 1.3, ease: "power3.inOut" }, 0);
    tl.to(newEl,   { x: "0%",                          duration: 1.3, ease: "power3.inOut" }, 0);
    tl.to(prevImg, { x: dir === 1 ? "-22%" : "22%",    duration: 1.3, ease: "power3.inOut" }, 0);
    tl.to(newImg,  { x: "0%",                          duration: 1.3, ease: "power3.inOut" }, 0);

    const lines = newEl.querySelectorAll(".sl-line");
    const sub   = newEl.querySelector(".sl-sub");
    const cta   = newEl.querySelector(".sl-cta");
    tl.fromTo(lines, { opacity: 0, y: 32 }, { opacity: 1, y: 0, stagger: 0.09, duration: 1.0, ease: "power3.out" }, 0.5);
    if (sub) tl.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.9);
    if (cta) tl.fromTo(cta, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 1.05);
  }, []);

  /* ── Auto-advance ──────────────────────────────────────────────── */
  useEffect(() => {
    if (menuState !== "closed") return;
    const t = setTimeout(() => goTo((currentRef.current + 1) % SLIDES.length, 1), 6500);
    return () => clearTimeout(t);
  }, [current, menuState, goTo]);

  /* ── Keyboard ───────────────────────────────────────────────────── */
  useEffect(() => {
    const n = SLIDES.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo((currentRef.current + 1) % n, 1);
      if (e.key === "ArrowLeft")  goTo((currentRef.current - 1 + n) % n, -1);
      if (e.key === "Escape")     setMenuState("closed");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  /* ── Touch swipe ────────────────────────────────────────────────── */
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

  /* ── Menu animation ─────────────────────────────────────────────── */
  useEffect(() => {
    const overlay   = menuRef.current;
    const mainPanel = mainPanelRef.current;
    const svcPanel  = svcPanelRef.current;
    if (!overlay || !mainPanel || !svcPanel) return;
    const prev = prevMenuState.current;
    prevMenuState.current = menuState;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const d = reduced ? 0 : undefined;

    if (menuState === "closed") {
      gsap.to(overlay, {
        clipPath: "inset(0 0 100% 0)", duration: d ?? 0.65, ease: "power4.inOut",
        onComplete: () => { gsap.set(mainPanel, { x: "0%" }); gsap.set(svcPanel, { x: "100%" }); },
      });
    } else if (menuState === "main") {
      if (prev === "closed") {
        gsap.set(mainPanel, { x: "0%" }); gsap.set(svcPanel, { x: "100%" });
        gsap.fromTo(overlay, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: d ?? 0.85, ease: "power4.inOut" });
        if (!reduced) gsap.fromTo(".main-nav-item", { opacity: 0, y: 44 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 0.36 });
      } else if (prev === "services") {
        gsap.to(svcPanel, { x: "100%", duration: d ?? 0.55, ease: "power3.inOut" });
        gsap.to(mainPanel, { x: "0%", duration: d ?? 0.55, ease: "power3.inOut" });
        if (!reduced) gsap.fromTo(".main-nav-item", { opacity: 0 }, { opacity: 1, stagger: 0.06, duration: 0.45, delay: 0.12 });
      }
    } else if (menuState === "services") {
      if (prev === "closed") {
        gsap.set(mainPanel, { x: "-100%" }); gsap.set(svcPanel, { x: "100%" });
        gsap.fromTo(overlay, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: d ?? 0.85, ease: "power4.inOut" });
        if (!reduced) { gsap.fromTo(svcPanel, { x: "100%" }, { x: "0%", duration: 0.7, ease: "power3.out", delay: 0.3 }); gsap.fromTo(".svc-item", { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, delay: 0.52 }); }
        else gsap.set(svcPanel, { x: "0%" });
      } else if (prev === "main") {
        gsap.to(mainPanel, { x: "-100%", duration: d ?? 0.55, ease: "power3.inOut" });
        gsap.fromTo(svcPanel, { x: "100%" }, { x: "0%", duration: d ?? 0.55, ease: "power3.inOut" });
        if (!reduced) gsap.fromTo(".svc-item", { opacity: 0, y: 36 }, { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, delay: 0.12 });
      }
    }
  }, [menuState]);

  /* ── Slider click (center zone only; edges handled by EdgeReveal) ── */
  const handleSliderClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("nav, button, a")) return;
    if (menuState !== "closed") { setMenuState("closed"); return; }
    const pct = e.clientX / window.innerWidth;
    if (pct > 0.28 && pct < 0.72) {
      const n = SLIDES.length;
      cursorSide.current === "right"
        ? goTo((currentRef.current + 1) % n, 1)
        : goTo((currentRef.current - 1 + n) % n, -1);
    }
  }, [menuState, goTo]);

  const n       = SLIDES.length;
  const prevIdx = (current - 1 + n) % n;
  const nextIdx = (current + 1) % n;
  const isTouch = typeof window !== "undefined" ? getIsTouch() : false;

  /* ─── Render ──────────────────────────────────────────────────────── */
  return (
    <div className="bg-[#0A0A0A] overflow-x-hidden">

      {/* ══ Cursor — minimal ring + project label on edge ════════════ */}
      {!isTouch && (
        <div
          ref={cursorRef}
          aria-hidden="true"
          className="fixed top-0 left-0 z-[9999] pointer-events-none select-none"
          style={{
            transform: "translate(-999px,-999px)",
            opacity: overSlider && !onNav && menuState === "closed" ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          {/* Ring dot — centered at cursor */}
          <div style={{
            width: "10px", height: "10px",
            border: "1.5px solid rgba(255,255,255,0.85)",
            borderRadius: "50%",
            marginLeft: "-5px", marginTop: "-5px",
          }} />
          {/* Project name label — appears when near edge */}
          <span
            ref={cursorLabelRef}
            style={{
              position: "absolute",
              left: "16px",
              top: "-7px",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "white",
              whiteSpace: "nowrap",
              opacity: 0,
              transition: "opacity 0.18s ease",
            }}
          />
        </div>
      )}

      {/* ══ Nav — 3-column, center links ═════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-8 xl:px-16"
        style={{ height: "72px" }}
        onMouseEnter={() => setOnNav(true)}
        onMouseLeave={() => setOnNav(false)}
      >
        {/* Left: logo — Monoton "O" */}
        <TransitionLink href="/" className="flex items-center gap-3">
          <span
            aria-hidden="true"
            style={{ fontFamily: "var(--font-display-base, serif)", fontSize: "46px", color: "#A80110", lineHeight: 1, display: "block" }}
          >O</span>
          <span className="font-bold uppercase text-white hidden sm:block" style={{ fontSize: "10px", letterSpacing: "0.26em" }}>
            Ourense
          </span>
        </TransitionLink>

        {/* Center: nav links (desktop) */}
        <div className="hidden lg:flex items-center justify-center gap-10">
          <TransitionLink href="/nosotros" className="font-bold uppercase text-white/45 hover:text-white transition-colors duration-150" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
            Nosotros
          </TransitionLink>
          <button
            onClick={() => setMenuState(s => s !== "closed" ? "closed" : "services")}
            className="font-bold uppercase transition-colors duration-150"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: menuState !== "closed" ? "#A80110" : "rgba(255,255,255,0.45)" }}
          >
            {menuState !== "closed" ? "Cerrar ×" : "Servicios"}
          </button>
          <TransitionLink href="/contacto" className="font-bold uppercase text-white/45 hover:text-white transition-colors duration-150" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
            Contacto
          </TransitionLink>
        </div>

        {/* Right: CTA / mobile menu */}
        <div className="flex items-center justify-end gap-6">
          <TransitionLink
            href="/contacto"
            className="hidden lg:inline-flex font-bold uppercase text-white/45 hover:text-white transition-colors duration-150"
            style={{ fontSize: "10px", letterSpacing: "0.22em" }}
          >
            Cotizar →
          </TransitionLink>
          <button
            onClick={() => setMenuState(s => s !== "closed" ? "closed" : "main")}
            className="lg:hidden font-bold uppercase transition-colors duration-150"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: menuState !== "closed" ? "#A80110" : "rgba(255,255,255,0.45)" }}
            aria-expanded={menuState !== "closed"}
            aria-label={menuState !== "closed" ? "Cerrar menú" : "Abrir menú"}
          >
            {menuState !== "closed" ? "× Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      {/* ══ Menu overlay ════════════════════════════════════════════ */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#F5F5F2] overflow-hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={menuState === "closed"}
      >
        <div style={{ height: "72px" }} />
        <div className="relative overflow-hidden" style={{ height: "calc(100dvh - 72px)" }}>

          {/* Step 1 */}
          <div ref={mainPanelRef} className="absolute inset-0 flex flex-col justify-center px-8 xl:px-16">
            <p className="text-[#0A0A0A]/25 uppercase font-bold mb-12" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>Navegación</p>

            {[
              { label: "Nosotros", href: "/nosotros", arrow: "↗", asLink: true },
            ].map(item => (
              <TransitionLink key={item.href} href={item.href} onClick={() => setMenuState("closed")}
                className="main-nav-item group flex items-center justify-between border-b border-[#0A0A0A]/[0.07] py-6 hover:border-[#A80110] transition-all duration-200">
                <span className="font-bold text-[#0A0A0A] group-hover:text-[#A80110] transition-colors leading-none" style={{ fontSize: "clamp(2rem, 7.5vw, 96px)" }}>{item.label}</span>
                <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors text-2xl xl:text-5xl">{item.arrow}</span>
              </TransitionLink>
            ))}
            <button onClick={() => setMenuState("services")}
              className="main-nav-item group flex items-center justify-between border-b border-[#0A0A0A]/[0.07] py-6 hover:border-[#A80110] transition-all duration-200 w-full text-left">
              <span className="font-bold text-[#0A0A0A] group-hover:text-[#A80110] transition-colors leading-none" style={{ fontSize: "clamp(2rem, 7.5vw, 96px)" }}>Servicios</span>
              <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors text-2xl xl:text-5xl">→</span>
            </button>
            <TransitionLink href="/contacto" onClick={() => setMenuState("closed")}
              className="main-nav-item group flex items-center justify-between border-b border-[#0A0A0A]/[0.07] py-6 hover:border-[#A80110] transition-all duration-200">
              <span className="font-bold text-[#0A0A0A] group-hover:text-[#A80110] transition-colors leading-none" style={{ fontSize: "clamp(2rem, 7.5vw, 96px)" }}>Contacto</span>
              <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors text-2xl xl:text-5xl">↗</span>
            </TransitionLink>

            <div className="main-nav-item flex flex-wrap gap-10 mt-10">
              <div>
                <p className="text-[#0A0A0A]/25 uppercase font-bold mb-1" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>Teléfono</p>
                <a href="tel:+525593542263" className="font-bold text-sm text-[#0A0A0A] hover:text-[#A80110] transition-colors">+52 (55) 9354 2263</a>
              </div>
              <div>
                <p className="text-[#0A0A0A]/25 uppercase font-bold mb-1" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>Cobertura</p>
                <p className="font-bold text-sm text-[#0A0A0A]">Ciudad de México · Nacional</p>
              </div>
            </div>
          </div>

          {/* Step 2: services */}
          <div ref={svcPanelRef} className="absolute inset-0 flex flex-col px-8 xl:px-16" style={{ transform: "translateX(100%)" }}>
            <div className="py-6 border-b border-[#0A0A0A]/[0.07] mb-2 flex items-center gap-3">
              <button onClick={() => setMenuState("main")} className="font-bold uppercase text-[#0A0A0A]/35 hover:text-[#0A0A0A] transition-colors" style={{ fontSize: "9px", letterSpacing: "0.26em" }}>
                ← Volver
              </button>
              <span className="text-[#0A0A0A]/15 font-bold" style={{ fontSize: "9px" }}>|</span>
              <span className="text-[#0A0A0A]/25 font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.26em" }}>Servicios</span>
            </div>
            <div className="flex-1 flex flex-col justify-center overflow-y-auto">
              {SERVICES.map(s => (
                <TransitionLink key={s.num} href={`/servicios/${s.slug}`} onClick={() => setMenuState("closed")}
                  className="svc-item group flex items-center justify-between border-b border-[#0A0A0A]/[0.07] py-5 xl:py-6 hover:border-[#A80110] transition-all duration-200">
                  <div className="flex items-center gap-6 xl:gap-12">
                    <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors font-bold tabular-nums" style={{ fontSize: "9px", letterSpacing: "0.24em", width: "22px", flexShrink: 0 }}>{s.num}</span>
                    <span className="font-bold text-[#0A0A0A] group-hover:text-[#A80110] transition-colors leading-none" style={{ fontSize: "clamp(1.4rem, 3.4vw, 52px)" }}>{s.name}</span>
                  </div>
                  <span className="text-[#0A0A0A]/20 group-hover:text-[#A80110] transition-colors text-xl xl:text-3xl shrink-0">↗</span>
                </TransitionLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ Fixed hero slider ════════════════════════════════════════ */}
      <section
        ref={sliderRef}
        className="fixed inset-0 z-0 overflow-hidden"
        style={{ cursor: isTouch ? "auto" : "none" }}
        onClick={handleSliderClick}
        onMouseEnter={() => setOverSlider(true)}
        onMouseLeave={() => setOverSlider(false)}
        aria-label="Slider principal"
      >
        {SLIDES.map((s, i) => (
          <div key={s.id} ref={el => { slideRefs.current[i] = el; }} className="absolute inset-0 will-change-transform">
            {/* Parallax image */}
            <div ref={el => { imgRefs.current[i] = el; }} className="absolute inset-y-0 will-change-transform" style={{ left: "-15%", width: "130%" }}>
              <Image
                src={s.image}
                alt={s.type === "brand" ? "Ourense — Constructora en Ciudad de México" : s.headline.join(" ")}
                fill className="object-cover"
                priority={i === 0}
                sizes="130vw"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,6,6,0.88) 0%, rgba(6,6,6,0.15) 55%, rgba(6,6,6,0.52) 100%)" }} />

            {/* Text */}
            <div className="absolute left-8 xl:left-16 right-8 xl:right-16" style={{ bottom: "clamp(5rem, 10vh, 8rem)" }}>
              <p className="sl-sub text-white/45 font-bold uppercase mb-5" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>
                {s.category}{s.location ? ` · ${s.location}` : ""}{s.year ? ` · ${s.year}` : ""}
              </p>
              <h1 className="font-bold text-white tracking-[-0.04em] leading-[0.87]" style={{ fontSize: "clamp(3.2rem, 9vw, 160px)" }}>
                {s.headline.map((line, li) => <div key={li} className="sl-line block">{line}</div>)}
              </h1>
              {/* CTAs */}
              <div className="sl-cta flex flex-wrap gap-3 mt-10">
                {s.type === "brand" ? (
                  <TransitionLink href="/servicios"
                    className="inline-flex items-center gap-2 bg-[#A80110] text-white font-bold uppercase px-7 py-3.5 hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
                    Ver servicios →
                  </TransitionLink>
                ) : (
                  <>
                    <TransitionLink href={`/propuesta-3/proyectos/${s.slug}`}
                      className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/20 text-white font-bold uppercase px-7 py-3.5 hover:bg-white/[0.16] backdrop-blur-sm active:scale-[0.98] transition-all duration-200"
                      style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
                      Ver proyecto →
                    </TransitionLink>
                    <TransitionLink href="/propuesta-3/proyectos"
                      className="inline-flex items-center gap-2 border border-white/[0.15] text-white/50 font-bold uppercase px-7 py-3.5 hover:text-white hover:border-white/40 active:scale-[0.98] transition-all duration-200"
                      style={{ fontSize: "10px", letterSpacing: "0.2em" }}>
                      Ver todos
                    </TransitionLink>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Curved edge reveals */}
        <EdgeReveal
          prevImage={SLIDES[prevIdx].image}
          nextImage={SLIDES[nextIdx].image}
          containerRef={sliderRef as React.RefObject<HTMLElement | null>}
          onPrev={() => goTo(prevIdx, -1)}
          onNext={() => goTo(nextIdx, 1)}
          isTouch={isTouch}
        />

        {/* Counter */}
        <div className="absolute text-white/25 font-bold tabular-nums" style={{ top: "88px", right: "clamp(2rem, 4vw, 4rem)", fontSize: "10px", letterSpacing: "0.28em" }}>
          {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </div>

        {/* Vertical progress bar */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-white/[0.08]">
          <div className="w-full bg-[#A80110] transition-all duration-700" style={{ height: `${((current + 1) / SLIDES.length) * 100}%` }} />
        </div>

        {/* Dot nav */}
        <div className="absolute flex gap-3 items-center" style={{ left: "clamp(2rem, 4vw, 4rem)", bottom: "clamp(2rem, 4vh, 2.5rem)" }}>
          {SLIDES.map((_, i) => (
            <button key={i} onClick={e => { e.stopPropagation(); goTo(i, i > current ? 1 : -1); }}
              aria-label={`Slide ${i + 1}`}
              style={{ height: "1px", width: i === current ? "28px" : "8px", backgroundColor: i === current ? "#A80110" : "rgba(255,255,255,0.18)", transition: "width 0.4s ease, background-color 0.3s ease" }}
            />
          ))}
        </div>

        {/* Watermark */}
        <div className="absolute bottom-0 right-6 xl:right-12 text-white select-none pointer-events-none font-bold" style={{ fontSize: "clamp(8rem, 20vw, 300px)", opacity: 0.035, lineHeight: 1 }} aria-hidden="true">
          {SLIDES[current].id}
        </div>
      </section>

      {/* ══ Spacer (slider is fixed, this pushes content below) ════════ */}
      <div style={{ height: "100dvh" }} aria-hidden="true" />

      {/* ══ Footer — light, ~30dvh, CTA + contact ════════════════════ */}
      <footer className="relative z-10 bg-[#F5F5F2]" style={{ minHeight: "30dvh" }}>
        <div className="h-px bg-[#0A0A0A]/[0.08]" />
        <div className="px-8 xl:px-16 py-12 xl:py-16 flex flex-col" style={{ minHeight: "calc(30dvh - 1px)" }}>

          {/* Top: logo + CTA */}
          <div className="flex items-start justify-between mb-auto">
            <div className="flex items-center gap-3">
              <span style={{ fontFamily: "var(--font-display-base, serif)", fontSize: "40px", color: "#A80110", lineHeight: 1 }}>O</span>
              <span className="font-bold uppercase text-[#0A0A0A]/40" style={{ fontSize: "10px", letterSpacing: "0.26em" }}>Ourense</span>
            </div>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-3 bg-[#A80110] text-white font-bold uppercase px-7 py-3.5 hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200"
              style={{ fontSize: "10px", letterSpacing: "0.2em" }}
            >
              Iniciar proyecto →
            </Link>
          </div>

          {/* Bottom: contact data + nav links */}
          <div className="flex flex-wrap items-end justify-between gap-8 pt-10 mt-10 border-t border-[#0A0A0A]/[0.07]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6">
              <div>
                <p className="text-[#0A0A0A]/30 font-bold uppercase mb-1.5" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>Teléfono</p>
                <a href="tel:+525593542263" className="font-bold text-sm text-[#0A0A0A] hover:text-[#A80110] transition-colors duration-150">+52 (55) 9354 2263</a>
              </div>
              <div>
                <p className="text-[#0A0A0A]/30 font-bold uppercase mb-1.5" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>Email</p>
                <a href="mailto:infoorg@oocsourense.com.mx" className="font-bold text-sm text-[#0A0A0A] hover:text-[#A80110] transition-colors duration-150">infoorg@oocsourense.com.mx</a>
              </div>
              <div>
                <p className="text-[#0A0A0A]/30 font-bold uppercase mb-1.5" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>Sede</p>
                <p className="font-bold text-sm text-[#0A0A0A]">Col. Florida, Álvaro Obregón, CDMX</p>
              </div>
            </div>
            <div className="flex gap-6">
              <Link href="/propuesta-2" className="text-[#0A0A0A]/25 hover:text-[#0A0A0A] transition-colors font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>Propuesta 02</Link>
              <Link href="/" className="text-[#0A0A0A]/25 hover:text-[#0A0A0A] transition-colors font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.2em" }}>Propuesta 01</Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
