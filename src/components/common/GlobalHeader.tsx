
// src/components/common/GlobalHeader.tsx
import React from 'react';
import GlobalHeaderClient from '@/app/consultora/GlobalHeaderClient';

type NavLink = { name: string; href: string };

const GlobalHeader = ({ navLinks }: { navLinks: NavLink[] }) => {
  return <GlobalHeaderClient navLinks={navLinks} />;
};

export default GlobalHeader;