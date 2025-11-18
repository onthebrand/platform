"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type NavLink = { name: string; href: string };

interface MainNavProps {
  links: NavLink[];
  isWhite?: boolean;
}

export function MainNav({ links, isWhite }: MainNavProps) {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link
            key={link.name}
            href={link.href}
            className={cn("transition-colors", isWhite ? "text-white/80 hover:text-white" : isActive ? "text-cyan-500" : "text-gray-600 hover:text-gray-900")}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  )
}