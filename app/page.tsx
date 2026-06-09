import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Differentiators } from "@/components/sections/Differentiators";
import { Services } from "@/components/sections/Services";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";

export const metadata: Metadata = {
  title: "Constructora en Ciudad de México con más de 10 años",
  description:
    "Ourense es una empresa constructora en Ciudad de México especializada en construcción integral, movimiento de tierras, ingenierías, interiorismo y renta de maquinaria. Más de 10 años de experiencia. Cobertura nacional.",
  alternates: {
    canonical: "https://www.ourense.mx",
    languages: {
      es: "https://www.ourense.mx",
      en: "https://www.ourense.mx/en",
      "x-default": "https://www.ourense.mx",
    },
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Differentiators />
      <Services />
      <PortfolioPreview />
      <FAQ />
      <CTAFinal />
    </>
  );
}
