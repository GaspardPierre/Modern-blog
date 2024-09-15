import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {

  if (req.nextUrl.pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  console.log("Middleware token:", token) 

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token || token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  if (req.nextUrl.pathname.startsWith('/user')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}