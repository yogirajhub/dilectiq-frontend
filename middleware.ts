import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get('auth_session');
  const pathname = request.nextUrl.pathname;
  
  const isDashboardRoute = 
    pathname.startsWith('/overview') || 
    pathname.startsWith('/agents') || 
    pathname.startsWith('/calling') ||
    pathname.startsWith('/numbers') ||
    pathname.startsWith('/analytics') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/integrations') ||
    pathname.startsWith('/support') ||
    pathname.startsWith('/billing') ||
    pathname.startsWith('/design-system') ||
    pathname.startsWith('/brand');

  if (isDashboardRoute && !authCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Redirect logged in users away from auth pages back to dashboard
  const isAuthRoute = 
    pathname.startsWith('/login') || 
    pathname.startsWith('/signup') ||
    pathname.startsWith('/forgot-password');

  if (isAuthRoute && authCookie) {
    return NextResponse.redirect(new URL('/overview', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
