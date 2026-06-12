"use client";

/* ─────────────────────────────────────────────────────────────────────────
   Propuesta 4 — Réplica mejorada de ourense.mx/home
   Cambios v2:
   - Hero: título bold + descripción + CTA en 50vh blanco
   - Imagen hero 70vh con divisor curvo invertido en la parte superior
   - Logos: fondo rojo, logos blancos, velocidad controlada por cursor X
   - Quote: parallax con cursor, imagen hero, tipografía bold uppercase
   - Proyectos: botón "Ver todos los proyectos"
   ───────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";

const WIX = "https://static.wixstatic.com/media";

const IMGS = {
  hero:         `${WIX}/36b3e7_be93d339e3a8457792e5112c20061809~mv2.jpg`,
  construccion: `${WIX}/36b3e7_21f2907801944491901b207256752efa~mv2.jpg`,
  movimiento:   `${WIX}/36b3e7_85d7de22ee0c4db3aad0d86db77ba80a~mv2.jpeg`,
  colados:      `${WIX}/36b3e7_1e9c2133c8374e4290424972e50afc65~mv2.jpeg`,
  ingenierias:  `${WIX}/36b3e7_0d9ef55c8c54464d8e12105adddf6833~mv2.jpg`,
  interiorismo: `${WIX}/36b3e7_3f45e8aecf5c4324ad5a6f924444e0bc~mv2.jpg`,
  maquinaria:   `${WIX}/36b3e7_89b06b86268d45baa8409e2172be2dfa~mv2.jpg`,
  truper:       `${WIX}/36b3e7_c8ef193684c941109ce00a07c7ddcac3~mv2.jpg`,
  tribecca:     `${WIX}/36b3e7_da4d0085f36d430e9f6f2d931c6d138e~mv2.jpeg`,
  havre:        `${WIX}/36b3e7_fff161d7c519481b9b3637d6055bc3bd~mv2.jpeg`,
  nosotros:     `${WIX}/36b3e7_bd328e6780ba473eaab4295849d6e88b~mv2.jpeg`,
};

/* Logos locales — AVIF con canal alpha */
const LOGO_FILES = [
  "/images/logos/36b3e7_1559d4d1583a44829c9c5e999b822f47~mv2.avif",
  "/images/logos/36b3e7_cf7915e5d73144e2a0a5d873f81380e0~mv2.avif",
  "/images/logos/36b3e7_833e4420c6d740bf95407b04b660df63~mv2.avif",
  "/images/logos/36b3e7_431dff95a69e4be6af2d4f5037b1e867~mv2.avif",
  "/images/logos/36b3e7_61c5b3081d074fc98aa76689ef76c447~mv2.avif",
  "/images/logos/36b3e7_365d4b65ed484e38b8cd57d178af4426~mv2.avif",
  "/images/logos/36b3e7_a6489d16207948e18575781998aa848f~mv2.avif",
  "/images/logos/36b3e7_84fe091ddcf5442fbc92b367cdecc147~mv2.avif",
  "/images/logos/36b3e7_7e310c1e2c3048929f34b485ae49e824~mv2.avif",
  "/images/logos/36b3e7_4743f924ca384ea5af73974602c3324a~mv2.avif",
  "/images/logos/36b3e7_19c4205fd4cd4322855ea092e43d3869~mv2.avif",
  "/images/logos/36b3e7_c7695900205d4bc3b974455c803a6e56~mv2.avif",
];

const SERVICES = [
  {
    title: "Construcción",
    desc: "Desarrollamos proyectos integrales, desde la cimentación hasta los acabados, con altos estándares de calidad.",
    img: IMGS.construccion,
  },
  {
    title: "Movimiento de tierras",
    desc: "Realizamos excavaciones, nivelaciones y compactaciones con maquinaria especializada y personal capacitado.",
    img: IMGS.movimiento,
  },
  {
    title: "Colados y Precolados",
    desc: "Ejecutamos colados en sitio y elementos precolados con precisión, resistencia y acabados de alto nivel.",
    img: IMGS.colados,
  },
  {
    title: "Ingenierías",
    desc: "Ofrecemos diseño y supervisión técnica especializada para optimizar tiempos, costos y seguridad en obra.",
    img: IMGS.ingenierias,
  },
  {
    title: "Interiorismo",
    desc: "Diseñamos y ejecutamos espacios interiores, funcionales, estéticos y a la medida de cada cliente.",
    img: IMGS.interiorismo,
  },
  {
    title: "Renta de maquinaria",
    desc: "Contamos con equipos de última generación para garantizar la eficiencia y calidad en cada proyecto.",
    img: IMGS.maquinaria,
  },
];

const PROJECTS = [
  {
    num: "01",
    name: "Hospital Regional de Alta especialidad ISSSTE",
    location: "Acapulco, Guerrero.",
    client: "INTEGMEV, S.A. DE C.V",
    year: "2024",
    img: IMGS.hero,
  },
  {
    num: "02",
    name: "Garitas Truper",
    location: "Jilotepec, Estado de México",
    client: "TRUPER",
    year: "2021-2023",
    img: IMGS.truper,
  },
  {
    num: "03",
    name: "Tribecca",
    location: "Nicolas San Juan, CDMX",
    client: "Interiorismo",
    year: "2024",
    img: IMGS.tribecca,
  },
  {
    num: "04",
    name: "Havre 77 & 83",
    location: "Colonia Juárez, CDMX",
    client: "Interiorismo",
    year: "2024",
    img: IMGS.havre,
  },
];

const NAV_LINKS = ["SOLUCIONES", "PROYECTOS", "NOSOTROS", "CONTACTO", "BLOG"];

/* Imágenes que rota el slider del hero */
const HERO_SLIDES = [
  { src: `${WIX}/36b3e7_be93d339e3a8457792e5112c20061809~mv2.jpg`, pos: "center 40%" },
  { src: `${WIX}/36b3e7_c8ef193684c941109ce00a07c7ddcac3~mv2.jpg`,  pos: "center 50%" },
  { src: `${WIX}/36b3e7_21f2907801944491901b207256752efa~mv2.jpg`,  pos: "center 35%" },
  { src: `${WIX}/36b3e7_89b06b86268d45baa8409e2172be2dfa~mv2.jpg`,  pos: "center 50%" },
];

export function Propuesta4Page() {
  /* ── Slider del hero ───────────────────────────────────────────────── */
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setSlideIdx((i) => (i + 1) % HERO_SLIDES.length),
      4000,
    );
    return () => clearInterval(id);
  }, []);

  /* ── Refs para efectos sin re-renders ──────────────────────────────── */
  const marqueeTrackRef   = useRef<HTMLDivElement>(null);
  const marqueeXRef       = useRef(0);
  const speedRef          = useRef(-0.8); // px/frame — negativo = mueve izq naturalmente
  const logosSectionRef   = useRef<HTMLElement>(null);
  const parallaxBgRef     = useRef<HTMLDivElement>(null);
  const parallaxTargetRef = useRef({ x: 0, y: 0 });
  const parallaxCurRef    = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf: number;

    const onMouseMove = (e: MouseEvent) => {
      const posX = e.clientX / window.innerWidth;   // 0 → 1
      const posY = e.clientY / window.innerHeight;  // 0 → 1

      /*
        Carrusel bidireccional (invertido, solo dentro de la sección):
        - Cursor der (1) → izquierda rápido  (−0.8 − 5.2 = −6 px/frame)
        - Cursor izq (0) → derecha rápido    (−0.8 + 5.2 = +4.4 px/frame)
        - Fuera de sección → drift neutro    (−0.8 px/frame)
      */
      const section = logosSectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const inside =
          e.clientY >= rect.top && e.clientY <= rect.bottom &&
          e.clientX >= rect.left && e.clientX <= rect.right;
        speedRef.current = inside
          ? -0.8 - (posX - 0.5) * 10.4  // invertido: der→izq, izq→der
          : -0.8;                         // drift natural
      }

      // Parallax: background sigue el cursor (efecto profundidad)
      parallaxTargetRef.current = {
        x: (posX - 0.5) * 60,
        y: (posY - 0.5) * 40,
      };
    };

    const tick = () => {
      /* ── Marquee bidireccional ────────────────────────────────────── */
      const track = marqueeTrackRef.current;
      if (track) {
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0) {
          let x = marqueeXRef.current + speedRef.current;
          // Wrap seamless en ambas direcciones en el rango (−halfWidth, 0]
          if (x > 0)           x -= halfWidth;
          if (x <= -halfWidth) x += halfWidth;
          marqueeXRef.current = x;
          track.style.transform = `translateX(${x}px)`;
        }
      }

      /* ── Parallax cursor (lerp suave) ────────────────────────────── */
      const cur = parallaxCurRef.current;
      const tgt = parallaxTargetRef.current;
      cur.x += (tgt.x - cur.x) * 0.04;
      cur.y += (tgt.y - cur.y) * 0.04;
      if (parallaxBgRef.current) {
        parallaxBgRef.current.style.transform = `translate(${cur.x}px, ${cur.y}px)`;
      }

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      style={{
        fontFamily: "var(--font-sans-base, 'Montserrat', system-ui, sans-serif)",
        backgroundColor: "#ffffff",
        color: "#0A0A0A",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .p4 a { text-decoration: none; }

        /* ── Nav links — underline scale desde la izquierda ──────────── */
        .p4-nav-link {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0A0A0A;
          text-decoration: none;
          position: relative;
          padding-bottom: 3px;
        }
        .p4-nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: #A80110;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .p4-nav-link:hover { color: #A80110; }
        .p4-nav-link:hover::after { transform: scaleX(1); }

        /* ── Botón rojo — relleno oscuro desliza desde la izquierda ──── */
        .p4-btn-red {
          display: inline-block;
          background: #A80110;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 1rem 2.5rem;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: color 0.1s;
        }
        .p4-btn-red::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #0A0A0A;
          transform: translateX(-101%);
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: -1;
        }
        .p4-btn-red:hover::before { transform: translateX(0); }

        /* ── Botón oscuro — relleno rojo sube desde abajo ────────────── */
        .p4-btn-dark {
          display: inline-block;
          background: #0A0A0A;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.9rem 2.25rem;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .p4-btn-dark::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #A80110;
          transform: translateY(101%);
          transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: -1;
        }
        .p4-btn-dark:hover::before { transform: translateY(0); }

        /* ── Botón outline — relleno oscuro escala desde abajo ───────── */
        .p4-btn-outline {
          display: inline-block;
          border: 1.5px solid #0A0A0A;
          color: #0A0A0A;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.9rem 2.5rem;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          isolation: isolate;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .p4-btn-outline::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #0A0A0A;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: -1;
        }
        .p4-btn-outline:hover { color: #fff; }
        .p4-btn-outline:hover::before { transform: scaleY(1); }

        /* ── Link flecha — punto rojo se expande en dash ─────────────── */
        /*
          Uso: <span class="p4-link-arrow">
                 <span class="link-dot"></span>
                 Texto →
               </span>
        */
        .p4-link-arrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0A0A0A;
          white-space: nowrap;
          cursor: pointer;
          transition: color 0.25s ease;
        }
        .p4-link-arrow:hover { color: #A80110; }
        .p4-link-arrow .link-dot {
          display: inline-block;
          width: 6px; height: 6px;
          background: #A80110;
          border-radius: 50%;
          flex-shrink: 0;
          transition:
            width 0.4s cubic-bezier(0.23, 1, 0.32, 1),
            border-radius 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .p4-project-row:hover .link-dot {
          width: 20px;
          border-radius: 3px;
        }
        .p4-link-arrow .link-text {
          transition: transform 0.35s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .p4-project-row:hover .link-text {
          transform: translateX(4px);
        }

        /* ── Service cards ────────────────────────────────────────────── */
        .p4-service-card {
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          display: block;
          position: relative;
        }
        .p4-svc-img { overflow: hidden; aspect-ratio: 4/3; }
        .p4-svc-img img {
          display: block; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .p4-service-card:hover .p4-svc-img img { transform: scale(1.07); }
        /* Línea roja bajo el título del servicio */
        .p4-svc-title {
          position: relative;
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .p4-svc-title::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          height: 2px; width: 0;
          background: #A80110;
          transition: width 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .p4-service-card:hover .p4-svc-title::after { width: 2rem; }

        /* ── Project rows ─────────────────────────────────────────────── */
        .p4-project-row {
          display: grid;
          grid-template-columns: 130px 1fr auto auto;
          gap: 2rem;
          align-items: center;
          padding: 1.75rem 0.5rem;
          border-top: 1px solid #e8e8e8;
          text-decoration: none;
          color: inherit;
          transition: background 0.25s;
        }
        .p4-project-row:last-child { border-bottom: 1px solid #e8e8e8; }
        .p4-project-row:hover { background: #f8f8f8; }

        .p4-proj-thumb { overflow: hidden; width: 130px; height: 82px; }
        .p4-proj-thumb img {
          display: block; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .p4-project-row:hover .p4-proj-thumb img { transform: scale(1.08); }

        /* ── Nosotros ─────────────────────────────────────────────────── */
        .p4-nos-img { overflow: hidden; }
        .p4-nos-img img {
          display: block; width: 100%; height: 100%; object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .p4-nos-img:hover img { transform: scale(1.03); }

        /* ── Footer links — underline scale ──────────────────────────── */
        .p4-footer-link {
          font-size: 0.875rem;
          color: rgba(250,250,250,0.7);
          text-decoration: none;
          position: relative;
          padding-bottom: 2px;
          width: fit-content;
        }
        .p4-footer-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 100%; height: 1px;
          background: #A80110;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .p4-footer-link:hover { color: #fff; }
        .p4-footer-link:hover::after { transform: scaleX(1); }

        /* ── Responsive ───────────────────────────────────────────────── */
        @media (max-width: 900px) {
          .p4-svc-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .p4-nos-grid  { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .p4-foot-grid { grid-template-columns: 1fr 1fr !important; }
          .p4-project-row { grid-template-columns: 1fr auto auto !important; }
          .p4-proj-thumb { display: none !important; }
        }
        @media (max-width: 600px) {
          .p4-svc-grid  { grid-template-columns: 1fr !important; }
          .p4-nav-links { display: none !important; }
          .p4-foot-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="p4">

        {/* ────────────────────────────────────────────────── NAVBAR */}
        <header style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "#fff", borderBottom: "1px solid #efefef",
        }}>
          <div style={{
            maxWidth: 1320, margin: "0 auto", padding: "0 2.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            height: 68,
          }}>
            <a href="/propuesta-4" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
              <span style={{ fontFamily: "var(--font-display-base, fantasy)", fontSize: "2.25rem", color: "#A80110", lineHeight: 1 }}>O</span>
              <span style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#0A0A0A" }}>OURENSE</span>
            </a>
            <nav className="p4-nav-links" style={{ display: "flex", gap: "2.5rem" }}>
              {NAV_LINKS.map((l) => <a key={l} href="#" className="p4-nav-link">{l}</a>)}
            </nav>
          </div>
        </header>

        {/* ────────────────────────────────────────────────── HERO — 50vh blanco */}
        <section style={{
          backgroundColor: "#fff",
          height: "calc(50vh - 34px)", /* 50vh descontando ½ navbar para que la imagen aparezca en pantalla */
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem 2.5rem",
          overflow: "hidden",
        }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <h1 style={{
              fontFamily: "var(--font-sans-base, 'Montserrat', system-ui, sans-serif)",
              fontSize: "clamp(1.8rem, 5vw, 4.25rem)",
              fontWeight: 800,
              textTransform: "uppercase",
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              marginBottom: "1.25rem",
              color: "#0A0A0A",
            }}>
              Construyendo conexiones,{" "}
              <span style={{ color: "#A80110" }}>
                forjando futuros.
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
              color: "#666",
              lineHeight: 1.7,
              maxWidth: 420,
              margin: "0 auto 1.75rem",
            }}>
              Descubre cómo podemos ayudarte a llevar tu proyecto al siguiente nivel.
            </p>

            <a href="#" className="p4-btn-red">Contáctanos</a>
          </div>
        </section>

        {/* ────────────────────────────────────────────────── IMAGEN HERO — 70vh slider */}
        {/* Divisor curvo invertido + slider con crossfade entre imágenes */}
        <section style={{ position: "relative", height: "70vh", overflow: "hidden", lineHeight: 0 }}>

          {/* Slides apilados — CSS crossfade */}
          {HERO_SLIDES.map((slide, i) => (
            <img
              key={slide.src}
              src={slide.src}
              alt={i === 0 ? "Obra Ourense Constructora" : ""}
              loading={i === 0 ? "eager" : "lazy"}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: slide.pos,
                opacity: i === slideIdx ? 1 : 0,
                transition: "opacity 1.4s ease-in-out",
                zIndex: i === slideIdx ? 1 : 0,
              }}
            />
          ))}

          {/* Puntos indicadores */}
          <div style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "0.5rem",
            zIndex: 10,
          }}>
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                aria-label={`Slide ${i + 1}`}
                style={{
                  width: i === slideIdx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === slideIdx ? "#A80110" : "rgba(255,255,255,0.6)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.35s ease, background 0.35s ease",
                }}
              />
            ))}
          </div>

          {/* Curva invertida: SVG blanco cubre esquinas, imagen emerge en arco */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0,
            zIndex: 20, pointerEvents: "none", lineHeight: 0,
          }}>
            <svg
              viewBox="0 0 1440 130"
              preserveAspectRatio="none"
              style={{ display: "block", width: "100%", height: 130 }}
              aria-hidden
            >
              <path d="M0,0 L0,130 Q360,0 720,0 Q1080,0 1440,130 L1440,0 Z" fill="white" />
            </svg>
          </div>
        </section>

        {/* ────────────────────────────────────────────────── LOGOS CLIENTES — rojo */}
        {/*
          Marquee JS-driven:
          - velocidad base ajustada por posición X del cursor
          - cursor derecho → más rápido | cursor izquierdo → más lento
        */}
        <section ref={logosSectionRef} style={{
          backgroundColor: "#A80110",
          padding: "3.5rem 0",
          overflow: "hidden",
          isolation: "isolate", /* evita que el blend afecte secciones adyacentes */
        }} aria-label="Clientes">
          <div
            ref={marqueeTrackRef}
            style={{ display: "flex", willChange: "transform" }}
          >
            {[...LOGO_FILES, ...LOGO_FILES].map((src, i) => (
              <div
                key={i}
                style={{
                  flexShrink: 0,
                  width: 250,
                  height: 200,
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mixBlendMode: "multiply",
                }}
              >
                <img
                  src={src}
                  alt=""
                  aria-hidden
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: 0.95,
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* ────────────────────────────────────────────────── SERVICIOS */}
        <section style={{ padding: "6rem 2.5rem", backgroundColor: "#fff" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "3.5rem",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Nuestras Soluciones
                </span>
                <span style={{ color: "#aaa" }}>↓</span>
              </div>
              <a href="#" className="p4-nav-link" style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                Ver soluciones <span>→</span>
              </a>
            </div>

            <h2 style={{
              fontSize: "clamp(1.6rem, 4vw, 3.25rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              maxWidth: 820,
              marginBottom: "4.5rem",
            }}>
              Nuestro compromiso es ofrecer soluciones integrales que superen tus expectativas.
            </h2>

            <div
              className="p4-svc-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2.5rem 2rem" }}
            >
              {SERVICES.map((s) => (
                <a key={s.title} href="#" className="p4-service-card">
                  <div className="p4-svc-img" style={{ marginBottom: "1rem" }}>
                    <img src={s.img} alt={s.title} />
                  </div>
                  <h3 className="p4-svc-title" style={{
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: "0.875rem", color: "#555", lineHeight: 1.65 }}>{s.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────── QUOTE — parallax cursor */}
        <section style={{ position: "relative", overflow: "hidden" }}>
          {/* Fondo con parallax — se extiende más allá del contenedor para dar margen */}
          <div style={{
            position: "absolute",
            inset: "-50px -60px",
            zIndex: 0,
          }}>
            <div ref={parallaxBgRef} style={{ width: "100%", height: "100%", willChange: "transform" }}>
              <img
                src={IMGS.hero}
                alt=""
                aria-hidden
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 40%",
                  display: "block",
                }}
              />
            </div>
          </div>

          {/* Overlay oscuro */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,10,0.68)", zIndex: 1 }} />

          {/* Texto */}
          <div style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1100,
            margin: "0 auto",
            padding: "9rem 2.5rem",
            textAlign: "center",
          }}>
            <p style={{
              fontSize: "clamp(2.2rem, 7vw, 6rem)",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              lineHeight: 0.92,
              color: "#fff",
              maxWidth: 1000,
              margin: "0 auto 2rem",
            }}>
              Cada espacio<br />cuenta una historia.
            </p>
            <p style={{
              fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
              color: "rgba(255,255,255,0.65)",
              maxWidth: 580,
              margin: "0 auto",
              lineHeight: 1.8,
              letterSpacing: "0.02em",
            }}>
              Con diseño, precisión y compromiso en cada detalle, creamos ambientes que inspiran y transforman.
            </p>
          </div>
        </section>

        {/* ────────────────────────────────────────────────── PROYECTOS */}
        <section style={{ padding: "6rem 2.5rem", backgroundColor: "#fff" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <h2 style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#888",
              marginBottom: "3rem",
            }}>
              Proyectos
            </h2>

            <div>
              {PROJECTS.map((p) => (
                <a key={p.num} href="#" className="p4-project-row">
                  <div className="p4-proj-thumb">
                    <img src={p.img} alt={p.name} />
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "0.7rem", color: "#bbb", fontWeight: 500, flexShrink: 0 }}>{p.num}</span>
                      <span style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        {p.name}
                        <span style={{ color: "#A80110", fontSize: "0.65rem" }}>↗</span>
                      </span>
                    </div>
                    <p style={{ fontSize: "0.78rem", color: "#999", paddingLeft: "2.2rem" }}>{p.location}</p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#333", marginBottom: "0.2rem" }}>{p.client}</p>
                    <p style={{ fontSize: "0.72rem", color: "#bbb" }}>{p.year}</p>
                  </div>

                  <span className="p4-link-arrow">
                    <span className="link-dot" />
                    <span className="link-text">Ver Proyecto →</span>
                  </span>
                </a>
              ))}
            </div>

            {/* CTA ver todos */}
            <div style={{ marginTop: "3.5rem", textAlign: "center" }}>
              <a href="#" className="p4-btn-outline">Ver todos los proyectos</a>
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────── NOSOTROS */}
        <section style={{ backgroundColor: "#f5f5f5", padding: "6rem 2.5rem" }}>
          <div
            className="p4-nos-grid"
            style={{
              maxWidth: 1320,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6rem",
              alignItems: "center",
            }}
          >
            <div>
              <span style={{
                fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em",
                textTransform: "uppercase", color: "#bbb", display: "block", marginBottom: "1.5rem",
              }}>
                Nosotros
              </span>
              <h2 style={{
                fontSize: "clamp(1.5rem, 3vw, 2.75rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}>
                Constructora comprometida con la excelencia.
              </h2>
              <p style={{ fontSize: "0.95rem", color: "#555", lineHeight: 1.85, marginBottom: "2.5rem" }}>
                Ourense es una empresa constructora con sede en Ciudad de México, reconocida por su especialización
                en edificaciones emblemáticas, movimientos de tierras, precolados y colados de alta resistencia,
                así como en soluciones ingenieriles innovadoras.
              </p>
              <a href="#" className="p4-btn-dark">Leer más</a>
            </div>

            <div className="p4-nos-img" style={{ aspectRatio: "3/4" }}>
              <img src={IMGS.nosotros} alt="Equipo Ourense en obra" />
            </div>
          </div>
        </section>

        {/* ────────────────────────────────────────────────── FOOTER */}
        <footer style={{ backgroundColor: "#0A0A0A", color: "#FAFAFA", padding: "5rem 2.5rem 2.5rem" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              className="p4-foot-grid"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "4rem", marginBottom: "4rem" }}
            >
              {/* Logo */}
              <div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontFamily: "var(--font-display-base, fantasy)", fontSize: "2.25rem", color: "#A80110", lineHeight: 1 }}>O</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>OURENSE</span>
                </div>
                <p style={{ fontSize: "0.875rem", color: "rgba(250,250,250,0.4)", lineHeight: 1.7, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Construyendo conexiones,<br />forjando futuros.
                </p>
              </div>

              {/* Contacto */}
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,250,250,0.3)", marginBottom: "1.5rem" }}>
                  Contacto
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  {[
                    { label: "Teléfono", val: "+52 (55) 9354 2263",       href: "tel:+525593542263" },
                    { label: "Email",    val: "infoorg@oocsourense.com.mx", href: "mailto:infoorg@oocsourense.com.mx" },
                  ].map(({ label, val, href }) => (
                    <div key={label}>
                      <p style={{ fontSize: "0.65rem", color: "rgba(250,250,250,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.25rem" }}>{label}</p>
                      <a href={href} className="p4-footer-link">{val}</a>
                    </div>
                  ))}
                  <div>
                    <p style={{ fontSize: "0.65rem", color: "rgba(250,250,250,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.25rem" }}>Dirección</p>
                    <p style={{ fontSize: "0.875rem", color: "rgba(250,250,250,0.7)", lineHeight: 1.65 }}>
                      Av. Insurgentes Sur 1748-501,<br />Col. Florida, Álvaro Obregón 01030
                    </p>
                  </div>
                </div>
              </div>

              {/* Links */}
              <div>
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,250,250,0.3)", marginBottom: "1.5rem" }}>
                  Sitio
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {["Soluciones", "Proyectos", "Nosotros", "Contacto", "Blog"].map((l) => (
                    <a key={l} href="#" className="p4-footer-link">{l}</a>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: "1.75rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}>
              <p style={{ fontSize: "0.72rem", color: "rgba(250,250,250,0.25)" }}>
                © 2025 Ourense Organización, Construcción y Servicios.
              </p>
              <a href="#" style={{ fontSize: "0.72rem", color: "rgba(250,250,250,0.25)", textDecoration: "none", transition: "color 0.2s" }}>
                Subir ↑
              </a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
