import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export default async function middleware(req: NextRequest) {
  const cookie = cookies().get('refreshToken')?.value
  if (!cookie) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  return NextResponse.next()
}


export const config = {
  matcher: '/d033e22ae348aeb5660fc2140aec35850c4da997/:path*',
}