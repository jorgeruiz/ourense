"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/preguntas-frecuentes", label: "FAQs" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Propuesta-2 tiene su propia nav light — no renderizar la dark global
  if (pathname?.startsWith("/propuesta-2")) return null;

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => setIsScrolled(true),
      onLeaveBack: () => setIsScrolled(false),
    });
    return () => trigger.kill();
  }, []);

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">Saltar al contenido</a>

      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-white/8"
            : "bg-transparent"
        }`}
        style={{ height: "72px" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 xl:px-20 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="Ourense — Inicio">
            {/* "O" tipográfica Monoton — sin fondo, sin imagen */}
            <span
              className="font-display text-[#A80110] text-2xl leading-none select-none transition-opacity duration-300 group-hover:opacity-70"
              aria-hidden="true"
            >
              O
            </span>
            <span className="text-white font-sans font-bold text-sm uppercase tracking-[0.16em]">
              Ourense
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#999999] hover:text-white text-sm font-medium uppercase tracking-[0.1em] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA desktop + hamburger mobile */}
          <div className="flex items-center gap-4">
            <Link
              href="/contacto"
              className="hidden lg:inline-flex items-center gap-2 bg-[#A80110] text-white text-xs font-medium uppercase tracking-[0.12em] px-6 py-3 transition-all duration-300 hover:bg-[#8a010d] active:scale-[0.98]"
            >
              Solicitar cotización
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-[6px]"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <span
                className={`block w-6 h-px bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-white transition-all duration-300 ${
                  menuOpen ? "opacity-0 scale-x-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-px bg-white transition-all duration-300 origin-center ${
                  menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(24px)" }}
      >
        <nav
          className="h-full flex flex-col justify-center items-center gap-8"
          aria-label="Menú móvil"
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white text-3xl font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:text-[#A80110]"
              style={{
                transitionDelay: menuOpen ? `${i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setMenuOpen(false)}
            className="mt-8 bg-[#A80110] text-white text-sm font-medium uppercase tracking-[0.12em] px-10 py-4 transition-all duration-300 hover:bg-[#8a010d]"
            style={{
              transitionDelay: menuOpen ? `${NAV_LINKS.length * 60}ms` : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(24px)",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            Solicitar cotización
          </Link>
        </nav>
      </div>
    </>
  );
}
