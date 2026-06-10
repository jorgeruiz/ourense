import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SLIDES } from "../../data";
import { ProjectDetail } from "./ProjectDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SLIDES
    .filter(s => s.type === "project" && s.slug)
    .map(s => ({ slug: s.slug! }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = SLIDES.find(s => s.slug === slug);
  return {
    title: project ? `${project.headline.join(" ")} — Ourense` : "Proyecto — Ourense",
    robots: { index: false, follow: false },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = SLIDES.find(s => s.slug === slug && s.type === "project");
  if (!project) notFound();

  const others = SLIDES.filter(s => s.type === "project" && s.slug !== slug);

  return <ProjectDetail project={project} others={others} />;
}
