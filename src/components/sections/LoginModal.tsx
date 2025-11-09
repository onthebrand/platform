"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-50px", opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: "50px", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            variants={modalVariants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-8"
          >
            <div className="flex justify-center mb-6">
              <div className="flex items-baseline">
                <div className="w-4 h-4 bg-[#00bcd4] rounded-full"></div>
                <span className="text-2xl font-light text-[#e91e63] tracking-tighter">
                  ai<span className="font-bold text-[#9c00ff]">commerce</span>
                </span>
              </div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                <input type="text" name="username" id="username" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
              </div>
              <div>
                <label htmlFor="password"  className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                <input type="password" name="password" id="password" required className="w-full rounded-md border-gray-300 bg-gray-50 p-3 text-gray-900 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full bg-gradient-to-r from-[#9c00ff] to-[#e91e63] text-white font-bold">
                  Enviar
                </Button>
              </div>
            </form>

            <div className="text-center mt-6">
              <a href="#" className="text-sm text-gray-600 hover:text-purple-600 hover:underline">
                Recupera tu contraseña
              </a>
            </div>

            <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;