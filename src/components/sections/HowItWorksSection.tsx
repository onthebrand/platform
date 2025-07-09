// src/components/sections/HowItWorksSection.tsx
"use client";

import BrandLogo from "@/components/common/BrandLogo";
import { Plug, Search, CheckSquare, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const FeatureStep = ({ icon: Icon, title, children }: { icon: React.ElementType, title: string, children: React.ReactNode }) => (
    <div className="flex items-start text-left gap-4">
        <div className="flex-shrink-0 bg-[#e91e63] p-3 rounded-lg mt-1">
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-gray-600 text-sm mt-1">{children}</p>
        </div>
    </div>
);

const HowItWorksSection = () => {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    // --- CORRECCIÓN AQUÍ ---
    // Añadimos 'as const' para solucionar el error de tipo, igual que en los íconos.
    const stepVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    } as const;

    const AnimatedStep = ({ children }: { children: React.ReactNode }) => (
        <motion.div
            variants={stepVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} 
        >
            {children}
        </motion.div>
    );

    return (
        <section id="como-funciona" className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold text-purple-600">Cómo funciona</p>
                        <BrandLogo className="my-4 justify-center md:justify-start" logoSize="text-3xl" circleSize="w-5 h-5"/>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">De datos a crecimiento<br/>en 4 pasos</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        
                        {isDesktop ? (
                            <AnimatedStep>
                                <FeatureStep icon={Plug} title="1. CONECTA">
                                    Vincula tus plataformas de forma simple, guiada y personalizada.
                                </FeatureStep>
                            </AnimatedStep>
                        ) : (
                            <FeatureStep icon={Plug} title="1. CONECTA">
                                Vincula tus plataformas de forma simple, guiada y personalizada.
                            </FeatureStep>
                        )}
                        
                        {isDesktop ? (
                            <AnimatedStep>
                                <FeatureStep icon={Search} title="2. ANALIZA">
                                    La IA procesa tus datos, conoce tu negocio en profundidad e identifica oportunidades.
                                </FeatureStep>
                            </AnimatedStep>
                        ) : (
                            <FeatureStep icon={Search} title="2. ANALIZA">
                                    La IA procesa tus datos, conoce tu negocio en profundidad e identifica oportunidades.
                            </FeatureStep>
                        )}

                        {isDesktop ? (
                            <AnimatedStep>
                                <FeatureStep icon={CheckSquare} title="3. APRUEBA">
                                    Revisa y aprueba con un clic el Plan de Marketing, las acciones y piezas que la IA genera para ti.
                                </FeatureStep>
                            </AnimatedStep>
                        ) : (
                            <FeatureStep icon={CheckSquare} title="3. APRUEBA">
                                    Revisa y aprueba con un clic el Plan de Marketing, las acciones y piezas que la IA genera para ti.
                            </FeatureStep>
                        )}

                        {isDesktop ? (
                            <AnimatedStep>
                                <FeatureStep icon={TrendingUp} title="4. CRECE">
                                    La plataforma ejecuta, optimiza 24/7 y te muestra los resultados en un dashboard claro.
                                </FeatureStep>
                            </AnimatedStep>
                        ) : (
                            <FeatureStep icon={TrendingUp} title="4. CRECE">
                                    La plataforma ejecuta, optimiza 24/7 y te muestra los resultados en un dashboard claro.
                            </FeatureStep>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;