

// src/components/common/ConsultoraSubNav.tsx
"use client";



import { useState, useEffect } from "react";

import Link from 'next/link';

import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import BrandLogo from '@/components/common/BrandLogo';

import { useHeaderVisibility } from "./useHeaderVisibility";



const ConsultoraSubNav = () => {
  const [activeSection, setActiveSection] = useState('');
  const isHeaderVisible = useHeaderVisibility();
  const isScrolled = !isHeaderVisible;



  useEffect(() => {
    const handleScroll = () => {

      const headerHeight = 64; // Altura del GlobalHeader

      const subNavHeight = 56; // Altura del SubNav

      const offset = headerHeight + subNavHeight + 10; // Offset total dinámico



      // Lógica para resaltar la sección activa

      const sections = ['propuesta', 'somos', 'servicios', 'industrias', 'contacto']; // Nuevo orden de la página

      let currentSection = '';

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          if (window.scrollY >= section.offsetTop - offset) {
            currentSection = sectionId;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);





  const navLinks = [
    { id: "propuesta", href: "/consultora#propuesta", label: "Propuesta" },
    { id: "somos", href: "/consultora#somos", label: "Somos" },
    { id: "servicios", href: "/consultora#servicios", label: "Soluciones" },
    { id: "industrias", href: "/consultora#industrias", label: "Industrias" },
  ];





  return (
    <nav className="hidden md:block w-full border-b border-gray-200 bg-white h-14">
      {/* Este nav ya no necesita ser 'sticky' por sí mismo,
          el <header> padre en el layout se encarga de eso.
      */}

      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <div className="flex items-center justify-start">

          {/* Contenedor del Logo (aparece al hacer scroll) y empuja el menú */}

          <motion.div
            className="flex-shrink-0 overflow-hidden"
            animate={{ opacity: isScrolled ? 1 : 0, width: isScrolled ? 150 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Link href="/consultora" aria-label="Volver al inicio de Consultora">
              <BrandLogo logoSize="text-xl" circleSize="w-3 h-3" subtitle="consultores" />
            </Link>
          </motion.div>



          {/* Contenedor de los enlaces de navegación */}

          <motion.div
            className="flex space-x-6 text-sm"
            animate={{ paddingLeft: isScrolled ? "24px" : "0px" }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >

            {navLinks.map(link => (

              <a
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  activeSection === link.id
                    ? 'text-cyan-500 font-semibold'
                    : 'text-gray-600 hover:text-cyan-500 font-medium'
                }`}
              >

                {link.label}

              </a>

            ))}

          </motion.div>

        </div>



        <div className="hidden md:block">
          <Button asChild className="rounded-full bg-[#9c00ff] hover:bg-[#8a00e0] text-white font-bold transition-colors">
            <Link href="/consultora#contacto" className={activeSection === 'contacto' ? 'ring-2 ring-offset-2 ring-cyan-400' : ''}>

              Conversemos

            </Link>
          </Button>
        </div>

      </div>

    </nav>
  );
};



export default ConsultoraSubNav;