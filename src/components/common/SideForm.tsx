"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import { sendEmail } from '@/app/consultora/actions';

interface SideFormProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string | null;
  plans: string[];
}

export default function SideForm({ isOpen, onClose, selectedPlan, plans }: SideFormProps) {
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
      setIsSubmitted(false); // Reset on open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const formVariants = {
    visible: { x: 0 },
    hidden: { x: '100%' },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50"
          />
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white text-gray-900 shadow-2xl z-50 p-8 flex flex-col"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900">
              <X className="w-6 h-6" />
            </button>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                 <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key="success"
                    className="flex flex-col items-center justify-center text-center h-full"
                 >
                    <CheckCircle className="w-16 h-16 text-cyan-400 mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900">¡Gracias!</h3>
                    <p className="text-gray-600 mt-2">Pronto comenzarás a vender simple.</p>
                 </motion.div>
              ) : (
                <motion.div key="form" className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-6">Comienza Ahora</h2>
                  <form
                    ref={formRef}
                    className="space-y-4 flex-grow flex flex-col"
                    action={async (formData) => {
                      if (parseInt(humanCheck) !== num1 + num2) {
                        setHumanCheckError('Respuesta incorrecta. Inténtalo de nuevo.');
                        generateNewQuestion();
                        return;
                      }
                      setHumanCheckError('');

                      const website = formData.get('website') as string;
                      // Regex para validar un dominio, opcionalmente con http(s) y www
                      const websiteRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/.*)?$/;
                      if (!website || !websiteRegex.test(website)) {
                        setWebsiteError('Por favor, ingresa una URL de sitio web válida.');
                        return; // Detiene el envío si la URL no es válida
                      }
                      setWebsiteError(''); // Limpia el error si la URL es válida

                      setHumanCheckError('');
                      setIsSubmitting(true);

                      const subject = 'Nuevo Lead de Agencia';
                      const body = `
                        <h1>Nuevo Lead desde la página de Agencia</h1>
                        <p><strong>Nombre:</strong> ${formData.get('name')}</p>
                        <p><strong>Empresa:</strong> ${formData.get('company')}</p>
                        <p><strong>Sitio Web:</strong> ${formData.get('website')}</p>
                        <p><strong>Plan de Interés:</strong> ${formData.get('plan')}</p>
                      `;

                      const result = await sendEmail({
                        subject,
                        body,
                      });
                      if (result.success) {
                        setIsSubmitted(true);
                      } else {
                        alert(result.error || 'Error al enviar el mensaje.');
                      }
                      setIsSubmitting(false);
                      formRef.current?.reset();
                    }}
                  >
                    <div>
                      <label htmlFor="name-side" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input type="text" name="name" id="name-side" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label htmlFor="company-side" className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                      <input type="text" name="company" id="company-side" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label htmlFor="website-side" className="block text-sm font-medium text-gray-700 mb-1">URL Sitio Web</label>
                      <input type="text" name="website" id="website-side" placeholder="ejemplo.com" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                      {websiteError && <p className="mt-2 text-sm text-red-400">{websiteError}</p>}
                    </div>
                    <div>
                      <label htmlFor="plan-side" className="block text-sm font-medium text-gray-700 mb-1">Plan de interés</label>
                      <select name="plan" id="plan-side" defaultValue={selectedPlan || "Elegir plan"} required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500">
                        {selectedPlan === "Elegir plan" && <option disabled>Elegir plan</option>}
                        {plans.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="human-side" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        Validación: &iquest;Cu&aacute;nto es {num1} + {num2}?
                        <button type="button" onClick={generateNewQuestion} aria-label="Nueva pregunta"><RefreshCw className="w-3 h-3 text-gray-500 hover:text-gray-900" /></button>
                      </label>
                      <input type="number" name="human" id="human-side" value={humanCheck} onChange={(e) => setHumanCheck(e.target.value)} required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                      {humanCheckError && <p className="mt-2 text-sm text-red-500">{humanCheckError}</p>}
                    </div>
                    <div className="mt-auto pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</>
                        ) : "Enviar"}
                      </button>
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