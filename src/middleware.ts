import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow public access to manifest.json
  if (request.nextUrl.pathname === '/manifest.json') {
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/manifest.json',
    // Add other paths that need middleware here
  ],
}
