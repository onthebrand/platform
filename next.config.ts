import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/plataforma/nutonia',
        destination: 'https://onthebrand-neurolearn.vercel.app/',
      },
      {
        source: '/plataforma/nutonia/:path*',
        destination: 'https://onthebrand-neurolearn.vercel.app/:path*',
      },
      {
        source: '/clientes/the-lift/belba',
        destination: 'https://onthebrand-dashboard-clinica-belba.vercel.app',
      },
      {
        source: '/clientes/the-lift/belba/:path*',
        destination: 'https://onthebrand-dashboard-clinica-belba.vercel.app/:path*',
      }
    ];
  }
};

export default nextConfig;
