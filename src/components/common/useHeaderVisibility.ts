// src/hooks/useHeaderVisibility.ts
"use client";

import { useState, useEffect, useRef } from 'react';

export const useHeaderVisibility = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Se oculta al bajar (siempre que no estemos en el tope), y se muestra al subir.
      if (currentScrollY > lastScrollY.current && currentScrollY > 64) { // Ocultar solo después de pasar la altura del header
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return isHeaderVisible;
};