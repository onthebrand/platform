"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, CheckCircle, RefreshCw } from 'lucide-react';
import { sendEmail } from '@/app/consultora/actions';
import { Button } from '@/components/ui/button';

interface HomeContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HomeContactForm({ isOpen, onClose }: HomeContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [humanCheck, setHumanCheck] = useState('');
  const [humanCheckError, setHumanCheckError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const generateNewQuestion = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setHumanCheck('');
    setHumanCheckError('');
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

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const formVariants = {
    visible: { x: 0 },
    hidden: { x: '100%' },
  };

  const handleFormAction = async (formData: FormData) => {
    if (parseInt(humanCheck) !== num1 + num2) {
      setHumanCheckError('Respuesta incorrecta. Inténtalo de nuevo.');
      generateNewQuestion();
      return;
    }
    setHumanCheckError('');
    setIsSubmitting(true);

    const subject = `Nuevo Contacto Home: ${formData.get('name')}`;
    const body = `
      <h2>Nuevo Mensaje de Contacto - Home</h2>
      <p><strong>Nombre:</strong> ${formData.get('name')}</p>
      <p><strong>Email:</strong> ${formData.get('email')}</p>
      <p><strong>Desafío:</strong></p>
      <p>${formData.get('message')}</p>
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
          <motion.div variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose} className="fixed inset-0 bg-black/60 z-50" />
          <motion.div variants={formVariants} initial="hidden" animate="visible" exit="hidden" transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-white text-gray-900 shadow-2xl z-50 p-8 flex flex-col">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"><X className="w-6 h-6" /></button>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full">
                  <CheckCircle className="w-16 h-16 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900">¡Gracias!</h3>
                  <p className="text-gray-600 mt-2">Tu mensaje ha sido enviado. Nos pondremos en contacto contigo a la brevedad.</p>
                </motion.div>
              ) : (
                <motion.div key="form" className="h-full flex flex-col">
                  <h2 className="text-2xl font-bold mb-6">Conversemos</h2>
                  <form ref={formRef} action={handleFormAction} className="space-y-4 flex-grow flex flex-col">
                    <div>
                      <label htmlFor="name-home" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                      <input type="text" name="name" id="name-home" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label htmlFor="email-home" className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
                      <input type="email" name="email" id="email-home" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                    </div>
                    <div>
                      <label htmlFor="message-home" className="block text-sm font-medium text-gray-700 mb-1">Cuéntanos tus desafíos</label>
                      <textarea name="message" id="message-home" rows={4} required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"></textarea>
                    </div>
                    <div>
                      <label htmlFor="human-home" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                        Validación: &iquest;Cu&aacute;nto es {num1} + {num2}?
                        <button type="button" onClick={generateNewQuestion} aria-label="Nueva pregunta"><RefreshCw className="w-3 h-3 text-gray-500 hover:text-gray-900" /></button>
                      </label>
                      <input type="number" name="human" id="human-home" value={humanCheck} onChange={(e) => setHumanCheck(e.target.value)} required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                      {humanCheckError && <p className="mt-2 text-sm text-red-500">{humanCheckError}</p>}
                    </div>
                    <div className="mt-auto pt-4">
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3">
                        {isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Enviando...</> : "Enviar"}
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