// src/app/plataforma/layout.tsx
"use client";

import { useState } from 'react';
import PlataformaSubNav from "@/components/common/PlataformaSubNav";
import GlobalHeader from "@/components/common/GlobalHeader";
import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";
import LoginModal from './LoginModal';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const isHeaderVisible = useHeaderVisibility();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className={`w-full z-50 sticky top-0 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
          <GlobalHeader />
          <PlataformaSubNav onLoginClick={() => setLoginModalOpen(true)} />
        </header>
        <main>{children}</main>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  );
}