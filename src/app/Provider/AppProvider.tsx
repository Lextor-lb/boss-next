"use client";
import { auth, provider } from "@/lib/firebase";
import { setTokens } from "@/lib/lib";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

const Provider = createContext<any | undefined>(undefined);

const fetcher = async (url: string, idToken: string) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to authenticate');
  }

  return response.json();
};

const useAuthLogin = (idToken: string | null) => {
  const { data, error } = useSWR(
    idToken ? ['https://amt.santar.store/auth/EcommerceLogin', idToken] : null,
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

  const totalCost = cartItems.reduce((pv: number, cv: any) => {
    const finalPrice = cv.discountPrice
      ? cv.salePrice * (1 - cv.discountPrice / 100)
      : cv.salePrice;
    return pv + finalPrice;
  }, 0);

  const handleLogin = async () => {
    try {
      // const result = await signInWithPopup(auth, provider);
      // const idToken = await result.user.getIdToken(true);

      setIdToken("eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlMzcxNzMwZWY4NmViYTI5YTUyMTJkOWI5NmYzNjc1NTA0ZjYyYmMiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiSGVpbiBXYWkgWWFuIEh0ZXQgMjAyMCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJYVJQZ3hpWmNpVVJGbmdjTGpwOVFBU1pzYUJ6SldRYlVqMUV4VFc5eGNwYnQ0VGF6VT1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9ib3NzLWF1dGgxMjM0NTY3ODkiLCJhdWQiOiJib3NzLWF1dGgxMjM0NTY3ODkiLCJhdXRoX3RpbWUiOjE3MjM0ODEzNzEsInVzZXJfaWQiOiI5ek9GQnFPVGNXTU82V0J6STF5OWc5bTVTZ0MzIiwic3ViIjoiOXpPRkJxT1RjV01PNldCekkxeTlnOW01U2dDMyIsImlhdCI6MTcyMzQ4MTM3MywiZXhwIjoxNzIzNDg0OTczLCJlbWFpbCI6ImhlaW53YWl5YW5odGV0MjAyMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJnb29nbGUuY29tIjpbIjExNjUxNjgyNTk5MjY0ODc2MzY2MSJdLCJlbWFpbCI6WyJoZWlud2FpeWFuaHRldDIwMjBAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.MbwNe04rikdp2OKCZ9i5GA_nYJqERruA3WJuZk_03xGzx89iy8f_eZ1CPVxUKXNfObCiAjclzuB8Z_g_Pwshzr-IXtuwjF94HJdPjaSU6rbyzSbiUNr4LOwcvPBWCtDN97AtXOwnF53nMEDnf9L5v0tddVyTJO7d0HY8r4G3O_Z3D8CSpD5MTAWBwSiA_WgEPUmxJOzv-fBi40zn8nNTILLmJpbRD42kmcgn5MjUFhGKzrf2zqy7i5aEhTHjCEHLvoikuuhsNAyP03U0eaI102Cxndu5Zn07OsTARgGpQ8cyEGndk6BRpieva23Ep0mrfeeLKVIGR2SZnjNeXCiNWw"); // Set the idToken to trigger SWR fetch

    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const { data, error } = useAuthLogin(idToken);

  useEffect(() => {
    if (data) {

      console.log('API response:', data);

      if (typeof window !== 'undefined') 
      {

          localStorage.setItem("userId",data.user.id);
          localStorage.setItem("email",data.user.email);
          localStorage.setItem("userId",data.user.name);

      }   
      
      const { accessToken, refreshToken } = data;
      
      setTokens(data);
      
    }

    if (error) {
      console.error('Error during API call:', error);
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
