
// src/components/common/MobileMenuPanel.tsx
// --- CÓDIGO ACTUALIZADO (v6) - Activa "Consultora" ---



"use client";



import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { X } from 'lucide-react';

import BrandLogo from '@/components/common/BrandLogo';



interface MobileMenuPanelProps {

  onClose: () => void;

}



const MobileMenuPanel = ({ onClose }: MobileMenuPanelProps) => {

  const pathname = usePathname();

  const isPlataformaActive = pathname.startsWith('/plataforma');

  // 1. CAMBIO: Añadida variable para Consultora

  const isConsultoraActive = pathname.startsWith('/consultora');



  const globalLinks = [

    { href: "/", label: "Home" },

    // 2. CAMBIO: 'disabled: true' eliminado

    { href: "/consultora", label: "Consultora" },

    { href: "/agencia", label: "Agencia", disabled: true },

    { href: "/plataforma", label: "Plataforma" },

  ];

  const plataformaLinks = [

    { href: "/plataforma#servicio", label: "Servicio" },

    { href: "/plataforma#como-funciona", label: "Cómo funciona" },

    { href: "/plataforma#capacidades", label: "Capacidades" },

    { href: "/plataforma#precios", label: "Precios" },

    { href: "#blog", label: "Blog", disabled: true },

  ];





  return (

    <div

      className="fixed inset-0 z-50 md:hidden"

      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}

      onClick={onClose}

    >

      <div

        className="absolute top-0 right-0 h-full w-3/4 max-w-sm bg-white p-6 shadow-lg overflow-y-auto"

        onClick={(e) => e.stopPropagation()}

      >

        {/* Cabecera del panel */}

        <div className="flex justify-between items-start mb-6">



          {/* 3. CAMBIO: Lógica de título actualizada */}

          {isPlataformaActive || isConsultoraActive ? (

            <div style={{ display: 'inline-block' }}>

              <BrandLogo logoSize="text-xl" circleSize="w-3 h-3" />

              <div style={{ marginTop: '-0.25rem', width: '100%', textAlign: 'right' }}>

                <span style={{ display: 'block', color: '#666', fontSize: '0.65rem', fontWeight: 300 }}>

                  {/* Muestra el subtítulo correcto */}

                  {isPlataformaActive ? "Ai-Commerce" : "Consultoría"}

                </span>

              </div>

            </div>

          ) : (

            <span className="font-semibold text-lg">Menú</span>

          )}



          <button onClick={onClose} aria-label="Cerrar menú" className="p-2 -mr-2">

            <X size={24} />

          </button>

        </div>



        {/* Lista de enlaces */}

        <nav className="flex flex-col space-y-4">



          {globalLinks.map((link) => {

            // 4. CAMBIO: Lógica de 'isActive' actualizada

            const isActive = (pathname === link.href) ||

                           (link.href === "/plataforma" && isPlataformaActive) ||

                           (link.href === "/consultora" && isConsultoraActive);



            return (

              <Link

                key={link.href}

                href={link.href}

                onClick={link.disabled ? (e) => e.preventDefault() : onClose}

                className={`

                  text-lg font-medium

                  ${link.disabled

                    ? 'text-gray-400 cursor-not-allowed' // Estilo Deshabilitado

                    : isActive

                      ? 'text-[#00bcd4]' // Estilo Activo

                      : 'text-gray-900 hover:text-[#00bcd4]' // Estilo Inactivo

                  }

                `}

                aria-disabled={link.disabled}

              >

                {link.label}

              </Link>

            );

          })}



          {/* Separador y Enlaces de Plataforma (si aplica) */}

          {isPlataformaActive && (

            <>

              <hr className="my-4 border-gray-200" />

              {plataformaLinks.map((link) => (

                  <Link

                    key={link.href}

                    href={link.href}

                    onClick={link.disabled ? (e) => e.preventDefault() : onClose}

                    className={`

                      text-base font-normal pl-4

                      ${link.disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 hover:text-[#00bcd4]'}

                    `}

                      aria-disabled={link.disabled}

                  >

                    {link.label}

                  </Link>

              ))}

            </>

          )}

            {/* Botón Login (lógica sin cambios) */}

            {pathname !== '/' && (

             <>

               <hr className="my-4 border-gray-200" />

               <Link

                   href="https://app.onthebrand.cl"

                   target="_blank"

                   rel="noopener noreferrer"

                   className="inline-flex items-center justify-center gap-2 text-lg font-medium text-gray-900 hover:text-[#00bcd4]"

                   onClick={onClose}

               >

                   Login

                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 111.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" /></svg>

                 </Link>

               </>

            )}

        </nav>

      </div>

    </div>

  );

};



export default MobileMenuPanel;
