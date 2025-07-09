// src/components/sections/HowItWorksSection.tsx
"use client";

import BrandLogo from "@/components/common/BrandLogo";
import { Plug, Search, CheckSquare, TrendingUp } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// El componente para cada paso no necesita cambios, sigue siendo simple.
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
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // ===== AJUSTE DE TIMING AQUÍ =====
    // Los rangos han sido ajustados para que la animación del último paso
    // ocurra entre el 40% y el 60% del scroll.
    const opacityStep1 = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]); // Empieza y termina antes
    const opacityStep2 = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]); // Ocurre antes
    const opacityStep3 = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]); // Ocurre justo antes del último
    const opacityStep4 = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);  // Rango solicitado: 40% a 60%

    return (
        <section id="como-funciona" ref={sectionRef} className="bg-white py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    
                    <div className="text-center md:text-left">
                        <p className="text-sm font-semibold text-purple-600">Cómo funciona</p>
                        <BrandLogo className="my-4 justify-center md:justify-start" logoSize="text-3xl" circleSize="w-5 h-5"/>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">De datos a crecimiento<br/>en 4 pasos</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <motion.div style={{ opacity: opacityStep1 }}>
                            <FeatureStep icon={Plug} title="1. CONECTA">
                                Vincula tus plataformas de forma simple, guiada y personalizada.
                            </FeatureStep>
                        </motion.div>
                        <motion.div style={{ opacity: opacityStep2 }}>
                            <FeatureStep icon={Search} title="2. ANALIZA">
                                La IA procesa tus datos, conoce tu negocio en profundidad e identifica oportunidades.
                            </FeatureStep>
                        </motion.div>
                        <motion.div style={{ opacity: opacityStep3 }}>
                            <FeatureStep icon={CheckSquare} title="3. APRUEBA">
                                Revisa y aprueba con un clic el Plan de Marketing, las acciones y piezas que la IA genera para ti.
                            </FeatureStep>
                        </motion.div>
                        <motion.div style={{ opacity: opacityStep4 }}>
                            <FeatureStep icon={TrendingUp} title="4. CRECE">
                                La plataforma ejecuta, optimiza 24/7 y te muestra los resultados en un dashboard claro.
                            </FeatureStep>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;