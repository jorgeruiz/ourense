"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Slide } from "../../data";
import { EdgeReveal } from "../../components/EdgeReveal";
import { TransitionLink } from "../../components/TransitionLink";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  project: Slide;
  others: Slide[];
}

let _isTouch: boolean | null = null;
function getIsTouch() {
  if (_isTouch !== null) return _isTouch;
  if (typeof window === "undefined") return false;
  _isTouch = window.matchMedia("(hover: none)").matches || navigator.maxTouchPoints > 0;
  return _isTouch;
}

/* ─── Arc divider SVG ───────────────────────────────────────────────── */
function ArcDivider({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      width="100%"
      height="80"
      aria-hidden="true"
      style={{ display: "block", transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path d="M0,80 Q720,0 1440,80 L1440,80 L0,80 Z" fill="#0A0A0A" />
    </svg>
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */

export function ProjectDetail({ project, others }: Props) {
  /* Mini-slider state */
  const [miniCurrent,   setMiniCurrent]   = useState(0);
  const [overMini,      setOverMini]      = useState(false);
  const miniSliderRef   = useRef<HTMLDivElement>(null);
  const miniSlideRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const miniImgRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const miniCurrentRef  = useRef(0);
  const miniCanNav      = useRef(true);

  /* Scroll reveals */
  const contentRef = useRef<HTMLDivElement>(null);

  const isTouch = typeof window !== "undefined" ? getIsTouch() : false;

  /* ── Init mini-slider ─────────────────────────────────────────────── */
  useEffect(() => {
    others.forEach((_, i) => {
      const el  = miniSlideRefs.current[i];
      const img = miniImgRefs.current[i];
      if (!el || !img) return;
      gsap.set(el,  { x: i === 0 ? "0%" : "100%" });
      gsap.set(img, { x: i === 0 ? "0%" : "20%"  });
    });
  }, [others]);

  /* ── Mini goTo ────────────────────────────────────────────────────── */
  const miniGoTo = useCallback((newIndex: number, dir: 1 | -1 = 1) => {
    if (!miniCanNav.current) return;
    const prev = miniCurrentRef.current;
    if (newIndex === prev) return;
    miniCanNav.current = false;

    const prevEl  = miniSlideRefs.current[prev];
    const newEl   = miniSlideRefs.current[newIndex];
    const prevImg = miniImgRefs.current[prev];
    const newImg  = miniImgRefs.current[newIndex];

    if (!prevEl || !newEl) { miniCanNav.current = true; return; }

    gsap.set(newEl,  { x: dir === 1 ? "100%" : "-100%" });
    gsap.set(newImg, { x: dir === 1 ? "22%"  : "-22%"  });

    const tl = gsap.timeline({
      onComplete: () => {
        miniCurrentRef.current = newIndex;
        setMiniCurrent(newIndex);
        miniCanNav.current = true;
      },
    });
    tl.to(prevEl,  { x: dir === 1 ? "-100%" : "100%", duration: 1.3, ease: "power3.inOut" }, 0);
    tl.to(newEl,   { x: "0%",                          duration: 1.3, ease: "power3.inOut" }, 0);
    tl.to(prevImg, { x: dir === 1 ? "-22%" : "22%",    duration: 1.3, ease: "power3.inOut" }, 0);
    tl.to(newImg,  { x: "0%",                          duration: 1.3, ease: "power3.inOut" }, 0);
  }, []);

  /* ── Mini touch swipe ─────────────────────────────────────────────── */
  useEffect(() => {
    const slider = miniSliderRef.current;
    if (!slider) return;
    let sx = 0;
    const n = others.length;
    const onStart = (e: TouchEvent) => { sx = e.touches[0].clientX; };
    const onEnd   = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) {
        dx < 0
          ? miniGoTo((miniCurrentRef.current + 1) % n, 1)
          : miniGoTo((miniCurrentRef.current - 1 + n) % n, -1);
      }
    };
    slider.addEventListener("touchstart", onStart, { passive: true });
    slider.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      slider.removeEventListener("touchstart", onStart);
      slider.removeEventListener("touchend",   onEnd);
    };
  }, [others.length, miniGoTo]);

  /* ── Scroll reveals + mini-slider parallax entrance ──────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveals
      gsap.from(".proj-reveal", {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 80%", once: true },
      });

      // Mini-slider parallax entrance (enters from below, different speed)
      const mini = miniSliderRef.current;
      if (mini) {
        gsap.fromTo(
          mini,
          { y: 80 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: mini,
              start: "top bottom",
              end: "top top",
              scrub: 1.2,
            },
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const n        = others.length;
  const prevIdx  = (miniCurrent - 1 + n) % n;
  const nextIdx  = (miniCurrent + 1) % n;

  /* ─── Render ─────────────────────────────────────────────────────── */
  return (
    <div className="bg-[#F5F5F2] text-[#0A0A0A]">

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 xl:px-16"
        style={{ height: "68px" }}
      >
        <TransitionLink href="/propuesta-3" className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" stroke="#A80110" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="45 14.96" />
            <circle cx="12" cy="12" r="6.5" stroke="#0A0A0A" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="31 9.85" />
            <circle cx="12" cy="12" r="3.5" stroke="#0A0A0A" strokeWidth="1.0" strokeLinecap="round" strokeDasharray="17 4.98" />
          </svg>
          <span className="font-bold uppercase text-[#0A0A0A]" style={{ fontSize: "10px", letterSpacing: "0.26em" }}>Ourense</span>
        </TransitionLink>
        <TransitionLink
          href="/propuesta-3/proyectos"
          className="font-bold uppercase text-[#0A0A0A]/40 hover:text-[#0A0A0A] transition-colors"
          style={{ fontSize: "10px", letterSpacing: "0.22em" }}
        >
          ← Proyectos
        </TransitionLink>
      </nav>

      {/* Hero image — full bleed, 60vh */}
      <div className="relative overflow-hidden" style={{ height: "60vh", minHeight: "400px" }}>
        <Image
          src={project.image}
          alt={project.headline.join(" ")}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(6,6,6,0.75) 0%, rgba(6,6,6,0.15) 60%)" }}
        />
        {/* Headline over hero */}
        <div
          className="absolute left-8 xl:left-16 right-8 xl:right-16"
          style={{ bottom: "clamp(3rem, 6vh, 5rem)" }}
        >
          <p className="text-white/45 font-bold uppercase mb-3" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>
            {project.category} · {project.location} · {project.year}
          </p>
          <h1 className="font-bold text-white tracking-[-0.04em] leading-[0.88]" style={{ fontSize: "clamp(2.5rem, 7vw, 100px)" }}>
            {project.headline.map((line, i) => (
              <div key={i} className="block">{line}</div>
            ))}
          </h1>
        </div>
      </div>

      {/* Arc divider (dark concave curve into content) */}
      <ArcDivider />

      {/* Dark content band */}
      <div className="bg-[#0A0A0A] text-white">
        <div ref={contentRef} className="px-8 xl:px-16 py-20 xl:py-32 max-w-[860px]">
          <p className="proj-reveal text-white/30 uppercase font-bold mb-8" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
            Sobre el proyecto
          </p>
          <p className="proj-reveal font-bold leading-[1.2] tracking-[-0.02em]" style={{ fontSize: "clamp(1.4rem, 2.8vw, 40px)" }}>
            {project.sub}
          </p>

          {/* Specs grid */}
          <div className="proj-reveal grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16 border-t border-white/[0.08] pt-12">
            {[
              { label: "Categoría",  val: project.category },
              { label: "Ubicación",  val: project.location },
              { label: "Año",        val: project.year || "—" },
              { label: "Alcance",    val: "Integral" },
            ].map(({ label, val }) => (
              <div key={label}>
                <p className="text-white/25 uppercase font-bold mb-2" style={{ fontSize: "9px", letterSpacing: "0.24em" }}>{label}</p>
                <p className="font-bold text-white text-sm">{val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arc divider (convex, back to light) */}
      <ArcDivider flip />

      {/* Light content — CTA */}
      <div className="bg-[#F5F5F2] px-8 xl:px-16 py-20 xl:py-32 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
        <div className="proj-reveal max-w-[480px]">
          <p className="text-[#0A0A0A]/25 uppercase font-bold mb-5" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
            ¿Tienes un proyecto similar?
          </p>
          <p className="font-bold leading-[1.18] tracking-[-0.025em]" style={{ fontSize: "clamp(1.5rem, 3vw, 44px)" }}>
            Solicita una cotización sin compromiso.
          </p>
        </div>
        <TransitionLink
          href="/contacto"
          className="proj-reveal font-bold uppercase text-white bg-[#A80110] px-10 py-5 hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200 w-max"
          style={{ fontSize: "10px", letterSpacing: "0.22em" }}
        >
          Iniciar proyecto →
        </TransitionLink>
      </div>

      {/* ══ Mini-slider: otros proyectos ═════════════════════════════════
          In-flow section (not fixed). Enters from below via parallax scrub.
          Fills viewport when reached. Same goTo + EdgeReveal mechanics.     */}

      <div style={{ paddingBottom: "100dvh" }}>
        <div
          ref={miniSliderRef}
          className="relative overflow-hidden"
          style={{ height: "100dvh", cursor: isTouch ? "auto" : "none" }}
          onMouseEnter={() => setOverMini(true)}
          onMouseLeave={() => setOverMini(false)}
          aria-label="Otros proyectos"
        >
          {/* Header band */}
          <div
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 xl:px-16 bg-[#0A0A0A]/70 backdrop-blur-sm"
            style={{ height: "60px" }}
          >
            <p className="text-white/40 uppercase font-bold" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
              Otros proyectos
            </p>
            <TransitionLink
              href="/propuesta-3/proyectos"
              className="font-bold uppercase text-white/40 hover:text-white transition-colors"
              style={{ fontSize: "9px", letterSpacing: "0.22em" }}
            >
              Ver todos →
            </TransitionLink>
          </div>

          {/* Slides */}
          {others.map((s, i) => (
            <div
              key={s.id}
              ref={el => { miniSlideRefs.current[i] = el; }}
              className="absolute inset-0 will-change-transform"
            >
              <div
                ref={el => { miniImgRefs.current[i] = el; }}
                className="absolute inset-y-0 will-change-transform"
                style={{ left: "-15%", width: "130%" }}
              >
                <Image
                  src={s.image}
                  alt={s.headline.join(" ")}
                  fill
                  className="object-cover"
                  loading="lazy"
                  sizes="130vw"
                />
              </div>
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(6,6,6,0.82) 0%, rgba(6,6,6,0.2) 55%, rgba(6,6,6,0.5) 100%)" }}
              />
              <div
                className="absolute left-8 xl:left-16 right-8 xl:right-16"
                style={{ bottom: "clamp(4rem, 8vh, 6.5rem)" }}
              >
                <p className="text-white/45 font-bold uppercase mb-3" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>
                  {s.category} · {s.location} · {s.year}
                </p>
                <h2 className="font-bold text-white tracking-[-0.04em] leading-[0.88]" style={{ fontSize: "clamp(2.5rem, 7vw, 100px)" }}>
                  {s.headline.map((line, li) => <div key={li} className="block">{line}</div>)}
                </h2>
                <div className="flex gap-3 mt-6">
                  <TransitionLink
                    href={`/propuesta-3/proyectos/${s.slug}`}
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold uppercase px-6 py-3 hover:bg-white/20 backdrop-blur-sm active:scale-[0.98] transition-all duration-200"
                    style={{ fontSize: "10px", letterSpacing: "0.2em" }}
                  >
                    Ver proyecto →
                  </TransitionLink>
                </div>
              </div>
            </div>
          ))}

          {/* Arc edge reveals (reused, scoped to mini-slider) */}
          <EdgeReveal
            prevImage={others[prevIdx]?.image ?? null}
            nextImage={others[nextIdx]?.image ?? null}
            containerRef={miniSliderRef as React.RefObject<HTMLElement | null>}
            onPrev={() => miniGoTo(prevIdx, -1)}
            onNext={() => miniGoTo(nextIdx, 1)}
            isTouch={isTouch}
          />

          {/* Dot nav */}
          <div
            className="absolute flex gap-3 items-center z-10"
            style={{ left: "clamp(2rem, 4vw, 4rem)", bottom: "clamp(1.5rem, 3vh, 2rem)" }}
          >
            {others.map((_, i) => (
              <button
                key={i}
                onClick={() => miniGoTo(i, i > miniCurrentRef.current ? 1 : -1)}
                aria-label={`Proyecto ${i + 1}`}
                style={{
                  height: "1px",
                  width: i === miniCurrent ? "28px" : "8px",
                  backgroundColor: i === miniCurrent ? "#A80110" : "rgba(255,255,255,0.2)",
                  transition: "width 0.4s ease, background-color 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
