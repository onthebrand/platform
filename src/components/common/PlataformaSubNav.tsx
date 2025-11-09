// src/components/common/PlataformaSubNav.tsx

"use client";

import { useState, useEffect } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { useHeaderVisibility } from "./useHeaderVisibility";

interface PlataformaSubNavProps {
  onLoginClick: () => void;
}

const PlataformaSubNav = ({ onLoginClick }: PlataformaSubNavProps) => {
  const [activeSection, setActiveSection] = useState('');
  const isHeaderVisible = useHeaderVisibility();
  const isScrolled = !isHeaderVisible;


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['servicio', 'como-funciona', 'capacidades', 'precios'];
      let currentSection = '';
      // El offset debe considerar la altura del subnav (aprox 60px) y el global (64px)
      const offset = 64 + 60;
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

  return (
    <nav
      className="hidden md:block w-full border-b border-gray-200 bg-white h-14"
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-full transition-all duration-300 py-3">

        <div className="flex items-center gap-x-3">
           
          <div className="flex-shrink-0 w-36">
            <AnimatePresence mode="wait">
              <motion.div
                key={isScrolled ? 'logo' : 'text'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isScrolled ? (
                  <Link href="/plataforma" aria-label="Volver al inicio de Plataforma">
                    <div className="flex items-baseline">
                      <div className="w-2.5 h-2.5 bg-[#00bcd4] rounded-full"></div>
                      <span className="text-lg font-light text-[#e91e63] tracking-tighter">
                        ai<span className="font-bold text-[#9c00ff]">commerce</span>
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-baseline">
                    <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                    <span className="text-base font-light text-black tracking-tighter">ai<span className="font-bold">commerce</span></span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-x-6">
            <a href="/plataforma#servicio" className={`transition-colors text-sm ${activeSection === 'servicio' ? 'text-[#00bcd4] font-semibold' : 'text-gray-700 hover:text-black'}`}>Servicio</a><a href="/plataforma#como-funciona" className={`transition-colors text-sm ${activeSection === 'como-funciona' ? 'text-[#00bcd4] font-semibold' : 'text-gray-700 hover:text-black'}`}>Cómo funciona</a><a href="/plataforma#capacidades" className={`transition-colors text-sm ${activeSection === 'capacidades' ? 'text-[#00bcd4] font-semibold' : 'text-gray-700 hover:text-black'}`}>Capacidades</a><a href="/plataforma#precios" className={`transition-colors text-sm ${activeSection === 'precios' ? 'text-[#00bcd4] font-semibold' : 'text-gray-700 hover:text-black'}`}>Precios</a>
          </div>
        </div>

        <div className="hidden md:block" style={{ textAlign: 'right' }}>
          <Button onClick={onLoginClick} variant="outline" className="rounded-full text-sm px-4 py-2">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75
 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
          </Button>
        </div>

      </div>
    </nav>
  );

};

export default PlataformaSubNav;