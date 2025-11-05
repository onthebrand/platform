
// src/components/common/GlobalHeader.tsx



// --- CÓDIGO ACTUALIZADO (v44) - NUNCA se oculta ---







"use client";







import Link from 'next/link';



import BrandLogo from '@/components/common/BrandLogo';



import { usePathname } from 'next/navigation';



import { useState, useEffect, useRef } from 'react';

import { useHeaderVisibility } from '@/components/common/useHeaderVisibility';



import { X, AlignJustify } from 'lucide-react';



import MobileMenuPanel from './MobileMenuPanel';







const GlobalHeader = () => {



  const pathname = usePathname();



  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

 

  const isHeaderVisible = useHeaderVisibility();



  const isPlataformaPage = pathname.startsWith('/plataforma');



  const isConsultoraPage = pathname.startsWith('/consultora');



  const isSectionActive = pathname.startsWith('/plataforma') ||



            pathname.startsWith('/consultora') ||



            pathname.startsWith('/agencia');



  const closeMobileMenu = () => setIsMobileMenuOpen(false);



  return (



    <>



    <nav

      // Se añade la lógica de visibilidad directamente aquí

      className={`w-full border-b border-gray-200 h-16 sticky top-0 z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'} ${

      isPlataformaPage || isConsultoraPage ? 'bg-gray-100' : 'bg-white'



    }`}



    >



      <div



        className="container mx-auto px-4 flex items-center h-full"



      >







        {/* Contenedor que crece para empujar el menú móvil a la derecha */}



        <div className="flex-grow flex items-center space-x-4">







        {/* Logo (Hijo 1) */}



        <div className="flex-shrink-0"> {/* Eliminado el div con inline-block */}



          <Link href="/" aria-label="Volver al inicio" onClick={closeMobileMenu}>



            <BrandLogo logoSize="text-lg" circleSize="w-2.5 h-2.5" />



          </Link>



        </div>







        {/* Items del menú (hijos directos) */}



        <Link



        href="/consultora"



        className={`hidden md:block text-sm font-semibold transition-colors ${



          isConsultoraPage



          ? 'text-cyan-500'



          : 'text-gray-500 hover:text-gray-900'



        }`}



        >



        Consultora



        </Link>



        <span className="hidden md:block text-sm font-semibold text-gray-400 cursor-not-allowed">Agencia</span>



        {/* Lógica para mostrar "Plataforma" y aplicar estilo activo */}



        <Link



        href="/plataforma"



        className={`hidden md:block text-sm font-semibold transition-colors ${



          isPlataformaPage



          ? 'text-cyan-500'



          : 'text-gray-500 hover:text-gray-900'



        }`}



        >



        Plataforma



        </Link>



        </div>







        {/* Wrapper para móvil */}



        <div className="flex-shrink-0 md:hidden">



        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Abrir menú" className="p-1 -mr-1">



          {isMobileMenuOpen ? <X size={20} /> : <AlignJustify size={20} />}



        </button>



        </div>







      </div>



    </nav>







    {isMobileMenuOpen && <MobileMenuPanel onClose={closeMobileMenu} />}



   </>



  );



};







export default GlobalHeader;