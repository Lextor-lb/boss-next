import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
const Frontend_URL = process.env.FRONTEND_URL;

export async function middleware(req: NextRequest) {
	const token = cookies().get("next-auth.session-token");

	const { pathname } = req.nextUrl;

	if (token && pathname == "/pos/login") {
		return NextResponse.redirect(`${Frontend_URL}/pos/app`);
	}

	return NextResponse.next();
}

// export const config = {
// 	api: {
// 		bodyParser: false,
// 		// Specify a matcher for API routes
// 		matcher: "/pos/(:path*)", // Example matcher for API routes
// 	},
// };
