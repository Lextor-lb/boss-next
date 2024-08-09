"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const Provider = createContext<any | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [searchInputValue, setSearchInputValue] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [cartItems, setCartItems] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = localStorage.getItem("cartItems");
      try {
        return savedCartItems ? JSON.parse(savedCartItems) : [];
      } catch (error) {
        console.error("Failed to parse cartItems from localStorage:", error);
        return [];
      }
    }
    return [];
  });

  // Update localStorage whenever cartItems change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cartItems to localStorage:", error);
      }
    }
  }, [cartItems]);
  return (
    <Provider.Provider
      value={{ searchInputValue, setSearchInputValue, cartItems, setCartItems }}
    >
      {children}
    </Provider.Provider>
  );
};

export const useAppProvider = () => {
  const context = useContext(Provider);
  if (!context) {
    throw new Error("useAppProvider must be used within a AppProvider");
  }

  return context;
};
