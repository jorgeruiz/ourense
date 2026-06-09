# DESIGN.md — Sistema de Diseño Ourense

**Generado:** 9 de junio de 2026
**Path:** Standalone
**Ambición visual:** Experiencial
**Dials:** DESIGN_VARIANCE: 9 / MOTION_INTENSITY: 8 / VISUAL_DENSITY: 3

---

## Design Read

> "Reading this as: sitio de constructora premium B2B para directores y firmas de ingeniería en CDMX, con lenguaje dark editorial / industrial / cinematic, leaning toward GSAP scroll-choreography + tipografía display bold + fotografía arquitectónica atmosférica — referencias: maman-corp.com, ar-arquitetos.com.br."

---

## 1. Paleta de Color

### Tokens base (CSS variables en `globals.css`)

```css
:root {
  --color-brand:      #A80110;   /* Carmesí — acento único */
  --color-black:      #0A0A0A;   /* Negro profundo — base del sitio */
  --color-white:      #FAFAFA;   /* Blanco cálido — texto sobre oscuro */
  --color-gray-100:   #F2F2F2;   /* Casi blanco */
  --color-gray-400:   #999999;   /* Texto secundario */
  --color-gray-700:   #3A3A3A;   /* Bordes, separadores */

  /* Semánticos */
  --surface-base:     #0A0A0A;
  --surface-raised:   #111111;
  --surface-overlay:  #1A1A1A;
  --text-primary:     #FAFAFA;
  --text-secondary:   #999999;
  --text-muted:       #555555;
  --accent:           #A80110;
  --border-subtle:    rgba(255,255,255,0.08);
  --border-strong:    rgba(255,255,255,0.16);
}
```

### Reglas de uso
- **Un solo acento:** `#A80110` — usado en CTAs primarios, detalles arquitectónicos, hover states
- **Tema global:** Dark mode permanente — no hay flip de sección a modo claro
- **Nunca** `#000000` puro ni `#FFFFFF` puro — siempre off-black / off-white
- **Gradientes:** solo de negro a negro (depth), nunca AI-purple ni mesh gradient
- **Consistencia absoluta:** el acento carmesí es el mismo en todo el sitio

---

## 2. Tipografía

### Familias

| Familia | Uso | Pesos | Carga |
|---|---|---|---|
| **Monoton** | Isotipo / marca display (solo el símbolo O concéntrico) — usar con extrema moderación | 400 | `next/font/google` |
| **Montserrat** | Todo lo demás: headings, body, labels, nav | 400, 500, 700 | `next/font/google` |

### Escala tipográfica

```css
/* Display / Hero H1 */
.text-display     { font-size: clamp(3rem, 8vw, 8rem); font-weight: 700; line-height: 0.95; letter-spacing: -0.03em; }

/* Section headline H2 */
.text-headline    { font-size: clamp(2rem, 5vw, 4.5rem); font-weight: 700; line-height: 1.0; letter-spacing: -0.02em; }

/* Subheadline H3 */
.text-subhead     { font-size: clamp(1.25rem, 2.5vw, 2rem); font-weight: 500; line-height: 1.2; letter-spacing: -0.01em; }

/* Body */
.text-body        { font-size: 1rem; font-weight: 400; line-height: 1.65; letter-spacing: 0; }

/* Small / Caption */
.text-small       { font-size: 0.875rem; font-weight: 400; line-height: 1.5; }

/* Eyebrow label (MÁXIMO 1 por cada 3 secciones) */
.text-eyebrow     { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; }
```

### Reglas críticas
- **Sin serifs** — Montserrat es sans, no agregar typefaces adicionales
- **Eyebrows:** máximo 1 por cada 3 secciones
- **Hero H1:** máximo 2 líneas en desktop
- Sin em-dash (`—`) en ningún texto visible — usar coma, punto o guion simple

---

## 3. Espaciado y Layout

### Grid base

```
Max-width página:   1400px (mx-auto)
Padding lateral:    px-6 (mobile) → px-12 (md) → px-20 (xl)
Column grid:        12 columnas
Gap:                gap-6 (mobile) → gap-8 (md)
```

### Escala de espaciado (sección)

```
Sección estándar:   py-24 (mobile) → py-32 (lg) → py-40 (xl)
Sección compacta:   py-16 (mobile) → py-24 (lg)
Hero:               min-h-[100dvh]  ← NUNCA h-screen
```

### Radios de esquina

```
Sistema único — mezcla PROHIBIDA:
Tarjetas:           rounded-none (esquinas vivas — coherente con estética industrial)
Botones CTA:        rounded-none (pill está prohibido para este estilo)
Inputs:             rounded-none
Excepción:          rounded-full solo para el logo/isotipo mark circular
```

---

## 4. Componentes Base

### Botón Primario

```tsx
// Esquinas vivas, acento carmesí, sin border-radius
// Padding generoso, texto UPPERCASE, tracking amplio
<button className="
  bg-[#A80110] text-[#FAFAFA]
  px-8 py-4
  text-sm font-500 uppercase tracking-[0.12em]
  rounded-none
  transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
  hover:bg-[#8a010d] active:scale-[0.98]
  group flex items-center gap-3
">
  Solicitar cotización
  <span className="
    w-5 h-5 flex items-center justify-center
    bg-white/10
    transition-transform duration-300 group-hover:translate-x-1
  ">→</span>
</button>
```

### Botón Secundario (ghost)

```tsx
<button className="
  border border-[rgba(255,255,255,0.24)] text-[#FAFAFA]
  px-8 py-4
  text-sm font-500 uppercase tracking-[0.12em]
  rounded-none
  transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
  hover:border-[#A80110] hover:text-[#A80110]
  active:scale-[0.98]
">
  Ver portafolio
</button>
```

### Navegación

```tsx
// Barra horizontal en desktop, hamburger drawer en mobile (< lg)
// Height: 72px desktop
// NO sticky sobre el hero — se convierte en sticky después del hero
// Fondo: bg-black/80 backdrop-blur-md cuando sticky activo
```

### Tarjeta de Proyecto (Portfolio Card)

```tsx
// Sin border-radius
// Imagen full-bleed con overlay de gradiente inferior
// Título en Montserrat 700, color white
// Tag del servicio en text-eyebrow color brand
// Hover: scale(1.02) via GSAP (desktop only)
```

### Sección FAQs (acordeón accesible)

```tsx
// Cada pregunta: <button aria-expanded aria-controls>
// Borde inferior en --border-subtle entre items
// Icono + / — que rota con CSS transition
// Primeros 3 abiertos por defecto (AEO requirement)
```

---

## 5. Animaciones y Motion

### Registro GSAP (una vez, en client boundary root)

```tsx
gsap.registerPlugin(ScrollTrigger, Observer, Flip)
```

### Lenis + ScrollTrigger sync

```tsx
const lenis = new Lenis()
lenis.on("scroll", ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### Hero cinematic (pinned + scrub)

```tsx
ScrollTrigger.create({
  trigger: heroRef.current,
  start: "top top",
  end: "+=150%",
  pin: true,
  scrub: 1,
})
gsap.fromTo(heroTextRef.current,
  { yPercent: 0, opacity: 1 },
  { yPercent: -40, opacity: 0,
    scrollTrigger: { trigger: heroRef.current, start: "top top", end: "30% top", scrub: 1 }
  }
)
```

### Entrada de secciones (todas las interiores)

```tsx
gsap.from(el, {
  opacity: 0, yPercent: 6,
  duration: 0.8, ease: "power2.out",
  scrollTrigger: { trigger: el, start: "top 88%", once: true }
})
```

### Stagger en grids

```tsx
gsap.from(items, {
  opacity: 0, yPercent: 8,
  stagger: 0.09, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true }
})
```

### Hover en tarjetas (solo desktop)

```tsx
el.addEventListener("mouseenter", () =>
  gsap.to(el, { scale: 1.02, duration: 0.25, ease: "power1.out" }))
el.addEventListener("mouseleave", () =>
  gsap.to(el, { scale: 1, duration: 0.2, ease: "power1.in" }))
```

### Cursor custom (solo hover devices)

```tsx
const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" })
const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" })
// aria-hidden="true", pointer-events: none
```

### Reduced Motion

```tsx
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.timeScale(0)
  lenis.destroy()
}
```

### Reglas de motion

- Animar SOLO `transform` y `opacity` — nunca width, height, top, left
- Máximo 4 patrones de animación distintos en todo el sitio
- Pinned sections: desactivar bajo `lg` (< 1024px)
- Lenis: desactivar en touch devices (`navigator.maxTouchPoints > 0`)
- Cursor custom: solo cuando `window.matchMedia("(hover: hover)").matches`

---

## 6. Patrones de Layout por Sección

### Homepage — estructura de secciones

| Sección | Layout | Familia |
|---|---|---|
| Hero | Full-bleed pinned, texto centrado (excepción editorial) | Scroll-pinned hero |
| Diferenciadores | Split asimétrico 60/40 texto/número | Editorial split |
| Servicios | Grid 2 col (md) → 3 col (xl), imágenes 4:5 | Bento asimétrico |
| Portafolio preview | Full-width 16:9 + 2 tarjetas offset debajo | Z-axis cascade |
| FAQs | Single column max-w-3xl, acordeón | Vertical stack |
| CTA final | Full-bleed oscuro, headline display, 1 botón | Editorial manifesto |

### Reglas de layout
- Anti-centro bias activo (DESIGN_VARIANCE: 9) — el hero es excepción justificada (mensaje editorial)
- NO 3 columnas iguales en feature grid
- NO zigzag image+text más de 2 secciones consecutivas
- Cada sección usa una familia de layout distinta

---

## 7. Imágenes

### Estrategia

- Todas en `public/images/` como `.webp`
- `next/image` con `width` y `height` explícitos del manifest
- Solo `hero-home.webp` tiene `priority`
- `object-fit: cover` con contenedor de aspect ratio explícito
- NO `fill` sin contenedor de dimensiones conocidas

### Paleta visual (look-lock)

- Fondo dominante: negro profundo / grises escalonados
- Acento carmesí selectivo (lámpara roja, señal de obra)
- Grano pesado, cinematográfico
- Iluminación dramática direccional

---

## 8. Accesibilidad

- Target: WCAG AA mínimo
- Focus ring: `outline: 2px solid #A80110; outline-offset: 3px`
- Skip link: "Saltar al contenido" antes de secciones pinned
- Cursor custom: `aria-hidden="true"`, `pointer-events: none`
- FAQs: `<button aria-expanded aria-controls>`
- Portfolio cards: `<a>` único wrapping imagen + título
- Formulario: `<label htmlFor>` + `aria-describedby` en errores

---

## 9. Performance

- Lighthouse Performance desktop: 78+, mobile: 62+
- LCP < 3.0s — hero con `priority` prop
- CLS < 0.05 — width + height explícitos en todas las imágenes
- JS de animación budget: GSAP + Lenis ≈ 80KB gzip — aceptable
- Fonts con `display: "swap"`
- Analytics con `strategy="afterInteractive"`

---

## 10. Convenciones de código

```
app/
  layout.tsx              — RootLayout, fuentes, GSAP register, Lenis, schemas globales
  globals.css             — tokens CSS variables, reset
  page.tsx                — Homepage
  (es)/
    servicios/page.tsx
    portafolio/page.tsx
    nosotros/page.tsx
    contacto/page.tsx
    preguntas-frecuentes/page.tsx
    testimonios/page.tsx
  sitemap.ts
  robots.ts

components/
  layout/
    Navbar.tsx
    Footer.tsx
  ui/
    Button.tsx
    JsonLd.tsx
    CustomCursor.tsx
    SmoothScrollProvider.tsx
  sections/
    Hero.tsx
    Services.tsx
    Portfolio.tsx
    Testimonials.tsx
    FAQ.tsx
    CTA.tsx

lib/
  schemas/index.ts        — JSON-LD schemas centralizados
  gsap.ts                 — plugin registration

public/
  images/                 — todas las imágenes .webp
    .gitkeep
  og-default.jpg          — 1200×630
```

---

*DESIGN.md generado por Claude Code — Click Society — 9 de junio de 2026*
