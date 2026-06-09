# Especificación Técnica del Sitio — Ourense

> **Instrucciones para Claude Code:** Llena este archivo al terminar la construcción inicial del sitio. Esta especificación se usa como contexto cuando el cliente solicite cambios futuros — sin este documento, el generador de prompts de cambio no tiene información del sitio.
>
> Reemplaza **todos** los placeholders con la información real del sitio construido. Elimina las instrucciones en bloques `>` al llenar el documento.

**Última actualización:** [fecha de construcción inicial]
**Construido por:** Claude Code / Click Society

---

## Stack

**Framework:** Next.js [versión]
**Node:** [versión]
**Package manager:** npm / pnpm / yarn
**Deploy:** Vercel

**Dependencias principales:**

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| next | [ver] | Framework principal |
| react | [ver] | UI |
| tailwindcss | [ver] | Estilos |
| [motion lib] | [ver] | Animaciones — según visual_ambition_level |

---

## Design System

> Documenta los tokens de diseño base. Si hay un `DESIGN.md` en la raíz, este resumen puede ser más compacto — pero incluye los valores críticos que impactan mantenimiento.

**Colores primarios:**
- Primary: `[valor]` — [descripción/uso]
- Secondary: `[valor]`
- Background: `[valor]`
- Foreground (texto): `[valor]`

**Tipografías:**
- Headings: `[fuente]`, [peso]
- Body: `[fuente]`, [peso]

**Breakpoints:**
- Mobile: < 768px
- Tablet: 768px – 1024px
- Desktop: > 1024px

---

## Componentes clave

> Lista los componentes más importantes del proyecto con una línea de descripción. Incluye ruta relativa.

| Componente | Ruta | Descripción |
|-----------|------|-------------|
| Layout raíz | `app/layout.tsx` | |
| Navbar | `components/[ruta]` | |
| Hero | `components/[ruta]` | |
| Footer | `components/[ruta]` | |

---

## Estructura de páginas

> Lista de rutas implementadas con descripción breve.

| Ruta | Archivo | Descripción |
|------|---------|-------------|
| `/` | `app/page.tsx` | Página de inicio |
| `/[ruta]` | `app/[ruta]/page.tsx` | |

---

## Decisiones de arquitectura

> Documenta decisiones no obvias: por qué se eligió X en lugar de Y, workarounds importantes, patrones establecidos.

- **[Decisión 1]:** [razón]
- **[Decisión 2]:** [razón]

---

## Notas para mantenimiento

> Información crítica para futuras sesiones de cambio.

- [Nota 1]
- [Nota 2]
