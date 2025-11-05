// src/components/common/HeaderContainer.tsx
"use client";

import React from 'react';
import { useHeaderVisibility } from './useHeaderVisibility';

interface HeaderContainerProps {
  children: React.ReactNode;
  subNav?: React.ReactNode;
}

const HeaderContainer = ({ children, subNav }: HeaderContainerProps) => {
  const isHeaderVisible = useHeaderVisibility();

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`w-full z-50 sticky top-0 transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        {subNav}
      </header>
      {children}
    </div>
  );
};

export default HeaderContainer;