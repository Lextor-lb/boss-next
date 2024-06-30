// api.ts
import { getSession } from "./lib";

export const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const findToken = async () => {
  const session = await getSession();
  const token = session?.accessToken;
  return token;
};

export const getFetch = async (
  url: string,
  body: any = null,
  headers: Record<string, string> = {}
) => {
  try {
    const token = await findToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
    };

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
};

export const postFetch = async (
  url: string,
  body: any,
  headers: Record<string, string> = {}
) => {
  try {
    const token = await findToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: JSON.stringify(body), // Directly stringify the provided body
    };

    console.log("Request options:", options);

    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error: any) {
    console.error("Fetch API Error:", error.message);
    throw new Error(error.message || "An error occurred");
  }
};

// this is somehow working, please don't touch this 🙏 🙏 🙏
export const postMediaFetch = async (
  url: string,
  body: FormData,
  headers: Record<string, string> = {}
) => {
  try {
    const token = await findToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const options: RequestInit = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: body,
    };

    console.log("Request options:", options);

    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error: any) {
    console.error("Fetch API Error:", error.message);
    throw new Error(error.message || "An error occurred");
  }
};

export const deleteFetch = async (
  url: string,
  body: any,
  headers: Record<string, string> = {}
) => {
  try {
    const token = await findToken();
    if (!token) {
      throw new Error("No access token found");
    }
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "multipart/form-data",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: JSON.stringify(body), // Directly stringify the provided body
    };

    console.log(body);

    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error: any) {
    console.error("Fetch API Error:", error.message);
    throw new Error(error.message || "An error occurred");
  }
};

export const putFetch = async (
  url: string,
  body: any,
  headers: Record<string, string> = {}
) => {
  try {
    const token = await findToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "multipart/form-data",
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: JSON.stringify(body),
    };

    console.log("Request options:", body);

    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error: any) {
    console.log(error);
    // throw new Error(error.message || "An error occurred");
  }
};

export const putMediaFetch = async (
  url: string,
  body: FormData,
  headers: Record<string, string> = {}
) => {
  try {
    const token = await findToken();
    if (!token) {
      throw new Error("No access token found");
    }

    const options: RequestInit = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers,
      },
      body: body,
    };

    console.log("Request options:", options);

    const response = await fetch(url, options);
    const data = await response.json();

    console.log("Response data:", data);

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    return data;
  } catch (error: any) {
    console.error("Fetch API Error:", error.message);
    throw new Error(error.message || "An error occurred");
  }
};
