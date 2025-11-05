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
  title: 'Onthebrand',
  description: 'Marketing como Estrategia de Negocio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <GlobalHeader />
        {children}
      </body>
    </html>
  );
}