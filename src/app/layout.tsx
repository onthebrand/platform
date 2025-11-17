// src/app/layout.tsx
import './globals.css';
import GlobalHeader from '@/components/common/GlobalHeader';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: {
    template: '%s | Onthebrand',
    default: 'Onthebrand | Soluciones de Marketing: Consultoría, Agencia y Plataforma IA',
  },
  description: 'Onthebrand ofrece soluciones de marketing para empresas en Chile, incluyendo consultoría estratégica, una agencia de performance y una plataforma de Ai-Commerce. Ayudamos a la alta dirección a transformar datos en crecimiento.',
  keywords: ['marketing digital', 'consultoría de marketing', 'agencia de marketing', 'growth marketing', 'chile', 'santiago', 'plataforma ia'],
  authors: [{ name: 'Onthebrand' }],
  creator: 'Onthebrand',
  publisher: 'Onthebrand',
  openGraph: {
    title: 'Onthebrand | Soluciones de Marketing',
    description: 'Marketing como Estrategia de Negocio.',
    url: 'https://www.onthebrand.cl',
    siteName: 'Onthebrand',
    locale: 'es_CL',
    type: 'website',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={poppins.className}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Onthebrand",
            "url": "https://www.onthebrand.cl",
            "logo": "https://www.onthebrand.cl/logo-onthebrand.png", // Debes crear y subir este logo
            "description": "Onthebrand es una consultora de marketing que ofrece soluciones de negocio a través de la estrategia, el análisis de datos y la tecnología. Con sede en Santiago, Chile, nos especializamos en ayudar a la alta dirección a tomar decisiones de marketing informadas.",
            "founder": {
              "@type": "Person",
              "name": "Omar Mora"
            },
            "foundingDate": "2018",
            "sameAs": [
              "https://www.linkedin.com/company/onthebrand/",
              "https://www.youtube.com/@onthebrand"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "email": "omar@onthebrand.cl"
            },
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Santiago",
              "addressCountry": "CL"
            }
          }) }}
        />
      </head>
      <body>
        <GlobalHeader navLinks={[{ name: 'Somos', href: '/agencia#somos' }, { name: 'Servicio', href: '/agencia#servicio' }, { name: 'Partners', href: '/agencia#partners' }]}/>
        {children}
      </body>
    </html>
  );
}