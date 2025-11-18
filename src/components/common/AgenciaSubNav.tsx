"use client";

import { useState, useEffect, useContext } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";
import { motion } from "framer-motion";
import BrandLogo from '@/components/common/BrandLogo';

const navLinks = [
  { id: "somos", href: "/agencia#somos", label: "Quiénes somos" },
  { id: "porque-onthebrand", href: "/agencia#porque-onthebrand", label: "Por qué nosotros" },
  { id: "que-hacemos", href: "/agencia#que-hacemos", label: "Qué hacemos" },
  { id: "proceso", href: "/agencia#proceso", label: "Cómo lo hacemos" },
  { id: "precios", href: "/agencia#precios", label: "Cuánto cuesta" },
];

const AgenciaSubNav = () => {
  const isHeaderVisible = useHeaderVisibility();
  const isScrolled = !isHeaderVisible;
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = 64; // GlobalHeader
      const subNavHeight = 48; // This SubNav
      const offset = headerHeight + subNavHeight + 20;

      const sections = navLinks.map(link => link.id);
      let currentSection = '';

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section && window.scrollY >= section.offsetTop - offset) {
          currentSection = sectionId;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="hidden md:block w-full border-b border-gray-200 bg-white"
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-14">
                <div className="flex items-center justify-start flex-grow">
          <motion.div
            className="flex-shrink-0 overflow-hidden"
            animate={{ opacity: isScrolled ? 1 : 0, width: isScrolled ? 150 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <Link href="/agencia" aria-label="Volver al inicio de Agencia">
              <BrandLogo logoSize="text-xl" circleSize="w-3 h-3" subtitle="agencia" />
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center space-x-6 text-sm"
            animate={{ paddingLeft: isScrolled ? "24px" : "0px" }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className={`transition-colors font-medium ${activeSection === link.id ? 'text-cyan-500' : 'text-gray-600 hover:text-cyan-500'}`}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        </div>

        <div className="hidden md:block">
          <Link href="#precios" passHref>
            <Button className="rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold transition-colors px-6">
              Quiero mi diagnóstico
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AgenciaSubNav;