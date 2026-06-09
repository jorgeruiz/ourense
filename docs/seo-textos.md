# Textos SEO — Ourense

**Generado por Constructor el 9 de junio de 2026**
**Cliente:** Ourense

Este documento contiene los textos del sitio optimizados para SEO: meta titles, meta descriptions, headings H1/H2/H3, copy por sección y página. Usa estos textos directamente en el código — no escribas copy de relleno ni generes texto placeholder.

---

# Ourense — SEO: Configuración Técnica Global

## Resumen para Code

Ourense es una empresa constructora con sede en Ciudad de México (CDMX), con más de 10 años de operación, alcance nacional y presencia física mixta. El sitio es **bilingüe español–inglés** (`https://www.ourense.mx/`), con estructura multi-página y objetivo de showcase de proyectos y servicios. **Alerta crítica: el sitio debe implementar hreflang correctamente desde el primer deploy en producción; la estructura bilingüe requiere que cada URL en español tenga su par en inglés (`/en/`) para evitar penalizaciones por contenido duplicado.** Este documento define los estándares técnicos SEO del sitio. Aplícalos globalmente. Los meta tags, schema por página y copy se generarán cuando se cree cada página en Brief 4.

---

## Schema Organization

Colocar este JSON-LD en el `<head>` del layout global (aplica a todo el sitio). Tipo `LocalBusiness` por presencia física confirmada con dirección en CDMX.

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ourense",
  "url": "https://www.ourense.mx",
  "logo": "https://www.ourense.mx/logo.png",
  "description": "Empresa constructora con sede en Ciudad de México, especializada en edificaciones, movimiento de tierras, colados y precolados, ingenierías, interiorismo y renta de maquinaria.",
  "telephone": "+52-55-9354-2263",
  "email": "infoorg@oocsourense.com.mx",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+52-55-9354-2263",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Insurgentes Sur 1748-501, Col. Florida",
    "addressLocality": "Ciudad de México",
    "addressRegion": "Álvaro Obregón",
    "postalCode": "01030",
    "addressCountry": "MX"
  },
  "areaServed": {
    "@type": "Country",
    "name": "México"
  },
  "sameAs": [
    "https://www.linkedin.com/company/organización-ourense/"
  ]
}
```

> **Nota para Code:** `logo.png` y la ruta deben coincidir con el asset real en producción. Confirmar con el cliente si existe versión en alta resolución del logotipo. El campo `sameAs` puede ampliarse si Ourense agrega otras redes sociales en el futuro.

---

## Configuración técnica global

### Idioma y hreflang

El sitio es **bilingüe español–inglés**. Se requiere implementación de hreflang en todas las páginas de ambas versiones.

**Estructura recomendada: subdirectorio `/en/`** — se prefiere sobre subdominio porque consolida la autoridad de dominio en un solo origen (`ourense.mx`) y simplifica el crawl para Googlebot.

```html
<!-- En cada página en español -->
<link rel="alternate" hreflang="es" href="https://www.ourense.mx/[slug-es]/" />
<link rel="alternate" hreflang="en" href="https://www.ourense.mx/en/[slug-en]/" />
<link rel="alternate" hreflang="x-default" href="https://www.ourense.mx/" />

<!-- En cada página en inglés -->
<link rel="alternate" hreflang="es" href="https://www.ourense.mx/[slug-es]/" />
<link rel="alternate" hreflang="en" href="https://www.ourense.mx/en/[slug-en]/" />
<link rel="alternate" hreflang="x-default" href="https://www.ourense.mx/" />
```

**Implementación en Next.js (App Router):**

```ts
// En generateMetadata() de cada página
alternates: {
  canonical: "https://www.ourense.mx/[slug]",
  languages: {
    "es": "https://www.ourense.mx/[slug]",
    "en": "https://www.ourense.mx/en/[slug-en]",
    "x-default": "https://www.ourense.mx/",
  },
},
```

> **Regla crítica:** Cada página en español debe tener exactamente un par en inglés y viceversa. No dejar páginas sin su contraparte hreflang — Google puede ignorar las señales o generar canibalización.

---

### Canonical strategy

Cada página auto-referencia su propia URL canónica. No se prevén duplicados estructurales.

```
Patrón canónico (ES): <link rel="canonical" href="https://www.ourense.mx/[slug]/" />
Patrón canónico (EN): <link rel="canonical" href="https://www.ourense.mx/en/[slug-en]/" />
Implementación en Next.js: metadata.alternates.canonical por página.
```

**Casos especiales:**
- Si se implementan filtros en el portafolio (por tipo de proyecto, año, etc.), los parámetros de URL deben apuntar canonical a la URL base sin parámetros: `canonical: /portafolio/`
- La página de inicio en inglés (`/en/`) debe tener canonical propia, no apuntar a `/`.

---

### Robots

```
# robots.txt recomendado
User-agent: *
Allow: /

Disallow: /api/
Disallow: /admin/
Disallow: /gracias/
Disallow: /en/gracias/

Sitemap: https://www.ourense.mx/sitemap.xml
```

**Páginas que deben llevar `noindex`:**
- `/gracias/` y `/en/thank-you/` (confirmaciones de formulario de contacto)
- Cualquier página de staging si el preview URL es público
- Implementar via `metadata.robots = { index: false, follow: false }` en Next.js

---

### Open Graph — defaults globales

```
og:site_name:    Ourense
og:type:         website
og:locale:       es_MX  (páginas en español)
og:locale:       en_US  (páginas en inglés — usar og:locale:alternate para declarar el par)
og:image:        https://www.ourense.mx/og-default.jpg  (1200×630px)
twitter:card:    summary_large_image
```

> **Nota para Code:** Crear dos imágenes OG default — una para la versión ES y una para EN (`/og-default-en.jpg`) si el texto embebido en la imagen cambia de idioma. Si la imagen es solo visual sin texto, una sola imagen sirve para ambas versiones. Cada página debe sobreescribir `og:title`, `og:description` y `og:image` con sus valores propios al construirse en Brief 4.

---

## Sitemap.xml — estructura y reglas

Generación automática vía `app/sitemap.ts` en Next.js. El archivo debe incluir ambas versiones de idioma (ES y EN) para todas las páginas indexables.

**Reglas de prioridad:**

| Tipo de página | `<priority>` | `<changefreq>` |
|---|---|---|
| Home (`/` y `/en/`) | 1.0 | weekly |
| Servicios / Soluciones | 0.8 | monthly |
| Portafolio / Proyectos | 0.8 | monthly |
| Nosotros / About | 0.6 | monthly |
| Contacto / Contact | 0.6 | monthly |
| Blog / artículos (futuro) | 0.5 | weekly |
| FAQs | 0.5 | monthly |
| Testimonios | 0.5 | monthly |
| Páginas legales (Privacidad, Términos) | 0.3 | yearly |

**Excluir del sitemap:**
- `/gracias/` y `/en/thank-you/`
- Rutas `/api/`
- Cualquier página con `noindex` activo

---

## Convenciones de URLs y slugs

**Formato global:**
- Minúsculas, sin acentos, sin caracteres especiales.
- Separador: guion medio (`-`), nunca guion bajo.
- Máximo 4 palabras por slug.
- Versión EN en subdirectorio `/en/` con slug traducido al inglés.

**Slugs confirmados para páginas del proyecto:**

| Página | Slug ES | Slug EN |
|---|---|---|
| Inicio | `/` | `/en/` |
| Servicios (hub) | `/servicios/` | `/en/services/` |
| Construcción | `/servicios/construccion/` | `/en/services/construction/` |
| Movimiento de tierras | `/servicios/movimiento-de-tierras/` | `/en/services/earthmoving/` |
| Colados y Precolados | `/servicios/colados-y-precolados/` | `/en/services/concrete-work/` |
| Ingenierías | `/servicios/ingenierias/` | `/en/services/engineering/` |
| Interiorismo | `/servicios/interiorismo/` | `/en/services/interior-design/` |
| Renta de maquinaria | `/servicios/renta-de-maquinaria/` | `/en/services/equipment-rental/` |
| Portafolio | `/portafolio/` | `/en/portfolio/` |
| Nosotros | `/nosotros/` | `/en/about/` |
| Blog | `/blog/` | `/en/blog/` |
| FAQs | `/preguntas-frecuentes/` | `/en/faq/` |
| Testimonios | `/testimonios/` | `/en/testimonials/` |
| Contacto | `/contacto/` | `/en/contact/` |

**Ejemplos de formato correcto vs incorrecto:**

| ✓ Correcto | ✗ Incorrecto |
|---|---|
| `/servicios/construccion/` | `/Servicios/Construcción/` |
| `/movimiento-de-tierras/` | `/movimiento_de_tierras/` |
| `/portafolio/` | `/Portfolio/`, `/port/` |
| `/en/services/earthmoving/` | `/en/Movimiento-De-Tierras/` |

---

## Recomendaciones de implementación

**Meta tags — manejo global:**
- Ninguna página debe heredar el mismo `<title>` ni `<meta name="description">` del layout padre.
- Patrón de title recomendado: `[Tema de la página] | Ourense`
- En inglés: `[Page Topic] | Ourense`
- En Next.js: usar `metadata` export por página o `generateMetadata()` para rutas dinámicas (portafolio individual).
- Límites: title 55–60 caracteres, description 150–160 caracteres.

**Indexación — alerta de deploy:**
- Verificar que el entorno de producción en `ourense.mx` **no tenga `noindex` global** heredado de staging. Error común con Vercel/Netlify al promover previews a producción.
- El sitio actual (`https://www.ourense.mx/`) parece en construcción (solo muestra "Continuar"). Confirmar que el nuevo deploy sea sobre el mismo dominio y que no queden rutas del sitio anterior indexadas con contenido obsoleto. Considerar Search Console para solicitar reindexación tras el lanzamiento.

**Core Web Vitals:**
- Imágenes del portafolio y galería de proyectos: incluir siempre `width` y `height` explícitos o `aspect-ratio` en CSS para evitar CLS.
- La imagen hero (sitio de ambición visual experiencial) debe tener `fetchPriority="high"` y **no** `loading="lazy"` — es el LCP primario.
- Videos de fondo o assets pesados de entrada: cargar con `preload` o diferir con Intersection Observer para no bloquear FID/INP.
- Scripts de analytics (Google Analytics, GTM): cargar con `strategy="afterInteractive"` en Next.js o `defer` en HTML estándar.

**Bilingüismo — checklist técnico:**
- Cada ruta ES debe tener exactamente una contraparte EN en `/en/`.
- El atributo `lang` del `<html>` debe cambiar según el idioma de la página: `lang="es"` o `lang="en"`.
- Asegurarse de que el `sitemap.xml` incluya ambas versiones de cada URL.
- El switch de idioma en el UI debe navegar a la contraparte exacta de la página actual, no siempre al Home.

---

## Estrategia SEO

# Ourense — SEO: Estrategia

## Resumen estratégico

Ourense es una empresa constructora con sede en Ciudad de México (Álvaro Obregón, zona sur) con más de 10 años de operación, que ofrece servicios integrales de construcción, movimiento de tierras, colados y precolados, ingenierías, interiorismo y renta de maquinaria, dirigida tanto a clientes corporativos como a otras empresas del sector. El proyecto cuenta con 12 keywords seleccionadas centradas en búsquedas de contratación directa en CDMX y México, con un ángulo SEO principal de posicionamiento como constructora integral de alto estándar en mercado B2B nacional. La alerta estratégica más importante: el sitio actual no tiene contenido indexable significativo — se construye desde cero en términos de autoridad SEO, por lo que la prioridad debe ser cubrir rápidamente las páginas de servicios con contenido semánticamente denso antes de trabajar cualquier objetivo de visibilidad. El keyword set es funcional pero limitado (12 términos), sin análisis de competencia formal ni keywords long-tail para los servicios de mayor especificidad (colados, precolados, renta de maquinaria); el mapa se complementa con términos inferidos del contexto del negocio. **Nivel de confianza: Media — keyword set limitado y sin análisis competitivo documentado.**

---

## Keywords del proyecto por tema

### Tema 1: Identidad y posicionamiento general

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| Constructoras en México | Primaria | Comercial | Alto |
| empresas de construccion | Primaria | Comercial | Alto |
| empresa constructora Ciudad de México | Primaria | Comercial | Alto |
| Constructora en CDMX | Primaria | Comercial | Alto |
| empresa constructora con más de 10 años de experiencia | Long-tail | Comercial | Bajo |
| constructora comprometida con calidad y seguridad | Long-tail | Comercial | Bajo |
| constructora zona sur Ciudad de México | Long-tail | Geo-comercial | Bajo |

**Cuándo usar este grupo:** Página de inicio, sección "Sobre nosotros" o "Quiénes somos". Son las búsquedas de entrada cuando un prospecto aún está evaluando proveedores y no ha definido el servicio específico.

**Notas de uso:** "Constructoras en México" y "empresas de construcción" tienen competencia muy alta — dominada por directorios y portales. El diferencial de Ourense está en las variantes geo-específicas (CDMX, zona sur) y en los modificadores de credibilidad (+10 años, estándares de calidad). Priorizar esas variantes sobre los términos genéricos.

---

### Tema 2: Servicios de construcción integral

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| servicios de construcción integral | Primaria | Comercial | Medio |
| constructora de edificaciones corporativas México | Secundaria | Comercial | Medio |
| constructora para proyectos de infraestructura urbana | Secundaria | Comercial | Bajo |
| construcción de edificios corporativos CDMX | Long-tail (inferida) | Transaccional | Bajo |
| empresa constructora proyectos integrales México | Long-tail (inferida) | Comercial | Bajo |
| contratista general Ciudad de México | Long-tail (inferida) | Transaccional | Medio |

**Cuándo usar este grupo:** Página de servicios general o sección de overview de construcción. Estas keywords activan páginas que describen el alcance completo del servicio — desde cimentación hasta acabados — y no un servicio puntual.

**Notas de uso:** "Servicios de construcción integral" tiene volumen medio con competencia moderada — es la keyword con mejor equilibrio entre volumen y alcanzabilidad para un sitio nuevo. "Constructora de edificaciones corporativas" es de nicho pero alta intención de conversión.

---

### Tema 3: Servicios especializados

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| movimiento de tierras excavaciones México | Primaria | Comercial | Medio |
| colados en sitio Ciudad de México | Long-tail (inferida) | Transaccional | Bajo |
| elementos precolados construcción México | Long-tail (inferida) | Comercial | Bajo |
| excavaciones y nivelaciones CDMX | Long-tail (inferida) | Transaccional | Bajo |
| compactación de suelos constructora México | Long-tail (inferida) | Comercial | Bajo |
| renta de maquinaria construcción CDMX | Long-tail (inferida) | Transaccional | Medio |
| maquinaria especializada construcción México | Long-tail (inferida) | Comercial | Bajo |

**Cuándo usar este grupo:** Páginas de servicios individuales — una por cada especialidad (movimiento de tierras, colados/precolados, renta de maquinaria). Son búsquedas de alta intención: quien busca "colados en sitio CDMX" ya tiene una necesidad específica activa.

**Notas de uso:** Este es el grupo con mayor potencial de conversión directa y el más desatendido por competidores generalistas. El keyword set original solo incluye una keyword de este grupo ("movimiento de tierras excavaciones México") — se complementó con términos inferidos. Son búsquedas de bajo volumen pero tráfico muy cualificado.

---

### Tema 4: Ingeniería e interiorismo

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| interiorismo y acabados para proyectos corporativos | Primaria | Comercial | Bajo |
| diseño de interiores corporativo Ciudad de México | Long-tail (inferida) | Comercial | Bajo |
| supervisión técnica de obra México | Long-tail (inferida) | Comercial | Bajo |
| ingeniería estructural constructora CDMX | Long-tail (inferida) | Comercial | Bajo |
| diseño y supervisión de proyectos de construcción | Long-tail (inferida) | Informacional | Bajo |

**Cuándo usar este grupo:** Páginas dedicadas a Ingenierías e Interiorismo como servicios diferenciadores. Son servicios que muchas constructoras no ofrecen in-house — representan un diferencial real frente a competidores.

**Notas de uso:** Volumen bajo pero intención alta. "Interiorismo y acabados para proyectos corporativos" es una keyword de nicho que Ourense puede capturar con relativa facilidad dado que pocos competidores directos la trabajan explícitamente.

---

### Tema 5: Diferenciadores y credibilidad

| Keyword | Tipo | Intención | Volumen estimado |
|---|---|---|---|
| constructora con planeación estratégica de proyectos | Long-tail | Comercial | Bajo |
| constructora con supervisión continua de obra | Long-tail (inferida) | Comercial | Bajo |
| empresa constructora confiable México | Long-tail (inferida) | Comercial | Bajo |
| constructora con experiencia en proyectos corporativos | Long-tail (inferida) | Comercial | Bajo |

**Cuándo usar este grupo:** Sección "Por qué elegirnos", "Sobre nosotros" o como copy de soporte en páginas de servicios. Son keywords que reflezan la intención del prospecto que ya está comparando proveedores y busca argumentos de decisión.

**Notas de uso:** Volumen muy bajo pero altamente cualificadas. "Constructora con planeación estratégica de proyectos" es única en el mercado — casi ningún competidor la trabaja directamente. Baja competencia y alta relevancia para el diferenciador declarado de Ourense.

---

**Narrativa estratégica del keyword map**

El ángulo SEO de Ourense combina autoridad geográfica (CDMX / zona sur) con especialización técnica diferenciada — una constructora que hace lo que otras no ofrecen in-house (interiorismo, precolados, ingenierías). La keyword con mayor potencial de conversión es **"servicios de construcción integral"**: tiene volumen medio, competencia moderada alcanzable para un sitio con contenido de calidad, y captura prospectos con presupuesto activo buscando un solo proveedor para proyecto completo. El riesgo de canibalización más relevante se da entre el Tema 1 (identidad general) y el Tema 2 (construcción integral): si tanto el inicio como la página de servicios apuntan a "empresa constructora Ciudad de México" sin diferenciación de contenido, compiten entre sí — la solución es que el inicio trabaje la marca y el Tema 1, y las páginas de servicios trabajen el Tema 2 con contenido más específico.

---

## Estructura sugerida del sitio

| Página sugerida | Keywords relevantes | Prioridad |
|---|---|---|
| Inicio | Tema 1 (identidad), Tema 5 (diferenciadores) | Alta |
| Servicios — Overview | Tema 2 (construcción integral) | Alta |
| Servicio: Construcción | Tema 2, Tema 3 (colados/precolados) | Alta |
| Servicio: Movimiento de Tierras | Tema 3 | Alta |
| Servicio: Ingenierías | Tema 4 | Alta |
| Servicio: Interiorismo | Tema 4 | Alta |
| Servicio: Renta de Maquinaria | Tema 3 | Media |
| Proyectos / Portafolio | Tema 1, Tema 2, Tema 5 | Alta |
| Sobre Ourense / Quiénes somos | Tema 1, Tema 5 | Media |
| Contacto | Tema 1 (geo-CDMX) | Alta |
| Blog (futuro) | Temas 2, 3, 4 — intención informacional | Futura |

---

## Estrategia de internal linking

**Principios para este proyecto:**

1. **Flujo hacia conversión:** Cada página de servicio debe incluir un enlace directo hacia la página de Contacto con CTA claro ("Solicitar cotización", "Hablar con un experto"). La conversión en este sector B2B ocurre por contacto directo — ninguna página de servicio debe terminar sin esa ruta.

2. **Autoridad desde el inicio hacia servicios:** La página de inicio debe enlazar directamente a las 5–6 páginas de servicio principales para distribuir autoridad SEO de forma intencional desde el primer momento. El sitio es nuevo — el inicio acumulará autoridad primero.

3. **El portafolio enlaza hacia servicios:** Cada proyecto del portafolio debe enlazar al servicio correspondiente que demuestra ("Este proyecto involucró movimiento de tierras → ver Servicio de Movimiento de Tierras"). Esto crea conexiones semánticas que refuerzan las keywords de Tema 3 y 4.

4. **Contexto semántico entre servicios relacionados:** Construcción ↔ Colados/Precolados son servicios complementarios — enlazarlos entre sí cuando el contenido lo permita de forma natural. Lo mismo aplica para Ingenierías ↔ Construcción. Evitar enlaces forzados sin contexto en el párrafo.

5. **Sobre nosotros apoya credibilidad:** La página "Sobre Ourense" debe recibir enlaces desde páginas de servicios en contextos de credibilidad ("+10 años de experiencia → conoce nuestra historia"). Esto distribuye autoridad hacia una página que trabaja keywords de Tema 5 y refuerza la confianza del prospecto en etapa de evaluación.

---

## Ideas de contenido futuro

**Blog / artículos (6 temas sugeridos):**

- **¿Qué incluye un proyecto de construcción integral?** — Cubre intención informacional del Tema 2 y posiciona a Ourense como referencia educativa para prospectos en etapa temprana de decisión.
- **Diferencias entre colados en sitio y elementos precolados** — Captura búsquedas técnicas de Tema 3 con volumen bajo pero audiencia muy cualificada (ingenieros, directores de obra).
- **Cómo planear un proyecto de movimiento de tierras: guía básica** — Apoya keywords de Tema 3 y genera tráfico de ingenieros y constructoras que buscan subcontratar este servicio.
- **Por qué el interiorismo corporativo impacta la productividad de tu empresa** — Refuerza Tema 4 y justifica el servicio ante tomadores de decisión que aún no consideran el interiorismo como inversión estratégica.
- **Qué preguntar antes de contratar una constructora en México** — Captura prospectos en etapa de evaluación (Tema 1 + Tema 5) y posiciona los diferenciadores de Ourense de forma natural dentro del contenido.
- **Supervisión de obra: qué es y por qué defines el éxito de un proyecto** — Apoya keywords de Tema 4 e introduce el servicio de ingenierías a prospectos que no lo conocen.

**Páginas adicionales o landings:**

- **Landing geo-específica: Constructora zona sur CDMX** — Cubre la keyword geo-específica de Tema 1 que tiene menos competencia que los términos genéricos nacionales y captura prospectos locales con mayor probabilidad de conversión.
- **Página de proceso / metodología** — Activa keywords de Tema 5 (planeación estratégica, supervisión continua) con contenido estructurado que diferencia a Ourense de competidores que no documentan su proceso.

**Recursos de autoridad:**

- **Casos de estudio por proyecto (portafolio expandido)** — Un caso de estudio por proyecto emblemático, con métricas reales (m² construidos, tiempo de ejecución, servicios involucrados), genera contenido indexable único que ningún competidor puede replicar y refuerza todos los grupos temáticos simultáneamente.