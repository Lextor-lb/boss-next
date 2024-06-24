// middleware.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  // Simulate getToken function
  // const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const token = "gg"; // Replace null with your actual token retrieval logic

  // Extract pathname safely from req.nextUrl
  const { pathname } = req.nextUrl;

  // If the user is not logged in and is trying to access a protected route, redirect to login
  // if (!token && pathname !== "/pos/login") {
  //   return NextResponse.redirect("http://localhost:3000/pos/login");
  // }

  // if (token && pathname == "/pos/login") {
  //   return NextResponse.redirect("http://localhost:3000/pos/app");
  // }

  // Allow the request if it's a public route or the user is logged in
  return NextResponse.next();
}

export const config = {
  api: {
    bodyParser: false,
    // Specify a matcher for API routes
    matcher: "/app/(:path*)", // Example matcher for API routes
  },
};
