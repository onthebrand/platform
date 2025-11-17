import React from 'react';
import Link from 'next/link';
const navLinks = [
  { name: 'Somos', href: '/agencia#quienes-somos' },
  { name: 'Servicios', href: '/agencia#servicios' },
  { name: 'Partners', href: '/agencia#partners' },
];
import { Zap, Target, LayoutDashboard } from 'lucide-react';

// Define la interfaz para un solo servicio
interface Service {
  name: string;
  href: string;
  description: string;
}

// Definimos las propiedades que recibirá el componente
interface ServicesNavigationProps {
    services: Service[];
}

const ServicesNavigation: React.FC<ServicesNavigationProps> = ({ services }) => {
    const iconMap = {
      "Diagnóstico Digital": Zap,
      "Estrategia Digital": Target,
      "Implementación Digital": LayoutDashboard,
    };

    return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => {
          const IconComponent = iconMap[service.name as keyof typeof iconMap];
          return (
          <div key={service.name} className="bg-fuchsia-700 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            {IconComponent && (
              <div className="text-yellow-300 mb-4"><IconComponent size={40} strokeWidth={1.5} /></div>
            )}
            <h3 className="text-xl font-bold text-white mb-2">{service.name}</h3>
            <p className="text-fuchsia-100 text-sm mb-4">
              {service.description}
            </p>
            <Link href={service.href} className="font-bold text-white hover:text-yellow-300 transition-colors">
              Ver más &rarr;
            </Link>
          </div>
          );
        })}
    </div>
  );
};

export default ServicesNavigation;