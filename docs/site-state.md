# Estado del Sitio — Ourense

---

## Estado actual

**Última actualización:** 9 de junio de 2026
**Versión del sitio:** 1.0.0
**URL de producción:** https://www.ourense.mx/
**Repo:** https://github.com/jorgeruiz/ourense.git

---

## Construcción inicial

**Fecha:** 9 de junio de 2026
**Path de construcción:** Standalone
**Stack:** Next.js 16 + Tailwind v4 + GSAP + Lenis + Vercel

**Features implementadas:**
- [x] DESIGN.md generado — design system completo (tokens, tipografía, motion, layout)
- [x] Next.js 16 App Router + Tailwind v4 + TypeScript
- [x] globals.css con tokens CSS variables de Ourense
- [x] Root layout con Montserrat + Monoton (next/font/google)
- [x] GSAP + Lenis instalados y registrados (SmoothScrollProvider)
- [x] CustomCursor con GSAP quickTo (solo hover devices)
- [x] Navbar responsive (desktop horizontal / mobile drawer con hamburger morph)
- [x] Footer con datos verificables AEO en texto plano
- [x] JsonLd component + lib/schemas/index.ts
- [x] Homepage: Hero cinematic pinned, Diferenciadores sticky, Servicios grid, Portfolio Preview, FAQs acordeón (3 abiertos por defecto), CTA final
- [x] /servicios — hub de servicios con 6 cards + Service schemas JSON-LD
- [x] /portafolio — grid de proyectos (pendiente de fotos reales del cliente)
- [x] /nosotros — datos verificables, historia, misión, servicios
- [x] /contacto — formulario con react-hook-form + zod + /api/contact route
- [x] /preguntas-frecuentes — FAQs completas visibles en texto plano (AEO)
- [x] /testimonios — testimonios en texto plano
- [x] /blog — estructura lista, contenido próximamente
- [x] app/sitemap.ts — todas las rutas ES + EN
- [x] app/robots.ts — reglas correctas
- [x] Metadata completa: title, description, OG, Twitter Cards, hreflang ES/EN por página
- [x] JSON-LD global: ProfessionalService + WebSite + LocalBusiness en layout.tsx
- [x] JSON-LD FAQPage en sección FAQ
- [x] JSON-LD Service (construcción, movimiento de tierras, interiorismo) en /servicios
- [x] 8 imágenes Higgsfield en public/images/ + logo
- [x] AEO: resumen ejecutivo en texto plano en homepage y /nosotros
- [x] AEO: FAQs visibles sin JavaScript (SSR), primeros 3 abiertos por defecto
- [x] AEO: datos verificables (+10 años, CDMX, nacional, teléfono, email) en footer y /nosotros
- [x] Build limpio: 14 rutas generadas, 0 errores TypeScript

**Pendientes conocidos:**
- Foto OG default (1200×630) — `public/og-default.jpg` — pendiente de generación
- Fotos reales del portafolio — pendiente del cliente
- Páginas de servicios individuales (/servicios/construccion, /servicios/movimiento-de-tierras, etc.) — páginas hub sí, páginas detail no
- Ruta API /api/contact conectada a Resend — pendiente de configurar RESEND_API_KEY en Vercel
- Versión en inglés (/en/*) — estructura lista en hreflang y sitemap, páginas no construidas
- Imágenes en public/images/ son PNG renombrados a .webp — conviene convertirlas a WebP real antes del lanzamiento para máximo performance
- Vinculación del repo a Vercel project prj_45LvhzC3wMfcTUBjDdKGrMiLADE2 pendiente

---

## Historial de cambios

### 2026-06-09 — Construcción inicial

**Cambios aplicados:**
- Bootstrap del bundle de Constructor
- DESIGN.md generado (path Standalone)
- Proyecto Next.js 16 scaffoldeado
- 8 imágenes Higgsfield + logo copiados a public/images/
- Dependencias instaladas: gsap, @gsap/react, lenis, react-hook-form, @hookform/resolvers, zod, @next/third-parties
- Construcción completa de homepage y páginas internas
- SEO técnico y AEO implementados
- Build limpio confirmado

**Commit:** `c9767b2`
**Aplicado por:** Claude Sonnet 4.6 / Click Society
