import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import { cookies } from "next/headers";
const Frontend_URL = process.env.FRONTEND_URL;

export async function middleware(req: NextRequest) {
	const token = cookies().get("next-auth.session-token");

	const { pathname } = req.nextUrl;

	if (token && pathname == "/pos/login") {
		return NextResponse.redirect(`${Frontend_URL}/pos/app`);
	}

	// Allow the request if it's a public route or the user is logged in
	return NextResponse.next();
}

// export const config = {
// 	api: {
// 		bodyParser: false,
// 		// Specify a matcher for API routes
// 		matcher: "/pos/(:path*)", // Example matcher for API routes
// 	},
// };
