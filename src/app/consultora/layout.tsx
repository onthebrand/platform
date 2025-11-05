// src/app/consultora/layout.tsx
"use client";

import ConsultoraSubNav from "@/components/common/ConsultoraSubNav";
import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHeaderVisible = useHeaderVisibility();
  return (
    <>
      {/* El GlobalHeader se renderiza desde el layout raíz y gestiona su propia visibilidad. */}
      {/* Este header solo contiene el SubNav y se posiciona debajo del GlobalHeader. */}
      <header className={`w-full z-40 sticky top-16 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-16'}`}>
        <ConsultoraSubNav />
      </header>
      <main>{children}</main>
    </>
  );
}