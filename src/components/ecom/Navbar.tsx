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
    <div className="z-[50] h-[80px] lg:h-[100px] fixed flex justify-center items-center bg-secondary top-0 w-full border-b-2 border-input py-3">
      <Container className=" flex justify-center flex-col  h-full">
        <div className=" grid grid-cols-2 lg:grid-cols-3 items-center gap-3">
          <p
            onClick={() => {
              setSearchInputValue("");
              router.push("/");
            }}
            className="lg:text-xl text-lg cursor-pointer font-semibold"
          >
            Boss Nation
          </p>
          {/* nav links */}
          <div className=" hidden lg:flex justify-around">
            <p
              onClick={() => {
                setSearchInputValue("");

                router.push("/new-in?page=1");
              }}
              className=" text-sm cursor-pointer uppercase"
            >
              New In
            </p>
            <p
              onClick={() => {
                setSearchInputValue("");

                router.push("/men?page=1");
              }}
              className=" text-sm cursor-pointer uppercase"
            >
              Men
            </p>
            <p
              onClick={() => {
                setSearchInputValue("");

                router.push("/women?page=1");
              }}
              className=" text-sm cursor-pointer uppercase"
            >
              Women
            </p>
            <p
              onClick={() => {
                setSearchInputValue("");
                router.push("/unisex?page=1");
              }}
              className=" text-sm cursor-pointer uppercase"
            >
              Unisex
            </p>
          </div>

          {/* controls */}
          <div className=" flex justify-end items-center">
            <div className="border-input border-2 w-[300px] rounded hidden lg:flex items-center">
              <Button
                className=" !h-8 border-0 -me-2 rounded-e-0"
                variant={"ghost"}
              >
                <Search />
              </Button>
              <Input
                value={searchInputValue}
                onChange={(e) => setSearchInputValue(e.target.value)}
                placeholder="Search..."
                className="w-[80%] border-none h-4 bg-transparent rounded-none focus:outline-none focus:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div className=" block lg:hidden">
              <ControlSheet
                buttonName={<Search />}
                title=""
                desc=""
                closeRef={closeRef}
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    closeRef.current && closeRef.current.click();
                  }}
                >
                  <div className="border-input w-full  rounded border flex items-center">
                    <Button
                      type="submit"
                      className=" !h-8 border-0 -me-2 rounded-e-0"
                      variant={"outline"}
                    >
                      <Search />
                    </Button>
                    <Input
                      value={searchInputValue}
                      onChange={(e) => setSearchInputValue(e.target.value)}
                      placeholder="Search..."
                      className="w-[80%] border-none h-9 bg-transparent rounded-none focus:outline-none focus:border-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </form>
              </ControlSheet>
            </div>
            <div className=" hidden lg:block">
              <ControlSheet
                buttonName={<Heart />}
                title="Wish List"
                desc="Your wishlist is here"
              >
                Wish list
              </ControlSheet>
            </div>

            <ControlSheet
              buttonName={<ShoppingCart />}
              title="Add to Cart"
              closeRef={closeRef}
              desc="Your Cart Items"
            >
              <Cart closeRef={closeRef} />
            </ControlSheet>

            <div className=" hidden lg:block">
              <Button
                onClick={() => {
                  setSearchInputValue("");
                  router.push("/profile");
                }}
                size={"sm"}
                variant={"ghost"}
                className=" relative"
              >
                <User />
              </Button>
            </div>
            <div className=" block lg:hidden">
              <ControlSheet
                buttonName={<HamburgerMenuIcon width={24} height={24} />}
                title="Menu"
              >
                <div className=" space-y-3">
                  <p
                    onClick={() => {
                      setSearchInputValue("");

                      router.push("/new-in?page=1");
                    }}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    New In
                  </p>
                  <hr className="  border-1.5 border-input" />
                  <p
                    onClick={() => {
                      setSearchInputValue("");

                      router.push("/men?page=1");
                    }}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    Men
                  </p>
                  <hr className="  border-1.5 border-input" />
                  <p
                    onClick={() => {
                      setSearchInputValue("");
                      router.push("/women?page=1");
                    }}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    Women
                  </p>
                  <hr className="  border-1.5 border-input" />
                  <p
                    onClick={() => {
                      setSearchInputValue("");
                      router.push("/unisex?page=1");
                    }}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    Unisex
                  </p>
                  <hr className="  border-1.5 border-input" />
                  <p
                    onClick={() => {
                      setSearchInputValue("");
                      router.push("/profile");
                    }}
                    className=" text-sm cursor-pointer uppercase"
                  >
                    Profile
                  </p>
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
