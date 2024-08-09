"use client";
import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HamIcon, Heart, Search, ShoppingCart, User } from "lucide-react";
import Container from "./Container";
import { useRouter } from "next/navigation";
import ControlSheet from "./ControlSheet";
import { useAppProvider } from "@/app/Provider/AppProvider";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Cart from "./Cart";

const Navbar = () => {
  const router = useRouter();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const { searchInputValue, setSearchInputValue } = useAppProvider();

  return (
    <div className="z-[50] h-[100px] fixed flex justify-center items-center bg-secondary top-0 w-full border-b-2 border-input py-3">
      <Container className=" flex justify-center flex-col  h-full">
        <div className=" grid grid-cols-2 lg:grid-cols-3 items-center gap-3">
          <p
            onClick={() => router.push("/")}
            className="lg:text-xl text-lg cursor-pointer font-semibold"
          >
            Boss Nation
          </p>
          {/* nav links */}
          <div className=" hidden lg:flex justify-around">
            <p
              onClick={() => router.push("/new-in?page=1")}
              className=" text-sm cursor-pointer uppercase"
            >
              New In
            </p>
            <p
              onClick={() => router.push("/men?page=1")}
              className=" text-sm cursor-pointer uppercase"
            >
              Men
            </p>
            <p
              onClick={() => router.push("/women?page=1")}
              className=" text-sm cursor-pointer uppercase"
            >
              Women
            </p>
            <p
              onClick={() => router.push("/unisex?page=1")}
              className=" text-sm cursor-pointer uppercase"
            >
              Unisex
            </p>
          </div>

          {/* controls */}
          <div className=" flex justify-end items-center">
            <div className="border-input hidden w-1/2 border-e-0 rounded lg:flex items-center">
              <Button
                className=" !h-8 border-0 -me-2 rounded-e-0"
                variant={"outline"}
              >
                <Search />
              </Button>
              <Input
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="Search..."
                className=" border-s-0 w-2/3 border-0 rounded-s-none"
              />
            </div>
            <ControlSheet
              buttonName={<Heart />}
              title="Wish List"
              desc="Your wishlist is here"
            >
              Wish list
            </ControlSheet>
            <ControlSheet
              buttonName={<ShoppingCart />}
              title="Add to Cart"
              closeRef={closeRef}
              desc="Your Cart Items"
            >
              <Cart closeRef={closeRef} />
            </ControlSheet>
            <ControlSheet buttonName={<User />} title="User Profile">
              profile
            </ControlSheet>
            <div className=" block lg:hidden">
              <ControlSheet
                buttonName={<HamburgerMenuIcon width={24} height={24} />}
                title="Menu"
              >
                <div className=" space-y-3">
                  <p
                    onClick={() => router.push("/new-in?page=1")}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    New In
                  </p>
                  <hr className="  border-1.5 border-input" />
                  <p
                    onClick={() => router.push("/men?page=1")}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    Men
                  </p>
                  <hr className="  border-1.5 border-input" />
                  <p
                    onClick={() => router.push("/women?page=1")}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    Women
                  </p>
                  <hr className="  border-1.5 border-input" />
                  <p
                    onClick={() => router.push("/unisex?page=1")}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    Unisex
                  </p>
                  <hr className="  border-1.5 border-input" />
                </div>
              </ControlSheet>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
