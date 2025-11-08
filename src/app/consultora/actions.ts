// src/app/consultora/actions.ts
"use server";

import nodemailer from 'nodemailer';

export async function sendEmail({ subject, body }: { subject: string, body: string }) {
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
      subject: subject,
      html: body,
    });
    return { success: true };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, error: 'No se pudo enviar el mensaje.' };
  }
}