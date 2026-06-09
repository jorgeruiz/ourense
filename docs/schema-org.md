# Ourense — Schema.org: Structured Data

> **Generado el 9 de junio de 2026 por Constructor / Click Society**
> **Cliente:** Ourense

---

<!-- El contenido generado por IA se agrega a continuación -->

# Ourense — Schema.org: Structured Data

---

## Schema del tipo de negocio (ProfessionalService)

El `business_type` del Brief 2 es `ProfessionalService`. Este schema complementa el Organization base de `seo-tecnico.md` con los campos específicos del tipo de servicio profesional.

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Ourense",
  "description": "Constructora mexicana especializada en ingeniería estructural, movimiento de tierras y diseño de interiores. Más de 10 años transformando proyectos de construcción con los más altos estándares de calidad y seguridad.",
  "url": "https://www.ourense.mx/",
  "telephone": "+52-55-9354-2263",
  "email": "infoorg@oocsourense.com.mx",
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
  "openingHours": "[COMPLETAR: ej. Mo-Fr 09:00-18:00]",
  "foundingDate": "[COMPLETAR: año de fundación aproximado — más de 10 años operando]",
  "slogan": "Transformamos tus ideas en realidad",
  "knowsAbout": [
    "Ingeniería estructural",
    "Movimiento de tierras",
    "Diseño de interiores",
    "Construcción residencial",
    "Construcción comercial",
    "Supervisión de obra"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/organización-ourense/"
  ]
}
```

---

## FAQPage Schema

El Brief 2 no incluye FAQs definidas. Se generan 7 preguntas frecuentes relevantes para una constructora mexicana con el perfil de Ourense (clientes mixtos: construcción, ingenierías, movimiento de tierras; alcance nacional).

**Ubicación:** Página donde el contenido FAQ esté visible en el HTML. Si se crea una sección FAQ en homepage o página dedicada `/preguntas-frecuentes`, insertar este schema en esa página.

**Importante para Code:** El texto de cada `name` y `text` debe coincidir exactamente con el texto visible en el DOM. Actualizar este schema cuando se confirme el copy final de las FAQs con el cliente.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué tipos de proyectos de construcción maneja Ourense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense gestiona proyectos de construcción, ingeniería estructural, movimiento de tierras y diseño de interiores. Trabajamos con clientes del sector privado y público a nivel nacional, desde proyectos residenciales hasta desarrollos de infraestructura de gran escala."
      }
    },
    {
      "@type": "Question",
      "name": "¿En qué zonas de México opera Ourense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense tiene presencia nacional. Nuestra oficina principal se encuentra en Ciudad de México (Av. Insurgentes Sur 1748-501, Col. Florida), y ejecutamos proyectos en todo el territorio mexicano."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo garantizan la calidad y seguridad en cada proyecto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contamos con un equipo de expertos que realiza supervisión continua en cada etapa del proyecto, asegurándonos de que todo avance conforme a los más altos estándares de calidad y seguridad vigentes en la industria de la construcción."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuál es el proceso para iniciar un proyecto con Ourense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El proceso comienza con una consulta inicial donde analizamos tus necesidades y objetivos. A partir de ahí, diseñamos un plan estratégico claro y detallado para el proyecto, asignamos al equipo especializado y establecemos cronogramas, presupuestos y puntos de supervisión antes de iniciar cualquier trabajo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuántos años de experiencia tiene Ourense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense lleva más de 10 años operando en la industria de la construcción en México, acumulando experiencia en proyectos de ingeniería estructural, movimiento de tierras, construcción y diseño de interiores."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan con proveedores externos o todo es con personal propio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Trabajamos en colaboración con una red de proveedores y colaboradores seleccionados que comparten nuestra visión de excelencia. Esta colaboración estratégica nos permite ofrecer soluciones integrales de alta calidad en cada proyecto."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cómo puedo contactar a Ourense para solicitar una cotización?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Puedes contactarnos por teléfono al +52 (55) 9354 2263, por correo electrónico a infoorg@oocsourense.com.mx, o visitarnos en nuestra oficina en Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, Ciudad de México, C.P. 01030."
      }
    }
  ]
}
```

---

## Service Schemas

Tres servicios principales identificados del Brief 1 y los diferenciadores del Brief 2.

### Servicio 1 — Construcción e Ingeniería Estructural

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Construcción e Ingeniería Estructural",
  "description": "Servicios integrales de construcción e ingeniería estructural con planeación estratégica, supervisión continua y los más altos estándares de calidad y seguridad.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Ourense",
    "url": "https://www.ourense.mx/"
  },
  "areaServed": {
    "@type": "Country",
    "name": "México"
  },
  "serviceType": "Ingeniería Estructural y Construcción",
  "description": "Diseño y ejecución de proyectos de construcción con enfoque en ingeniería estructural. Nuestro equipo diseña un plan detallado para cada proyecto y supervisa cada etapa para garantizar calidad, seguridad y cumplimiento de plazos.",
  "termsOfService": "https://www.ourense.mx/[COMPLETAR: URL de términos si existe]"
}
```

### Servicio 2 — Movimiento de Tierras

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Movimiento de Tierras",
  "description": "Servicios especializados de movimiento de tierras para proyectos de construcción e infraestructura a nivel nacional, con supervisión experta en cada fase del proceso.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Ourense",
    "url": "https://www.ourense.mx/"
  },
  "areaServed": {
    "@type": "Country",
    "name": "México"
  },
  "serviceType": "Movimiento de Tierras y Terracería"
}
```

### Servicio 3 — Diseño de Interiores

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Diseño de Interiores",
  "description": "Servicio de diseño de interiores integrado al proceso constructivo. Transformamos espacios con soluciones que combinan funcionalidad, estética y los mismos estándares de calidad que rigen todos nuestros proyectos.",
  "provider": {
    "@type": "ProfessionalService",
    "name": "Ourense",
    "url": "https://www.ourense.mx/"
  },
  "areaServed": {
    "@type": "Country",
    "name": "México"
  },
  "serviceType": "Diseño de Interiores"
}
```

---

## BreadcrumbList

El sitio es `multi_page` con secciones de portfolio, testimonios, blog y FAQs. Aplica BreadcrumbList para las páginas internas.

### Página de proyecto individual (Portfolio)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://www.ourense.mx/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Proyectos",
      "item": "https://www.ourense.mx/proyectos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Nombre del proyecto específico]",
      "item": "https://www.ourense.mx/proyectos/[slug-del-proyecto]"
    }
  ]
}
```

### Página de Blog / Artículo

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://www.ourense.mx/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://www.ourense.mx/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Título del artículo]",
      "item": "https://www.ourense.mx/blog/[slug-del-articulo]"
    }
  ]
}
```

**Nota para Code:** El BreadcrumbList de nivel 2 (solo Inicio → Sección) no necesita schema, Google lo infiere. Implementar el schema de 3 niveles únicamente en páginas de detalle (proyecto individual, artículo de blog).

---

## Schemas adicionales

### WebSite (para Sitelinks Searchbox)

Relevante porque el sitio tiene blog y portfolio — Google puede mostrar un campo de búsqueda en el SERP.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ourense",
  "url": "https://www.ourense.mx/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.ourense.mx/buscar?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

**Nota para Code:** El `potentialAction` solo activarlo si el sitio implementa búsqueda interna funcional en `/buscar`. Si no hay búsqueda interna, eliminar el objeto `potentialAction` y dejar solo `@type`, `name` y `url`.

### Article (para artículos de Blog)

Schema a usar en cada artículo individual del blog.

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Título del artículo]",
  "description": "[Meta description del artículo — 1-2 oraciones]",
  "image": "[URL de la imagen destacada del artículo]",
  "author": {
    "@type": "Organization",
    "name": "Ourense",
    "url": "https://www.ourense.mx/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Ourense",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.ourense.mx/[COMPLETAR: ruta al logo]"
    }
  },
  "datePublished": "[COMPLETAR: fecha ISO 8601, ej. 2025-01-15]",
  "dateModified": "[COMPLETAR: fecha ISO 8601 de última modificación]",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://www.ourense.mx/blog/[slug-del-articulo]"
  }
}
```

---

## Implementación en Next.js

### Componente base

Crear en `components/JsonLd.tsx`:

```tsx
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
```

### Archivo de schemas centralizados

Crear `lib/schemas/index.ts`:

```ts
export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  // ... schema completo de arriba
}

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  // ... schema completo de arriba
}

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  // ... schema completo de arriba
}

export const serviceSchemas = {
  construccion: { /* schema construcción */ },
  movimientoDeTierras: { /* schema movimiento de tierras */ },
  disenioDeInteriores: { /* schema diseño de interiores */ }
}

// Para blog: generar dinámicamente por artículo
export function buildArticleSchema(article: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified: string
  slug: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "image": article.image,
    "author": {
      "@type": "Organization",
      "name": "Ourense",
      "url": "https://www.ourense.mx/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Ourense",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ourense.mx/images/logo.png"
      }
    },
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ourense.mx/blog/${article.slug}`
    }
  }
}

// Para proyectos: generar dinámicamente por proyecto
export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }
}
```

### Mapa de implementación por página

| Schema | Archivo Next.js | Notas |
|--------|----------------|-------|
| `ProfessionalService` + `WebSite` | `app/layout.tsx` | Global, en `<head>` |
| `FAQPage` | `app/(es)/preguntas-frecuentes/page.tsx` o sección de homepage | Solo donde el HTML de FAQs sea visible |
| `Service` (construcción) | `app/(es)/servicios/construccion/page.tsx` | Si existe página por servicio |
| `Service` (movimiento tierras) | `app/(es)/servicios/movimiento-de-tierras/page.tsx` | Si existe página por servicio |
| `Service` (diseño interiores) | `app/(es)/servicios/diseno-de-interiores/page.tsx` | Si existe página por servicio |
| `Article` | `app/(es)/blog/[slug]/page.tsx` | Dinámico por artículo |
| `BreadcrumbList` | `app/(es)/proyectos/[slug]/page.tsx` y `app/(es)/blog/[slug]/page.tsx` | Dinámico por página |

**Nota sobre bilingüismo:** El Brief 2 indica sitio `bilingual_es_en`. Los schemas deben estar en el idioma de la versión activa. Para la versión en inglés, duplicar las constantes con sufijo `_en` y traducir los valores de los campos `name`, `description`, `serviceType`, y las FAQs. Las keys del schema.org siempre permanecen en inglés.

### Implementación en `app/layout.tsx`

```tsx
import { JsonLd } from '@/components/JsonLd'
import { professionalServiceSchema, webSiteSchema } from '@/lib/schemas'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <JsonLd data={professionalServiceSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Implementación en página de artículo de blog

```tsx
// app/(es)/blog/[slug]/page.tsx
import { JsonLd } from '@/components/JsonLd'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schemas'

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleData(params.slug) // tu función de data fetching

  const articleSchema = buildArticleSchema({
    headline: article.title,
    description: article.excerpt,
    image: article.featuredImage,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    slug: params.slug
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Inicio', url: 'https://www.ourense.mx/' },
    { name: 'Blog', url: 'https://www.ourense.mx/blog' },
    { name: article.title, url: `https://www.ourense.mx/blog/${params.slug}` }
  ])

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* Contenido del artículo */}
    </>
  )
}
```

### Validación obligatoria antes del deploy

Validar cada schema en: **https://search.google.com/test/rich-results**

Schemas con rich results elegibles para Ourense:

| Schema | Rich Result esperado |
|--------|---------------------|
| `FAQPage` | Preguntas expandibles en SERP de Google |
| `Article` | Fecha de publicación y autor en SERP |
| `BreadcrumbList` | Ruta de migas de pan en SERP |
| `WebSite` | Sitelinks Searchbox (si se implementa búsqueda) |

`ProfessionalService` y `Service` no generan rich results visuales en SERP pero alimentan el Knowledge Panel de Google y mejoran la comprensión semántica del sitio.