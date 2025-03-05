import { NextResponse, NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { nextUrl } = request
  const { pathname } = nextUrl

  const token = request.cookies.get('zdsl_accessToken')?.value // Retrieve the token from cookies

  // Define protected paths
  const protectedPaths = ['/account-dashboard']

  // Redirect to login if user tries to access a protected route without authentication
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', nextUrl))
    }
  }
}

export const config = {
  matcher: ['/account-dashboard/:path*'],
}
