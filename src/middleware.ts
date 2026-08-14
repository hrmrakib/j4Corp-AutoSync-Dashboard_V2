import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Fetch current user (authentication token) from request cookies directly
  const token = request.cookies.get("token")?.value;

  // If there's no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated, proceed with the request
  return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {
  matcher: ["/", "/profile"],
};
