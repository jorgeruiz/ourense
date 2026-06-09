# Brief Técnico — Ourense

**Generado por Constructor el 9 de junio de 2026**
**Cliente:** Ourense | **Stack:** Next.js + Vercel | **Ambición visual:** Experiencial

Este documento describe las decisiones técnicas de implementación: librerías de motion, animaciones, arquitectura frontend y stack recomendado. Fue generado automáticamente a partir del Brief de Diseño del cliente.

---

# Technical Implementation Brief — Ourense Constructora

**Project architecture**

Multi-page Next.js 15 App Router project. Route structure:

- `/` — Homepage (hero cinematic, diferenciadores, proyectos destacados, CTA principal)
- `/proyectos` — Portfolio index grid
- `/proyectos/[slug]` — Individual project detail
- `/testimonios` — Testimonials page
- `/blog` — Blog index
- `/blog/[slug]` — Blog post detail
- `/faqs` — FAQs accordion page
- `/contacto` — Contact page

All pages share a root layout with navigation and footer. Page transitions via GSAP + `Observer` at layout level. Typography: `next/font/google` loads **Monoton** (isotipo/display accent only — use sparingly, single weights) and **Montserrat** (wordmark, headings, body — 400, 500, 700 weights). Tailwind CSS only; no CSS Modules. App Router with server components as default; animate-heavy sections are explicitly `"use client"`.

Third-party integrations: contact form routes to email via Resend API. No e-commerce, no booking system. LinkedIn social link in footer (static anchor). Google Analytics 4 via `@next/third-parties/google` for `search_visibility` success metric tracking (page views, CTA clicks as custom events).

---

**Dependencies to install**

```bash
npm install gsap @gsap/react lenis@^1.1 react-hook-form@^7.0 @hookform/resolvers zod @next/third-parties
```

- `gsap` (3.x latest): ScrollTrigger, Flip, Observer plugins — pinned sections, scrub-linked hero, timeline choreography required at `experiencial` level
- `@gsap/react`: React wrapper for GSAP context and cleanup in App Router client components
- `lenis@^1.1`: smooth scroll, required at this level; integrates with ScrollTrigger via `lenis.on("scroll", ScrollTrigger.update)`
- `react-hook-form@^7.0` + `@hookform/resolvers` + `zod`: contact form validation on `/contacto`
- `@next/third-parties`: GA4 integration without manual script injection

Do NOT install:
- `framer-motion` — GSAP is the chosen library; mixing both is prohibited
- `@react-three/fiber` or `@react-three/drei` — the liked references (maman-corp, ar-arquitetos, depoluxe, adencys) achieve their immersive quality through scroll choreography and 2D motion, not 3D geometry; no design screen includes 3D elements
- `three` — same reason; out of scope
- Any cursor library — implement custom cursor manually using GSAP `quickTo` for performance

---

**Motion specifications**

Library: GSAP 3.x with ScrollTrigger and Observer plugins. All animations operate exclusively on `transform` (`x`, `y`, `xPercent`, `yPercent`, `scale`, `rotation`) and `opacity`. No layout-triggering property (`width`, `height`, `margin`, `padding`, `top`, `left`) is ever animated.

**GSAP plugin registration (once, in a client boundary root component):**
```tsx
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Observer } from "gsap/Observer"
import { Flip } from "gsap/Flip"
gsap.registerPlugin(ScrollTrigger, Observer, Flip)
```

**Lenis initialization and ScrollTrigger sync (root layout client component):**
```tsx
useEffect(() => {
  const lenis = new Lenis()
  lenis.on("scroll", ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return () => { lenis.destroy(); gsap.ticker.remove() }
}, [])
```

**Hero cinematic entrance (homepage, pinned section):**
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

**Section entrance (all interior sections):**
```tsx
gsap.from(el, {
  opacity: 0, yPercent: 6,
  duration: 0.8, ease: "power2.out",
  scrollTrigger: { trigger: el, start: "top 88%", once: true }
})
```

**Stagger for grid items (portfolio, testimonials):**
```tsx
gsap.from(items, {
  opacity: 0, yPercent: 8,
  stagger: 0.09, duration: 0.6, ease: "power2.out",
  scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true }
})
```

**Card hover (project cards):**
```tsx
el.addEventListener("mouseenter", () =>
  gsap.to(el, { scale: 1.02, duration: 0.25, ease: "power1.out" }))
el.addEventListener("mouseleave", () =>
  gsap.to(el, { scale: 1, duration: 0.2, ease: "power1.in" }))
```

**Custom cursor (pointer devices only):**
```tsx
const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.4, ease: "power3" })
const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.4, ease: "power3" })
window.addEventListener("mousemove", (e) => { xTo(e.clientX); yTo(e.clientY) })
```
Custom cursor renders only when `window.matchMedia("(hover: hover)").matches` is true.

**`prefers-reduced-motion` — highest priority:**
```tsx
useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.globalTimeline.timeScale(0)
    lenis.destroy() // revert to native scroll
  }
}, [])
```
When reduced motion is active: all GSAP timelines are frozen, Lenis is destroyed, custom cursor is hidden, pinned sections revert to static display. Show static layout with color and opacity transitions only (CSS `transition: opacity 200ms ease-out` as fallback layer on animated elements).

Do NOT animate: top navigation bar, footer, breadcrumbs, form field labels, error messages, FAQ question text, blog body copy. Maximum of 4 distinct animation patterns site-wide to prevent motion fatigue.

---

**Breakpoints and responsive strategy**

Desktop-first at `experiencial` level. The immersive scroll experience is designed for desktop viewport. Breakpoint scale:

- `2xl`: 1536px
- `xl`: 1280px
- `lg`: 1024px — threshold for full animation suite
- `md`: 768px
- `sm`: 640px

Major layout transitions:
- Navigation: horizontal + custom cursor above `lg`; hamburger drawer below `lg`
- Portfolio grid: 1 column mobile, 2 at `md`, 3 at `xl`
- Project detail: single column mobile, 60/40 editorial split at `lg`
- Hero: full-bleed cinematic above `lg`; static image + text stack below `lg`

Animation scaling by breakpoint:
- Below `lg`: disable all pinned ScrollTrigger sections; convert to simple entrance fades (`opacity 0→1`, no `yPercent`). Disable Lenis on touch devices (`navigator.maxTouchPoints > 0`). Disable custom cursor entirely.
- Below `md`: reduce entrance animation duration to `0.4s`. Disable stagger (show all grid items immediately).
- Card hover scale disabled below `lg` (no hover state on touch).

Brand color tokens as CSS variables in `globals.css`:
```css
:root {
  --color-brand: #A80110;
  --color-black: #0A0A0A;
  --color-white: #FAFAFA;
  --color-gray-100: #F2F2F2;
  --color-gray-400: #999999;
  --color-gray-700: #3A3A3A;
}
```

---

**Accessibility requirements**

Target: WCAG AA. All interactive elements keyboard-accessible with visible focus rings. Focus style: `outline: 2px solid #A80110; outline-offset: 3px`. Never `outline: none` without a custom replacement.

Keyboard navigation specifics:
- Pinned hero section: add a visible "Saltar al contenido" skip link before each pinned section (`<a href="#main-content">`) — required so keyboard users are not trapped in scroll-pinned regions
- Custom cursor: purely decorative, `aria-hidden="true"`, `pointer-events: none` — never interferes with native cursor for assistive tech
- FAQ accordion: each question is a `<button>` with `aria-expanded` and `aria-controls` targeting the answer panel ID
- Portfolio grid: each project card is a single focusable `<a>` wrapping image and title; no nested interactive elements inside the card anchor
- Blog posts: confirm heading hierarchy (`h1` once per page, sequential `h2`/`h3` — do not skip levels for visual sizing)
- Contact form: every `<input>` and `<textarea>` has `<label htmlFor>` association; error messages linked via `aria-describedby`; submit state communicated via `aria-live="polite"` region
- Marquee (if used for client logos or differentiators): `aria-label` on the container, `aria-hidden="true"` on duplicate content set, `animation-play-state: paused` on `focus-within`

---

**Performance budget**

- Lighthouse Performance desktop: 78+
- Lighthouse Performance mobile: 62+
- LCP: under 3.0s — hero image or hero text block is LCP element; optimize it first with `priority` prop
- CLS: under 0.05 — all images require explicit `width` and `height` props; no `fill` without a positioned parent container of known dimensions
- JS budget (animation stack): GSAP core + ScrollTrigger + Observer + Flip ≈ 70KB gzip; Lenis ≈ 10KB gzip; total animation budget 80KB gzip — acceptable at `experiencial` level

Image strategy:
- All `next/image` components: explicit `width` and `height` required — no exceptions
- Hero image: `priority` prop on the single above-fold image; preload critical path
- Portfolio thumbnails: `loading="lazy"` (default), `sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"` matching the grid column breakpoints
- Format: rely on `next/image` built-in WebP optimization; no manual format handling needed
- Construction/project photography is the primary content type — use `object-fit: cover` with aspect-ratio containers (`aspect-video` or `aspect-[4/3]`) to prevent CLS on image load

Font strategy: `next/font/google` with `display: "swap"`. Load Montserrat with `subsets: ["latin"]`, weights `["400", "500", "700"]`. Load Monoton with weight `["400"]` only — it is used exclusively for the isotipo mark, not for body or heading text. Preload Montserrat 700 as the hero heading weight. Two font families maximum; no additional typeface loading.