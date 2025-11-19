// src/app/page.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import HomeContactForm from '@/components/common/HomeContactForm';

const solutions = [
  {
    title: "Consultora",
    description: "Diagnosticamos tu canal online y generamos una hoja de ruta para tus equipos.",
    href: "/consultora",
    colors: "from-purple-50 via-white to-white hover:border-purple-200"
  },
  {
    title: "Agencia",
    description: "El marketing digital en simple. Sin complicaciones, sin sorpresas.",
    href: "/agencia",
    colors: "from-cyan-50 via-white to-white hover:border-cyan-200"
  },
  {
    title: "Plataforma",
    description: "Servicio 80% IA y 20% humano, que transforma tu ecommerce en un aicommerce.",
    href: "/plataforma",
    colors: "from-pink-50 via-white to-white hover:border-pink-200"
  }
];

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <main className="bg-white text-gray-900">
      {/* --- Hero & Solutions Section --- */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-32 md:py-28 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/video-hero-home.mp4"
        />

        <div className="relative z-20 w-full max-w-6xl mx-auto grid md:grid-cols-3 gap-x-6 gap-y-12 items-end">
          {/* Hero Text - Left Aligned */}
          <div className="md:col-span-3 text-left">
            <div className="max-w-xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white mt-4 [text-shadow:_0_1px_10px_rgb(0_0_0_/_0.7)]"
              >
                Soluciones de Marketing
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200 mt-2 [text-shadow:_0_1px_10px_rgb(0_0_0_/_0.7)] mb-8"
              >
                Tu tiempo, a tu negocio. El nuestro, a tu marketing.
              </motion.p>
              <motion.button
                onClick={() => setIsFormOpen(true)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="rounded-full border border-white/80 bg-white/10 backdrop-blur-sm px-6 py-2 text-base font-semibold text-white transition-colors hover:bg-white/20"
              >
                Conversemos
              </motion.button>
            </div>
          </div>

          {/* Solutions Grid */}
          <motion.div 
            className="md:col-span-3 grid md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
            }}
          >
            {solutions.map((solution) => (
              <motion.div key={solution.title} variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}>
                <Link href={solution.href} className={`group block p-8 rounded-2xl bg-white md:bg-white/80 backdrop-blur-sm border border-white/20 h-full transition-all duration-300 shadow-sm hover:shadow-lg hover:bg-white`}>
                  <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
                  <p className="text-gray-600 mt-2 min-h-[72px]">{solution.description}</p>
                  <div className="mt-6 text-purple-600 font-semibold flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-1">
                    Ver más <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* --- Footer --- */}
        <footer className="absolute bottom-0 left-0 right-0 z-20 pt-16">
          <div className="container mx-auto px-4 pb-8">
            <Footer />
          </div>
        </footer>

        <HomeContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      </section>
    </main>
  );
}
