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
import { Backend_URL, getFetch } from "@/lib/fetch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import ErrorComponent from "@/components/ErrorComponent";
import CallToAction from "@/components/ecom/CallToAction";
import Footer from "@/components/ecom/Footer";
import AppLayout from "@/components/ecom/AppLayout";
import { useRouter } from "next/navigation";

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
    return getFetch(url);
  };

  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `${Backend_URL}/ecommerce-Products/riddle/man?page=${1}`,
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
              <div className="space-y-4">
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
                className=" w-full bg-transparent flex !py-4 !text-xs rounded-none justify-center items-center"
                variant={"outline"}
                onClick={() => router.push("/new-in")}
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
