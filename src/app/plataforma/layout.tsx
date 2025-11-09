// src/app/plataforma/layout.tsx
"use client";

import React, { useState } from 'react';
import PlataformaSubNav from "@/components/common/PlataformaSubNav";
import { useHeaderVisibility } from "@/components/common/useHeaderVisibility";
import LoginModal from '@/components/sections/LoginModal';
import PlataformaContactForm from '@/components/common/PlataformaContactForm';
import { PlataformaPageContext, IPlataformaPageContext } from './PlataformaPageContext';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const isHeaderVisible = useHeaderVisibility();

  const contextValue: IPlataformaPageContext = {
    onOpenForm: (planName: string) => {
      setSelectedPlan(planName);
      setContactFormOpen(true);
    }
  };

  return (
    <PlataformaPageContext.Provider value={contextValue}>
      {/* El GlobalHeader se renderiza desde el layout raíz y gestiona su propia visibilidad. */}
      {/* Este header solo contiene el SubNav y se posiciona debajo del GlobalHeader. */}
      <header className={`w-full z-40 sticky top-16 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-16'}`}>
             <PlataformaSubNav onLoginClick={() => setLoginModalOpen(true)} />
      </header>
      <main>{children}</main>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <PlataformaContactForm isOpen={isContactFormOpen} onClose={() => setContactFormOpen(false)} selectedPlan={selectedPlan} />
    </PlataformaPageContext.Provider>
  );
}