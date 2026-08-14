import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Fetch current user (authentication token) from request cookies directly
  const token = request.cookies.get("token")?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith('/login');

  // If there's no token, redirect to login page (unless already on login page)
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // If user is authenticated and tries to access login page, redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is authenticated, proceed with the request
  return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
