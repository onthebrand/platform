"use client";

import React, { useState, Suspense, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/common/Footer';
import { ArrowRight, Check, Search, Compass, Rocket, Users, Briefcase, TrendingUp, BarChart, MessageCircle, ShoppingCart, Activity } from 'lucide-react';
import AgenciaClientLayout from './AgenciaClientLayout';
import AgenciaHeader from './AgenciaHeader';
import TeamMemberCard from '@/components/TeamMemberCard';
import { Button } from '@/components/ui/button';
import DiagnosisCalculator from '@/components/DiagnosisCalculator';
import BrandLogo from '@/components/common/BrandLogo';

const teamMembers = [
  {
    name: "Omar Mora",
    role: "Director de Growth", // Color will be changed in TeamMemberCard.tsx
    bio: "Socio fundador de Onthebrand con +18 años de experiencia en Marketing y Publicidad, certificado en Growth Marketing en San Francisco, EEUU. Omar traduce los desafíos del negocio en estrategias de crecimiento claras y medibles.",
    imageUrl: "/omar-mora.png"
  },
  {
    name: "Sebastian Solar",
    role: "Director de Estrategia",
    bio: "Sebastián, con +18 años de experiencia en consultoras y liderando marcas líderes B2B y B2C combina data + creatividad + tecnología para generar estrategias con impacto centrado en las personas.",
    imageUrl: "/sebastian-solar.png"
  }
];

const processSteps = [ // This was named services before, renaming for clarity
  {
    id: "diagnostico",
    title: "Estudiamos tu negocio",
    description: "Sí, te vamos a pedir datos y accesos.",
    icon: <Users className="w-6 h-6" />,
    color: "text-cyan-400",
  },
  {
    id: "estrategia",
    title: "Diseñamos tu estrategia",
    description: "Foco en el impacto, no en slides.",
    icon: <Compass className="w-6 h-6" />,
    color: "text-purple-400",
  },
  {
    id: "implementacion",
    title: "Ejecutamos rápido",
    description: "Sin burocracia, sin reuniones infinitas. (Gracias IA.)",
    icon: <Rocket className="w-6 h-6" />,
    color: "text-[#e91e63]",
  },
  {
    id: "medicion",
    title: "Medimos lo que importa",
    description: "ROI, crecimiento, conversiones. No vanity metrics.",
    icon: <BarChart className="w-6 h-6" />,
    color: "text-yellow-400",
  }
];

const detailedServices = [
  {
    id: "diagnostico",
    title: "Diagnóstico",
    subtitle: "El Punto de Partida",
    icon: <Search className="w-6 h-6" />,
    description: "Realizamos una radiografía completa de tu ecosistema digital. Analizamos tu web, redes sociales, posicionamiento en buscadores, plataformas de medición, tu competencia y el mercado para identificar oportunidades basándonos en datos, no en intuiciones.",
    includes: [
      "Auditoría Técnica de Activos Digitales",
      "Análisis Competitivo (Benchmarking)",
      "Análisis de Mercado",
      "Evaluación de Canales (Social, Email, Ads)",
      "Auditoría SEO Técnica",
      "Análisis de Contenidos y Anuncios"
    ],
    result: "Un informe accionable que explica el 'qué' y el 'porqué' de tu estado actual, sentando las bases para una estrategia sólida."
  },
  {
    id: "estrategia",
    title: "Estrategia",
    subtitle: "La Hoja de Ruta",
    icon: <Compass className="w-6 h-6" />,
    description: "Con el diagnóstico en mano, diseñamos tu hoja de ruta priorizada hacia el éxito. Definimos objetivos, audiencias, mensajes clave y los canales más eficientes para tu negocio. No se trata de estar en todos lados, sino en los lugares correctos.",
    includes: [
      "Definición de Objetivos y KPIs",
      "Segmentación de Audiencia y Buyer Personas",
      "Plan de Canales (Channel Mix)",
      "Estrategia de Contenidos y Mensajes Clave",
    ],
    result: "Un blueprint estratégico que alinea al equipo y sirve como guía para cada acción de marketing futura."
  },
  {
    id: "implementacion",
    title: "Implementación",
    subtitle: "El liderazgo en la ejecución",
    icon: <Rocket className="w-6 h-6" />,
    description: "Actuamos como el eje central de tu proyecto, gestionándolo de principio a fin. Coordinamos la ejecución a través de nuestra red de partners especialistas, asegurando un resultado impecable sin que tengas que gestionar múltiples proveedores.",
    includes: [
      "Gestión Integral de Proyectos (Project Management): Somos tu único punto de contacto, centralizando toda la comunicación y supervisión.",
      "Activación y Optimización de Campañas: (SEM, Social Ads).",
      "Supervisión de Partners: (Desarrollo, SEO, etc.).",
      "Reporte de Resultados: Enfocado en el Retorno de la Inversión (ROI).",
    ],
    result: "El resultado: La tranquilidad de saber que tu estrategia es implementada por especialistas, garantizando que todo el sistema funcione cohesionado y cumpla los objetivos."
  }
];

const whatWeDo = [
  {
    title: "Paid Media que vende",
    description: "Campañas en Meta y Google que no buscan clics, buscan conversión.",
    icon: <TrendingUp className="w-8 h-8 text-cyan-500" />
  },
  {
    title: "Contenido que importa",
    description: "Historias que hacen que la gente se detenga, conecte y elija.",
    icon: <MessageCircle className="w-8 h-8 text-[#e91e63]" />
  },
  {
    title: "E-commerce que funciona",
    description: "Desarrollamos tiendas que convierten, no que “se ven bonitas”.",
    icon: <ShoppingCart className="w-8 h-8 text-purple-500" />
  },
  {
    title: "SEO & SEM que se nota",
    description: "Estrategias para que te encuentren, y para que cuando lo hagan, ya quieran comprarte.",
    icon: <Activity className="w-8 h-8 text-yellow-500" />
  },
  {
    title: "Y lo que tu marca necesite para vender más y mejor.",
    description: "",
    icon: <Briefcase className="w-8 h-8 text-gray-500" />
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export default function AgenciaPage() {
  const [activeService, setActiveService] = useState(detailedServices[0].id); // State for the detailed process section

  // State and effect for the animated process steps on mobile
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcessStep((prev) => (prev + 1) % processSteps.length);
    }, 4000); // Change step every 4 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);


  return (
    <>
      <AgenciaHeader />
      <main className="bg-gray-50">
        {/* --- Sección Hero --- */}
        <section className="relative -mt-28 pt-28 border-b border-gray-200 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
            src="/video-hero.mp4"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-fuchsia-600 to-purple-700 opacity-75 z-10"></div>
          <div className="relative container mx-auto px-4 py-48 md:py-60 text-center z-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Más ventas, menos ruido.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8"
            >
              Basta de buscar likes. <br className="md:hidden" />Encontremos más clientes.<br />Datos, estrategia y experiencia para mover la última línea.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col items-center justify-center gap-y-4 mt-10">
              <Link href="#precios" passHref>
                <Button className="rounded-lg bg-[#ffeb3b] hover:bg-yellow-300 text-black font-bold transition-colors px-8 py-6 text-lg">
                  Quiero vender más y mejor.
                </Button>
              </Link>
              <Link href="#porque-onthebrand" className="text-white/80 hover:text-white transition-colors font-medium text-sm flex items-center gap-2">
                <span>Todavía no, pero cuéntame más</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Sección Somos */}
        <section id="somos" className="py-16 px-4 bg-white">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">Quiénes somos</h2>
            <motion.div
              className="flex flex-wrap justify-center gap-12"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Sección Por qué Onthebrand */}
        <section id="porque-onthebrand" className="py-16 md:py-24 bg-gradient-to-r from-cyan-600 to-purple-700 text-white">
          <div className="container mx-auto grid md:grid-cols-2 gap-x-12 gap-y-8 items-center px-4">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold">Por qué</h2>
              <BrandLogo isWhite={true} logoSize="text-5xl" circleSize="w-7 h-7" className="md:-ml-2 inline-block"/>
            </div>
            <div className="text-lg leading-relaxed space-y-4 text-center md:text-left">
              <p>
                Porque entendemos que el marketing es estrategia ejecutada con precisión, y una hoja de ruta bien ejecutada sí marca la diferencia.
              </p>
              <p>
                Somos una extensión de tu negocio, no una agencia tradicional. Contenidos, sí. Creatividad, también. Inteligencia Artificial, mucha.  Pero el foco: en la venta. No en los likes, los clics o los leads, <span className="font-bold bg-[#ffeb3b] text-black px-2 py-1 rounded-md whitespace-nowrap">en la venta.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Sección Qué Hacemos */}
        <section id="que-hacemos" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Qué hacemos</h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Hacemos estrategia.<br className="md:hidden" /> Analizamos tu negocio y el mercado,<br/><span className="text-[#9c00ff] font-semibold">y la estrategia nos dirá qué servicios necesita tu marca.</span></p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 px-4 md:px-0">
              {whatWeDo.map((item, index) => (
                <motion.div key={index} className="bg-gray-50 p-6 md:p-8 rounded-xl border border-gray-200 hover:shadow-xl hover:border-purple-300 transition-all duration-300 transform hover:-translate-y-1">
                  {/* Contenedor Flex para alinear en móvil */}
                  <div className="flex flex-row md:flex-col items-center md:items-start gap-4">
                    <div className="flex-shrink-0 md:mb-4">{item.icon}</div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 md:mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-gray-700 mt-12 max-w-2xl mx-auto px-4">
              No lo que el directorio cree que necesita, ni lo que el community manager cree que necesita.
            </p>
            <div className="text-center mt-8">
              <Link href="#precios" passHref>
                <Button className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold transition-all duration-300 px-8 py-4 text-base hover:scale-105 hover:shadow-lg">
                  ¡Eso es lo que necesito!
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sección Proceso */}
        <section id="proceso" className="py-16 md:py-24 bg-[#111827] overflow-hidden">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Cómo lo hacemos</h2>
              <p className="text-lg text-gray-300 mt-4">
                Con <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Inteligencia Artificial</span>. Poco ruido, muchas nueces.
              </p>
            </div>
            {/* Desktop View: Grid */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step) => (
                <div key={step.id} className="text-center p-6">
                  <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 ${step.color}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Mobile View: Animated Carousel */}
            <div className="md:hidden relative h-48 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProcessStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-center p-6 absolute"
                >
                  <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 ${processSteps[activeProcessStep].color}`}>
                    {processSteps[activeProcessStep].icon}
                  </div>
                  <h3 className="text-lg font-bold text-white">{processSteps[activeProcessStep].title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{processSteps[activeProcessStep].description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* --- Nueva Sección de Acordeón --- */}
            <div className="mt-16 md:mt-24 px-4">
              <div className="max-w-3xl mx-auto flex flex-col gap-y-4">
                {detailedServices.map((service, index) => {
                  const isActive = activeService === service.id;
                  return (
                    <div key={service.id} id={service.id} className={`rounded-xl transition-all duration-300 ${isActive ? 'bg-white shadow-xl' : 'bg-white/70 hover:bg-white'}`}>
                      {/* Cabecera del Acordeón (Clickable) */}
                      <div 
                        className="p-6 cursor-pointer" 
                        onClick={() => setActiveService(isActive ? null : service.id)} // Permite abrir y cerrar
                      >
                        <div className="flex items-center gap-4">
                          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${isActive ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            {service.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900">{`0${index + 1}. ${service.title}`}</h3>
                            <p className="text-sm text-gray-500">{service.subtitle}</p>
                          </div>
                        </div>
                      </div>

                      {/* Panel de Contenido (Desplegable) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 pt-2">
                              <div className="border-t border-gray-200 pt-6">
                                <p className="text-gray-700 mb-6">{service.description}</p>
                                <h4 className="font-bold text-md mb-3 text-gray-800">Qué incluye:</h4>
                                <ul className="space-y-2 mb-6">
                                  {service.includes.map(item => (
                                    <li key={item} className="flex items-start"><Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0 mt-1" /><span className="text-gray-600 text-sm">{item}</span></li>
                                  ))}
                                </ul>
                                <div className="bg-cyan-500/10 text-cyan-800 p-4 rounded-lg"><p className="font-semibold text-sm">{service.result}</p></div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Precios */}
        <section id="precios" className="py-16 md:py-24 bg-[#ffeb3b]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 max-w-2xl mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">¿Y cuánto cuesta?</h2>
              <p className="text-lg text-gray-800 mt-4">Primero, lo primero. Donde no hay diagnóstico, no hay estrategia.</p>
              <p className="text-gray-700 mt-8">
                Completa el formulario para conocer el valor de tu diagnóstico.
              </p>
              <ArrowRight className="w-5 h-5 mx-auto mt-2 rotate-90 animate-bounce" />
            </div>
            <DiagnosisCalculator />
            <div className="text-center mt-12">
              <p className="text-gray-700 mb-4">No gracias. Prefiero comenzar con una reunión</p>
              <Link href="/agencia?contact=true" passHref>
                <Button className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold transition-all duration-300 px-8 py-4 text-base hover:scale-105 hover:shadow-lg">
                  Conversemos
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      {/* --- Footer --- */}
      <footer className="bg-[#e91e63] text-white pt-16 md:pt-24 pb-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold uppercase text-yellow-300 mb-2">
            Estás a un clic
          </p>
          <h2 className="text-4xl md:text-5xl font-bold">
            Comienza a vender<br/>como siempre lo debiste<br/>haber hecho.
          </h2>
          <Link href="#precios" passHref>
            <Button className="mt-8 rounded-lg bg-[#ffeb3b] hover:bg-yellow-300 text-black font-bold transition-colors px-10 py-6 text-xl">
              ¡Vamos!
            </Button>
          </Link>
          <div className="mt-20 md:mt-24 pt-8">
            <Footer />
          </div>
        </div>
      </footer>

      <Suspense fallback={null}>
        <AgenciaClientLayout />
      </Suspense>
    </>
  );
}