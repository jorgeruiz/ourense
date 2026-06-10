"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface Props {
  prevImage: string | null;
  nextImage: string | null;
  containerRef: React.RefObject<HTMLElement | null>;
  onPrev(): void;
  onNext(): void;
  isTouch?: boolean;
}

/**
 * Curved-edge vertical strip reveal.
 * Uses clip-path: ellipse() so the inner boundary of each strip is a
 * natural arc — matches the brand's concentric-circle identity.
 *
 *   Right strip: ellipse(w% 50% at 100% 50%)
 *   Left  strip: ellipse(w% 50% at 0%   50%)
 *
 * `w` animates from 0 → MAX_W as cursor approaches each edge.
 * gsap.to with overwrite:true handles the rapid mousemove updates.
 */

const ZONE      = 0.28;  // active zone: within 28% of each edge
const MAX_W     = 22;    // max half-width of ellipse (% of element width)
const DUR_IN    = 0.55;
const DUR_OUT   = 0.7;
const EASE_IN   = "power2.out";
const EASE_OUT  = "power2.inOut";

export function EdgeReveal({
  prevImage,
  nextImage,
  containerRef,
  onPrev,
  onNext,
  isTouch = false,
}: Props) {
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);
  const leftW     = useRef(0);
  const rightW    = useRef(0);

  useEffect(() => {
    if (isTouch) return;
    const left  = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    gsap.set(left,  { clipPath: "ellipse(0% 50% at 0% 50%)" });
    gsap.set(right, { clipPath: "ellipse(0% 50% at 100% 50%)" });

    const onMove = (e: MouseEvent) => {
      const pct        = e.clientX / window.innerWidth;
      const newLeftW   = Math.max(0, (ZONE - pct) / ZONE) * MAX_W;
      const newRightW  = Math.max(0, (pct - (1 - ZONE)) / ZONE) * MAX_W;

      if (Math.abs(newLeftW - leftW.current) > 0.2) {
        leftW.current = newLeftW;
        gsap.to(left, {
          clipPath: `ellipse(${newLeftW}% 50% at 0% 50%)`,
          duration: newLeftW > 0 ? DUR_IN : DUR_OUT,
          ease: newLeftW > 0 ? EASE_IN : EASE_OUT,
          overwrite: true,
        });
      }

      if (Math.abs(newRightW - rightW.current) > 0.2) {
        rightW.current = newRightW;
        gsap.to(right, {
          clipPath: `ellipse(${newRightW}% 50% at 100% 50%)`,
          duration: newRightW > 0 ? DUR_IN : DUR_OUT,
          ease: newRightW > 0 ? EASE_IN : EASE_OUT,
          overwrite: true,
        });
      }
    };

    const onLeave = () => {
      leftW.current  = 0;
      rightW.current = 0;
      gsap.to(left,  { clipPath: "ellipse(0% 50% at 0% 50%)",   duration: DUR_OUT, ease: EASE_OUT, overwrite: true });
      gsap.to(right, { clipPath: "ellipse(0% 50% at 100% 50%)", duration: DUR_OUT, ease: EASE_OUT, overwrite: true });
    };

    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("mousemove", onMove  as EventListener, { passive: true });
    container.addEventListener("mouseleave", onLeave as EventListener, { passive: true });
    return () => {
      container.removeEventListener("mousemove", onMove  as EventListener);
      container.removeEventListener("mouseleave", onLeave as EventListener);
    };
  }, [isTouch, containerRef]);

  if (isTouch) return null;

  const base: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    willChange: "clip-path",
    pointerEvents: "auto",
    cursor: "none",
    zIndex: 5,
  };

  const imgWrap: React.CSSProperties = {
    position: "absolute",
    insetBlock: 0,
    left: "-15%",
    width: "130%",
  };

  return (
    <>
      {prevImage && (
        <div ref={leftRef} style={base} onClick={onPrev} aria-hidden="true">
          <div style={imgWrap}>
            <Image src={prevImage} alt="" fill className="object-cover" sizes="130vw" />
            <div style={{ position: "absolute", inset: 0, background: "rgba(6,6,6,0.32)" }} />
          </div>
        </div>
      )}

      {nextImage && (
        <div ref={rightRef} style={base} onClick={onNext} aria-hidden="true">
          <div style={imgWrap}>
            <Image src={nextImage} alt="" fill className="object-cover" sizes="130vw" />
            <div style={{ position: "absolute", inset: 0, background: "rgba(6,6,6,0.32)" }} />
          </div>
        </div>
      )}
    </>
  );
}
