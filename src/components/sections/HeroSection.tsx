// src/components/sections/HeroSection.tsx

"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from 'next/image';
import { useState, useEffect } from "react";
import { X, AlignJustify } from 'lucide-react';
import BrandLogo from "@/components/common/BrandLogo";

const HeroSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);

      const sections = ['servicio', 'como-funciona', 'capacidades', 'precios'];
      let currentSection = '';
      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          if (window.scrollY >= section.offsetTop - 150) {
            currentSection = sectionId;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.3 } } };
  const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } };

  return (
    <section className="w-full bg-white text-gray-900">
      <div className="h-24" />
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-white ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between transition-all duration-300 py-3">
          <BrandLogo 
            logoSize={lastScrollY > 50 ? 'text-xl' : 'text-2xl'}
            circleSize={lastScrollY > 50 ? 'w-3 h-3' : 'w-4 h-4'}
          />
          
          <div className="hidden md:flex items-center justify-center space-x-6 text-sm font-semibold">
              <a href="#servicio" className={`transition-colors ${activeSection === 'servicio' ? 'text-[#00bcd4]' : 'text-gray-600 hover:text-gray-900'}`}>Servicio</a>
              <a href="#como-funciona" className={`transition-colors ${activeSection === 'como-funciona' ? 'text-[#00bcd4]' : 'text-gray-600 hover:text-gray-900'}`}>Cómo funciona</a>
              <a href="#capacidades" className={`transition-colors ${activeSection === 'capacidades' ? 'text-[#00bcd4]' : 'text-gray-600 hover:text-gray-900'}`}>Capacidades</a>
              <a href="#precios" className={`transition-colors ${activeSection === 'precios' ? 'text-[#00bcd4]' : 'text-gray-600 hover:text-gray-900'}`}>Precios</a>
              <a href="#blog" className="text-gray-600 hover:text-gray-900">Blog</a>
          </div>

          <div className="hidden md:block">
            <Button variant="outline" className="rounded-full flex items-center gap-2 text-sm px-4 py-2">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>
            </Button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <AlignJustify />}
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4">
        {isMenuOpen && (
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="md:hidden flex flex-col items-center space-y-4 py-8 bg-gray-50 rounded-lg shadow-md mt-4"
            >
                <a href="#servicio" className="text-gray-800" onClick={() => setIsMenuOpen(false)}>Servicio</a>
                <a href="#como-funciona" className="text-gray-800" onClick={() => setIsMenuOpen(false)}>Cómo funciona</a>
                <a href="#capacidades" className="text-gray-800" onClick={() => setIsMenuOpen(false)}>Capacidades</a>
                <a href="#precios" className="text-gray-800" onClick={() => setIsMenuOpen(false)}>Precios</a>
                <a href="#blog" className="text-gray-800" onClick={() => setIsMenuOpen(false)}>Blog</a>
                <Button variant="outline" className="w-full max-w-xs">Login</Button>
            </motion.div>
        )}
        
        <motion.div 
          className="grid md:grid-cols-2 gap-12 items-center pt-10 md:pt-16 pb-20 md:pb-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight mb-6">
              Conecta tu Ecommerce <br /> 
              a un cerebro de <br />
              <span className="text-[#9c00ff]">Inteligencia Artificial</span>
            </h1>
            <p className="text-base text-muted-foreground max-w-lg mx-auto md:mx-0 mb-8">
              Gestionamos tus campañas de Marketing Digital a partir de los datos de tu negocio, combinando la estrategia y supervisión humana, con la potencia y precisión de la Inteligencia Artificial, en un servicio automatizado y on-demand.
            </p>
            <div className="flex justify-center md:justify-start">
                <Button size="lg" className="bg-gradient-to-r from-[#9c00ff] to-[#e91e63] text-white shadow-md hover:shadow-lg transition-shadow duration-200 px-8 py-6 text-base">
                  Solicita una Prueba Gratis por 14 días
                </Button>
            </div>
          </motion.div>

          {/* --- CAMBIO DE POSICIÓN AQUÍ --- */}
          <motion.div 
            variants={itemVariants} 
            className="hidden md:flex justify-center items-center relative -translate-y-16 -translate-x-10"
          >
            <video 
                src="/videos/hero-animation.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-auto max-w-lg rounded-lg"
            />
          </motion.div>
          {/* --- FIN DEL CAMBIO --- */}

        </motion.div>

        <motion.div 
          className="text-center pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }} 
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;