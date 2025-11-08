// src/components/common/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { Instagram, Youtube } from 'lucide-react';
import BrandLogo from './BrandLogo';

const Footer = () => {
  return (
    <div>
      <div className="border-t border-white/20"></div>
      <div className="flex justify-between items-center pt-6">
        <div className="flex items-center gap-x-4 md:gap-x-6">
          <BrandLogo className="text-white group" logoSize="text-lg" circleSize="w-2.5 h-2.5" />
          <p className="hidden md:block text-sm text-gray-200">
            © 2025 Onthebrand Inc. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-x-4">
          <Link href="#" passHref>
            <span className="text-white/80 hover:text-white transition-colors cursor-pointer">
              <Instagram className="w-5 h-5" />
            </span>
          </Link>
          <Link href="#" passHref>
            <span className="text-white/80 hover:text-white transition-colors cursor-pointer">
              <Youtube className="w-5 h-5" />
            </span>
          </Link>
        </div>
      </div>
      <div className="block md:hidden text-center mt-6 text-sm text-gray-200">
        <p>© 2025 Onthebrand Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;