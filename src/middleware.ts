import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
const Frontend_URL = process.env.FRONTEND_URL;

export async function middleware(req: NextRequest) {
	const token = cookies().get("session");

	const { pathname } = req.nextUrl;

	if (token && pathname == "/pos/login") {
		return NextResponse.redirect(`${Frontend_URL}/pos/app`);
	}

	// if (!token && pathname == "/pos/login") {
	// 	return NextResponse.redirect(`${Frontend_URL}/pos/app`);
	// }

	return NextResponse.next();
}

export const config = {
	api: {
		bodyParser: false,
		matcher: "/app/(:path*)", // Example matcher for API routes
	},
};
