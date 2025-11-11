
// src/components/common/MobileMenuPanel.tsx
// --- CÓDIGO ACTUALIZADO (v6) - Activa "Consultora" ---



"use client";

import React from 'react';

import Link from 'next/link';

import { usePathname } from 'next/navigation';

import { X, ArrowRight } from 'lucide-react';

import BrandLogo from '@/components/common/BrandLogo';



interface MobileMenuPanelProps {

  onClose: () => void;

}



const MobileMenuPanel = ({ onClose }: MobileMenuPanelProps) => {

  const pathname = usePathname();

  const isPlataformaActive = pathname.startsWith('/plataforma');
  const isAgenciaActive = pathname.startsWith('/agencia');
  const isConsultoraActive = pathname.startsWith('/consultora');



  const globalLinks = [

    { href: "/", label: "Home", disabled: false },
    { href: "/consultora", label: "Consultora", disabled: false },
    { href: "/agencia", label: "Agencia", disabled: false },
    { href: "/plataforma", label: "Plataforma", disabled: false },

  ];
  const consultoraLinks = [
    { href: "/consultora#propuesta", label: "Propuesta" },
    { href: "/consultora#somos", label: "Somos" },
    { href: "/consultora#servicios", label: "Soluciones" },
    { href: "/consultora#industrias", label: "Industrias" },
    { href: "/consultora#contacto", label: "Contacto" },
  ];
  const agenciaLinks = [
    { href: "/agencia#servicio", label: "Servicio" },
    { href: "/agencia#planes", label: "Planes" },
    { href: "/agencia#contacto", label: "Contacto" },
  ];
  const plataformaLinks = [

    { href: "/plataforma#servicio", label: "Servicio" },

    { href: "/plataforma#como-funciona", label: "Cómo funciona" },

    { href: "/plataforma#capacidades", label: "Capacidades" },

    { href: "/plataforma#precios", label: "Precios" }

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


          {/* Lógica de título actualizada */}

          {isPlataformaActive ? (
            <BrandLogo logoSize="text-xl" circleSize="w-3 h-3" subtitle="plataformas" />
          ) : isAgenciaActive ? (
            <BrandLogo logoSize="text-xl" circleSize="w-3 h-3" subtitle="agencia" />
          ) : isConsultoraActive ? (
            <BrandLogo logoSize="text-xl" circleSize="w-3 h-3" subtitle="consultores" />
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
            const isActive = (pathname === link.href) ||
                           (link.href === "/agencia" && isAgenciaActive) ||

                           (link.href === "/plataforma" && isPlataformaActive) ||

                           (link.href === "/consultora" && isConsultoraActive);

            return (
              <React.Fragment key={link.href}>
                <Link
                  href={link.href}
                  onClick={link.disabled ? (e) => e.preventDefault() : onClose}
                  className={`text-lg font-medium ${link.disabled ? 'text-gray-400 cursor-not-allowed' : isActive ? 'text-[#00bcd4]' : 'text-gray-900 hover:text-[#00bcd4]'}`}
                  aria-disabled={link.disabled}
                >
                  {link.label}
                </Link>
                
                {/* Desplegar sub-enlaces de Consultora */}
                {link.href === "/consultora" && isConsultoraActive && (
                  <div className="pl-4 flex flex-col space-y-3 mt-2">
                    {consultoraLinks.map((subLink) => (
                      <Link key={subLink.href} href={subLink.href} onClick={onClose} className="text-base font-normal text-gray-700 hover:text-[#00bcd4]">
                        {subLink.label}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Desplegar sub-enlaces de Agencia */}
                {link.href === "/agencia" && isAgenciaActive && (
                  <div className="pl-4 flex flex-col space-y-3 mt-2">
                    {agenciaLinks.map((subLink) => {
                      if (subLink.label === "Contacto") {
                        return (
                          <button key={subLink.href} onClick={() => {
                            window.dispatchEvent(new CustomEvent('open-agencia-form'));
                            onClose();
                          }} className="text-base font-normal text-left text-gray-700 hover:text-[#00bcd4]">
                            {subLink.label}
                          </button>
                        );
                      }
                      return <Link key={subLink.href} href={subLink.href} onClick={onClose} className="text-base font-normal text-gray-700 hover:text-[#00bcd4]">{subLink.label}</Link>
                    })}
                  </div>
                )}

                {/* Desplegar sub-enlaces de Plataforma */}
                {link.href === "/plataforma" && isPlataformaActive && (
                  <div className="pl-4 flex flex-col space-y-4 mt-3">
                    <Link href="/plataforma" onClick={onClose} className="flex items-baseline">
                      <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                      <span className="text-base font-light text-black tracking-tighter">ai<span className="font-bold">commerce</span></span>
                    </Link>
                    <div className="flex flex-col space-y-3">
                      {plataformaLinks.map((subLink) => (
                        <Link
                          key={subLink.href}
                          href={subLink.href}
                          onClick={onClose}
                          className="text-base font-normal text-gray-700 hover:text-[#00bcd4]"
                        >
                          {subLink.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}

            {/* Botón Login (solo para /plataforma) - CORREGIDO */}
            {isPlataformaActive && (

             <>

               <hr className="my-4 border-gray-200" />

               <Link

                   href="https://app.onthebrand.cl"

                   target="_blank"

                       rel="noopener noreferrer"                                     

                   className="inline-flex items-center gap-2 text-lg font-medium text-gray-900 hover:text-[#00bcd4]"

                   onClick={onClose}

               >

                   Login

                   <ArrowRight className="w-5 h-5" />

                 </Link>

               </>

            )}

        </nav>

      </div>

    </div>

  );

};



export default MobileMenuPanel;
