// src/app/agencia/layout.tsx
"use client";

import AgenciaClientPage from './AgenciaClientPage';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AgenciaClientPage>{children}</AgenciaClientPage>
  );
}
