// src/app/page.tsx

import HeroSection from "@/components/sections/HeroSection";

import ServiceSection from "@/components/sections/ServiceSection";

import HowItWorksSection from "@/components/sections/HowItWorksSection";

import CtaBannerSection from "@/components/sections/CtaBannerSection";

import CapabilitiesSection from "@/components/sections/CapabilitiesSection";

import PricingSection from "@/components/sections/PricingSection";

import ClosingCtaSection from "@/components/sections/ClosingCtaSection"; // 1. Importa la nueva sección

export default function Home() {
  return (
    // Ya no necesitamos el div con el fondo aquí
    <main>
      <HeroSection />
      <ServiceSection />
      <HowItWorksSection />
      <CtaBannerSection />
      <CapabilitiesSection />
      <PricingSection />
      <ClosingCtaSection /> {/* 2. Añade la nueva sección al final */}
    </main>
  );
}