import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'

// Middleware function to protect routes
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Define routes that should remain publicly accessible (no auth required)
  const publicRoutes = [
    "/login",
    "/register",
    "/api/auth",   // NextAuth API routes
    "/favicon.ico",
    "/_next",       // Next.js static files and assets
    "/"
  ]

  const publicApiRouter=["/api/auth","/api/user","/api/"]

//   console.log(request.nextUrl.clone())

  // Try to retrieve the JWT token from the request using NextAuth
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // If user is authenticated (token exists) and tries to access login/register → redirect to home
  if (token && (pathname.startsWith("/login") || pathname.startsWith("/register"))) {
    const url = request.nextUrl.clone()
    url.pathname = "/"
    return NextResponse.redirect(url)
  }

  // If the request matches any public route, allow it through
  if (publicRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // If no token is found, redirect the user to the login page
  if (!token) {
    const loginUrl = new URL("/login", request.url)

    // Add a callback URL so the user can be redirected back after login
    loginUrl.searchParams.set("callbackurl", request.url)

    return NextResponse.redirect(loginUrl)
  }

  // If token exists and route is protected → allow access
  return NextResponse.next()
}

// Apply this middleware to all routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}