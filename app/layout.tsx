import type { Metadata } from "next";
import { Montserrat, Monoton } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { JsonLd } from "@/components/ui/JsonLd";
import {
  professionalServiceSchema,
  webSiteSchema,
  localBusinessSchema,
} from "@/lib/schemas";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans-base",
  display: "swap",
});

const monoton = Monoton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display-base",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ourense.mx"),
  title: {
    default: "Ourense | Constructora en Ciudad de México",
    template: "%s | Ourense",
  },
  description:
    "Empresa constructora con más de 10 años de experiencia en Ciudad de México. Especializada en construcción integral, movimiento de tierras, colados y precolados, ingenierías, interiorismo y renta de maquinaria.",
  keywords: [
    "constructora en Ciudad de México",
    "empresa constructora CDMX",
    "constructoras en México",
    "servicios de construcción integral",
    "movimiento de tierras México",
    "colados y precolados",
    "renta de maquinaria construcción",
    "interiorismo corporativo CDMX",
  ],
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://www.ourense.mx",
    siteName: "Ourense",
    title: "Ourense | Constructora en Ciudad de México",
    description:
      "Constructora mexicana con más de 10 años de experiencia. Planeación estratégica y supervisión continua en cada proyecto.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Ourense — Constructora en Ciudad de México",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ourense | Constructora en Ciudad de México",
    description:
      "Constructora mexicana con más de 10 años de experiencia. Planeación estratégica y supervisión continua.",
    images: ["/og-default.jpg"],
  },
  alternates: {
    canonical: "https://www.ourense.mx",
    languages: {
      es: "https://www.ourense.mx",
      en: "https://www.ourense.mx/en",
      "x-default": "https://www.ourense.mx",
    },
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${montserrat.variable} ${monoton.variable}`} suppressHydrationWarning>
      <head>
        <JsonLd data={professionalServiceSchema} />
        <JsonLd data={webSiteSchema} />
        <JsonLd data={localBusinessSchema} />
      </head>
      <body className="has-grain">
        <SmoothScrollProvider>
          <CustomCursor />
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
