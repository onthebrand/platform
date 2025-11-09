"use client";
import { createContext } from 'react';

export interface IPlataformaPageContext {
  onOpenForm: (planName: string) => void;
}

export const PlataformaPageContext = createContext<IPlataformaPageContext | null>(null);