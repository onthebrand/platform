"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";

const AgenciaSubNav = () => {
  const isHeaderVisible = useHeaderVisibility();

  const navLinks = [
    { id: "propuesta", href: "/agencia#propuesta", label: "Propuesta" },
    { id: "planes", href: "/agencia#planes", label: "Planes" },
    { id: "industrias", href: "/agencia#industrias", label: "Industrias" },
  ];

  return (
    <nav
      className="hidden md:block w-full border-b border-gray-200 z-40 sticky bg-white top-16"
    >
      <div className="container mx-auto px-4 flex items-center justify-between h-12">
        <div className="flex items-center gap-x-6">
          <span className="font-bold text-gray-800">Agencia Plug & Play</span>
          <div className="flex items-center space-x-6 text-sm">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className="transition-colors text-gray-600 hover:text-cyan-500 font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          <Button asChild className="rounded-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold">
            <Link href="/agencia#contacto">
              Comenzar
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default AgenciaSubNav;