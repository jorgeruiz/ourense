import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre construcción, movimiento de tierras, ingeniería estructural e interiorismo en México. Ourense comparte conocimiento técnico del sector.",
  alternates: {
    canonical: "https://www.ourense.mx/blog",
    languages: { es: "https://www.ourense.mx/blog", en: "https://www.ourense.mx/en/blog" },
  },
};

const SUGGESTED_POSTS = [
  { title: "¿Qué incluye un proyecto de construcción integral?", category: "Construcción" },
  { title: "Diferencias entre colados en sitio y elementos precolados", category: "Colados" },
  { title: "Cómo planear un proyecto de movimiento de tierras", category: "Movimiento de Tierras" },
  { title: "Por qué el interiorismo corporativo impacta la productividad", category: "Interiorismo" },
  { title: "Qué preguntar antes de contratar una constructora en México", category: "Guía" },
  { title: "Supervisión de obra: qué es y por qué define el éxito del proyecto", category: "Ingenierías" },
];

export default function BlogPage() {
  return (
    <div className="bg-[#0A0A0A]">
      <section className="pt-32 pb-16 max-w-[1400px] mx-auto px-6 xl:px-20">
        <h1
          className="text-white font-montserrat font-700 leading-none tracking-[-0.03em] mb-6"
          style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)" }}
        >
          Blog
        </h1>
        <p className="text-[#999999] text-xl leading-relaxed max-w-[560px]">
          Conocimiento técnico del sector de la construcción en México.
        </p>
      </section>

      <section className="max-w-[1400px] mx-auto px-6 xl:px-20 pb-24">
        <div className="border-t border-white/8">
          {SUGGESTED_POSTS.map((p, i) => (
            <div
              key={i}
              className="group flex items-center justify-between gap-8 py-8 border-b border-white/8 cursor-default"
            >
              <div>
                <p className="text-[#A80110] text-xs uppercase tracking-[0.12em] font-500 mb-2">
                  {p.category}
                </p>
                <p className="text-white font-montserrat font-700 text-lg">{p.title}</p>
              </div>
              <span className="text-[#3A3A3A] text-sm uppercase tracking-[0.12em] shrink-0">
                Próximamente
              </span>
            </div>
          ))}
        </div>
        <p className="text-[#555555] text-sm mt-8">
          El blog está en producción. Estos son los primeros artículos que publicaremos.
        </p>
      </section>
    </div>
  );
}
