// src/components/sections/ServiceSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import AnalysisIcon from "@/components/icons/AnalysisIcon";
import BrainIcon from "@/components/icons/BrainIcon";
import EyeIcon from "@/components/icons/EyeIcon";
import { motion } from "framer-motion";

const ServiceSection = () => {
  return (
    <section id="servicio" className="bg-[#9c00ff] text-white py-20 md:py-28">
      <div className="container mx-auto px-4 text-center">

        <p className="font-semibold" style={{ color: '#ffeb3b' }}>
          Un sistema que no adivina, sabe.
        </p>

        <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
          Tu Nuevo Equipo de Marketing, <br /> Potenciado por IA
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-white/80 mb-16">
          Nos conectamos a tus datos comerciales, profundizamos en tu mercado, generamos paneles de Inteligencia de Clientes y analizamos tu inventario. A partir de ese profundo conocimiento creamos un Plan de Marketing personalizado, lo ejecutamos y optimizamos con IA 24/7.
        </p>

        <div className="grid md:grid-cols-3 gap-10">

          {/* Columna 1 con solo animación de elevación */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center p-6 rounded-lg"
          >
            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <AnalysisIcon className="w-14 h-14 text-[#00bcd4]" />
            </div>
            <h3 className="text-xl font-bold">Análisis 360°</h3>
            <p className="text-white/70 text-sm mt-2">
              Integra tu E-commerce, tu ERP, tu CRM y tus plataformas de publicidad. Nuestra IA entiende tu negocio a fondo: qué productos se venden más y menos, con qué rentabilidad, cuáles tiene sobre stock, quiénes son tus mejores clientes y más.
            </p>
          </motion.div>

          {/* Columna 2 con solo animación de elevación */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center p-6 rounded-lg"
          >
            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <BrainIcon className="w-12 h-12 text-[#00bcd4]" />
            </div>
            <h3 className="text-xl font-bold">Estrategia y Ejecución con IA</h3>
            <p className="text-white/70 text-sm mt-2">
              Basado en tus datos, generamos un Plan de Marketing completo. Definimos audiencias, creamos los anuncios, proponemos presupuestos y lanzamos las campañas por ti.
            </p>
          </motion.div>

          {/* Columna 3 con solo animación de elevación */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="flex flex-col items-center p-6 rounded-lg"
          >
            <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mb-4">
              <EyeIcon className="w-12 h-12 text-[#00bcd4] mt-1" />
            </div>
            <h3 className="text-xl font-bold">Supervisión Humana Experta</h3>
            <p className="text-white/70 text-sm mt-2">
              Cada cuenta es supervisada por un Marketing Manager humano que valida la estrategia de la IA, aprueba los planes y te asiste para asegurar que los objetivos se cumplan.
            </p>
          </motion.div>
        </div>

        <div className="mt-16">
          <Button size="lg" className="bg-[#00bcd4] text-white hover:bg-[#00a5b8] hover:text-white px-6 md:px-8 py-6 text-sm font-bold transform hover:scale-105 transition-transform duration-200">
            Solicita tu Prueba Gratuita de 14 Días
            <CheckCircle2 className="ml-2 h-5 w-5" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default ServiceSection;