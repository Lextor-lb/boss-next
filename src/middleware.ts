// middleware.ts

import { NextRequest, NextResponse } from 'next/server';

const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Allow public access to the login page
	if (pathname.startsWith('/_next/') || pathname.startsWith('/static/') || pathname === "/pos/login" || pathname === "/") {
		return NextResponse.next();
	  }
  
	// Check for the presence of the token
	const token = req.cookies.get('accessToken');
  
	if (!token) {
	  // Redirect to login page if no token is present
	  const loginUrl = new URL('/pos/login', FRONTEND_URL);
	  return NextResponse.redirect(loginUrl);
	}
  
	// Token exists, proceed to the next middleware or request handler
	return NextResponse.next();
}


