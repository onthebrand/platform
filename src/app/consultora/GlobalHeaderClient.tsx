"use client";

import { useState, useEffect, Fragment } from "react";
import { usePathname } from "next/navigation"; // 1. IMPORTAMOS el hook para leer la URL
import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";
import BrandLogo from "@/components/common/BrandLogo";
import Link from "next/link";
import { MainNav } from "@/components/common/MainNav";
import { Menu, X } from "lucide-react"; // Íconos para el menú móvil

type NavLink = { name: string; href: string };

// 2. ELIMINAMOS la prop 'sectionName' porque ahora la calcularemos aquí mismo
export default function GlobalHeaderClient({
  navLinks,
}: { navLinks: NavLink[] }) {
  const isHeaderVisible = useHeaderVisibility();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const headerBgClass = 'bg-white'; // Fondo blanco sólido

  // Efecto para bloquear el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    // Cleanup function para asegurarse de que la clase se elimina si el componente se desmonta
    return () => document.body.classList.remove('overflow-hidden');
  }, [isMobileMenuOpen]);

  // 3. LÓGICA MEJORADA: Determinamos la sección y el subtítulo usando la URL actual
  const pathname = usePathname();
  
  const getCurrentSection = (path: string): { name: string, subtitle: string } | null => {
    if (path.startsWith('/agencia')) {
      return { name: 'Agencia', subtitle: 'agencia' };
    }
    if (path.startsWith('/consultora')) {
      return { name: 'Consultora', subtitle: 'consultores' };
    }
    if (path.startsWith('/plataforma')) {
      return { name: 'Plataformas', subtitle: 'plataformas' };
    }
    return null;
  };

  const currentSection = getCurrentSection(pathname);
  const subtitle = currentSection?.subtitle;

  // Añadimos el enlace "Home" al principio de la lista de navegación
  const allNavLinks: NavLink[] = [{ name: 'Home', href: '/' }, ...navLinks];

  return (
    <>
      <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className={`${headerBgClass} border-b border-gray-200`}>
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <BrandLogo logoSize="text-xl" circleSize="w-3 h-3" />
          </Link>
          
          {/* Navegación para Escritorio (oculta en móvil) */}
          <div className="hidden md:block">
            <MainNav links={navLinks} />
          </div>

          {/* Botón de Menú Móvil (solo visible en móvil) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menú"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
      </div>

      {/* Menú Desplegable para Móvil con Overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Overlay oscuro */}
        {/* Este div ahora solo maneja el fondo oscuro y su propia animación de opacidad */}
        <div
          className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Panel del Menú (fuera del contenedor del overlay para evitar herencia de opacidad) */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-2/3 max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col z-[51] md:hidden ${
          isMobileMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
      >
          {/* Cabecera del menú móvil */}
          {/* La clase 'flex-shrink-0' evita que este elemento se encoja */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center space-x-3">
              <BrandLogo logoSize="text-xl" circleSize="w-3 h-3" subtitle={subtitle} />
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Cerrar menú">
              <X size={24} />
            </button>
          </div>
          {/* Enlaces de navegación del menú móvil */}
          {/* La clase 'flex-grow' hace que la navegación ocupe el espacio restante */}
          <nav className="flex flex-col px-4 pt-4 pb-4 flex-grow">
            {allNavLinks.map((link) => {
              // Determina si el enlace actual es la página activa
              const isActive = (link.href === '/' && pathname === '/') || (link.href !== '/' && pathname.startsWith(link.href));

              // Lógica especial para el enlace "Plataforma"
              if (link.name.toLowerCase() === 'plataforma') { // Detectamos el enlace "Plataforma"
                const isPlataformaActive = pathname.startsWith('/plataforma');
                return (
                  <Fragment key={link.href}>
                    <button
                      onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                      className={`text-lg py-3 text-left w-full ${
                        isPlataformaActive
                          ? 'text-black font-bold' // Estilo para el botón activo
                          : 'text-gray-700 hover:text-black' // Estilo normal
                      }`}
                    >
                      Plataformas {/* Pero lo mostramos en plural */}
                    </button>
                    {isSubMenuOpen && (
                      <div className="pl-4 border-l-2 border-gray-200 ml-2">
                        {/* Restauramos el submenú de iacommerce */}
                        <Link href="/plataforma" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center py-2 text-gray-600 hover:text-black">
                          <span className="font-bold text-lg">iacommerce</span> {/* Restaurado */}
                        </Link>
                      </div>
                    )}
                  </Fragment>
                );
              }

              // Renderizado normal para los otros enlaces
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg py-3 ${
                    isActive ? 'text-black font-bold' : 'text-gray-700 hover:text-black'
                  }`}                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
      </div>
    </>
  );
}