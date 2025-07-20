import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Tipos para los datos del pedido (puedes ajustarlos según sea necesario)
interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  detalles?: string;
}

interface ClientData {
  nombre: string;
  telefono: string;
  horario: string;
  comentarios?: string;
}

interface DeliveryAddress {
  calle?: string;
  numero?: string;
  colonia?: string;
  codigoPostal?: string;
  referencias?: string;
}

interface OrderPayload {
  carrito: CartItem[];
  datosCliente: ClientData;
  opcionEntrega: string;
  direccionEntrega?: DeliveryAddress;
  totalPedido: number;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as OrderPayload;

    const {
      carrito,
      datosCliente,
      opcionEntrega,
      direccionEntrega,
      totalPedido,
    } = payload;

    // Validar datos básicos (puedes añadir más validaciones)
    if (!carrito || carrito.length === 0 || !datosCliente || !totalPedido) {
      return NextResponse.json(
        { message: "Faltan datos del pedido." },
        { status: 400 },
      );
    }

    // Configurar el transporter de Nodemailer para SMTP personalizado
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SMTP_HOST,
      port: Number.parseInt(process.env.EMAIL_SMTP_PORT || "465", 10), // Puerto SMTP
      secure: process.env.EMAIL_SMTP_SECURE === "true", // true para 465 (SSL), false para otros puertos como 587 (TLS)
      auth: {
        user: process.env.EMAIL_SERVER_USER, // Usuario SMTP (tu dirección de correo)
        pass: process.env.EMAIL_SERVER_PASSWORD, // Contraseña SMTP
      },
      // Opcional: si tu servidor SMTP tiene un certificado autofirmado o problemas con TLS
      // tls: {
      //   rejectUnauthorized: false
      // }
    });

    // Formatear los items del carrito para el correo
    const itemsHtml = carrito
      .map(
        (item) => `
      <tr>
        <td>${item.nombre}${item.detalles ? ` (${item.detalles})` : ""}</td>
        <td style="text-align: center;">${item.cantidad}</td>
        <td style="text-align: right;">$${item.precio.toFixed(2)}</td>
        <td style="text-align: right;">$${(item.precio * item.cantidad).toFixed(2)}</td>
      </tr>
    `,
      )
      .join("");

    // Formatear la dirección de entrega si aplica
    let direccionHtml = "";
    if (opcionEntrega === "domicilio" && direccionEntrega) {
      direccionHtml = `
        <h3>Dirección de Entrega:</h3>
        <p>
          ${direccionEntrega.calle || ""} ${direccionEntrega.numero || ""}<br>
          Colonia: ${direccionEntrega.colonia || ""}<br>
          CP: ${direccionEntrega.codigoPostal || ""}<br>
          ${direccionEntrega.referencias ? `Referencias: ${direccionEntrega.referencias}<br>` : ""}
        </p>
      `;
    }

    // Contenido del correo en HTML
    const mailHtml = `
      <h1>Nuevo Pedido de Casa NALA</h1>
      <p><strong>Fecha del Pedido:</strong> ${new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" })}</p>
      
      <h2>Detalles del Cliente:</h2>
      <p><strong>Nombre:</strong> ${datosCliente.nombre}</p>
      <p><strong>Teléfono:</strong> ${datosCliente.telefono}</p>
      <p><strong>Horario de Recogida/Entrega:</strong> ${datosCliente.horario}</p>
      ${datosCliente.comentarios ? `<p><strong>Comentarios:</strong> ${datosCliente.comentarios}</p>` : ""}
      <p><strong>Opción de Entrega:</strong> ${opcionEntrega}</p>
      ${direccionHtml}

      <h2>Pedido:</h2>
      <table border="1" cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unit.</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="text-align: right;"><strong>Total del Pedido:</strong></td>
            <td style="text-align: right;"><strong>$${totalPedido.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
      <p><em>Este es un correo generado automáticamente.</em></p>
    `;

    // Opciones del correo
    const mailOptions = {
      from: `"Casa NALA Pedidos" <${process.env.EMAIL_SERVER_USER}>`,
      to: process.env.EMAIL_TO, // El correo donde se recibirán los pedidos
      subject: `Nuevo Pedido Casa NALA - ${datosCliente.nombre} - ${new Date().toLocaleDateString("es-MX")}`,
      html: mailHtml,
    };

    // Enviar el correo
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Pedido enviado por correo exitosamente." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error al enviar el pedido por correo:", error);
    // Asegúrate de no exponer detalles sensibles del error al cliente
    const errorMessage =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { message: "Error al procesar el pedido.", error: errorMessage },
      { status: 500 },
    );
  }
}
