/* ─── Shared data for /propuesta-3 ──────────────────────────────────── */

export type SlideType = "brand" | "project";

export interface ProjectDetails {
  area: string;
  duration: string;
  client: string;
  description: string[];
  services: string[];
  quote: string;
  quoteAuthor: string;
  gallery: string[];   // additional image paths (can reuse SLIDES images)
}

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
  details?: ProjectDetails;
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
    sub: "Edificación de 18 niveles con estructura de concreto aparente y sistemas MEP integrados desde cimentación hasta entrega.",
    location: "Col. Florida · CDMX",
    year: "2024",
    image: "/images/hero-home.webp",
    slug: "torre-corporativa-insurgentes",
    details: {
      area: "24,800 m²",
      duration: "26 meses",
      client: "Grupo Inversionista del Centro",
      description: [
        "Torre corporativa de 18 niveles desarrollada en la Colonia Florida, Ciudad de México. El proyecto comprendió la construcción integral desde el diseño estructural hasta la entrega de espacios de oficinas Clase A, con cimentación profunda en terreno lacustre y estructura de concreto aparente de alta resistencia.",
        "El reto principal fue ejecutar la estructura en terreno de alta compresibilidad sin afectar los predios colindantes. Ourense implementó un sistema de pilotes de fricción de gran diámetro combinado con losa de cimentación compensada, alcanzando los 32 metros de profundidad necesarios para garantizar la estabilidad a largo plazo.",
        "Los acabados corporativos de nivel internacional —lobbies en mármol travertino, fachada de vidrio estructural y sistemas de automatización BMS— fueron ejecutados por el equipo de interiorismo de Ourense bajo los mismos estándares de calidad y supervisión continua que el resto de la obra.",
      ],
      services: ["Construcción Integral", "Ingenierías MEP", "Movimiento de Tierras", "Colados en Sitio", "Interiorismo Corporativo"],
      quote: "Ourense transformó un proyecto complejo en una entrega sin sorpresas. Su presencia técnica en obra todos los días hizo la diferencia.",
      quoteAuthor: "Arq. Luis Herrera — Director de Desarrollos, GIC",
      gallery: ["/images/service-construccion.webp", "/images/about-section.webp"],
    },
  },
  {
    id: "02",
    type: "project",
    category: "Movimiento de Tierras",
    headline: ["PLATAFORMA", "INDUSTRIAL", "VALLEJO."],
    sub: "Excavación y nivelación de 40,000 m² con maquinaria propia en Azcapotzalco. Entrega en plazo récord sin afectación vial.",
    location: "Azcapotzalco · CDMX",
    year: "2023",
    image: "/images/service-movimiento-tierras.webp",
    slug: "plataforma-industrial-vallejo",
    details: {
      area: "40,000 m²",
      duration: "8 meses",
      client: "Parque Industrial Vallejo Norte",
      description: [
        "Preparación de suelo para parque industrial en zona norponiente de la Ciudad de México. El proyecto requirió excavación selectiva, despalme, corte y relleno compactado de 40,000 m² en un plazo de ocho meses, con restricciones estrictas de horario por colindancia con vialidades primarias.",
        "Ourense desplegó una flota propia de 14 unidades de maquinaria pesada —excavadoras de gran alcance, compactadoras vibratorias y camiones de volteo— eliminando la dependencia de subcontratistas y manteniendo el ritmo productivo durante todo el ciclo. El control topográfico diario garantizó tolerancias de ±5 cm en la nivelación final.",
        "El resultado fue una plataforma perfectamente compactada al 95% Proctor Modificado, lista para recibir las cimentaciones de las naves industriales en el plazo comprometido, sin un solo día de retraso.",
      ],
      services: ["Movimiento de Tierras", "Nivelación y Compactación", "Control Topográfico", "Renta de Maquinaria"],
      quote: "Tienen la maquinaria, el equipo y, sobre todo, la disciplina para cumplir. En ocho meses no hubo un solo ajuste al programa de obra.",
      quoteAuthor: "Ing. Carmen Villanueva — Directora de Proyectos, PIVN",
      gallery: ["/images/portfolio-preview.webp", "/images/service-construccion.webp"],
    },
  },
  {
    id: "03",
    type: "project",
    category: "Ingeniería y Acabados",
    headline: ["OFICINAS", "CORPORATIVAS", "POLANCO."],
    sub: "Diseño estructural, interiorismo de nivel internacional y acabados de alto detalle en 8,200 m² en Miguel Hidalgo.",
    location: "Miguel Hidalgo · CDMX",
    year: "2023",
    image: "/images/service-ingenieria.webp",
    slug: "oficinas-corporativas-polanco",
    details: {
      area: "8,200 m²",
      duration: "14 meses",
      client: "Firma de Servicios Financieros (Confidencial)",
      description: [
        "Remodelación integral y habilitación de oficinas corporativas para un cliente del sector financiero en la zona de Polanco. El proyecto comprendió la refuncionalización completa de tres niveles —demolición selectiva, refuerzo estructural, nuevas instalaciones y acabados de representación.",
        "El equipo de ingeniería de Ourense desarrolló el proyecto ejecutivo de estructura, instalaciones hidrosanitarias, eléctricas y de telecomunicaciones en paralelo con el programa de obra, reduciendo en seis semanas el tiempo total de ejecución respecto al cronograma inicial.",
        "Los espacios resultantes integran acabados en piedra natural, herrería de precisión, sistemas de climatización de silencio auditivo y tecnología de control inteligente, bajo un diseño que refleja la identidad corporativa del cliente sin comprometer la funcionalidad operativa.",
      ],
      services: ["Ingenierías MEP", "Interiorismo Corporativo", "Colados y Precolados", "Acabados de Alta Precisión"],
      quote: "El nivel de detalle que Ourense mantiene en obra —desde la estructura hasta los acabados finales— es lo que distingue a una constructora seria del resto.",
      quoteAuthor: "Dir. de Infraestructura — Cliente (Confidencial, sector financiero)",
      gallery: ["/images/about-section.webp", "/images/service-ingenieria.webp"],
    },
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
