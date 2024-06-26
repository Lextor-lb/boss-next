import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSession, updateSession } from "./lib/lib";
const Frontend_URL = process.env.FRONTEND_URL;

export async function middleware(req: NextRequest) {
	const sessionCookie = req.cookies.get("session")?.value;
	// const session = await getSession();
	// const expire = JSON.stringify(session?.expires, null, 2);

	const { pathname } = req.nextUrl;

	if (sessionCookie && pathname == "/pos/login") {
		return NextResponse.redirect(`${Frontend_URL}/pos/app`);
	}

	const appPathRegex = /^\/pos\/app(\/.*)?$/;
	if (!sessionCookie && appPathRegex.test(pathname)) {
		return NextResponse.redirect(`${Frontend_URL}/pos/login`);
	}

	return await updateSession(req);
	// return NextResponse.next();
}

// export const config = {
// 	api: {
// 		bodyParser: false,
// 		matcher: "/app/(:path*)", // Example matcher for API routes
// 	},
// };
