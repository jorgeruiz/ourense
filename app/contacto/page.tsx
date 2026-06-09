import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contacta a Ourense para solicitar una cotización de construcción en Ciudad de México. Teléfono: +52 (55) 9354 2263. Email: infoorg@oocsourense.com.mx.",
  alternates: {
    canonical: "https://www.ourense.mx/contacto",
    languages: { es: "https://www.ourense.mx/contacto", en: "https://www.ourense.mx/en/contact" },
  },
  robots: { index: true, follow: true },
};

export default function ContactoPage() {
  return (
    <div className="bg-[#0A0A0A] min-h-[100dvh]">
      <div className="max-w-[1400px] mx-auto px-6 xl:px-20 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <div>
          <h1
            className="text-white font-montserrat font-700 leading-none tracking-[-0.03em] mb-8"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)" }}
          >
            Solicita tu
            <br />
            <span className="text-[#A80110]">cotización</span>
          </h1>
          <p className="text-[#999999] text-base leading-relaxed mb-10 max-w-[440px]">
            Cuéntanos qué proyecto tienes en mente. Te respondemos en menos de 24 horas con una
            propuesta inicial.
          </p>

          {/* Datos de contacto en texto plano — AEO */}
          <address className="not-italic flex flex-col gap-5">
            <div>
              <p className="text-[#555555] text-xs uppercase tracking-[0.12em] mb-1">Teléfono</p>
              <a
                href="tel:+525593542263"
                className="text-white text-lg font-500 hover:text-[#A80110] transition-colors duration-200"
              >
                +52 (55) 9354 2263
              </a>
            </div>
            <div>
              <p className="text-[#555555] text-xs uppercase tracking-[0.12em] mb-1">Email</p>
              <a
                href="mailto:infoorg@oocsourense.com.mx"
                className="text-white text-base hover:text-[#A80110] transition-colors duration-200"
              >
                infoorg@oocsourense.com.mx
              </a>
            </div>
            <div>
              <p className="text-[#555555] text-xs uppercase tracking-[0.12em] mb-1">Dirección</p>
              <p className="text-[#999999] text-sm leading-relaxed">
                Av. Insurgentes Sur 1748-501
                <br />
                Col. Florida, Álvaro Obregón
                <br />
                Ciudad de México, C.P. 01030
              </p>
            </div>
            <div>
              <p className="text-[#555555] text-xs uppercase tracking-[0.12em] mb-1">LinkedIn</p>
              <a
                href="https://www.linkedin.com/company/organización-ourense/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#999999] text-sm hover:text-white transition-colors duration-200"
              >
                Organización Ourense
              </a>
            </div>
          </address>
        </div>

        {/* Formulario */}
        <ContactForm />
      </div>

      {/* Imagen de fondo inferior */}
      <div className="relative w-full h-64 mt-8">
        <Image
          src="/images/contact-bg.webp"
          alt="Obra de construcción nocturna con iluminación de trabajo, sección contacto Ourense"
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
      </div>
    </div>
  );
}
