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

// import { getSession } from "./lib";
// export const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// export async function fetchApi(
// 	url: string,
// 	method: string = "GET",
// 	headers: Record<string, string> = {},
// 	body: any = null
// ) {
// 	try {
// 		const session = await getSession();
// 		const token = JSON.stringify(session?.accessToken, null, 2);
// 		console.log("token", token);
// 		const options: RequestInit = {
// 			method,
// 			headers: {
// 				"Content-Type": "application/json",
// 				Authorization: `Bearer ${token}`,
// 				...headers,
// 			},
// 		};
// 		if (body) {
// 			options.body = JSON.stringify(body);
// 		}
// 		const response = await fetch(url, options);
// 		const data = await response.json();

// 		if (!response.ok) {
// 			throw new Error(data.message || "An error occurred");
// 		}

// 		return data;
// 	} catch (error: any) {
// 		console.error("Fetch API Error:", error.message);
// 		throw new Error(error.message || "An error occurred");
// 	}
// }
import { getSession } from "./lib";

export const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchApi(
	url: string,
	method: string = "GET",
	headers: Record<string, string> = {},
	body: any = null
) {
	try {
		const session = await getSession();
		const token = session?.accessToken;

		if (!token) {
			throw new Error("No access token found");
		}

		const options: RequestInit = {
			method,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				...headers,
			},
		};

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
