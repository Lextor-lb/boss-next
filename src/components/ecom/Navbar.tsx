"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Heart, Search, ShoppingCart, User } from "lucide-react";
import Container from "./Container";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="z-[50] h-[100px] fixed flex justify-center items-center bg-secondary top-0 w-full border-b-2 border-input py-3">
      <Container className=" flex justify-center items-center h-full">
        <div className=" grid grid-cols-3 items-center gap-3">
          <p
            onClick={() => router.push("/")}
            className="text-lg cursor-pointer font-semibold"
          >
            Boss Nation
          </p>
          {/* nav links */}
          <div className=" flex justify-around">
            <p
              onClick={() => router.push("/new-in")}
              className=" text-xs cursor-pointer font-light uppercase"
            >
              New In
            </p>
            <p
              onClick={() => router.push("/men")}
              className=" text-xs cursor-pointer font-light uppercase"
            >
              Men
            </p>
            <p
              onClick={() => router.push("/women")}
              className=" text-xs cursor-pointer font-light uppercase"
            >
              Women
            </p>
            <p
              onClick={() => router.push("/unisex")}
              className=" text-xs cursor-pointer font-light uppercase"
            >
              Unisex
            </p>
          </div>

          {/* controls */}
          <div className=" flex justify-end items-center">
            <div className="border-input border rounded flex items-center">
              <Button
                className=" !h-8 border-0 -me-2 rounded-e-0"
                variant={"outline"}
              >
                <Search />
              </Button>
              <Input
                placeholder="Search..."
                className=" border-s-0 border-0 rounded-s-none"
              />
            </div>
            <Button variant={"ghost"}>
              <Heart />
            </Button>
            <Button variant={"ghost"}>
              <ShoppingCart />
            </Button>
            <Button variant={"ghost"}>
              <User />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
