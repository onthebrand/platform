// src/app/consultora/page.tsx

import React from "react";
import type { Metadata } from 'next';
import ConsultoraClientPage from "./ConsultoraClientPage";


export const metadata: Metadata = {
  title: 'Consultoría de Marketing Estratégico',
  description: 'Asesoramiento objetivo y especializado para la alta dirección. Definimos la estrategia de crecimiento y entregamos una hoja de ruta para que los equipos internos y agencias la ejecuten.',
};

export default function ConsultoraPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Consultoría de Marketing Estratégico",
    "provider": { "@type": "Organization", "name": "Onthebrand" },
    "areaServed": { "@type": "Country", "name": "CL" },
    "description": "Asesoramiento objetivo y especializado para la alta dirección. Definimos la estrategia de crecimiento y entregamos una hoja de ruta para que los equipos internos y agencias la ejecuten.",
    "name": "Consultoría de Marketing como Estrategia de Negocio"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [{ "@type": "Question", "name": "¿Qué diferencia a Onthebrand de una agencia de marketing tradicional?", "acceptedAnswer": { "@type": "Answer", "text": "Nuestra propuesta de valor se centra en la estrategia y la inteligencia de marketing, no en la ejecución masiva. Actuamos como asesores objetivos para la alta dirección, sin los sesgos que puede tener una agencia que también ejecuta las campañas." } }, { "@type": "Question", "name": "¿Con qué tipo de industrias trabajan?", "acceptedAnswer": { "@type": "Answer", "text": "Tenemos amplia experiencia en múltiples industrias, incluyendo Banca, Finanzas y Seguros, Retail y Consumo Masivo, Alimentos y Bebidas, Automotriz y Transporte, entre otras. Nuestro enfoque estratégico es adaptable a los desafíos de cada sector." } }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ConsultoraClientPage />
    </>
  );
}