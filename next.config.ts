import type { NextConfig } from 'next';

/**
 * Configuración de Producción y Exportación Estática CDN — Costa Tour.
 *
 * Propósito de negocio y despliegue:
 * - Habilita `output: 'export'` para pre-renderizar las 50 rutas estáticas (SSG) en `out/`
 *   y desplegarlas con latencia cero en Firebase Hosting CDN.
 * - Mantiene `next/image` con dimensiones fijas (CLS = 0) y `unoptimized: true` para
 *   compatibilidad universal con hosting estático.
 */
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
