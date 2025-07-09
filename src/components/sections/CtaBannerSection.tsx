// src/components/sections/CtaBannerSection.tsx
 "use client";

 import { Button } from "@/components/ui/button";
 import { ArrowRight } from "lucide-react";

 const CtaBannerSection = () => {
  return (
  <section className="bg-[#ffeb3b] py-16">
  <div className="container mx-auto px-4 flex items-center justify-between">
  <div className="text-left">
  <h2 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
  No es una agencia. No es un SaaS.<br />
  <span className="text-purple-600">Es lo mejor de cada una + IA.</span>
  </h2>
  </div>
  <div className="flex items-center gap-6">
  <Button size="lg" className="bg-gradient-to-r from-[#9c00ff] to-[#e91e63] text-white shadow-md hover:shadow-lg transition-shadow duration-200 px-8 py-6 text-base font-bold">
  Solicita 14 Días Gratis
  </Button>
  <a href="#precios" className="font-semibold text-gray-800 hover:text-purple-600 flex items-center gap-2">
  Ver precios <ArrowRight className="w-4 h-4" />
  </a>
  </div>
  </div>
  </section>
  );
 };

 export default CtaBannerSection;