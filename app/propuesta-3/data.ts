/* ─── Shared data for /propuesta-3 ──────────────────────────────────── */

export type SlideType = "brand" | "project";

export interface Slide {
  id: string;
  type: SlideType;
  category: string;
  headline: string[];
  sub: string;
  location: string;
  year: string;
  image: string;
  slug?: string;
}

export const SLIDES: Slide[] = [
  {
    id: "00",
    type: "brand",
    category: "Constructora en Ciudad de México",
    headline: ["CONSTRUIMOS", "LO QUE", "IMPORTA."],
    sub: "+10 años · Proyectos integrales · Supervisión continua",
    location: "Ciudad de México · Nacional",
    year: "",
    image: "/images/hero-home.webp",
  },
  {
    id: "01",
    type: "project",
    category: "Construcción Integral",
    headline: ["TORRE", "CORPORATIVA", "INSURGENTES."],
    sub: "Edificación de 18 niveles con estructura de concreto aparente y sistemas MEP integrados.",
    location: "Col. Florida · CDMX",
    year: "2024",
    image: "/images/hero-home.webp",
    slug: "torre-corporativa-insurgentes",
  },
  {
    id: "02",
    type: "project",
    category: "Movimiento de Tierras",
    headline: ["PLATAFORMA", "INDUSTRIAL", "VALLEJO."],
    sub: "Excavación y nivelación de 40,000 m² con maquinaria propia. Entrega en plazo récord.",
    location: "Azcapotzalco · CDMX",
    year: "2023",
    image: "/images/service-movimiento-tierras.webp",
    slug: "plataforma-industrial-vallejo",
  },
  {
    id: "03",
    type: "project",
    category: "Ingeniería y Acabados",
    headline: ["OFICINAS", "CORPORATIVAS", "POLANCO."],
    sub: "Diseño estructural, interiorismo y acabados de nivel corporativo en 8,200 m².",
    location: "Miguel Hidalgo · CDMX",
    year: "2023",
    image: "/images/service-ingenieria.webp",
    slug: "oficinas-corporativas-polanco",
  },
];

export const SERVICES = [
  { num: "01", name: "Construcción Integral",   slug: "construccion" },
  { num: "02", name: "Movimiento de Tierras",   slug: "movimiento-de-tierras" },
  { num: "03", name: "Colados y Precolados",    slug: "colados-y-precolados" },
  { num: "04", name: "Ingenierías",             slug: "ingenierias" },
  { num: "05", name: "Interiorismo",            slug: "interiorismo" },
  { num: "06", name: "Renta de Maquinaria",     slug: "renta-de-maquinaria" },
];
