
// src/components/common/BrandLogo.tsx
// --- CÓDIGO ACTUALIZADO (v2) - Acepta 'subtitle' ---



import React from 'react';



// 1. CAMBIO: Añadida la prop 'subtitle'

interface BrandLogoProps {

  logoSize?: string;

  circleSize?: string;

  className?: string;

  subtitle?: string;
 isWhite?: boolean;
}



const BrandLogo = ({ logoSize = 'text-2xl', circleSize = 'w-4 h-4', className, subtitle, isWhite = false }: BrandLogoProps) => {
  return (

    <div className={`inline-flex flex-col items-end ${className} ${isWhite ? 'text-white' : ''}`}>

      {/* El logo original */}

      <div className={`flex items-baseline`}>

      <div className={`bg-[#00bcd4] rounded-full ${circleSize} ${isWhite ? 'bg-white' : ''}`}></div>
        <span className={`font-light tracking-tighter ${logoSize} ${isWhite ? 'text-white' : 'text-[#e91e63]'}`}>onthe<span className={`font-bold ${isWhite ? 'text-white' : 'text-[#9c00ff]'}`}>brand</span></span>

      </div>

      {subtitle && (

                <span className={`text-xs font-light leading-tight -mt-1.5 ${isWhite ? 'text-white/80' : 'text-gray-700'}`}>

          {subtitle}

        </span>

      )}

    </div>

  );

};



export default BrandLogo;