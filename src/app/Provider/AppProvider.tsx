"use client";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const Provider = createContext<any | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);

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

  const totalCost = cartItems.reduce((pv: number, cv: any) => {
    const finalPrice = cv.discountPrice
      ? cv.salePrice * (1 - cv.discountPrice / 100)
      : cv.salePrice;
    return pv + finalPrice;
  }, 0);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true); // Await the promise to get the ID token
      console.log("ID Token:", idToken);
    } catch (error) {
      console.error(error);
    }
  };

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
