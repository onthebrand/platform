// src/components/common/BrandLogo.tsx
import React from 'react';

// Hacemos el tamaño y color dinámicos pasándolos como props
interface BrandLogoProps {
  logoSize?: string;
  circleSize?: string;
  className?: string;
}

const BrandLogo = ({ logoSize = 'text-2xl', circleSize = 'w-4 h-4', className }: BrandLogoProps) => {
  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      <div className={`transition-all duration-300 bg-[#00bcd4] rounded-full ${circleSize}`}></div>
      <div className={`flex items-baseline tracking-tighter transition-all duration-300 ${logoSize}`}>
        <span className="font-light text-[#e91e63]">onthe</span>
        <span className="font-bold text-[#9c00ff]">brand</span>
      </div>
    </div>
  );
};

export default BrandLogo;