"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import { sendEmail } from '@/app/consultora/actions';
import { Button } from '@/components/ui/button';

interface PlataformaContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
}

export default function PlataformaContactForm({ isOpen, onClose, selectedPlan }: PlataformaContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [humanCheck, setHumanCheck] = useState('');
  const [humanCheckError, setHumanCheckError] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setHumanCheck('');
    setHumanCheckError('');
    setWebsiteError('');
  };

  useEffect(() => {
    if (isOpen) {
      generateNewQuestion();
      setIsSubmitted(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleFormAction = async (formData: FormData) => {
    if (parseInt(humanCheck) !== num1 + num2) {
      setHumanCheckError('Respuesta incorrecta. Inténtalo de nuevo.');
      generateNewQuestion();
      return;
    }
    setHumanCheckError('');

    const website = formData.get('website') as string;
    const websiteRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/;
    if (!website || !websiteRegex.test(website)) {
      setWebsiteError('Por favor, ingresa una URL de sitio web válida.');
      return;
    }
    setWebsiteError('');

    setIsSubmitting(true);

    const subject = `Nuevo Lead Plataforma: ${formData.get('name')} (${selectedPlan})`;
    const body = `
      <h2>Nuevo Lead desde la página de Plataforma</h2>
      <p><strong>Nombre:</strong> ${formData.get('name')}</p>
      <p><strong>Empresa:</strong> ${formData.get('company')}</p>
      <p><strong>URL Ecommerce:</strong> ${formData.get('website')}</p>
      <p><strong>Plan de Interés:</strong> ${selectedPlan}</p>
    `;

    const result = await sendEmail({ subject, body });
    if (result.success) {
      setIsSubmitted(true);
    } else {
      alert(result.error || 'Error al enviar el mensaje.');
    }
    setIsSubmitting(false);
    formRef.current?.reset();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 z-50" />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white text-gray-900 shadow-2xl z-50 p-8 flex flex-col">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"><X className="w-6 h-6" /></button>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full">
                  <CheckCircle className="w-16 h-16 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">¡Gracias por tu interés!</h3>
                  <p className="text-gray-600 mt-2">Nuestra plataforma está en etapa de desarrollo. Pronto tendremos novedades.</p>
                </motion.div>
              ) : (
                <motion.div key="form" className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-2">Solicitud de Acceso</h2>
                  <p className="text-gray-600 mb-6">Estás solicitando acceso al <span className="font-bold text-purple-600">{selectedPlan}</span>.</p>
                  <form ref={formRef} action={handleFormAction} className="space-y-4 flex-grow flex flex-col">
                    <div>
                      <label htmlFor="name-platform" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input type="text" name="name" id="name-platform" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label htmlFor="company-platform" className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                      <input type="text" name="company" id="company-platform" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label htmlFor="website-platform" className="block text-sm font-medium text-gray-700 mb-1">URL Ecommerce</label>
                      <input type="text" name="website" id="website-platform" placeholder="ejemplo.com" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                      {websiteError && <p className="mt-2 text-sm text-red-500">{websiteError}</p>}
                    </div>
                    <div>
                      <label htmlFor="human-platform" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        Validación: &iquest;Cu&aacute;nto es {num1} + {num2}?
                        <button type="button" onClick={generateNewQuestion} aria-label="Nueva pregunta"><RefreshCw className="w-3 h-3 text-gray-500 hover:text-gray-900" /></button>
                      </label>
                      <input type="number" name="human" id="human-platform" value={humanCheck} onChange={(e) => setHumanCheck(e.target.value)} required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                      {humanCheckError && <p className="mt-2 text-sm text-red-500">{humanCheckError}</p>}
                    </div>
                    <div className="mt-auto pt-4">
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3">
                        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</> : "Enviar Solicitud"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}