"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Target, LayoutDashboard, Check, Palette } from 'lucide-react';
import Footer from '@/components/common/Footer';
import SideForm from '@/components/common/SideForm';
import { AgenciaPageContext, IAgenciaPageContext } from './AgenciaPageContext';
import AgenciaSubNav from '@/components/common/AgenciaSubNav';
import { useHeaderVisibility } from '@/components/common/useHeaderVisibility';

const plans = [
  {
    name: "Plan Start",
    price: "$190.000",
    setupFee: "$100.000 + IVA (pago único)",
    description: "Ideal para Microempresas.",
    features: [
      "1 campaña (Google Search o Performance Max)",
      "Setup fee mes 1 (GTM, GA4, Ads)",
      "Optimización mensual",
      "Dashboard simple",
      "Hasta $300 USD de inversión mensual",
    ],
    cta: "Elegir Plan Start"
  },
  {
    name: "Plan Smart",
    price: "$290.000",
    setupFee: "$150.000 + IVA (pago único)",
    description: "Perfecto para PYMEs.",
    features: [
      "2 campañas (Google Search y Performance Max o Meta)",
      "Setup fee mes 1 (GTM, GA4, Ads)",
      "Optimización semanal",
      "Gráficas con IA",
      "Dashboard de resultados",
      "Hasta $1000 USD de inversión mensual",
    ],
    cta: "Comenzar Ahora",
    featured: true,
  },
  {
    name: "Plan Pro",
    price: "$490.000",
    setupFee: "$250.000 + IVA (pago único)",
    description: "Para PYMEs con inversión activa.",
    features: [
      "Google y Meta",
      "Campañas de Remarketing",
      "Setup fee mes 1 (GTM, GA4, Ads)",
      "Graficas con IA",
      "Embudo completo en Dashboard",
      "Optimización semanal",
      "Sobre $1000 USD de inversión mensual",
    ],
    cta: "Elegir Plan Pro"
  },
];

export default function AgenciaClientPage({ children }: { children: React.ReactNode }) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPlanForForm, setSelectedPlanForForm] = useState<string | null>(null);

  const handleOpenForm = (planName?: string) => {
    setSelectedPlanForForm(planName || 'Elegir plan');
    setIsFormOpen(true);
  };

  const contextValue: IAgenciaPageContext = {
    handleOpenForm,
  };

  const isHeaderVisible = useHeaderVisibility();

  useEffect(() => {
    const openForm = () => handleOpenForm();
    window.addEventListener('open-agencia-form', openForm);

    return () => {
      window.removeEventListener('open-agencia-form', openForm);
    };
  }, []);

  return (
    <AgenciaPageContext.Provider value={contextValue}>
      <header className={`w-full z-40 sticky top-16 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-16'}`}>
        <AgenciaSubNav />
      </header>
      <main className="bg-white">
        {/* --- Hero Section --- */}
        {/* The -mt-28 was to counteract the header height, but since the header is part of this component now, 
            we need to adjust the structure slightly. Let's remove the negative margin and let the header flow.
            The content will start below it. */}
        <section className="relative pt-16 md:pt-20 border-b border-gray-200 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="/video-hero-agencia.mp4"
          />
          <div className="relative container mx-auto px-4 py-24 md:py-32 text-center z-20 text-white">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Más ventas, más simple.
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8"
            >
              Planes a la medida, resultados reales. Conecta tu negocio y empieza a vender más.
            </motion.p>
            <motion.a
              href="#planes"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ffeb3b] text-gray-900 font-bold px-8 py-3 text-base shadow-lg transition-transform duration-200 hover:scale-105"
            >
              Ver Planes
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </section>

        {/* Render the actual page content passed from page.tsx */}
        {children}

        {/* --- Propuesta de Valor (Rediseñada) --- */}
        <section id="servicio" className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-bold uppercase bg-gradient-to-r from-[#e91e63] to-[#9c00ff] text-transparent bg-clip-text mb-2">
                SERVICIO
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Un método sin complejidades
              </h2>
              <p className="text-gray-600 mt-4 text-lg">
                Nos enfocamos en lo que realmente importa y aprovechamos las herramientas que hoy facilitan el marketing.
              </p>
            </div>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.15 }}
            >
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white p-8 rounded-xl shadow-md border border-transparent transition-all duration-300 hover:shadow-lg hover:border-cyan-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-cyan-100 text-cyan-600"><Zap className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Setup Rápido <span className="text-sm font-semibold text-[#e91e63] block mt-1">PLUG & PLAY</span></h3>
                <p className="text-gray-600">Onboarding digital y marcación de sitio en tiempo récord para que empieces a vender cuanto antes.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white p-8 rounded-xl shadow-md border border-transparent transition-all duration-300 hover:shadow-lg hover:border-purple-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-purple-100 text-purple-600"><Target className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Performance <span className="text-sm font-semibold text-[#e91e63] block mt-1">FOCO EN VENTAS</span></h3>
                <p className="text-gray-600">Campañas en Meta y Google Ads optimizadas para ROI, no para métricas de vanidad.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white p-8 rounded-xl shadow-md border border-transparent transition-all duration-300 hover:shadow-lg hover:border-yellow-200"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-yellow-100 text-yellow-600"><Palette className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Diseño <span className="text-sm font-semibold text-[#e91e63] block mt-1">POTENCIADO POR IA</span></h3>
                <p className="text-gray-600">Las mejores herramientas con inteligencia artificial para simplicar el proceso de diseño.</p>
              </motion.div>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                className="bg-white p-8 rounded-xl shadow-md border border-transparent transition-all duration-300 hover:shadow-lg hover:border-gray-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-gray-100 text-gray-700"><LayoutDashboard className="w-6 h-6" /></div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Transparencia Total <span className="text-sm font-semibold text-[#e91e63] block mt-1">REPORTING</span></h3>
                <p className="text-gray-600">Un dashboard simple con las métricas que importan: ventas y costo por venta.</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* --- Planes --- */}
        <section id="planes" className="bg-[#ffeb3b] py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Planes a tu medida</h2>
              <p className="text-gray-700 mt-4 text-lg">Sin comisiones, sin contratos anuales, sin sorpresas.</p>
            </div>
            <div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-4xl mx-auto items-end justify-center"
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  animate={{
                    scale: hoveredPlan === plan.name ? 1.05 : 1,
                  }}
                  onMouseEnter={() => setHoveredPlan(plan.name)}
                  className={`flex flex-col rounded-xl p-6 border text-gray-900 transition-all duration-300 ${plan.featured ? 'bg-white shadow-2xl border-purple-500 ring-2 ring-purple-200' : 'bg-white shadow-lg'}`}
                >
                  {plan.featured && <div className="text-center mb-4"><span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">MÁS POPULAR</span></div>}
                  <h3 className="text-2xl font-bold text-center">{plan.name}</h3>
                  <p className="text-gray-500 text-center mt-2 h-10">{plan.description}</p>
                  <div className="text-center my-6">
                    <div>
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.price.startsWith('$') && <span className="text-gray-500"> CLP/mes + IVA</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{plan.setupFee}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-4 h-4 text-cyan-500 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700 text-left">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <button onClick={() => handleOpenForm(plan.name)} className={`w-full inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-6 ${plan.featured ? 'bg-[#e91e63] text-white font-bold hover:bg-pink-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                      {hoveredPlan ? (hoveredPlan === plan.name ? 'Comenzar Ahora' : `Elegir ${plan.name}`) : plan.cta}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Footer CTA y Footer fusionados --- */}
        <footer id="contacto" className="bg-[#e91e63] pt-16 md:pt-20 pb-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm font-bold uppercase text-[#ffeb3b] mb-2">
              ESTÁS A UN CLIC
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Comienza ahora <br /> a vender simple
            </h2>
            <button
              onClick={() => handleOpenForm()}
              className="mt-8 inline-flex items-center justify-center rounded-md text-base font-bold px-8 py-3 bg-[#ffeb3b] text-gray-900 shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-yellow-300"
            >
              ¡Vamos!
            </button>
            <div className="mt-20 md:mt-24 text-white">
              <Footer />
            </div>
          </div>
        </footer>

        {/* --- Formulario Deslizable --- */}
        <SideForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} selectedPlan={selectedPlanForForm} plans={plans.map(p => p.name)} />

      </main>
    </AgenciaPageContext.Provider>
  );
}