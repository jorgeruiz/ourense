import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, empresa, email, telefono, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    // TODO: Conectar con Resend para envío real de email
    // Ejemplo:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "web@ourense.mx",
    //   to: "infoorg@oocsourense.com.mx",
    //   subject: `Nueva cotización de ${nombre}`,
    //   text: `Nombre: ${nombre}\nEmpresa: ${empresa}\nEmail: ${email}\nTeléfono: ${telefono}\n\n${mensaje}`,
    // });

    console.log("Nuevo contacto:", { nombre, empresa, email, telefono, mensaje });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
