"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasHover || reducedMotion || !cursorRef.current) return;

    document.body.classList.add("has-custom-cursor");

    const cursor = cursorRef.current;
    // Offset by half the cursor size (5px) to center the dot on the pointer
    const HALF = 5;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - HALF}px, ${e.clientY - HALF}px)`;
    };

    const onMouseEnterLink = () => cursor.classList.add("custom-cursor--large");
    const onMouseLeaveLink = () => cursor.classList.remove("custom-cursor--large");

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.querySelectorAll("a, button").forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    />
  );
}
