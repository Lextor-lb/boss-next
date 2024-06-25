import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { useReducer } from "react";
const Backend_URL = process.env.BACKEND_URL;

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
					placeholder: "jsmith@example.com",
				},

				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password) return null;
				const { email, password } = credentials;
				console.log(credentials);
				const res = await fetch(Backend_URL + "/auth/login", {
					method: "POST",
					body: JSON.stringify({
						email,
						password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (res.status == 401) {
					console.log(res.statusText);

					return null;
				}
				const user = await res.json();
				console.log(user);
				return user;
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			// if (user) {
			// 	token.user = user;
			// 	token.accessToken = token.accessToken; // Assuming the token is returned by the backend
			// }
			// console.log(token);
			if (user) return { ...token, ...user };

			return token;
		},
		async session({ session, token }) {
			session.user = token.user;
			session.accessToken = token.accessToken;
			// console.log(session);

			return session;
		},
	},
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

//   async jwt({ token, user }) {
//       if (user) return { ...token, ...user };

//       if (new Date().getTime() < token.backendTokens.expiresIn)
//         return token;

//       return await refreshToken(token);
//     },

// async function refreshToken(token: JWT): Promise<JWT> {
//   const res = await fetch(Backend_URL + "/auth/refresh", {
//     method: "POST",
//     headers: {
//       authorization: `Refresh ${token.backendTokens.refreshToken}`,
//     },
//   });
//   console.log("refreshed");

//   const response = await res.json();

//   return {
//     ...token,
//     backendTokens: response,
//   };
// }

// callbacks: {
// 		async session({ token, session }) {
// 			session.user = token.user;
// 			session.backendTokens = token.backendTokens;

// 			return session;
// 		},
// 	},
