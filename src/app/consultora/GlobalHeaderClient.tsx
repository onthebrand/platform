"use client";

import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";
import BrandLogo from "@/components/common/BrandLogo";
import Link from "next/link";
import { MainNav } from "@/components/common/MainNav";
import { usePathname } from "next/navigation";

type NavLink = { name: string; href: string };

export default function GlobalHeaderClient({ navLinks }: { navLinks: NavLink[] }) {
  const isHeaderVisible = useHeaderVisibility();
  const pathname = usePathname();

  const isAgenciaPage = pathname.startsWith('/agencia');

  const headerBgClass = isAgenciaPage
    ? 'bg-gradient-to-r from-fuchsia-600 to-purple-700'
    : 'bg-white/80 backdrop-blur-lg';

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className={`${headerBgClass} border-b ${isAgenciaPage ? 'border-transparent' : 'border-gray-200'}`}>
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/"><BrandLogo subtitle="consultora" isWhite={isAgenciaPage} /></Link>
          <MainNav links={navLinks} isWhite={isAgenciaPage} />
        </div>
      </div>
    </div>
  );
}