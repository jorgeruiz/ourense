## ⚠️ Bootstrap obligatorio al inicio de cada sesión

Antes de trabajar en cualquier solicitud, ejecuta en orden:

1. `git status` — verifica el estado del repo
2. Si `/docs/` aparece como untracked o hay archivos sin commitear:
   ```
   git add docs/ CLAUDE.md README.md .gitignore
   git commit -m "chore: bootstrap del bundle de Constructor"
   git push -u origin main
   ```
3. Verifica que el remoto `origin` está configurado (`git remote -v`). Si no, detente y pide al usuario el URL del repo de GitHub.
4. Solo entonces procede con la solicitud.

## ⚠️ Cierre obligatorio al final de cada sesión

Antes de terminar, ejecuta:

1. `git status` — no debe haber cambios sin commitear
2. `git push` — confirma que todo está en GitHub
3. Actualiza `/docs/site-state.md` con lo que se hizo en esta sesión

---

# Ourense — Briefing técnico para Claude Code

**Cliente:** Ourense
**Stack:** Next.js + Vercel
**Nivel de ambición visual:** Experiencial
**Path de construcción recomendado:** Standalone
**Bundle generado el 9 de junio de 2026 por Constructor / Click Society**

---

## Empezar aquí

Lee estos documentos antes de escribir una línea de código:

1. [`docs/brief-tecnico.md`](docs/brief-tecnico.md) — librerías, motion, animaciones, decisiones de arquitectura
2. [`docs/seo-textos.md`](docs/seo-textos.md) — copy del sitio ya redactado y optimizado para SEO
3. [`docs/seo-aeo-geo.md`](docs/seo-aeo-geo.md) — contenido para motores de IA (FAQs, definiciones, datos verificables)
4. [`docs/schema-org.md`](docs/schema-org.md) — JSON-LD structured data (FAQPage, schema de negocio, servicios)
5. [`docs/image-manifest.md`](docs/image-manifest.md) — inventario de imágenes: filenames exactos, ubicaciones, prompts para Higgsfield

**No escribas copy de relleno.** Usa los textos de `seo-textos.md` desde el primer commit.

---

## Imágenes del sitio (obligatorio)

Lee `docs/image-manifest.md` antes de construir. El manifest tiene el inventario completo de imágenes que el sitio necesita — filenames exactos, ubicación en código, dimensiones, y placeholders visuales.

### Tu trabajo con las imágenes

1. **Para cada imagen del manifest**, crea la referencia `<Image>` en el componente correspondiente:
   - `src="/images/[filename]"` — exactamente como aparece en el manifest (siempre `.webp`)
   - `width` y `height` del campo **Dimensiones finales (px)** del manifest — NO del aspect ratio nativo de Higgsfield
   - `alt` del manifest (en español)
   - `priority` solo en `hero-home.webp` (above the fold)
   - El resto: lazy loading default (sin `priority`)

2. **Mientras Jorge no haya generado las imágenes**, usa el placeholder visual descrito en el manifest:
   ```tsx
   {/* Placeholder hasta que Jorge suba hero-home.webp */}
   <div className="aspect-[16/9] bg-gradient-to-br from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
     <span className="text-white/40 text-sm">Hero principal</span>
   </div>
   ```

3. **Entradas marcadas ⚠️ FOTO REAL DEL CLIENTE — NO GENERAR:** Jorge pedirá esa foto directamente al cliente. No puedes generarla con IA. Usa el placeholder con texto "Foto del [persona] — pendiente del cliente":
   ```tsx
   {/* Placeholder hasta que Jorge reciba about-doctor.webp del cliente */}
   <div className="aspect-[4/5] bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
     <span className="text-slate-500 text-sm text-center px-4">Foto del Dr. [Nombre] — pendiente del cliente</span>
   </div>
   ```

4. **Para imágenes con `Requiere recorte: Sí`:** usa las **Dimensiones finales** del manifest en `width`/`height`, no el ratio nativo de Higgsfield. El recorte lo hace Jorge antes de subir.

5. **NO inventes imágenes** que no estén en el manifest. Si durante la construcción descubres que el sitio necesita una imagen no inventariada, documéntala en `docs/site-state.md` bajo "Imágenes adicionales descubiertas durante construcción".

6. **Crea la carpeta** `public/images/` con un `.gitkeep` vacío desde el primer commit.

### Criterios de calidad

- [ ] Todas las imágenes del manifest tienen referencia `<Image>` en código
- [ ] `width` y `height` son de **Dimensiones finales (px)**, no del aspect ratio Higgsfield
- [ ] `alt` exacto del manifest en cada `<Image>`
- [ ] Solo `hero-home.webp` tiene `priority`; resto lazy loading
- [ ] Placeholders visuales (gradient + texto) para imágenes no generadas aún
- [ ] Entradas FOTO REAL DEL CLIENTE tienen placeholder con texto "pendiente del cliente"
- [ ] `public/images/.gitkeep` commiteado
- [ ] `next.config.ts` tiene `images.domains` configurado si se usan fuentes externas

---

## Implementación de SEO (obligatorio)

Antes de considerar el sitio completo, verifica que estos elementos estén implementados:

### SEO técnico (`docs/seo-tecnico.md` + `docs/seo-textos.md`)

- [ ] Todas las páginas tienen `<title>` y `<meta name="description">` únicos
- [ ] Open Graph completo en todas las páginas (`og:title`, `og:description`, `og:image`, `og:url`)
- [ ] Twitter Cards configurados (`twitter:card: summary_large_image`)
- [ ] `robots.txt` en `/robots.txt` (via `app/robots.ts`)
- [ ] `sitemap.xml` en `/sitemap.xml` (via `app/sitemap.ts`)
- [ ] `<html lang="es">` (o el idioma que corresponda)
- [ ] Imagen OG default de 1200×630 en `/public/og-default.jpg`

### AEO/GEO (`docs/seo-aeo-geo.md`)

- [ ] FAQs visibles en texto plano en homepage — al menos 5, NO en acordeones cerrados por default
- [ ] Resumen ejecutivo del negocio en texto plano cerca del hero (H1 + párrafo de apoyo)
- [ ] Datos verificables del negocio en texto plano en footer o sección "Acerca de"
- [ ] Sección "Acerca de" con datos verificables (antigüedad, certificaciones, cobertura)

### Schema.org (`docs/schema-org.md`)

- [ ] JSON-LD del tipo de negocio inyectado en `<head>` del layout global
- [ ] FAQPage JSON-LD en la página donde están las FAQs visibles
- [ ] Service schemas en las páginas de servicio correspondientes
- [ ] Componente `JsonLd` creado en `components/JsonLd.tsx`
- [ ] Constantes de schema en `lib/schemas.ts`

### Core Web Vitals

- [ ] Imagen hero con `loading="eager"` o `fetchPriority="high"` (no lazy)
- [ ] Imágenes con `width` y `height` explícitos para evitar CLS
- [ ] Scripts de analytics con `defer` o `async`

**Criterio de aceptación:** Lighthouse SEO score ≥ 90 en producción.

---

## Path de construcción: Standalone

### Si el path es Stitch

Jorge tiene (o generará) las pantallas con Stitch. Tu rol en este path:

1. Jorge colocará `DESIGN.md` en la raíz de este repo (exportado desde Stitch)
2. Lee `DESIGN.md` para extraer el design system: paleta, tipografías, espaciado, componentes
3. Usa `docs/brief-tecnico.md` para las decisiones de librerías de motion y arquitectura técnica
4. Implementa el sitio traduciendo fielmente el diseño visual de Stitch
5. Usa `docs/seo-textos.md` para todo el copy visible — el texto ya está escrito

### Si el path es Standalone

No hay diseño previo. Tú generas el design system y construyes todo desde cero.

1. **Primera tarea:** crea `DESIGN.md` en la raíz del repo siguiendo el spec de `google-labs/design.md`
   - El design system debe ser coherente con las decisiones de `docs/brief-tecnico.md`
   - Respeta el nivel de ambición visual **Experiencial** al diseñar tokens y componentes
   - Este archivo es la referencia de diseño que guiará el resto de la construcción
2. Implementa el sitio con el design system que definiste en `DESIGN.md`
3. Usa `docs/seo-textos.md` para todo el copy visible

### Si el path es Stitch (recomendado) o Standalone

Para `visual_ambition_level = impactante`, ambos paths son válidos. Jorge elige según el cliente.

- **Si hay `DESIGN.md` en la raíz:** sigue el path Stitch
- **Si no hay `DESIGN.md`:** sigue el path Standalone (genera `DESIGN.md` primero)

---

## Skills a activar en esta sesión

Activa al inicio de la sesión con `/skill` o confírmale a Code que los use:

- `frontend-design` — calidad estética premium en cada decisión visual
- `vercel-react-best-practices` — patrones de componentes, performance, RSC vs Client Components
- `vercel-composition-patterns` — composición de layouts y páginas
- `shadcn` — componentes shadcn **siempre** personalizados con los tokens del design system, nunca con estilos default
- `next-best-practices` — App Router, Server Components, optimizaciones Next.js

---

## Al terminar la construcción inicial

Antes de cerrar la sesión, actualiza los tres archivos de documentación del proyecto. Son los que el sistema de mantenimiento usa cuando el cliente solicite cambios futuros.

### `docs/site-spec.md`

Especificación técnica del sitio construido. Instrucciones detalladas en el archivo.

### `docs/site-map.md`

Mapa de páginas y secciones con IDs estructurados. **Importante:** este archivo alimenta el selector de secciones cuando el cliente solicite cambios. Si no está correcto, el generador de prompts de cambio no tendrá contexto. Instrucciones en el archivo.

### `docs/site-state.md`

Estado inicial del sitio. Instrucciones en el archivo.

**Propón un commit message** al terminar la sesión de construcción.
