"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import { gsap } from "gsap";

/* ─── Public handle ─────────────────────────────────────────────────── */

export interface LoaderHandle {
  /** Full entrance + hold + exit (~1.6s). Returns promise resolving at fade-out start. */
  playFull(): Promise<void>;
  /** Short transition version (~0.9s). Returns promise resolving at fade-out start. */
  playShort(): Promise<void>;
  /** Instantly hide (no animation). */
  hide(): void;
}

/* ─── SVG arc geometry ──────────────────────────────────────────────── */
// 3 concentric arcs (270° each = 3/4 circle), rotated for visual rhythm.
// stroke-dashoffset animation "draws" each arc on cue.

const arcs = [
  { r: 38, rotation: -90,  delay: 0   },  // outer
  { r: 26, rotation: -60,  delay: 0.2 },  // mid
  { r: 14, rotation: -30,  delay: 0.4 },  // inner
];

const ARC_FRACTION = 0.78; // 78% of circumference visible

/* ─── Component ─────────────────────────────────────────────────────── */

export const Loader = forwardRef<LoaderHandle>(function Loader(_, ref) {
  const rootRef  = useRef<HTMLDivElement>(null);
  const svgRef   = useRef<SVGSVGElement>(null);
  const arcRefs  = useRef<(SVGCircleElement | null)[]>([]);

  /* helpers */
  const circumference = (r: number) => 2 * Math.PI * r;
  const dashArray     = (r: number) => {
    const c = circumference(r);
    return `${c * ARC_FRACTION} ${c * (1 - ARC_FRACTION)}`;
  };

  /* core animation builder */
  const buildTl = (drawDur: number, staggerDur: number, holdDur: number) =>
    new Promise<void>((resolve) => {
      const root = rootRef.current;
      const els  = arcRefs.current;
      if (!root || els.some(e => !e)) { resolve(); return; }

      gsap.set(root, { display: "flex", opacity: 1 });

      const tl = gsap.timeline({
        onComplete: () => {
          // fade overlay out — caller can react immediately (resolved before fade)
          gsap.to(root, {
            opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => gsap.set(root, { display: "none" }),
          });
        },
      });

      // Reset arcs
      els.forEach((el, i) => {
        const c = circumference(arcs[i].r);
        gsap.set(el, { strokeDashoffset: c * ARC_FRACTION });
      });

      // Draw each arc
      els.forEach((el, i) => {
        tl.to(
          el,
          { strokeDashoffset: 0, duration: drawDur, ease: "power2.out" },
          arcs[i].delay * staggerDur
        );
      });

      // Hold, then resolve (caller navigates)
      tl.call(() => resolve(), [], `>+=${holdDur}`);
    });

  useImperativeHandle(ref, () => ({
    playFull()  { return buildTl(0.75, 1, 0.35); },
    playShort() { return buildTl(0.38, 1, 0.08); },
    hide() {
      const root = rootRef.current;
      if (root) gsap.set(root, { display: "none", opacity: 0 });
    },
  }));

  return (
    <div
      ref={rootRef}
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
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        width="96"
        height="96"
        aria-hidden="true"
        style={{ overflow: "visible" }}
      >
        {arcs.map((arc, i) => {
          const c  = circumference(arc.r);
          const da = dashArray(arc.r);
          return (
            <circle
              key={i}
              ref={el => { arcRefs.current[i] = el; }}
              cx="50"
              cy="50"
              r={arc.r}
              fill="none"
              stroke={i === 0 ? "#A80110" : i === 1 ? "#0A0A0A" : "#0A0A0A"}
              strokeWidth={i === 0 ? 2.4 : i === 1 ? 1.8 : 1.2}
              strokeDasharray={da}
              strokeDashoffset={c * ARC_FRACTION}
              strokeLinecap="round"
              style={{ transform: `rotate(${arc.rotation}deg)`, transformOrigin: "50px 50px" }}
            />
          );
        })}
      </svg>
    </div>
  );
});
