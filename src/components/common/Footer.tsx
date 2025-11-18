// src/components/common/Footer.tsx
import React from 'react';
import Link from 'next/link';
import BrandLogo from './BrandLogo';

const Footer = () => {
  return (
    <div>
      <div className="flex justify-between items-center pt-6">
        <div className="flex items-center gap-x-4 md:gap-x-6">
          <BrandLogo isWhite={true} logoSize="text-lg" circleSize="w-2.5 h-2.5" />
          <p className="hidden md:block text-sm text-gray-200">
            © 2025 Onthebrand Inc. All rights reserved.
          </p>
        </div>
      </div>
      <div className="block md:hidden text-center mt-6 text-sm text-gray-200">
        <p>© 2025 Onthebrand Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;