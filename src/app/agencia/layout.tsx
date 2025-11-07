// src/app/agencia/layout.tsx
"use client";

import AgenciaSubNav from "@/components/common/AgenciaSubNav";
import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isHeaderVisible = useHeaderVisibility();
  return (
    <>
      {/* Este header contiene el SubNav y se posiciona debajo del GlobalHeader. */}
      <header className={`w-full z-40 sticky top-16 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-16'}`}>
        <AgenciaSubNav />
      </header>
      <main>{children}</main>
    </>
  );
}
