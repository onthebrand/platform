"use client";

import { useState } from 'react';
import { AgenciaPageContext } from '@/app/agencia/AgenciaPageContext';
import AgenciaSubNav from '@/components/common/AgenciaSubNav';
import HomeContactForm from '@/components/common/HomeContactForm';

export default function AgenciaClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFormOpen, setFormOpen] = useState(false);

  const handleOpenForm = () => setFormOpen(true);
  const handleCloseForm = () => setFormOpen(false);

  return (
    <AgenciaPageContext.Provider value={{ isFormOpen, handleOpenForm, handleCloseForm }}>
      <AgenciaSubNav />
      {children}
      <HomeContactForm isOpen={isFormOpen} onClose={handleCloseForm} />
    </AgenciaPageContext.Provider>
  );
}