"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";

export interface LoaderHandle {
  /** Full entrance + hold + exit (~1.6s). Resolves when arcs finish drawing. */
  playFull(): Promise<void>;
  /** Short version (~0.65s). Resolves when arcs finish drawing. */
  playShort(): Promise<void>;
  /** Instant hide. */
  hide(): void;
  /** Show overlay (for wipe transition). */
  showOverlay(): void;
  /** Hide overlay with upward wipe exit. */
  hideOverlay(): Promise<void>;
}

/* ─── Arc geometry ───────────────────────────────────────────────────── */
const ARCS = [
  { r: 38, rotation: -90,  stroke: "#A80110", sw: 2.4 },  // outer — brand red
  { r: 26, rotation: -55,  stroke: "#FAFAFA",  sw: 1.8 },  // mid — white
  { r: 14, rotation: -25,  stroke: "#FAFAFA",  sw: 1.2 },  // inner — white
];
const FRACTION = 0.78; // 78% of circumference drawn

function circ(r: number)    { return 2 * Math.PI * r; }
function dashArr(r: number) {
  const c = circ(r);
  return `${c * FRACTION} ${c * (1 - FRACTION)}`;
}

/* ─── Component ─────────────────────────────────────────────────────── */

export const Loader = forwardRef<LoaderHandle>(function Loader(_, ref) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const arcRefs    = useRef<(SVGCircleElement | null)[]>([]);

  function resetArcs() {
    arcRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { strokeDashoffset: circ(ARCS[i].r) * FRACTION });
    });
  }

  function drawArcs(drawDur: number, staggerStep: number): gsap.core.Timeline {
    const tl = gsap.timeline();
    arcRefs.current.forEach((el, i) => {
      tl.to(el, { strokeDashoffset: 0, duration: drawDur, ease: "power2.out" }, i * staggerStep);
    });
    return tl;
  }

  useImperativeHandle(ref, () => ({
    /* ── Initial page load: light bg loader ── */
    playFull(): Promise<void> {
      return new Promise(resolve => {
        const overlay = overlayRef.current;
        if (!overlay) { resolve(); return; }
        // Light bg for initial load
        overlay.style.backgroundColor = "#F5F5F2";
        gsap.set(overlay, { display: "flex", opacity: 1, y: 0 });
        resetArcs();

        const tl = gsap.timeline({
          onComplete: () => {
            resolve();
            gsap.to(overlay, {
              opacity: 0, duration: 0.4, ease: "power2.in",
              onComplete: () => gsap.set(overlay, { display: "none" }),
            });
          },
        });
        drawArcs(0.7, 0.25).call(() => {}, [], ">+=0.35").play();
        // resolve just before fade
        tl.call(() => resolve(), [], 1.0);
        tl.to({}, { duration: 0.35 }); // hold
      });
    },

    /* ── Page transition: transparent bg (wipe provides dark) ── */
    playShort(): Promise<void> {
      return new Promise(resolve => {
        const overlay = overlayRef.current;
        if (!overlay) { resolve(); return; }
        overlay.style.backgroundColor = "transparent";
        gsap.set(overlay, { display: "flex", opacity: 1, y: 0 });
        resetArcs();

        const tl = drawArcs(0.35, 0.13);
        tl.call(() => resolve());
      });
    },

    showOverlay() {
      const overlay = overlayRef.current;
      if (!overlay) return;
      overlay.style.backgroundColor = "#0A0A0A";
      gsap.set(overlay, { display: "flex", opacity: 1, y: "100%" });
      gsap.to(overlay, { y: 0, duration: 0.55, ease: "power3.in" });
    },

    hideOverlay(): Promise<void> {
      return new Promise(resolve => {
        const overlay = overlayRef.current;
        if (!overlay) { resolve(); return; }
        gsap.to(overlay, {
          y: "-100%", duration: 0.6, ease: "power3.out",
          onComplete: () => {
            gsap.set(overlay, { display: "none", y: 0 });
            resolve();
          },
        });
      });
    },

    hide() {
      const overlay = overlayRef.current;
      if (overlay) gsap.set(overlay, { display: "none" });
    },
  }));

  return (
    <div
      ref={overlayRef}
      aria-label="Cargando"
      aria-live="polite"
      style={{
        display: "none",
        position: "fixed",
        inset: 0,
        zIndex: 9998,
        backgroundColor: "#F5F5F2",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg viewBox="0 0 100 100" width="88" height="88" aria-hidden="true" style={{ overflow: "visible" }}>
        {ARCS.map((arc, i) => (
          <circle
            key={i}
            ref={el => { arcRefs.current[i] = el; }}
            cx="50" cy="50" r={arc.r}
            fill="none"
            stroke={arc.stroke}
            strokeWidth={arc.sw}
            strokeDasharray={dashArr(arc.r)}
            strokeDashoffset={circ(arc.r) * FRACTION}
            strokeLinecap="round"
            style={{ transform: `rotate(${arc.rotation}deg)`, transformOrigin: "50px 50px" }}
          />
        ))}
      </svg>
    </div>
  );
});
