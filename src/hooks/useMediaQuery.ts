// src/hooks/useMediaQuery.ts
"use client";

import { useState, useEffect } from 'react';

export const useMediaQuery = (query: string): boolean => {
  // Esta función se asegura de que el valor inicial sea correcto si se ejecuta en el navegador
  const getMatches = (query: string): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    
    // El listener moderno para cambios
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};