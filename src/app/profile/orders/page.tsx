"use client";

import { Container } from "@/components/ecom";
import OrderComponent from "@/components/ecom/OrderComponent";
import { Backend_URL } from "@/lib/fetch";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const UserOrdersPage = () => {
  const [isClient, setIsClient] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getData = async (url: string) => {
    try {
      const token = isClient && localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const options: RequestInit = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  const { data, isLoading } = useSWR(
    `${Backend_URL}/orders/ecommerce`,
    getData,
    {
      refreshInterval: 50000,
    }
  );
  console.log(data);

  return (
    <>
      {!isLoading && (
        <div className=" space-y-6">
          {data?.map((data: any, index: any) => (
            <OrderComponent key={index} data={data} />
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrdersPage;
