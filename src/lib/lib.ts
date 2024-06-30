"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Backend_URL } from "./api";

const secretKey =
  process.env.JWT_SECRET ||
  "RFiwOjIkevdeknXIJr6S+ti6ofI18+k656d5UHJJfDEOiCez/WW6prw2fqzN6rpSyv4GOWqOfuWBamwIJ6Qz6Q==";
const key = new TextEncoder().encode(secretKey);

// JWT encryption and decryption functions
export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("3d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

// Authentication functions
export async function login(email: string, password: string) {
  const res = await fetch(`${Backend_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.status !== 201) {
    throw new Error("Login failed");
  }

  const { user, accessToken } = await res.json();

  const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, accessToken, expires });

  cookies().set("session", session, { expires, httpOnly: true });
  return { isSuccess: true };
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) {
    console.log("cookie gone");
    return null;
  }
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) {
    console.warn("No session cookie found.");
    return NextResponse.next(); // No session to update
  }
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
