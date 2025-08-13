/* eslint-disable @next/next/no-server-import-in-page */
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Force canonical host in production to avoid cookie mismatches between apex and www
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const host = req.headers.get('host') || '';
  const isProd = process.env.NODE_ENV === 'production';

  if (isProd && host === 'flon.co.uk') {
    url.host = 'www.flon.co.uk';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  // Apply to admin and API routes relevant to auth
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
