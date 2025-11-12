"use client";
// src/app/consultora/page.tsx
// Página principal de la sección de Consultoría (v7)
// Añade validación anti-spam (pregunta matemática)

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Brain, Users, Target, LineChart, Presentation, ArrowRight, Mail, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import Image from 'next/image';
import { sendEmail } from '@/app/consultora/actions';
import Footer from '@/components/common/Footer';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

// (Los arrays 'services' e 'industries' se mantienen idénticos a la v3)
const services = [
  {
    id: "liderazgo",
    title: "Liderazgo & Gestión de Equipos",
    color: "text-purple-600",
    icon: <Users />,
    items: [
      "CMO on Demand",
      "Auditoría de ecosistema de agencias y equipos Internos",
      "Procesos de licitación",
      "Head Hunting (Marketing)"
    ],
    image: "/solutions-liderazgo.jpg"
  },
  {
    id: "data",
    title: "Data & Inteligencia",
    color: "text-red-600",
    icon: <Brain />,
    items: [
      "Customer Intelligence",
      "Revisión de marcaje y medición",
      "Marketing Mix Modeling",
      "Analítica prescriptiva",
      "Auditoría de Martech Stack"
    ],
    image: "/solutions-data.jpg"
  },
  {
    id: "estrategia",
    title: "Estrategia & Contenidos",
    color: "text-cyan-500",
    icon: <Target />,
    items: [
      "Arquitectura y Construcción de Marca",
      "Planes de Marketing",
      "Estrategias Go-to-Market",
      "Estrategia Digital y Contenidos",
      "Creatividad Publicitaria"
    ],
    image: "/solutions-estrategia.jpg"
  },
  {
    id: "growth",
    title: "Growth & Retorno",
    color: "text-yellow-500",
    icon: <LineChart />,
    items: [
      "Consultoría y Mentoría en Growth Marketing",
      "Auditoría de Canales Digitales",
      "Planificación de Medios",
      "Marketing Finance"
    ],
    image: "/solutions-growth.jpg"
  },
  {
    id: "capacitaciones",
    title: "Capacitaciones",
    color: "text-gray-700",
    icon: <Presentation />,
    items: ["Copilot para empresas"],
    image: "/solutions-capacitaciones.jpg"
  }
];

const industries = [
  {
    name: "Banca, Finanzas y Seguros",
    logos: [
      { src: "/banca-finanzas-seguros/Bci_Logotype.svg", alt: "Bci", sizeClass: "h-6" },
      { src: "/banca-finanzas-seguros/Banco_de_Chile_logo.svg", alt: "Banco de Chile", sizeClass: "h-12" },
      { src: "/banca-finanzas-seguros/1-Transbank_CJ_Color_300_300px.svg", alt: "Transbank", sizeClass: "h-9" },
      { src: "/banca-finanzas-seguros/1.Onepay_FB_300px.svg", alt: "Onepay", sizeClass: "h-6" },
      { src: "/banca-finanzas-seguros/1.Webpay_FB_300px.svg", alt: "Webpay", sizeClass: "h-7" },
      { src: "/banca-finanzas-seguros/Betterfly_Earth_sin_sello_sin_fondo_SVG.svg", alt: "Betterfly", sizeClass: "h-8" },
      { src: "/banca-finanzas-seguros/BICE_logo.svg", alt: "BICE", sizeClass: "h-12" },
      { src: "/banca-finanzas-seguros/hdi-logo.svg", alt: "HDI", sizeClass: "h-14" },
      { src: "/banca-finanzas-seguros/mutual-logo.svg", alt: "Mutual", sizeClass: "h-14" },
    ],
  },
  {
    name: "Retail y Consumo Masivo",
    logos: [
      { src: "/retail-y-consumo-masivo/adidas.svg", alt: "Adidas", sizeClass: "h-12" },
      { src: "/retail-y-consumo-masivo/walmart.svg", alt: "Walmart", sizeClass: "h-14" },
      { src: "/retail-y-consumo-masivo/burger.svg", alt: "Burger King", sizeClass: "h-12" },
      { src: "/retail-y-consumo-masivo/vans.svg", alt: "Vans", sizeClass: "h-12" },
      { src: "/retail-y-consumo-masivo/sodimac.svg", alt: "Sodimac", sizeClass: "h-14" },
      { src: "/retail-y-consumo-masivo/cruz.svg", alt: "Cruz Verde", sizeClass: "h-14" },
      { src: "/retail-y-consumo-masivo/elite.svg", alt: "Elite", sizeClass: "h-12" },
      { src: "/retail-y-consumo-masivo/lapiz.svg", alt: "Lápiz López", sizeClass: "h-12" },
      { src: "/retail-y-consumo-masivo/master.svg", alt: "Mastercat", sizeClass: "h-12" },
      { src: "/retail-y-consumo-masivo/mts.svg", alt: "MTS", sizeClass: "h-12" },
      { src: "/retail-y-consumo-masivo/pepe.svg", alt: "Pepe Jeans", sizeClass: "h-13" },
      { src: "/retail-y-consumo-masivo/tottus.svg", alt: "Tottus", sizeClass: "h-13" },
    ],
  },
  {
    name: "Alimentos y bebidas",
    logos: [
      { src: "/alimentos-y-bebidas/redbull-logo.svg", alt: "Red Bull", sizeClass: "h-15" },
      { src: "/alimentos-y-bebidas/nescafe-logo.svg", alt: "Nescafé", sizeClass: "h-6" },
      { src: "/alimentos-y-bebidas/pepsi-logo.svg", alt: "Pepsi", sizeClass: "h-15" },
      { src: "/alimentos-y-bebidas/agrosuper-logo.svg", alt: "Agrosuper", sizeClass: "h-14" },
      { src: "/alimentos-y-bebidas/colun-logo.svg", alt: "Colun", sizeClass: "h-12" },
      { src: "/alimentos-y-bebidas/bilz-y-pap-logo.svg", alt: "Bilz y Pap", sizeClass: "h-15" },
      { src: "/alimentos-y-bebidas/loncoleche-logo.svg", alt: "Loncoleche", sizeClass: "h-15" },
      { src: "/alimentos-y-bebidas/calo-logo.svg", alt: "Calo", sizeClass: "h-15" },
      { src: "/alimentos-y-bebidas/cafe-caribe-logo.svg", alt: "Café Caribe", sizeClass: "h-15" },
      { src: "/alimentos-y-bebidas/oikos-logo.svg", alt: "Oikos", sizeClass: "h-15" },
      { src: "/alimentos-y-bebidas/qualy-logo.svg", alt: "Qualy", sizeClass: "h-15" },
    ],
  },
  {
    name: "Educación",
    logos: [],
  },
  {
    name: "Salud y Bienestar",
    logos: [],
  },
  {
    name: "Inmobiliario y Construcción",
    logos: [],
  },
  {
    name: "Automotriz y Transporte",
    logos: [
      { src: "/automotriz-y-transporte/bmw.svg", alt: "BMW", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/mitsubishi.svg", alt: "Mitsubishi", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/nissan.svg", alt: "Nissan", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/lexus.svg", alt: "Lexus", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/lambo.svg", alt: "Lamborghini", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/mg.svg", alt: "MG", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/ubereats.svg", alt: "Uber Eats", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/europcar.svg", alt: "Europcar", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/sixt.svg", alt: "Sixt", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/shell.svg", alt: "Shell", sizeClass: "h-12" },
      { src: "/automotriz-y-transporte/autopista.svg", alt: "Autopista Central", sizeClass: "h-15" },
    ],
  },
  {
    name: "Tecnología y Telecomunicaciones",
    logos: [],
  },
  {
    name: "Industria y B2B",
    logos: [],
  },
];

// Icono simple de Check
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
export default function ConsultoraPage() {
  const [activeService, setActiveService] = useState(services[2]);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [humanCheck, setHumanCheck] = useState('');
  const [humanCheckError, setHumanCheckError] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setHumanCheck('');
    setHumanCheckError('');
    setWebsiteError('');
  };

  const consultores = [
    { name: "Omar Mora", title: "CEO & Head of Growth", img: "/omar-mora.png", bio: "Socio fundador de Onthebrand con +18 años de experiencia en Marketing y Publicidad, certificado en Growth Marketing en San Francisco, EEUU. Omar traduce los desafíos del negocio en estrategias de crecimiento claras y medibles." },
    { name: "Daniel Albornoz", title: "Finance & Data Lead", img: "/daniel-albornoz.png", bio: "Experto en modelamiento y visualización de datos, Daniel convierte la data cruda en insights accionables que impulsan el crecimiento. Su conocimiento financiero permite proyectar asertivamente el impacto de las acciones de marketing en el negocio." },
    { name: "Sebastián Solar", title: "Head of Strategy", img: "/sebastian-solar.png", bio: "Sebastián, con +15 años de experiencia en consultoras y liderando marcas líderes B2B y B2C combina data + creatividad + tecnología para generar estrategias con impacto centrado en las personas." },
    { name: "Rafael Pabón", title: "Head of Brands", img: "/rafael-pabon.png", bio: "Rafael con vasta experiencia en agencias multinacionales, más de 50 premios y jurado en Festivales de Creatividad y Efectividad, lidera la mirada creativa de las estrategias, siempre velando por el equilibrio entre Branding y Performance." },
  ];

  const ConsultorCard = ({ consultor }: { consultor: typeof consultores[0] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
    });
  
    const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.7, 1, 0.7]);
  
    return (
      <motion.div
        ref={ref}
        className="text-center group cursor-pointer"
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.5 }}
        style={isDesktop ? {} : { opacity }}
        onClick={() => !isDesktop && setIsOpen(!isOpen)}
      >
        <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden">
          <Image src={consultor.img} alt={`Foto de ${consultor.name}`} fill className={`object-cover transition-all duration-500 ${isDesktop ? 'grayscale group-hover:grayscale-0' : ''}`} />
        </div>
        <h3 className="font-bold text-lg text-gray-900">{consultor.name}</h3>
        <p className="text-sm text-cyan-600 font-medium">{consultor.title}</p>
        <p className={`text-sm text-gray-600 mt-2 transition-all duration-500 ease-in-out ${isDesktop ? 'max-h-0 opacity-0 group-hover:max-h-screen group-hover:opacity-100' : (isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0')}`}>{consultor.bio}</p>
      </motion.div>
    );
  };

  useEffect(() => {
    generateNewQuestion();
  }, []);

  return (
    <main className="bg-white">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Consultoría de Marketing Estratégico",
            "provider": {
              "@type": "Organization",
              "name": "Onthebrand"
            },
            "areaServed": {
              "@type": "Country",
              "name": "CL"
            },
            "description": "Asesoramiento objetivo y especializado para la alta dirección. Definimos la estrategia de crecimiento y entregamos una hoja de ruta para que los equipos internos y agencias la ejecuten.",
            "name": "Consultoría de Marketing como Estrategia de Negocio"
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "¿Qué diferencia a Onthebrand de una agencia de marketing tradicional?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nuestra propuesta de valor se centra en la estrategia y la inteligencia de marketing, no en la ejecución masiva. Actuamos como asesores objetivos para la alta dirección, sin los sesgos que puede tener una agencia que también ejecuta las campañas."
              }
            },{
              "@type": "Question",
              "name": "¿Con qué tipo de industrias trabajan?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Tenemos amplia experiencia en múltiples industrias, incluyendo Banca, Finanzas y Seguros, Retail y Consumo Masivo, Alimentos y Bebidas, Automotriz y Transporte, entre otras. Nuestro enfoque estratégico es adaptable a los desafíos de cada sector."
              }
            }]
          }) }}
        />
      </head>

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
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></div>
        <div className="relative container mx-auto px-4 py-24 md:py-32 text-left z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Marketing como Estrategia de Negocio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-200 max-w-3xl mb-8"
          >
            Asesoramiento objetivo y especializado para la alta dirección. Definimos el "qué" y el "por qué" de su crecimiento, entregando la hoja de ruta para que sus equipos ejecuten el "cómo".
          </motion.p>
          
          {/* --- CAMBIO: Botón CTA Añadido --- */}
          <motion.a 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            href="#contacto"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
          >
            Agendar una reunión
            <ArrowRight className="h-5 w-5" />
          </motion.a>
        </div>
      </section>

      {/* --- Sección Propuesta de Valor --- */}
      <motion.section 
        id="propuesta" 
        className="py-16 md:py-24"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-sm font-semibold text-cyan-500 uppercase">Nuestra Propuesta de Valor</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-4">
              Independencia, Agilidad y Profundidad.
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Resolvemos problemas de la alta dirección entendiendo que la estrategia de 
              marketing es, en esencia, una estrategia de negocio. Nuestro valor no reside 
              en la ejecución masiva, sino en proveer inteligencia de marketing 
              puramente objetiva.
            </p>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg">
            <ul className="space-y-4">
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-cyan-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Seniority Garantizado</h3>
                  <p className="text-gray-700 text-sm">
                    Pensamiento estratégico de la más alta calidad desde la fase inicial del proyecto.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-cyan-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Sin Sesgos de Ejecución</h3>
                  <p className="text-gray-700 text-sm">
                    Trabajamos con sus equipos internos y agencias para implementar la estrategia,
                     asegurando una asesoría desinteresada, sin conflictos de interés.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckIcon className="w-5 h-5 text-cyan-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800">Entregable Estratégico</h3>
                  <p className="text-gray-700 text-sm">
                    Entregamos el framework, la hoja de ruta y el modelo operativo 
                    que su negocio necesita para crecer.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </motion.section>
      
      {/* --- Sección Somos (NUEVA) --- */}
      <section id="somos" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-cyan-500 uppercase">Quiénes somos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Marketers con experiencia para cada uno de tus desafíos.
            </h2>
          </div>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {consultores.map(consultor => (
              <ConsultorCard key={consultor.name} consultor={consultor} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Sección Servicios (Sin Cambios) --- */}
      <motion.section 
        id="servicios" 
        className="relative bg-gray-900 py-16 md:py-24 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src="/video-hero.mp4"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-950/80 to-black/90 z-10"></div>
        <div className="relative container mx-auto px-4 z-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold text-cyan-400 uppercase">Nuestras Soluciones</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Un Ecosistema de Soluciones de Marketing
            </h2>
          </div>
          
          {isDesktop ? (
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Columna de Servicios */}
              <div className="flex flex-col gap-y-2 -translate-y-1">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onMouseEnter={() => setActiveService(service)}
                    onClick={() => setActiveService(service)}
                    className={`p-4 rounded-lg text-left transition-all duration-300 ${
                      activeService.id === service.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg'
                        : 'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 ${activeService.id === service.id ? 'text-white' : service.color} rounded-md flex items-center justify-center`}>
                        {React.cloneElement(service.icon, { strokeWidth: 2, className: "w-6 h-6" })}
                      </div>
                      <h3 className={`text-base font-semibold ${activeService.id === service.id ? 'text-white' : 'text-gray-300'}`}>{service.title}</h3>
                    </div>
                  </button>
                ))}
              </div>

              {/* Columna de Contenido */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-8"
                >
                  <h3 className="text-xl font-bold text-white mb-4">{activeService.title}</h3>
                  <ul className="space-y-3">
                    {activeService.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <CheckIcon className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            // Layout de Acordeón para móvil
            <Accordion type="single" collapsible defaultValue={activeService.id} className="w-full max-w-md mx-auto">
              {services.map((service) => (
                <AccordionItem key={service.id} value={service.id} className="border-b border-white/20">
                  <AccordionTrigger className="py-4 text-white hover:no-underline">
                    <div className="flex items-center gap-4 text-left">
                      <div className={`flex-shrink-0 w-10 h-10 ${service.color} rounded-md flex items-center justify-center`}>
                        {React.cloneElement(service.icon, { strokeWidth: 2, className: "w-6 h-6" })}
                      </div>
                      <h3 className="text-base font-semibold text-gray-300">{service.title}</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-black/20 rounded-b-lg -mx-4 px-4">
                    <ul className="space-y-3 pt-4">
                      {service.items.map((item) => (
                        <li key={item} className="flex items-start">
                          <CheckIcon className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0 mt-1" />
                          <span className="text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </motion.section>

      {/* --- Sección Rubros (Sin Cambios) --- */}
      <section id="industrias" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="text-sm font-semibold text-cyan-500 uppercase">Industrias</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">
              Experiencia con marcas líderes en múltiples rubros
            </h2>
          </div>

          {/* Selector de Industrias como Carrusel con indicadores */}
          <div className="relative mt-10 mb-12 md:mx-auto max-w-4xl">
            <div className="overflow-x-auto pb-4 no-scrollbar md:overflow-x-visible">
              <div className="flex justify-start gap-3 md:flex-wrap md:justify-center md:gap-4 px-4 md:px-0">
                {industries.map((industry) => (
                  <button
                    key={industry.name}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`flex-shrink-0 md:flex-shrink whitespace-nowrap font-medium py-2 px-5 rounded-full text-sm transition-all duration-200 ${
                      selectedIndustry.name === industry.name
                        ? 'bg-cyan-500 text-white shadow-md scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >{industry.name}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Área de Logos */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndustry.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 max-w-4xl mx-auto min-h-[120px]"
            >
              {selectedIndustry.logos.length > 0 ? (
                selectedIndustry.logos.map((logo) => (
                  <div key={logo.src} className="h-16 flex items-center w-32">
                    <Image src={logo.src} alt={logo.alt} width={140} height={60} className={`object-contain mx-auto filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all ${logo.sizeClass || 'h-8'}`} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  Próximamente agregaremos las marcas en esta industria.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* --- CAMBIO: Nueva Sección de Contacto --- */}
      <section id="contacto" className="bg-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Columna de Texto */}
          <div>
            <span className="text-sm font-semibold text-cyan-400 uppercase">Hablemos</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
              Inicia la Conversación
            </h2>
            <p className="text-gray-300 text-base leading-relaxed mb-6">
              Estamos listos para analizar tus desafíos. Completa el formulario 
              o escríbenos directamente para agendar una sesión de diagnóstico 
              sin costo.
            </p>
            <a 
              href="mailto:omar@onthebrand.cl" 
              className="inline-flex items-center gap-3 text-cyan-400 font-semibold transition-colors hover:text-cyan-300"
            >
              <Mail className="h-5 w-5" />
              omar@onthebrand.cl
            </a>
          </div>

          {/* Contenedor para el formulario y el mensaje de éxito */}
          <div className="relative min-h-[440px]">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  ref={formRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                  action={async (formData) => {
                    if (parseInt(humanCheck) !== num1 + num2) {
                      setHumanCheckError('Respuesta incorrecta. Inténtalo de nuevo.');
                      generateNewQuestion();
                      return;
                    }
                    setHumanCheckError('');

                    const website = formData.get('website') as string;
                    const websiteRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/;
                    if (!website || !websiteRegex.test(website)) {
                      setWebsiteError('Por favor, ingresa una URL de sitio web válida.');
                      return;
                    }
                    setWebsiteError('');

                    setIsSubmitting(true); 

                    const subject = `Nuevo Mensaje de Consultoría de: ${formData.get('name')}`;
                    const body = `
                      <h2>Nuevo Mensaje de Contacto - Consultoría</h2>
                      <p><strong>Nombre:</strong> ${formData.get('name')}</p>
                      <p><strong>Empresa:</strong> ${formData.get('company')}</p>
                      <p><strong>Email:</strong> ${formData.get('email')}</p>
                      <p><strong>Sitio Web:</strong> ${formData.get('website')}</p>
                      <p><strong>Mensaje:</strong></p>
                      <p>${formData.get('message')}</p>
                    `;
                    const result = await sendEmail({ subject, body });
                    if (result.success) {
                      setIsSubmitted(true);
                    } else {
                      alert('Error al enviar el mensaje. Inténtalo de nuevo.');
                    }
                    setIsSubmitting(false);
                    formRef.current?.reset();
                    generateNewQuestion();
                  }}
                >
                  {/* Campos del formulario (sin cambios) */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                    <input type="text" name="name" id="name" required className="w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Empresa</label>
                    <input type="text" name="company" id="company" required className="w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Corporativo</label>
                    <input type="email" name="email" id="email" required className="w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                  </div>
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">URL Sitio Web</label>
                    <input type="text" name="website" id="website" placeholder="ejemplo.com" required className="w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    {websiteError && <p className="mt-2 text-sm text-red-400">{websiteError}</p>}
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">¿Cómo podemos ayudarte?</label>
                    <textarea name="message" id="message" rows={4} required className="w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500"></textarea>
                  </div>
                  {/* --- CAMBIO: Campo de validación anti-spam --- */}
                  <div>
                    <label htmlFor="human" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1">
                      Validación antispam: &iquest;Cu&aacute;nto es {num1} + {num2}?
                      <button type="button" onClick={generateNewQuestion} aria-label="Nueva pregunta"><RefreshCw className="w-3 h-3 text-gray-400 hover:text-white" /></button>
                    </label>
                    <input type="number" name="human" id="human" value={humanCheck} onChange={(e) => setHumanCheck(e.target.value)} required className="w-full rounded-md border-gray-700 bg-gray-800 p-3 text-white shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    {humanCheckError && <p className="mt-2 text-sm text-red-400">{humanCheckError}</p>}
                  </div>
                  <div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</>
                      ) : "Enviar Mensaje"}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center bg-gray-800/50 backdrop-blur-sm rounded-lg p-8"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}>
                    <CheckCircle className="w-16 h-16 text-cyan-400 mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white">¡Gracias!</h3>
                  <p className="text-gray-300 mt-2 mb-6">Muy pronto te contactaremos.</p>
                  <button onClick={() => {
                    setIsSubmitted(false);
                    generateNewQuestion();
                  }} className="text-sm font-semibold text-cyan-400 hover:text-cyan-300">
                    Enviar otro mensaje
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-gray-900 text-white pb-8">
        <div className="container mx-auto px-4"><Footer /></div>
      </footer>

    </main>
  );
}