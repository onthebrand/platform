
// src/components/common/BrandLogo.tsx
// --- CÓDIGO ACTUALIZADO (v2) - Acepta 'subtitle' ---



import React from 'react';



// 1. CAMBIO: Añadida la prop 'subtitle'

interface BrandLogoProps {

  logoSize?: string;

  circleSize?: string;

  className?: string;

  subtitle?: string;

}



const BrandLogo = ({ logoSize = 'text-2xl', circleSize = 'w-4 h-4', className, subtitle }: BrandLogoProps) => {

  return (

    <div className={`inline-flex flex-col items-end ${className}`}>

      {/* El logo original */}

      <div className={`flex items-baseline`}>

          <div className={`bg-[#00bcd4] rounded-full ${circleSize} group-[.text-white]:bg-white`}></div>
        <span className={`font-light text-[#e91e63] tracking-tighter ${logoSize} group-[.text-white]:text-white`}>onthe<span className="font-bold text-[#9c00ff] group-[.text-white]:text-white">brand</span></span>

      </div>

      {subtitle && (

                <span className="text-gray-700 text-xs font-light leading-tight -mt-1.5">

          {subtitle}

        </span>

      )}

    </div>

  );

};



export default BrandLogo;