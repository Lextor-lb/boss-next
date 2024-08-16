"use client";
import { auth, provider } from "@/lib/firebase";
import { decodeToken, setTokens } from "@/lib/lib";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

const Provider = createContext<any | undefined>(undefined);

const fetcher = async (url: string, idToken: string) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate");
  }

  console.log(response);
  return response.json();
};

const useAuthLogin = (idToken: string | null) => {
  const { data, error } = useSWR(
    idToken ? ["https://amt.santar.store/auth/EcommerceLogin", idToken] : null,
    ([url, token]) => fetcher(url, token)
  );

  return { data, error };
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [idToken, setIdToken] = useState<string | null>(null);

  const [couponCode, setCouponCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [validCoupon, setValidCoupon] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const savedCartItems = localStorage.getItem("cartItems");
      try {
        setCartItems(savedCartItems ? JSON.parse(savedCartItems) : []);
      } catch (error) {
        console.error("Failed to parse cartItems from localStorage:", error);
      }
    }
  }, [isClient]);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isClient]);

  const totalCost =
    cartItems.reduce((pv: number, cv: any) => {
      const finalPrice = cv.discountPrice
        ? cv.salePrice * (1 - cv.discountPrice / 100)
        : cv.salePrice;
      return pv + finalPrice;
    }, 0) *
    (1 - couponDiscount / 100);

  const handleLogin = async () => {
    try {
      // const result = await signInWithPopup(auth, provider);
      // const idToken = await result.user.getIdToken(true);

      setIdToken(
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlMzcxNzMwZWY4NmViYTI5YTUyMTJkOWI5NmYzNjc1NTA0ZjYyYmMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiS2FyWWFuIEt5YXciLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTEFhS1dqZE5uSmhFOERXcHhoLTNvOXpzZ1JYRjMtZlJ3UlYxWkt6U2VWZjRZSk1RPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2Jvc3MtYXV0aDEyMzQ1Njc4OSIsImF1ZCI6ImJvc3MtYXV0aDEyMzQ1Njc4OSIsImF1dGhfdGltZSI6MTcyMzgyNDE1MywidXNlcl9pZCI6InhuSTVvMXh1R3hYWE9oblRTdEFJa1djaXZhZTIiLCJzdWIiOiJ4bkk1bzF4dUd4WFhPaG5UU3RBSWtXY2l2YWUyIiwiaWF0IjoxNzIzODI0MTUzLCJleHAiOjE3MjM4Mjc3NTMsImVtYWlsIjoia2FyeWFua3lhdzAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTAyNzE3MzEzMjAxNjM2ODAwNjE0Il0sImVtYWlsIjpbImthcnlhbmt5YXcwMkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.c4RsNzvAtuxyUR3sy3DidlP9P6FoKnI7jDFGXxTwyTaiydVrxRxMCudSeiWxk-1njTP0YDIhn1nQxK8rkFTQjK3BJajZYbQbIhv6m4sOAHHGRbDTfidqEKA4teqfbmZD2KC6BkcT8cIsi7DIhVsU-KcgBVUdJB4WQ7AhOtPwv9JVlgRfnaimtuwg1wYh6lswnSnUXnNYvsNpC13zlnzZl-OYs5ABosPU0nx1wkMAiFeRBgYqarODgUKsAZgTV65MLVkRcmfYa1qP-e0vS8cwvCAbzCFImzZY-AV0h418kK6VEQbIs1OUktyq8m5QZo4NXR4XvraqYv6WHs05WDi02Q"
      );
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const { data } = useAuthLogin(idToken);

  useEffect(() => {
    if (data) {
      console.log("API response:", data);

      if (typeof window !== "undefined") {
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("email", data.user.email);
        localStorage.setItem("name", data.user.name);
        localStorage.setItem("accessToken", data.accessToken);
      }

      const { accessToken, refreshToken } = data;

      setTokens(data);
    }

    if (error) {
      console.error("Error during API call:", error);
    }
  }, [data, error]);

  return (
    <Provider.Provider
      value={{
        searchInputValue,
        setSearchInputValue,
        cartItems,
        setCartItems,
        totalCost,
        isClient,
        handleLogin,
        couponCode,
        setCouponCode,
        inputValue,
        setInputValue,
        validCoupon,
        setValidCoupon,
        couponDiscount,
        setCouponDiscount,
        error,
        setError,
      }}
    >
      {children}
    </Provider.Provider>
  );
};

export const useAppProvider = () => {
  const context = useContext(Provider);
  if (!context) {
    throw new Error("useAppProvider must be used within an AppProvider");
  }

  return context;
};
