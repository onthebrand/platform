"use client";

import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";
import BrandLogo from "@/components/common/BrandLogo";
import Link from "next/link";
import { MainNav } from "@/components/common/MainNav";

type NavLink = { name: string; href: string };

export default function GlobalHeaderClient({ navLinks }: { navLinks: NavLink[] }) {
  const isHeaderVisible = useHeaderVisibility();
  const headerBgClass = 'bg-white'; // Fondo blanco sólido

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className={`${headerBgClass} border-b border-gray-200`}>
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <Link href="/"><BrandLogo logoSize="text-xl" circleSize="w-3 h-3" /></Link>
          <MainNav links={navLinks} />
        </div>
      </div>
    </div>
  );
}