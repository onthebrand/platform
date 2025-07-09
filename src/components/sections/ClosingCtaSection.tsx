import React from 'react';
import { Button } from "@/components/ui/button";
import { Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';

const ClosingCtaSection = () => {
  return (
    // Degradado: #e91e63 (arriba) a #9c00ff (abajo)
    <section className="bg-gradient-to-b from-[#e91e63] to-[#9c00ff] text-white py-20 md:py-24">
      <div className="container mx-auto px-4">

        {/* Contenido del llamado a la acción (CTA) */}
        <div className="text-center flex flex-col items-center">
          <p className="font-semibold text-gray-200">La Nueva Forma de Hacer Marketing</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mt-4 leading-tight">
            Más Certezas, Menos Dudas.<br />Más Ventas.
          </h2>
          <p className="mt-4 text-lg text-gray-200 max-w-xl">
            Súbete ahora a la era de la IA.
          </p>
          <Button
            className="mt-8 bg-white text-purple-700 font-bold hover:bg-gray-200 py-6 px-8 rounded-lg text-base"
            size="lg"
          >
            Solicita Hoy 14 Días de Prueba Gratis
          </Button>
        </div>

        {/* Barra de Footer integrada en la parte inferior de la sección */}
        <div className="mt-20 md:mt-24">
          <div className="border-t border-white/20"></div>
          <div className="flex justify-between items-center pt-6">
            <div className="flex items-center gap-x-4 md:gap-x-6">
              <span className="font-bold text-lg">●onthebrand</span>
              <p className="hidden md:block text-sm text-gray-300">
                © 2025 Onthebrand Inc. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <Link href="#" passHref>
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer">
                  <Instagram className="w-5 h-5" />
                </span>
              </Link>
              <Link href="#" passHref>
                <span className="text-white/80 hover:text-white transition-colors cursor-pointer">
                  <Youtube className="w-5 h-5" />
                </span>
              </Link>
            </div>
          </div>
          <div className="block md:hidden text-center mt-6 text-sm text-gray-300">
            <p>© 2025 Onthebrand Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCtaSection;