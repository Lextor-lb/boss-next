"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import {
  Banner,
  BreadCrumbComponent,
  Container,
  Heading,
  Navbar,
  ProductCategories,
  Products,
} from "@/components/ecom";
import useSWR from "swr";
import { Backend_URL, getFetchForEcom } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ErrorComponent from "@/components/ErrorComponent";
import CallToAction from "@/components/ecom/CallToAction";
import Footer from "@/components/ecom/Footer";
import AppLayout from "@/components/ecom/AppLayout";
import { useRouter } from "next/navigation";
import { AppProvider } from "./Provider/AppProvider";

export default function Home() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(true); // Await the promise to get the ID token
      console.log("ID Token:", idToken);
    } catch (error) {
      console.error(error);
    }
  };

  const getData = (url: string) => {
    return getFetchForEcom(url);
  };

  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `${Backend_URL}/ecommerce-Products/riddle/man?limit=${12}`,
    getData
  );

  return (
    <main className=" min-h-screen w-screen overflow-x-hidden bg-secondary">
      <AppLayout>
        <Banner />
        {error ? (
          <ErrorComponent refetch={() => {}} />
        ) : (
          <>
            <Container>
              <div className="space-y-4 mt-5">
                <BreadCrumbComponent path="Home" currentPage="Best Sellers" />
                <Heading
                  header="Best selling products for you"
                  desc="the latest and greatest products that every man needs to enhance his lifestyle"
                />
                <div className=" space-y-3 ">
                  <Products isLoading={isLoading} data={data?.data} />
                </div>
              </div>
            </Container>
            {!isLoading && (
              <Button
                className=" w-full mt-5 bg-transparent flex !py-4 !text-xs rounded-none justify-center items-center"
                variant={"outline"}
                onClick={() => router.push("/new-in?page=1")}
              >
                <Plus />{" "}
                <span className=" capitalize !text-xs"> VIEW MORE</span>
              </Button>
            )}

            <ProductCategories />
          </>
        )}
      </AppLayout>
    </main>
  );
}
