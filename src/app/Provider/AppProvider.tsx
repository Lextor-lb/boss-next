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

  return response.json();
};

const useAuthLogin = (idToken: string | null) => {
  const { data, error } = useSWR(
    idToken
      ? ["https://backend.boss-nation.com/auth/EcommerceLogin", idToken]
      : null,
    ([url, token]) => fetcher(url, token)
  );

  return { data, error };
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [searchInputValue, setSearchInputValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [orderRecord, setOrderRecord] = useState<any[]>([]);
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
      const orderRecordItems = localStorage.getItem("orderRecord");
      try {
        setCartItems(savedCartItems ? JSON.parse(savedCartItems) : []);
        setOrderRecord(orderRecordItems ? JSON.parse(orderRecordItems) : []);
      } catch (error) {
        console.error("Failed to parse cartItems from localStorage:", error);
      }
    }
  }, [isClient]);

  // Update localStorage whenever cartItems change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      localStorage.setItem("orderRecord", JSON.stringify(orderRecord));
    }
  }, [cartItems, isClient, orderRecord]);

  const totalCost =
    orderRecord.reduce((pv: number, cv: any) => {
      return pv + cv.priceAfterDiscount;
    }, 0) *
    (1 - couponDiscount / 100);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true);

      setIdToken(idToken);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const { data } = useAuthLogin(idToken);

  useEffect(() => {
    if (data) {
      console.log(data);
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
        orderRecord,
        setOrderRecord,
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
