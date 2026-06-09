import type { Metadata } from "next";
import { ProposalPage } from "./ProposalPage";

export const metadata: Metadata = {
  title: "Propuesta Visual 02 — Versión Editorial | Ourense",
  description: "Segunda propuesta de diseño para Ourense Constructora. Estética editorial neo-brutalist, paleta blanca.",
  robots: { index: false, follow: false },
};

export default function ProposalTwoPage() {
  return <ProposalPage />;
}
