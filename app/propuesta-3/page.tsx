import type { Metadata } from "next";
import { ProposalThreePage } from "./ProposalThreePage";

export const metadata: Metadata = {
  title: "Propuesta Visual 03 — Slider Experiencial | Ourense",
  robots: { index: false, follow: false },
};

export default function ProposalThree() {
  return <ProposalThreePage />;
}
