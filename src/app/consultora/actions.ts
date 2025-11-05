// src/app/consultora/actions.ts
"use server";

import nodemailer from 'nodemailer';

export async function sendConsultoraEmail(formData: FormData) {
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');

  // Configura el transportador de nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail', // o el servicio que uses (Outlook, etc.)
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: 'omar@onthebrand.cl',
      subject: `Nuevo Mensaje de Consultoría de: ${name}`,
      html: `
        <h2>Nuevo Mensaje de Contacto - Consultoría</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error: 'No se pudo enviar el mensaje.' };
  }
}