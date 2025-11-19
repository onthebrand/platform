"use server";

import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs/promises';

interface DiagnosisFormData {
  name: string;
  email: string;
  company: string;
  company_size: string;
  industry: string;
  otherIndustry?: string;
  competitors: string[];
  assets: string[];
  database: string;
  database_size: string;
  website: string;
  ecommerce: string;
  businessModel: string;
  calculatedPrice: number;
}

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

async function sendAdminNotification(data: DiagnosisFormData) {
  try {
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Cotizador Onthebrand" <${process.env.SMTP_EMAIL}>`,
      to: 'omar@onthebrand.cl',
      subject: `Nueva Cotización de Diagnóstico: ${data.company}`,
      html: `<h1>Nueva Cotización de Diagnóstico</h1><pre>${JSON.stringify(data, null, 2)}</pre>`,
    });
    console.log('Correo de notificación para admin enviado exitosamente.');
  } catch (error) {
    console.error('FALLO: El envío del correo de notificación para admin falló.', error);
  }
}

async function sendUserConfirmation(data: DiagnosisFormData) {
  try {
    const logoPath = path.resolve(process.cwd(), 'public', 'logo-white.png');
    const logoBuffer = await fs.readFile(logoPath);

    const transporter = createTransporter();
    const formattedPrice = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(data.calculatedPrice);

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden;">
        <div style="background-color: #111827; padding: 20px; text-align: center;">
          <img src="cid:onthebrandlogo" alt="Onthebrand Logo" style="height: 100px; width: auto; margin: auto;">
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #333;">Hola ${data.name},</h2>
          <p>Gracias por utilizar nuestro cotizador. Hemos recibido tu solicitud para un diagnóstico digital para <strong>${data.company}</strong>.</p>
          <p>El valor estimado para el diagnóstico, basado en la información que nos proporcionaste, es de:</p>
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; border-radius: 8px; margin: 25px 0;">
            <p style="font-size: 28px; font-weight: bold; color: #9c00ff; margin: 0;">${formattedPrice} + IVA</p>
          </div>
          <h3 style="color: #444; font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">Este valor incluye:</h3>
          <ul style="font-size: 14px; color: #555; list-style-type: none; padding-left: 0;">
            <li style="padding: 5px 0;">✔️ Semáforo de evaluación general y por canal.</li>
            <li style="padding: 5px 0;">✔️ Análisis y auditoría técnica completa.</li>
            <li style="padding: 5px 0;">✔️ Análisis de contenidos y anuncios.</li>
            <li style="padding: 5px 0;">✔️ Informe en detalle del estado de los canales digitales.</li>
            <li style="padding: 5px 0;">✔️ Análisis Competitivo (Benchmarking)</li>
            <li style="padding: 5px 0;">✔️ Análisis de Mercado</li>
            <li style="padding: 5px 0;">✔️ Espacios de mejora, hallazgos y oportunidades.</li>
            <li style="padding: 5px 0;">✔️ Reunión de presentación de resultados.</li>
          </ul>
          <p style="font-size: 12px; color: #777; margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee;">
            <i>El valor final puede variar y será confirmado en la propuesta comercial. Cuentas, accesos y data comercial, proporcionada por el cliente.</i>
          </p>
          <p>Muy pronto, uno de nuestros directores se pondrá en contacto contigo al correo <strong>${data.email}</strong> para conversar sobre los próximos pasos.</p>
          <p>¡Que tengas un excelente día!</p>
          <p><strong>El equipo de Onthebrand</strong></p>
        </div>
        <div style="background-color: #333; color: #aaa; padding: 15px; text-align: center; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Onthebrand Inc. Todos los derechos reservados.</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Onthebrand" <${process.env.SMTP_EMAIL}>`,
      to: data.email,
      subject: `Tu cotización de Diagnóstico Digital de Onthebrand`,
      html: emailHtml,
      attachments: [
        {
          filename: 'logo-white.png',
          content: logoBuffer,
          cid: 'onthebrandlogo' // Este es el Content-ID que usamos en el src de la imagen
        }
      ]
    });
    console.log('Correo de confirmación para usuario enviado exitosamente.');
  } catch (error) {
    console.error('FALLO: El envío del correo de confirmación para usuario falló.', error);
  }
}

export async function submitDiagnosisForm(data: DiagnosisFormData) {
  try {
    // Ejecutamos ambos envíos de correo en paralelo y esperamos a que ambos terminen.
    // Esto es crucial en un entorno serverless para asegurar que la ejecución no se corte.
    await Promise.all([
      sendAdminNotification(data),
      sendUserConfirmation(data)
    ]);

    return { success: true };

  } catch (error) {
    console.error('Error inesperado en submitDiagnosisForm:', error);
    return { success: false, error: 'Hubo un error al iniciar el proceso de envío.' };
  }
}