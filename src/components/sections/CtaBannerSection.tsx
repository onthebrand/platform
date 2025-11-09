// src/components/sections/CtaBannerSection.tsx
"use client";

import React, { useContext } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PlataformaPageContext } from '@/app/plataforma/PlataformaPageContext';

const CtaBannerSection = () => {
  const context = useContext(PlataformaPageContext);

  return (
    <section className="bg-[#ffeb3b] py-16">
      {/* --- CAMBIO AQUÍ --- */}
      {/* Usamos flex-wrap y justify-center para un mejor control en todos los tamaños */}
      <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
        
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight text-gray-900">
            No es una agencia. No es un SaaS.<br />
            <span className="text-purple-600">Es lo mejor de cada una + IA.</span>
          </h2>
        </div>
        
        <div className="flex-shrink-0 flex items-center gap-6">
          <Button 
            size="lg" 
            onClick={() => context?.onOpenForm('Starter')}
            className="bg-gradient-to-r from-[#9c00ff] to-[#e91e63] text-white shadow-md hover:shadow-lg transition-shadow duration-200 px-8 py-6 text-base font-bold transform hover:scale-105"
          >
            Solicita 14 Días Gratis
          </Button>
          <a href="#precios" className="hidden sm:flex font-semibold text-gray-800 hover:text-purple-600 items-center gap-2 whitespace-nowrap">
            Ver precios <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default CtaBannerSection;