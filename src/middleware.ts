import { NextRequest, NextResponse } from "next/server";

const FRONTEND_URL = process.env.FRONTEND_URL;

console.log(FRONTEND_URL);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public access to the login page explicitly
  if (pathname === "/pos/login") {
    return NextResponse.next();
  }

  // Allow all paths that do not start with "/pos/"
  if (!pathname.startsWith("/pos/")) {
    return NextResponse.next();
  }

  // For paths that start with "/pos/" (excluding /pos/login), check for the presence of the token
  const token = req.cookies.get("accessToken");

  if (!token) {
    // Check if FRONTEND_URL is set, otherwise throw an error or log it
    if (!FRONTEND_URL) {
      console.error("FRONTEND_URL is not defined");
      throw new Error(
        "FRONTEND_URL is required to redirect to the login page."
      );
    }

    // Redirect to login page if no token is present
    const loginUrl = new URL("/pos/login", FRONTEND_URL);
    return NextResponse.redirect(loginUrl);
  }

  // Token exists, proceed to the next middleware or request handler
  return NextResponse.next();
}
