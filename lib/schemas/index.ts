export const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Ourense",
  "description":
    "Constructora mexicana especializada en ingeniería estructural, movimiento de tierras y diseño de interiores. Más de 10 años transformando proyectos de construcción con los más altos estándares de calidad y seguridad.",
  "url": "https://www.ourense.mx/",
  "telephone": "+52-55-9354-2263",
  "email": "infoorg@oocsourense.com.mx",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Insurgentes Sur 1748-501, Col. Florida",
    "addressLocality": "Ciudad de México",
    "addressRegion": "Álvaro Obregón",
    "postalCode": "01030",
    "addressCountry": "MX",
  },
  "areaServed": { "@type": "Country", "name": "México" },
  "slogan": "Transformamos tus ideas en realidad",
  "knowsAbout": [
    "Ingeniería estructural",
    "Movimiento de tierras",
    "Diseño de interiores",
    "Construcción residencial",
    "Construcción comercial",
    "Supervisión de obra",
  ],
  "sameAs": ["https://www.linkedin.com/company/organización-ourense/"],
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ourense",
  "url": "https://www.ourense.mx/",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Ourense",
  "url": "https://www.ourense.mx",
  "logo": "https://www.ourense.mx/images/logo.png",
  "description":
    "Empresa constructora con sede en Ciudad de México, especializada en edificaciones, movimiento de tierras, colados y precolados, ingenierías, interiorismo y renta de maquinaria.",
  "telephone": "+52-55-9354-2263",
  "email": "infoorg@oocsourense.com.mx",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+52-55-9354-2263",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English"],
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Insurgentes Sur 1748-501, Col. Florida",
    "addressLocality": "Ciudad de México",
    "addressRegion": "Álvaro Obregón",
    "postalCode": "01030",
    "addressCountry": "MX",
  },
  "areaServed": { "@type": "Country", "name": "México" },
  "sameAs": ["https://www.linkedin.com/company/organización-ourense/"],
};

export const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué servicios ofrece Ourense como constructora?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense ofrece construcción integral, movimiento de tierras, colados y precolados de alta resistencia, ingenierías, interiorismo y renta de maquinaria especializada. Todos los servicios están disponibles de forma independiente o como parte de un proyecto completo gestionado desde una sola empresa, con planeación estratégica y supervisión técnica continua en cada etapa.",
      },
    },
    {
      "@type": "Question",
      "name": "¿En qué ciudades o estados opera Ourense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense tiene su sede en Ciudad de México, con oficinas en Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, y opera a nivel nacional. Los proyectos fuera de CDMX se atienden bajo coordinación directa del equipo de la empresa.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Cuántos años de experiencia tiene Ourense en construcción?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense tiene más de 10 años de experiencia en el sector de la construcción en México. Durante ese tiempo ha desarrollado proyectos de edificaciones emblemáticas, infraestructura urbana y espacios corporativos en Ciudad de México y otras regiones del país.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Ourense trabaja con empresas constructoras o solo con clientes finales?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense trabaja tanto con empresas constructoras, firmas de ingeniería y desarrolladores, como con clientes directos que requieren gestión integral de su proyecto. Su modelo de colaboración está diseñado para adaptarse a distintos tipos de cliente, ya sea como contratista general, subcontratista especializado o proveedor de maquinaria.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Cómo funciona el proceso de planeación estratégica de un proyecto con Ourense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense diseña un plan detallado para cada proyecto antes de iniciar la ejecución, que incluye cronograma, presupuesto, asignación de recursos y criterios de calidad. Este plan se revisa de forma continua durante la obra mediante supervisión técnica activa, lo que permite detectar y resolver desviaciones antes de que afecten el tiempo o el costo final.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Cómo puedo contactar a Ourense para solicitar un proyecto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense puede ser contactada por teléfono al +52 (55) 9354 2263, por correo electrónico a infoorg@oocsourense.com.mx, o presencialmente en Av. Insurgentes Sur 1748-501, Col. Florida, Álvaro Obregón, Ciudad de México, C.P. 01030. También tiene presencia en LinkedIn como Organización Ourense.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Qué tipos de proyectos de construcción maneja Ourense?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ourense gestiona proyectos de construcción integral, ingeniería estructural, movimiento de tierras y diseño de interiores. Trabajamos con clientes del sector privado y público a nivel nacional, desde proyectos residenciales hasta desarrollos de infraestructura de gran escala.",
      },
    },
    {
      "@type": "Question",
      "name": "¿Cómo garantizan la calidad y seguridad en cada proyecto?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Contamos con un equipo de expertos que realiza supervisión continua en cada etapa del proyecto, asegurándonos de que todo avance conforme a los más altos estándares de calidad y seguridad vigentes en la industria de la construcción.",
      },
    },
  ],
};

export const serviceSchemas = {
  construccion: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Construcción e Ingeniería Estructural",
    "description":
      "Servicios integrales de construcción e ingeniería estructural con planeación estratégica, supervisión continua y los más altos estándares de calidad y seguridad.",
    "provider": { "@type": "ProfessionalService", "name": "Ourense", "url": "https://www.ourense.mx/" },
    "areaServed": { "@type": "Country", "name": "México" },
    "serviceType": "Ingeniería Estructural y Construcción",
  },
  movimientoDeTierras: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Movimiento de Tierras",
    "description":
      "Servicios especializados de movimiento de tierras para proyectos de construcción e infraestructura a nivel nacional, con supervisión experta en cada fase del proceso.",
    "provider": { "@type": "ProfessionalService", "name": "Ourense", "url": "https://www.ourense.mx/" },
    "areaServed": { "@type": "Country", "name": "México" },
    "serviceType": "Movimiento de Tierras y Terracería",
  },
  disenioInteriores: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Diseño de Interiores",
    "description":
      "Servicio de diseño de interiores integrado al proceso constructivo. Transformamos espacios con soluciones que combinan funcionalidad, estética y los mismos estándares de calidad que rigen todos nuestros proyectos.",
    "provider": { "@type": "ProfessionalService", "name": "Ourense", "url": "https://www.ourense.mx/" },
    "areaServed": { "@type": "Country", "name": "México" },
    "serviceType": "Diseño de Interiores",
  },
};

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
}
