"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import HomeContactForm from '@/components/common/HomeContactForm';

export default function AgenciaClientLayout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isFormOpen, setIsFormOpen] = useState(searchParams.get('contact') === 'true');
  useEffect(() => {
    setIsFormOpen(searchParams.get('contact') === 'true');
  }, [searchParams]);
  const handleCloseForm = () => router.replace('/agencia', { scroll: false });

  return (
    <HomeContactForm isOpen={isFormOpen} onClose={handleCloseForm} />
  );
}