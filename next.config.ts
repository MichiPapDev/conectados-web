// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Permitir orígenes de desarrollo (útil para ngrok/tunnels)
  allowedDevOrigins: ['conectados.dpdns.org', 'localhost'],
  
  // ✅ ETags para caché (deshabilitado en desarrollo, habilitado en producción)
  generateEtags: process.env.NODE_ENV !== 'development',
  
  // === RECOMENDACIONES ADICIONALES ===
  
  // 🔒 Seguridad: eliminar header X-Powered-By
  poweredByHeader: false,
  
  // 🚀 Optimización: compresión gzip/brotli
  compress: true,
  
  // 🧪 Modo estricto de React (recomendado)
  reactStrictMode: true,
  
  // 📦 Output para despliegue (opcional, útil para Docker)
  // output: 'standalone',
  
  // 🖼️ Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;