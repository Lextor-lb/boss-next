// // pages/api/auth/[...nextauth].ts

// import NextAuth from "next-auth";
// import Providers from "next-auth/providers";

// export default NextAuth({
//   providers: [
//     Providers.Credentials({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       authorize: async (credentials: any) => {
//         // Replace this with your API request
//         const res = await fetch("https://your-api-endpoint.com/auth/login", {
//           method: "POST",
//           body: JSON.stringify(credentials),
//           headers: { "Content-Type": "application/json" }
//         });

//         const user = await res.json();

//         if (res.ok && user) {
//           return user;
//         } else {
//           return null;
//         }
//       }
//     })
//   ],
//   callbacks: {
//     async jwt(token: { accessToken: any; refreshToken: any; user: any; }, user: { accessToken: any; refreshToken: any; user: any; }, account: any) {
//       if (user) {
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//         token.user = user.user;
//       }
//       return token;
//     },
//     async session(session: { user: any; accessToken: any; error: any; }, token: { user: any; accessToken: any; error: any; }) {
//       session.user = token.user;
//       session.accessToken = token.accessToken;
//       session.error = token.error;
//       return session;
//     }
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
//   session: {
//     jwt: true
//   },
//   jwt: {
//     secret: process.env.JWT_SECRET,
//   },
// });
