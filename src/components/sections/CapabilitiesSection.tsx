// src/components/sections/CapabilitiesSection.tsx
"use client";

import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, Palette, DollarSign, MessageSquare, ShieldCheck, Zap, Lightbulb } from "lucide-react";

// --- CORRECCIÓN AQUÍ ---
// Definimos una 'interface' para especificar los tipos de las props
// en lugar de usar el tipo genérico 'any'.
interface CapabilityCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon: React.ElementType;
}

// Y la aplicamos al componente.
const CapabilityCard = ({ title, children, className, icon: Icon }: CapabilityCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className={`bg-[#1e2938] rounded-xl border border-white/10 flex flex-col h-full overflow-hidden transition-all duration-300 hover:scale-105 hover:border-pink-400/80 hover:shadow-xl hover:shadow-pink-500/10 ${className}`}
        >
            <div className="p-4 flex flex-col flex-grow">
                {Icon && (
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                        <Icon className="w-5 h-5 text-pink-400 mb-3" />
                    </motion.div>
                )}
                <h3 className="font-bold text-base text-white mb-2">{title}</h3>
                <div className="text-xs text-gray-300 flex flex-col flex-grow">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

const CapabilitiesSection = () => {
    return (
        <section id="capacidades" className="bg-[#e91e63] text-white py-20 md:py-28">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="font-semibold text-[#ffeb3b]">Entregables Estratégicos</p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mt-2">
                        Capacidades Clave de la Plataforma
                    </h2>
                </div>
                
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
                        
                        <div className="lg:col-span-2">
                            <CapabilityCard title="Inteligencia de Negocio" icon={Lightbulb}>
                                <h4 className='font-semibold text-white/90 mb-1'>Estrategia Basada en Data Comercial</h4>
                                <p>Análisis de top-sellers, AOV, patrones de compra conjunta, LTV, productos con sobre stock y más.</p>
                                <div className="mt-auto pt-4">
                                    <Image src="/dashboard-vision.png" alt="Dashboard de Visión General" width={800} height={400} className="w-full h-auto rounded-md opacity-70"/>
                                </div>
                            </CapabilityCard>
                        </div>
                        
                        <div className="lg:row-span-2">
                            <CapabilityCard title="Segmentación" icon={Users}>
                                <h4 className='font-semibold text-white/90 mb-1'>Audiencias Dinámicas</h4>
                                <p>Creación y actualización automática de segmentos por RFM, categorizados como Clientes VIP, Recurrentes, En Riesgo y Compradores por Categoría.</p>
                                <div className="relative mt-4 flex-grow rounded-md overflow-hidden">
                                    <Image src="/segmentacion.png" alt="Segmentación de audiencias" fill className="object-cover opacity-70"/>
                                </div>
                            </CapabilityCard>
                        </div>

                        <div className="lg:row-span-2">
                            <CapabilityCard title="Automatización" icon={Zap}>
                                <h4 className='font-semibold text-white/90 mb-1'>Triggers Inteligentes</h4>
                                <p>Acciones automáticas basadas en eventos de la tienda como "Nuevo Producto" o "Back in Stock".</p>
                                <div className="relative mt-4 flex-grow rounded-md overflow-hidden">
                                    <Image src="/automatizacion.png" alt="Automatización" fill className="object-cover opacity-70"/>
                                </div>
                            </CapabilityCard>
                        </div>

                        <div>
                            <CapabilityCard title="Estrategia" icon={Calendar}>
                                <h4 className='font-semibold text-white/90 mb-1'>Plan de Marketing y Medios</h4>
                                <p>Una hoja de ruta detallada con 12 meses de acciones tácticas según tu calendario retail, presupuestos sugeridos acorde a la realidad de tu negocio, y estimaciones de resultados.</p>
                                <div className="relative mt-4 flex-grow rounded-md overflow-hidden">
                                    <Image 
                                        src="/marketing-plan.jpg" 
                                        alt="Plan de Marketing" 
                                        fill className="object-cover opacity-60"
                                    />
                                </div>
                            </CapabilityCard>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-2 bg-[#1e2938] rounded-xl border border-white/10 flex h-full overflow-hidden p-4 transition-all duration-300 hover:scale-105 hover:border-pink-400/80 hover:shadow-xl hover:shadow-pink-500/10"
                        >
                            <div className="w-2/5 pr-2 flex flex-col justify-center flex-shrink-0">
                                <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                                    <Palette className="w-5 h-5 text-pink-400 mb-3" />
                                </motion.div>
                                <h3 className="font-bold text-base text-white mb-2">Anuncios</h3>
                                <div className="text-xs text-gray-300">
                                    <h4 className='font-semibold text-white/90 mb-1'>Creatividades a Escala</h4>
                                    <p>Sincronización de catálogos y generación de creatividades mediante APIs de diseño.</p>
                                </div>
                            </div>
                            <div className="w-3/5 relative flex-shrink-0">
                                <Image
                                    src="/contenido.jpg"
                                    alt="Creatividades a Escala"
                                    fill
                                    className="object-cover rounded-md"
                                />
                            </div>
                        </motion.div>

                        <div>
                            <CapabilityCard title="Reporting" icon={DollarSign}>
                                <h4 className='font-semibold text-white/90 mb-1'>Rentabilidad Real</h4>
                                <p>Un dashboard unificado que muestra ROAS real, con la posibilidad de optimizar por margen de beneficio.</p>
                                <div className="relative mt-4 flex-grow rounded-md overflow-hidden">
                                    <Image src="/roas.png" alt="Rentabilidad Real" fill className="object-cover opacity-50"/>
                                </div>
                            </CapabilityCard>
                        </div>
                        
                        <div>
                            <CapabilityCard title="Seguridad" icon={ShieldCheck}>
                                 <h4 className='font-semibold text-white/90 mb-1'>Privacidad de Datos</h4>
                                 <p>Conexiones seguras machine to machine vía APIs oficiales, datos encriptados y Acuerdos de Confidencialidad (NDA).</p>
                                 <div className="relative mt-4 flex-grow rounded-md overflow-hidden">
                                     <Image src="/seguridad.avif" alt="Seguridad de Datos" fill className="object-cover opacity-70"/>
                                 </div>
                            </CapabilityCard>
                        </div>
                        
                        <div>
                            <CapabilityCard title="Chat AI" icon={MessageSquare}>
                                <h4 className='font-semibold text-white/90 mb-1'>Que los datos hablen</h4>
                                <p>Tendrá disponible en tu plataforma un chat AI para que converses con los datos de tu negocio. ¿Tienes preguntas sobre tu stock? ¿Necesitas comparar el ROAS de tus campas CYBER? La IA te da la respuesta.</p>
                                <div className="relative mt-4 flex-grow rounded-md overflow-hidden">
                                    <Image
                                        src="/chat-ai.webp"
                                        alt="Chat AI"
                                        fill
                                        className="object-cover opacity-70"
                                    />
                                </div>
                            </CapabilityCard>
                        </div>

                    </div>
                </div>

                {/* --- Bloque de texto final con el tamaño y salto de línea corregidos --- */}
                <p className="text-center text-3xl font-normal text-white mt-20 leading-tight">
                    Todo supervisado por un <span className="font-bold">Marketing Manager</span><br/>
                    a cargo de tu cuenta.
                </p>
             </div>
        </section>
    );
};

export default CapabilitiesSection;