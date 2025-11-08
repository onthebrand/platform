"use client";
import { createContext } from 'react';

export interface IAgenciaPageContext {
  handleOpenForm: (planName?: string) => void;
}

export const AgenciaPageContext = createContext<IAgenciaPageContext | null>(null);