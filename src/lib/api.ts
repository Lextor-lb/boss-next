// 'use server'
// import { cookies } from "next/headers";
// export const Backend_URL = process.env.BACKEND_URL;

// export async function fetchApi(
// 	url: string,
// 	method: string = "GET",
// 	headers: Record<string, string> = {},
// 	body: any = null
// ) {

// 	const token = cookies().get("next-auth.session-token");

// 	const options: RequestInit = {
// 		method,
// 		headers: {
// 			"Content-Type": "application/json",
// 			...headers,
// 		},
// 	};
// 	if (token) {
// 		headers.Authorization = `Bearer ${token}`;
// 	}

// 	if (body) {
// 		options.body = JSON.stringify(body);
// 	}

// 	const response = await fetch(url, options);
// 	const data = await response.json();
// 	console.log(data);

// 	if (!response.ok) {
// 		throw new Error("error", data.message);
// 	}

// 	return data;
// }

// "use server";

import { useSession } from "next-auth/react";
import { cookies } from "next/headers";
import { useCookies } from "next-client-cookies";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
export const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchApi(
	url: string,
	method: string = "GET",
	token: any,
	headers: Record<string, string> = {},
	body: any = null
) {
	try {
		// console.log(token);
		const options: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				...headers,
			},
		};

		// if (token) {
		// headers.Authorization = `Bearer ${token}`;
		// }

		if (body) {
			options.body = JSON.stringify(body);
		}
		const response = await fetch(url, options);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "An error occurred");
		}

		return data;
	} catch (error: any) {
		console.error("Fetch API Error:", error.message);
		throw new Error(error.message || "An error occurred");
	}
}
