// src/components/sections/HeroSection.tsx

"use client";
import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from 'next/image';
import { PlataformaPageContext } from '@/app/plataforma/PlataformaPageContext';

const HeroSection = () => {
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.3 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } };
  const context = useContext(PlataformaPageContext);

  return (
    <>
    <section className="relative w-full bg-white text-gray-900 overflow-hidden">
      {/* Video y filtro de fondo de la sección Hero */}
      <video 
        src="/video-hero.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-yellow-500 opacity-50 z-10"></div>

      {/* El div.h-24 que compensaba el <nav> ha sido eliminado */}

      <div className="relative container mx-auto px-4 z-20 text-center">

        <motion.div 
          className="grid md:grid-cols-1 gap-12 items-center pt-24 md:pt-32 pb-20 md:pb-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight mb-6">
              Conecta tu Ecommerce a un cerebro de <br /> 
              <span className="text-white">Inteligencia Artificial</span>
            </h1>
            <p className="text-base text-gray-200 max-w-lg mx-auto mb-8">
              Gestionamos tus campañas de Marketing Digital con los datos de tu negocio, combinando estrategia humana y la precisión de la IA en un servicio on-demand.
            </p>
            <div className="flex justify-center">
              <Button 
                size="lg" 
                onClick={() => context?.onOpenForm('Starter')}
                className="bg-gradient-to-r from-[#9c00ff] to-[#e91e63] text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 px-6 py-6 text-base">
                Solicita una Prueba Gratis por 14 días
              </Button>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>

    {/* Nueva sección para los logos */}
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-semibold text-gray-900 mb-8">
          Conecta tus Plataformas de Negocio y Marketing
        </p>
        <div className="flex justify-center items-center gap-x-10 md:gap-x-14 flex-wrap">
            <Image src="/shopify-logo.svg" alt="Logo de Shopify" width={110} height={30} className="filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            <Image src="/woocommerce-logo.svg" alt="Logo de WooCommerce" width={110} height={30} className="filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            <Image src="/google-ads-logo.svg" alt="Logo de Google Ads" width={110} height={30} className="filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            <Image src="/meta-logo.svg" alt="Logo de Meta" width={90} height={30} className="filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            <Image src="/odoo-logo.svg" alt="Logo de Odoo" width={80} height={30} className="filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
            <Image src="/zoho-logo.svg" alt="Logo de Zoho" width={80} height={30} className="filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all" />
        </div>
        <p className="text-sm font-semibold text-gray-900 mt-8">Y muchas más</p>
      </div>
    </section>
    </>
  );
};

export default HeroSection;