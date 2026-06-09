import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A0A0A] border-t border-white/8">
      {/* Datos verificables AEO — en texto plano */}
      <div className="max-w-[1400px] mx-auto px-6 xl:px-20 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Marca */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-6 group" aria-label="Ourense">
            <Image
              src="/images/logo.png"
              alt="Ourense"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="text-white font-sans font-bold text-sm uppercase tracking-[0.16em]">
              Ourense
            </span>
          </Link>
          <p className="text-[#999999] text-sm leading-relaxed max-w-[260px]">
            Constructora mexicana con más de 10 años de experiencia. Planeación estratégica y
            supervisión continua en cada proyecto.
          </p>
          <p className="text-[#555555] text-xs mt-4 uppercase tracking-[0.1em]">
            +10 años de experiencia
          </p>
        </div>

        {/* Navegación */}
        <div>
          <p className="text-[#555555] text-xs uppercase tracking-[0.14em] mb-6">Navegación</p>
          <nav aria-label="Footer" className="flex flex-col gap-3">
            {[
              { href: "/servicios", label: "Servicios" },
              { href: "/portafolio", label: "Portafolio" },
              { href: "/nosotros", label: "Nosotros" },
              { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
              { href: "/testimonios", label: "Testimonios" },
              { href: "/blog", label: "Blog" },
              { href: "/contacto", label: "Contacto" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#999999] hover:text-white text-sm transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Contacto */}
        <div>
          <p className="text-[#555555] text-xs uppercase tracking-[0.14em] mb-6">Contacto</p>
          <address className="not-italic flex flex-col gap-3">
            <p className="text-[#999999] text-sm">
              Av. Insurgentes Sur 1748-501
              <br />
              Col. Florida, Álvaro Obregón
              <br />
              Ciudad de México, C.P. 01030
            </p>
            <a
              href="tel:+525593542263"
              className="text-white text-sm hover:text-[#A80110] transition-colors duration-200"
            >
              +52 (55) 9354 2263
            </a>
            <a
              href="mailto:infoorg@oocsourense.com.mx"
              className="text-[#999999] text-sm hover:text-white transition-colors duration-200 break-all"
            >
              infoorg@oocsourense.com.mx
            </a>
            <a
              href="https://www.linkedin.com/company/organización-ourense/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#999999] text-sm hover:text-white transition-colors duration-200"
            >
              LinkedIn
            </a>
            <p className="text-[#555555] text-xs">ourense.mx</p>
          </address>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1400px] mx-auto px-6 xl:px-20 py-6 border-t border-white/8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-[#555555] text-xs">
          &copy; {year} Ourense. Todos los derechos reservados.
        </p>
        <p className="text-[#555555] text-xs">
          Ciudad de México — Cobertura nacional
        </p>
      </div>
    </footer>
  );
}
