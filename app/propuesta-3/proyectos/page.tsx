import type { Metadata } from "next";
import { SLIDES } from "../data";
import { TransitionLink } from "../components/TransitionLink";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Proyectos — Ourense Constructora",
  robots: { index: false, follow: false },
};

export default function ProyectosPage() {
  const projects = SLIDES.filter(s => s.type === "project");

  return (
    <div className="bg-[#F5F5F2] min-h-screen">

      {/* Nav (minimal, static) */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 xl:px-16"
        style={{ height: "68px" }}
      >
        <TransitionLink href="/propuesta-3" className="flex items-center gap-2.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" stroke="#A80110" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="45 14.96" />
            <circle cx="12" cy="12" r="6.5" stroke="#0A0A0A" strokeWidth="1.3" strokeLinecap="round" strokeDasharray="31 9.85" />
            <circle cx="12" cy="12" r="3.5" stroke="#0A0A0A" strokeWidth="1.0" strokeLinecap="round" strokeDasharray="17 4.98" />
          </svg>
          <span className="font-bold uppercase text-[#0A0A0A]" style={{ fontSize: "10px", letterSpacing: "0.26em" }}>Ourense</span>
        </TransitionLink>
        <TransitionLink
          href="/propuesta-3"
          className="font-bold uppercase text-[#0A0A0A]/40 hover:text-[#0A0A0A] transition-colors"
          style={{ fontSize: "10px", letterSpacing: "0.22em" }}
        >
          ← Volver
        </TransitionLink>
      </nav>

      {/* Header */}
      <div className="pt-32 pb-16 px-8 xl:px-16 border-b border-[#0A0A0A]/[0.06]">
        <p className="text-[#0A0A0A]/25 uppercase font-bold mb-5" style={{ fontSize: "9px", letterSpacing: "0.3em" }}>
          Portafolio
        </p>
        <h1
          className="font-bold text-[#0A0A0A] tracking-[-0.04em] leading-none"
          style={{ fontSize: "clamp(2.8rem, 7vw, 96px)" }}
        >
          Todos los proyectos
        </h1>
      </div>

      {/* Grid */}
      <section className="px-8 xl:px-16 py-16 xl:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#0A0A0A]/[0.06]">
          {projects.map((project, i) => (
            <TransitionLink
              key={project.id}
              href={`/propuesta-3/proyectos/${project.slug}`}
              className="group relative bg-[#F5F5F2] overflow-hidden"
            >
              {/* Image with circle-reveal on hover */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.headline.join(" ")}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                  loading={i < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(6,6,6,0.55) 0%, transparent 50%)" }}
                />
                {/* Arc overlay on hover */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{ background: "rgba(6,6,6,0.15)" }}
                >
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                    <circle cx="40" cy="40" r="30" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="145 48" />
                    <circle cx="40" cy="40" r="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="97 31" />
                    <circle cx="40" cy="40" r="10" stroke="rgba(168,1,16,0.9)" strokeWidth="1.0" strokeLinecap="round" strokeDasharray="48 13" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-6">
                  <span className="text-white/50 font-bold tabular-nums" style={{ fontSize: "9px", letterSpacing: "0.2em" }}>
                    {project.id}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="px-6 pt-6 pb-8">
                <p className="text-[#0A0A0A]/35 uppercase font-bold mb-2" style={{ fontSize: "9px", letterSpacing: "0.24em" }}>
                  {project.category} · {project.year}
                </p>
                <h2
                  className="font-bold text-[#0A0A0A] leading-[0.9] tracking-[-0.03em] group-hover:text-[#A80110] transition-colors duration-300"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 48px)" }}
                >
                  {project.headline.join(" ")}
                </h2>
                <p className="text-[#0A0A0A]/40 mt-3" style={{ fontSize: "13px" }}>
                  {project.location}
                </p>
              </div>
            </TransitionLink>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0A0A0A]/[0.06] px-8 xl:px-16 py-8 flex items-center justify-between">
        <p className="text-[#0A0A0A]/25" style={{ fontSize: "11px" }}>Ourense — Constructora en Ciudad de México</p>
        <TransitionLink href="/contacto" className="font-bold uppercase text-[#A80110] hover:text-[#8a010d] transition-colors" style={{ fontSize: "10px", letterSpacing: "0.22em" }}>
          Solicitar cotización →
        </TransitionLink>
      </footer>
    </div>
  );
}
