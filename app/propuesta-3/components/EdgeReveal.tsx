"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface Props {
  /** Image src for the slide revealed on the LEFT edge (previous) */
  prevImage: string | null;
  /** Image src for the slide revealed on the RIGHT edge (next) */
  nextImage: string | null;
  /** Container element to attach mousemove to */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Called when user clicks the left reveal zone */
  onPrev(): void;
  /** Called when user clicks the right reveal zone */
  onNext(): void;
  /** Disable on touch devices */
  isTouch?: boolean;
}

const ZONE_THRESHOLD = 0.28; // cursor within 28% of each edge activates reveal
const MAX_RADIUS_VW  = 36;   // max reveal circle radius in vw

/**
 * Curved arc reveal: two absolutely-positioned divs with
 * clip-path: circle() that expand as cursor approaches each edge.
 *
 * Performance: clip-path on will-change:clip-path is GPU-composited
 * in Chrome/Firefox/Safari 16+. If jank is observed on target device,
 * swap to the scale+overflow approach commented below.
 */
export function EdgeReveal({
  prevImage,
  nextImage,
  containerRef,
  onPrev,
  onNext,
  isTouch = false,
}: Props) {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftRadius  = useRef(0);
  const rightRadius = useRef(0);
  const leftQt  = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const rightQt = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  useEffect(() => {
    if (isTouch) return;
    const left  = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    // Initialise clip-paths
    gsap.set(left,  { clipPath: "circle(0px at 0% 50%)" });
    gsap.set(right, { clipPath: "circle(0px at 100% 50%)" });

    // quickTo for smooth radius tracking without re-renders
    leftQt.current  = gsap.quickTo(leftRadius,  "current", { duration: 0.45, ease: "power2.out",
      onUpdate: () => left.style.clipPath  = `circle(${leftRadius.current}px at 0% 50%)` });
    rightQt.current = gsap.quickTo(rightRadius, "current", { duration: 0.45, ease: "power2.out",
      onUpdate: () => right.style.clipPath = `circle(${rightRadius.current}px at 100% 50%)` });

    const onMove = (e: MouseEvent) => {
      const w    = window.innerWidth;
      const x    = e.clientX;
      const maxR = (MAX_RADIUS_VW / 100) * w;

      // Left zone: cursor within ZONE_THRESHOLD from left
      const leftProx  = Math.max(0, ZONE_THRESHOLD - x / w) / ZONE_THRESHOLD;
      const rightProx = Math.max(0, ZONE_THRESHOLD - (1 - x / w)) / ZONE_THRESHOLD;

      leftRadius.current  = leftProx  * maxR;
      rightRadius.current = rightProx * maxR;

      left.style.clipPath  = `circle(${leftRadius.current}px at 0% 50%)`;
      right.style.clipPath = `circle(${rightRadius.current}px at 100% 50%)`;
    };

    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", onMove as EventListener, { passive: true });
    return () => container.removeEventListener("mousemove", onMove as EventListener);
  }, [isTouch, containerRef]);

  if (isTouch) return null;

  const sharedStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    willChange: "clip-path",
    pointerEvents: "auto",
    cursor: "none",
    zIndex: 5,
  };

  const imgStyle: React.CSSProperties = {
    position: "absolute",
    insetBlock: 0,
    width: "130%",
  };

  return (
    <>
      {/* Left edge — previous slide preview */}
      {prevImage && (
        <div
          ref={leftRef}
          style={sharedStyle}
          onClick={onPrev}
          aria-hidden="true"
        >
          <div style={{ ...imgStyle, left: "-15%" }}>
            <Image src={prevImage} alt="" fill className="object-cover" sizes="130vw" />
            {/* Slight dark tint to differentiate from active slide */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(6,6,6,0.28)" }} />
          </div>
        </div>
      )}

      {/* Right edge — next slide preview */}
      {nextImage && (
        <div
          ref={rightRef}
          style={sharedStyle}
          onClick={onNext}
          aria-hidden="true"
        >
          <div style={{ ...imgStyle, left: "-15%" }}>
            <Image src={nextImage} alt="" fill className="object-cover" sizes="130vw" />
            <div style={{ position: "absolute", inset: 0, background: "rgba(6,6,6,0.28)" }} />
          </div>
        </div>
      )}
    </>
  );
}
