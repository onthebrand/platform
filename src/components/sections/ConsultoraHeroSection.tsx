// src/components/sections/ConsultoraHeroSection.tsx
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ConsultoraHeroSection = () => {
  return (
    <section className="py-24 md:py-32 bg-gray-50 dark:bg-black/20">
      <div className="container mx-auto px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-semibold text-cyan-500 dark:text-cyan-400 mb-3 text-lg">CONSULTORÍA ESTRATÉGICA</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-gray-900 dark:text-white leading-tight">
            Inteligencia de Marketing <br /> para Decisiones Clave
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600 dark:text-gray-300">
            Combinamos décadas de experiencia en roles directivos con una profunda comprensión del ecosistema digital para transformar tus datos en una ventaja competitiva.
          </p>
          <div className="mt-10">
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold px-8 py-6 text-base">
              Agendar una reunión
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ConsultoraHeroSection;