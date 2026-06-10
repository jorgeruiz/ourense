"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
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


/* ─── Component ─────────────────────────────────────────────────────── */
export function ProjectDetail({ project, others }: Props) {
  /* Intro overlay */
  const introRef      = useRef<HTMLDivElement>(null);
  const introTitleRef = useRef<HTMLDivElement>(null);

  /* Mini-slider cursor */
  const cursorRef      = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLSpanElement>(null);
  const [overMini, setOverMini] = useState(false);

  /* Mini-slider state */
  const [miniCurrent,  setMiniCurrent]  = useState(0);
  const miniSliderRef  = useRef<HTMLDivElement>(null);
  const miniSlideRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const miniImgRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const miniCurrentRef = useRef(0);
  const miniCanNav     = useRef(true);

  const isTouch = typeof window !== "undefined" ? getIsTouch() : false;
  const d = project.details;

  /* ── Init mini-slider positions ───────────────────────────────────── */
  useEffect(() => {
    others.forEach((_, i) => {
      const el  = miniSlideRefs.current[i];
      const img = miniImgRefs.current[i];
      if (!el || !img) return;
      gsap.set(el,  { x: i === 0 ? "0%" : "100%" });
      gsap.set(img, { x: i === 0 ? "0%" : "20%" });
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
    gsap.set(newImg, { x: dir === 1 ? "22%"  : "-22%" });

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

  /* ── Touch swipe for mini-slider ──────────────────────────────────── */
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

  /* ── Intro animation ─────────────────────────────────────────────── */
  /* Phase 1: white overlay covers screen, title appears letter-by-letter (black)  */
  /* Phase 2: overlay slides UP independently; title STAYS in place, color → white */
  useEffect(() => {
    const overlay = introRef.current;
    const titleEl = introTitleRef.current;
    if (!overlay || !titleEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(overlay, { display: "none" });
      gsap.set(titleEl, { display: "none" });
      return;
    }

    const chars = titleEl.querySelectorAll<HTMLElement>(".intro-char");
    gsap.set(chars, { opacity: 0 });
    gsap.set(titleEl, { color: "#0A0A0A" });

    const tl = gsap.timeline();

    /* Phase 1: letters appear, black on white */
    tl.to(chars, { opacity: 1, stagger: 0.032, duration: 0.12, ease: "power2.out", delay: 0.25 });

    /* Hold */
    tl.to({}, { duration: 0.3 });

    /* Phase 2a: white overlay lifts — title stays fixed (it's outside the overlay) */
    tl.to(overlay, {
      y: "-100%",
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => gsap.set(overlay, { display: "none" }),
    }, ">");

    /* Phase 2b: title color transitions black → white as hero image is revealed */
    tl.to(titleEl, {
      color: "#FFFFFF",
      duration: 0.45,
      ease: "power1.out",
    }, "<+0.12"); /* starts 0.12s after overlay begins lifting */

    /* Phase 2c: fade out the title (hero title underneath takes over visually) */
    tl.to(titleEl, {
      opacity: 0,
      duration: 0.22,
      onComplete: () => gsap.set(titleEl, { display: "none" }),
    });

    return () => { tl.kill(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Scroll reveals + parallax entrance ──────────────────────────── */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el, i) => {
          gsap.from(el, {
            opacity: 0, y: 36,
            duration: 0.85, ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // Mini-slider parallax entrance
        const mini = miniSliderRef.current;
        if (mini) {
          gsap.fromTo(mini,
            { y: 80 },
            {
              y: 0, ease: "none",
              scrollTrigger: {
                trigger: mini,
                start: "top bottom",
                end: "top top",
                scrub: 1.2,
              },
            }
          );
        }
      }
    });
    return () => ctx.revert();
  }, []);

  /* ── Mini-slider cursor tracking ─────────────────────────────────── */
  useEffect(() => {
    if (isTouch) return;
    const slider = miniSliderRef.current;
    if (!slider) return;

    const EDGE = 0.28;
    const onMove = (e: MouseEvent) => {
      const cursor = cursorRef.current;
      if (cursor) cursor.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;

      const label = cursorLabelRef.current;
      if (label) {
        const pct  = e.clientX / window.innerWidth;
        const n    = others.length;
        const prev = (miniCurrentRef.current - 1 + n) % n;
        const next = (miniCurrentRef.current + 1) % n;
        if (pct < EDGE) {
          label.textContent = `← ${others[prev].headline[0]}`;
          label.style.opacity = "1";
        } else if (pct > (1 - EDGE)) {
          label.textContent = `${others[next].headline[0]} →`;
          label.style.opacity = "1";
        } else {
          label.style.opacity = "0";
        }
      }
    };

    slider.addEventListener("mousemove", onMove, { passive: true });
    return () => slider.removeEventListener("mousemove", onMove);
  }, [isTouch, others]);

  const n       = others.length;
  const prevIdx = (miniCurrent - 1 + n) % n;
  const nextIdx = (miniCurrent + 1) % n;

  /* ─── Render ──────────────────────────────────────────────────────── */
  return (
    <div className="bg-[#F5F5F2] text-[#0A0A0A]">

      {/* ── Intro overlay: white bg only — slides up independently ── */}
      <div
        ref={introRef}
        className="fixed inset-0 z-[9989] bg-white pointer-events-none"
      />

      {/* ── Intro title: OUTSIDE overlay so it stays when overlay lifts ── */}
      <div
        ref={introTitleRef}
        className="fixed z-[9990] pointer-events-none px-8 xl:px-16"
        style={{ left: 0, right: 0, bottom: "clamp(4rem, 8vh, 7rem)" }}
      >
        <div
          className="font-bold leading-[0.88] tracking-[-0.04em]"
          style={{ fontSize: "clamp(3rem, 8vw, 120px)" }}
        >
          {project.headline.map((line, li) => (
            <div key={li} className="block">
              {line.split("").map((char, ci) => (
                <span key={ci} className="intro-char" style={{ display: "inline-block" }}>
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Custom cursor for mini-slider ─────────────────────────── */}
      {!isTouch && (
        <div
          ref={cursorRef}
          className="fixed top-0 left-0 z-[9999] pointer-events-none select-none"
          style={{
            transform: "translate(-999px,-999px)",
            opacity: overMini ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <div style={{
            width: "10px", height: "10px",
            border: "1.5px solid rgba(255,255,255,0.85)",
            borderRadius: "50%",
            marginLeft: "-5px", marginTop: "-5px",
          }} />
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

      {/* ── Sticky nav ─────────────────────────────────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 grid items-center px-8 xl:px-16"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
          height: "72px",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          background: "rgba(10,10,10,0.22)",
        }}
      >
        {/* Left: logo */}
        <TransitionLink href="/propuesta-3" className="flex items-center gap-2">
          <span style={{ fontFamily: "var(--font-display-base, serif)", fontSize: "38px", color: "#A80110", lineHeight: 1 }}>O</span>
          <span className="hidden sm:block text-white font-bold uppercase" style={{ fontSize: "10px", letterSpacing: "0.26em" }}>Ourense</span>
        </TransitionLink>

        {/* Center: nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Nosotros", "Servicios", "Contacto"].map(label => (
            <TransitionLink
              key={label}
              href={`/propuesta-3/${label.toLowerCase()}`}
              className="text-white/70 hover:text-white transition-colors font-bold uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.22em" }}
            >
              {label}
            </TransitionLink>
          ))}
        </div>

        {/* Right: CTA */}
        <div className="flex justify-end">
          <TransitionLink
            href="/propuesta-3/contacto"
            className="hidden sm:flex items-center gap-2 bg-[#A80110] text-white font-bold uppercase hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200"
            style={{ fontSize: "10px", letterSpacing: "0.22em", padding: "10px 20px" }}
          >
            Cotizar
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 8L8 2M8 2H3M8 2v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </TransitionLink>
        </div>
      </nav>

      {/* ── Hero — 100vh ────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ height: "100dvh" }}>
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
          style={{ background: "linear-gradient(to top, rgba(6,6,6,0.88) 0%, rgba(6,6,6,0.12) 60%)" }}
        />

        {/* Category pill */}
        <div
          className="absolute left-8 xl:left-16"
          style={{ top: "clamp(5rem, 10vh, 8rem)" }}
        >
          <span
            className="inline-block bg-[#A80110] text-white font-bold uppercase"
            style={{ fontSize: "8px", letterSpacing: "0.26em", padding: "5px 12px" }}
          >
            {project.category}
          </span>
        </div>

        {/* Headline — bottom left */}
        <div
          className="absolute left-8 xl:left-16 right-8 xl:right-16"
          style={{ bottom: "clamp(4rem, 8vh, 7rem)" }}
        >
          <p className="text-white/40 font-bold uppercase mb-4" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
            {project.location} · {project.year}
          </p>
          <h1
            className="font-bold text-white leading-[0.88] tracking-[-0.04em]"
            style={{ fontSize: "clamp(3rem, 8vw, 120px)" }}
          >
            {project.headline.map((line, i) => (
              <div key={i} className="block">{line}</div>
            ))}
          </h1>
          <p
            className="text-white/55 mt-6 max-w-[520px] leading-[1.5]"
            style={{ fontSize: "clamp(0.85rem, 1.4vw, 17px)" }}
          >
            {project.sub}
          </p>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute right-8 xl:right-16 flex flex-col items-center gap-2"
          style={{ bottom: "clamp(2.5rem, 5vh, 4rem)" }}
        >
          <div
            style={{
              width: "1px",
              height: "48px",
              background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 100%)",
            }}
          />
        </div>
      </div>

      {/* ── Brief section — light background ────────────────────────── */}
      <div className="bg-[#F5F5F2] px-8 xl:px-16 py-20 xl:py-28">

        {/* Specs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-14 border-b border-[#0A0A0A]/[0.08] mb-16">
          {[
            { label: "Superficie",  val: d?.area     ?? project.category },
            { label: "Duración",    val: d?.duration ?? "—" },
            { label: "Cliente",     val: d?.client   ?? "—" },
            { label: "Año",         val: project.year || "—" },
          ].map(({ label, val }) => (
            <div key={label} className="reveal-up">
              <p className="text-[#0A0A0A]/30 font-bold uppercase mb-2" style={{ fontSize: "9px", letterSpacing: "0.26em" }}>
                {label}
              </p>
              <p className="font-bold text-[#0A0A0A] text-sm leading-snug">{val}</p>
            </div>
          ))}
        </div>

        {/* Description + services — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 xl:gap-24">
          {/* Left: description paragraphs */}
          <div className="space-y-6">
            {(d?.description ?? [project.sub]).map((para, i) => (
              <p
                key={i}
                className="reveal-up text-[#0A0A0A]/70 leading-[1.65]"
                style={{ fontSize: "clamp(0.9rem, 1.3vw, 17px)" }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* Right: services */}
          <div className="reveal-up">
            <p className="text-[#0A0A0A]/30 font-bold uppercase mb-6" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>
              Servicios prestados
            </p>
            <ul className="space-y-0">
              {(d?.services ?? ["Construcción Integral"]).map((svc, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 py-4 border-b border-[#0A0A0A]/[0.07]"
                  style={{ fontSize: "13px", fontWeight: 500 }}
                >
                  <span className="w-1 h-1 rounded-full bg-[#A80110] flex-shrink-0" />
                  {svc}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Gallery — light bg, full-bleed images ────────────────────── */}
      {d?.gallery && d.gallery.length >= 2 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#0A0A0A]/[0.06]">
          {d.gallery.slice(0, 2).map((src, i) => (
            <div key={i} className="reveal-up relative overflow-hidden bg-[#F5F5F2]" style={{ aspectRatio: "4/3" }}>
              <Image
                src={src}
                alt={`${project.headline.join(" ")} — imagen ${i + 1}`}
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          ))}
        </div>
      )}

      {/* ── Quote — light bg, typographic ───────────────────────────── */}
      {d?.quote && (
        <div className="px-8 xl:px-16 py-20 xl:py-28 border-t border-[#0A0A0A]/[0.06]">
          <div className="max-w-[860px]">
            <div className="reveal-up h-px w-8 bg-[#A80110] mb-10" />
            <blockquote
              className="reveal-up font-bold leading-[1.22] tracking-[-0.025em] text-[#0A0A0A]"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 36px)" }}
            >
              &ldquo;{d.quote}&rdquo;
            </blockquote>
            <p className="reveal-up mt-8 text-[#0A0A0A]/35 font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.26em" }}>
              {d.quoteAuthor}
            </p>
          </div>
        </div>
      )}

      {/* ── CTA section ─────────────────────────────────────────────── */}
      <div className="bg-[#F5F5F2] px-8 xl:px-16 py-20 xl:py-28 border-t border-[#0A0A0A]/[0.06] flex flex-col sm:flex-row sm:items-end sm:justify-between gap-10">
        <div className="max-w-[500px]">
          <p className="reveal-up text-[#0A0A0A]/30 font-bold uppercase mb-5" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
            Siguiente paso
          </p>
          <p
            className="reveal-up font-bold leading-[1.15] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.6rem, 3.2vw, 48px)" }}
          >
            ¿Tienes un proyecto similar? Hablemos.
          </p>
        </div>
        <TransitionLink
          href="/contacto"
          className="reveal-up font-bold uppercase text-white bg-[#A80110] hover:bg-[#8a010d] active:scale-[0.98] transition-all duration-200 w-max"
          style={{ fontSize: "10px", letterSpacing: "0.22em", padding: "18px 36px" }}
        >
          Iniciar proyecto
        </TransitionLink>
      </div>

      {/* ── Mini-slider: otros proyectos ─────────────────────────────── */}
      {/* paddingBottom=100dvh so user can scroll past and the page doesn't cut abruptly */}
      <div style={{ paddingBottom: "80px", background: "#0A0A0A" }}>
        {/* Label strip */}
        <div
          className="flex items-center justify-between px-8 xl:px-16 bg-[#0A0A0A]"
          style={{ height: "60px" }}
        >
          <p className="text-white/30 font-bold uppercase" style={{ fontSize: "9px", letterSpacing: "0.32em" }}>
            Otros proyectos
          </p>
          <TransitionLink
            href="/propuesta-3/proyectos"
            className="font-bold uppercase text-white/30 hover:text-white transition-colors"
            style={{ fontSize: "9px", letterSpacing: "0.22em" }}
          >
            Ver todos
          </TransitionLink>
        </div>

        {/* The slider */}
        <div
          ref={miniSliderRef}
          className="relative overflow-hidden"
          style={{ height: "100dvh", cursor: isTouch ? "auto" : "none" }}
          aria-label="Otros proyectos"
          onMouseEnter={() => setOverMini(true)}
          onMouseLeave={() => { setOverMini(false); if (cursorLabelRef.current) cursorLabelRef.current.style.opacity = "0"; }}
        >
          {/* Slides */}
          {others.map((s, i) => (
            <div
              key={s.id}
              ref={el => { miniSlideRefs.current[i] = el; }}
              className="absolute inset-0 will-change-transform"
            >
              {/* Parallax image wrap */}
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

              {/* Gradient */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(6,6,6,0.85) 0%, rgba(6,6,6,0.18) 55%, rgba(6,6,6,0.45) 100%)" }}
              />

              {/* Watermark number */}
              <div
                className="absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 font-bold text-white/[0.05] leading-none select-none pointer-events-none"
                style={{ fontSize: "clamp(8rem, 20vw, 220px)", letterSpacing: "-0.06em" }}
                aria-hidden="true"
              >
                {s.id}
              </div>

              {/* Slide info */}
              <div
                className="absolute left-8 xl:left-16 right-8 xl:right-16"
                style={{ bottom: "clamp(4rem, 8vh, 6.5rem)" }}
              >
                <p className="text-white/40 font-bold uppercase mb-3" style={{ fontSize: "9px", letterSpacing: "0.28em" }}>
                  {s.category} · {s.location} · {s.year}
                </p>
                <h2
                  className="font-bold text-white leading-[0.88] tracking-[-0.04em]"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 100px)" }}
                >
                  {s.headline.map((line, li) => <div key={li}>{line}</div>)}
                </h2>
                <div className="mt-6">
                  <Link
                    href={`/propuesta-3/proyectos/${s.slug}`}
                    className="inline-flex items-center gap-2 border border-white/25 text-white font-bold uppercase hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
                    style={{ fontSize: "10px", letterSpacing: "0.2em", padding: "14px 24px" }}
                  >
                    Ver proyecto
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Edge reveals */}
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
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Vertical progress line */}
          <div
            className="absolute top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1"
            style={{ right: "clamp(2rem, 4vw, 4rem)" }}
          >
            {others.map((_, i) => (
              <div
                key={i}
                style={{
                  width: "1px",
                  height: i === miniCurrent ? "32px" : "10px",
                  backgroundColor: i === miniCurrent ? "#A80110" : "rgba(255,255,255,0.18)",
                  transition: "height 0.4s ease, background-color 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
