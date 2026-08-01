// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ... (resto del código)

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});


export async function middleware(request: NextRequest) {
  const url = request.nextUrl.pathname;
  
  // === 1. BLOQUEAR PATRONES MALICIOSOS ===
  const blockedPatterns = [
    /\.env/,
    /\.git/,
    /phpinfo/,
    /admin\//,
    /_profiler/,
    /_vti_bin/,
    /_waku/,
    /amplify/,
    /server\.js/,
    /constants\.js/,
    /utils\.js/,
    /config\/database\.js/,
    /\.aws\/credentials/,
  ];
  
  if (blockedPatterns.some(pattern => pattern.test(url))) {
    console.log(`🔒 Bloqueado acceso a: ${url}`);
    return new NextResponse('Not Found', { status: 404 });
  }

  // === 2. RATE LIMITING ===
  // OBTENER IP - Forma correcta para Next.js 16
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 
             request.headers.get('x-real-ip') ?? 
             request.headers.get('cf-connecting-ip') ?? // Cloudflare
             '127.0.0.1';
  
  const { success, limit, reset, remaining } = await ratelimit.limit(
    `ratelimit:${ip}`
  );
  
  const response = success 
    ? NextResponse.next() 
    : new NextResponse('Too Many Requests', { status: 429 });
    
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', remaining.toString());
  response.headers.set('X-RateLimit-Reset', new Date(reset).toISOString());
  
  if (!success) {
    console.log(`🚫 Rate limit excedido para IP: ${ip}`);
    return response;
  }

  // === 3. HEADERS DE SEGURIDAD ===
  const securityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  };
  
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};