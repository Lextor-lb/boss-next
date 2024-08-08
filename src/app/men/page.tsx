"use client";
import {
  BreadCrumbComponent,
  Container,
  Heading,
  Products,
} from "@/components/ecom";
import ProductSkeleton from "@/components/ecom/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { Backend_URL, getFetch } from "@/lib/fetch";
import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import useSWR from "swr";

const MenPage = () => {
  const [limit, setLimit] = useState(12);

  const getData = (url: string) => {
    return getFetch(url);
  };
  const { data, isLoading, error } = useSWR(
    `${Backend_URL}/ecommerce-Products/riddle/man?limit=${limit}`,
    getData
  );

  return (
    <div className=" space-y-4">
      <Container>
        <BreadCrumbComponent path="Home" currentPage="Men" />
        <Heading
          header="New products for men"
          desc="the latest and greatest products that every man needs to enhance his lifestyle"
        />
      </Container>
      <div className=" py-3 border">
        <Container>
          <div className="flex justify-between items-center">
            <div className=" flex items-center gap-3">
              <p className=" text-xs uppercase">view by :</p>
              <Button size={"sm"} variant={"ghost"}>
                1
              </Button>
              <Button size={"sm"} variant={"ghost"}>
                2
              </Button>
              <Button size={"sm"} variant={"ghost"}>
                3
              </Button>
            </div>

            <div className=" text-xs">
              <i>Showing 1 - 6 of 48 item(s)</i>
            </div>

            <div className=" flex items-center gap-3">
              <p className=" text-xs text-primary/60 uppercase">view by :</p>
              <p className=" text-xs uppercase">Newest</p>{" "}
              <Button variant={"outline"}>
                <span className=" me-2">Filter</span>
                <SlidersHorizontal />
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        {isLoading ? (
          <div className=" grid grid-cols-2 gap-x-3 gap-y-8 lg:grid-cols-4">
            <ProductSkeleton />
          </div>
        ) : (
          <Products data={data.data} isLoading={isLoading} />
        )}
      </Container>
      <div className=" py-3 border">
        <Container>
          <div className="flex justify-between items-center">
            <div className=" flex items-center gap-3">
              <p className=" text-xs uppercase">view by :</p>
              <Button size={"sm"} variant={"ghost"}>
                2
              </Button>
              <Button size={"sm"} variant={"ghost"}>
                3
              </Button>
              <Button size={"sm"} variant={"ghost"}>
                4
              </Button>
            </div>

            <div className=" text-xs">
              <i>Showing 1 - 6 of 48 item(s)</i>
            </div>

            <div className=" flex items-center gap-3">
              <p className=" text-xs text-primary/60 uppercase">view by :</p>
              <p className=" text-xs uppercase">Newest</p>{" "}
              <Button variant={"outline"}>
                <span className=" me-2">Filter</span>
                <SlidersHorizontal />
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default MenPage;
