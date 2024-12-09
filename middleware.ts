import { clientConfig, serverConfig } from '@/config';
import { authMiddleware, redirectToLogin } from 'next-firebase-auth-edge';
import { NextResponse, type NextRequest } from 'next/server';

export const PUBLIC_PATHS = ['/login', '/sign-up'];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey!,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async ({}, headers) => {
      console.log('Token is valid');
      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async () => {
      console.log('Token is invalid, logging out');
      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
};
